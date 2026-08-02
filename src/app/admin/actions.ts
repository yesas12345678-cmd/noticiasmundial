'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE = 'admin_session';

function getSessionSignature() {
  const secret = process.env.SESSION_SECRET || 'noticiasmundial-session-secret-xyz-789';
  return crypto.createHmac('sha256', secret).update('admin-logged-in').digest('hex');
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie) return false;
  return sessionCookie.value === getSessionSignature();
}

export async function loginAction(password: string): Promise<{ success: boolean; message: string }> {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'Manuel1214$';
  if (password === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, getSessionSignature(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true, message: 'Autenticado correctamente.' };
  }
  return { success: false, message: 'Código de acceso no autorizado.' };
}

export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { success: true };
}

export async function checkAuthAction(): Promise<boolean> {
  return await checkAuth();
}

export interface AdminArticle {
  id: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: string;
  image_url: string;
  author: string;
  content: string;
  likes: number;
  trending: boolean;
  published_at: string; // ISO String
  keyword: string;
  slug: string;
}

export async function getArticlesAction(): Promise<AdminArticle[]> {
  if (!(await checkAuth())) {
    throw new Error('No autorizado');
  }
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM articles ORDER BY published_at DESC');
    return rows.map(row => ({
      ...row,
      published_at: row.published_at ? new Date(row.published_at).toISOString() : new Date().toISOString(),
      slug: row.slug || '',
    }));
  } catch (err) {
    console.error('Error fetching articles in Server Action:', err);
    throw new Error('No se pudieron obtener los artículos de la base de datos.');
  } finally {
    client.release();
  }
}

export async function updateArticleAction(
  id: string,
  data: {
    title: string;
    meta_title: string;
    excerpt: string;
    category: string;
    date: string;
    published_at: string; // ISO String or datetime
    keyword: string;
    slug: string;
    content?: string; // allow editing the content body (word count calculation)
  }
): Promise<{ success: boolean; message: string }> {
  if (!(await checkAuth())) {
    throw new Error('No autorizado');
  }
  const client = await pool.connect();
  try {
    // Check if the keyword would collide (except for this article)
    const { rows: keywordCheck } = await client.query(
      'SELECT id FROM articles WHERE keyword = $1 AND id != $2',
      [data.keyword, id]
    );
    if (keywordCheck.length > 0) {
      return { success: false, message: 'La palabra clave principal ya está siendo utilizada por otro artículo.' };
    }

    // Check if the slug would collide (except for this article)
    const { rows: slugCheck } = await client.query(
      'SELECT id FROM articles WHERE slug = $1 AND id != $2',
      [data.slug, id]
    );
    if (slugCheck.length > 0) {
      return { success: false, message: 'El slug de URL ya está siendo utilizado por otro artículo.' };
    }

    // Update query
    if (data.content !== undefined) {
      await client.query(
        `
        UPDATE articles SET
          title = $1,
          meta_title = $2,
          excerpt = $3,
          category = $4,
          date = $5,
          published_at = $6,
          keyword = $7,
          slug = $8,
          content = $9
        WHERE id = $10
        `,
        [
          data.title,
          data.meta_title,
          data.excerpt,
          data.category,
          data.date,
          new Date(data.published_at),
          data.keyword,
          data.slug,
          data.content,
          id,
        ]
      );
    } else {
      await client.query(
        `
        UPDATE articles SET
          title = $1,
          meta_title = $2,
          excerpt = $3,
          category = $4,
          date = $5,
          published_at = $6,
          keyword = $7,
          slug = $8
        WHERE id = $9
        `,
        [
          data.title,
          data.meta_title,
          data.excerpt,
          data.category,
          data.date,
          new Date(data.published_at),
          data.keyword,
          data.slug,
          id,
        ]
      );
    }

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true, message: 'Artículo actualizado correctamente.' };
  } catch (err) {
    console.error('Error updating article in Server Action:', err);
    return { success: false, message: 'Error interno al intentar actualizar el artículo.' };
  } finally {
    client.release();
  }
}
