'use server';

import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
}

export async function getArticlesAction(): Promise<AdminArticle[]> {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM articles ORDER BY published_at DESC');
    return rows.map(row => ({
      ...row,
      published_at: row.published_at ? new Date(row.published_at).toISOString() : new Date().toISOString(),
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
  const client = await pool.connect();
  try {
    // Check if the keyword / slug would collide (except for this article)
    const { rows: keywordCheck } = await client.query(
      'SELECT id FROM articles WHERE keyword = $1 AND id != $2',
      [data.keyword, id]
    );
    if (keywordCheck.length > 0) {
      return { success: false, message: 'La palabra clave principal ya está siendo utilizada por otro artículo.' };
    }

    const { rows: slugCheck } = await client.query(
      'SELECT id FROM articles WHERE keyword = $1 AND id != $2',
      [`key-${data.category}-${id}`, id] // slug checks or keyword constraints
    );

    // Update query
    // In our schema, keyword is unique, and slug was constructed programmatically or stored.
    // If the user can update the content, we allow updating the content too.
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
          content = $8
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
          keyword = $7
        WHERE id = $8
        `,
        [
          data.title,
          data.meta_title,
          data.excerpt,
          data.category,
          data.date,
          new Date(data.published_at),
          data.keyword,
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
