'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getArticlesAction, updateArticleAction, AdminArticle } from './actions';
import { 
  Lock, KeyRound, Terminal, Search, Filter, Copy, Edit, Eye, 
  CheckCircle, AlertCircle, Loader2, ArrowLeft, RefreshCw, FileText 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Articles state
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedTab, setSelectedTab] = useState<'todos' | 'publicados' | 'programados' | 'vacios'>('todos');
  
  // Modal Edit state
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editMetaTitle, setEditMetaTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editKeyword, setEditKeyword] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editContent, setEditContent] = useState('');
  
  const [isPending, startTransition] = useTransition();

  // Check sessionStorage on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchArticles();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const data = await getArticlesAction();
      setArticles(data);
    } catch (err: any) {
      setActionError(err.message || 'Error al obtener artículos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Manuel1214$') {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      fetchArticles();
    } else {
      setLoginError('Código de acceso no autorizado. Intente de nuevo.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Helper: Count words in content body
  const getWordCount = (content: string) => {
    if (!content) return 0;
    const clean = content.replace(/<[^>]*>/g, ' '); // Strip HTML tags
    const words = clean.trim().split(/\s+/).filter(Boolean);
    return words.length;
  };

  // Helper: Check status of article
  const getStatus = (publishedAtStr: string) => {
    const pubDate = new Date(publishedAtStr);
    const now = new Date();
    return pubDate <= now ? 'publicado' : 'programado';
  };

  // Filter logic
  const filteredArticles = articles.filter((art) => {
    // 1. Text Search (title, keyword, excerpt)
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    // 2. Category Filter
    const matchesCategory = selectedCategory === 'todas' || art.category === selectedCategory;
    
    // 3. Tab Filter
    const wordCount = getWordCount(art.content);
    const status = getStatus(art.published_at);
    
    if (selectedTab === 'publicados') {
      return matchesSearch && matchesCategory && status === 'publicado';
    }
    if (selectedTab === 'programados') {
      return matchesSearch && matchesCategory && status === 'programado';
    }
    if (selectedTab === 'vacios') {
      return matchesSearch && matchesCategory && wordCount === 0;
    }
    return matchesSearch && matchesCategory;
  });

  // Action: Copy for AI
  const handleCopyForAI = (art: AdminArticle) => {
    const textToCopy = `Título: ${art.title}\nKeywords a atacar: ${art.keyword}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setSuccessMsg(`Información del artículo ${art.id} copiada al portapapeles.`);
        setTimeout(() => setSuccessMsg(''), 3000);
      })
      .catch(() => {
        setActionError('Error al intentar copiar al portapapeles.');
        setTimeout(() => setActionError(''), 3000);
      });
  };

  // Action: Open Edit Modal
  const openEditModal = (art: AdminArticle) => {
    setEditingArticle(art);
    setEditTitle(art.title);
    setEditMetaTitle(art.meta_title);
    setEditExcerpt(art.excerpt);
    setEditCategory(art.category);
    setEditKeyword(art.keyword);
    setEditSlug(art.slug || '');
    setEditContent(art.content || '');
    
    const d = new Date(art.published_at);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setEditDate(`${yyyy}-${mm}-${dd}`);
    
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    setEditTime(`${hh}:${min}`);
  };

  // Action: Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const publishedAtIso = new Date(`${editDate}T${editTime}:00`).toISOString();
    
    startTransition(async () => {
      const res = await updateArticleAction(editingArticle.id, {
        title: editTitle,
        meta_title: editMetaTitle,
        excerpt: editExcerpt,
        category: editCategory,
        date: editDate, // raw date label
        published_at: publishedAtIso,
        keyword: editKeyword,
        slug: editSlug || editTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        content: editContent,
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setEditingArticle(null);
        fetchArticles(); // refresh list
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setActionError(res.message);
        setTimeout(() => setActionError(''), 4000);
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 bg-zinc-950">
        <div className="relative w-full max-w-md rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-6 overflow-hidden">
          
          {/* Cyber decoration */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/30" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/30" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-2">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Acceso Restringido</h2>
            <span className="text-[9px] font-mono text-zinc-650 uppercase tracking-widest block">// PORTAL ADMINISTRATIVO</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="flex items-center space-x-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-400 text-xs font-mono">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                Código de Credenciales
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/40 border border-zinc-850 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-mono"
                  placeholder="••••••••"
                />
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              Autenticar Terminal
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors uppercase">
              <ArrowLeft className="h-3 w-3" />
              <span>Volver a la Red Pública</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Toast Messages */}
      {successMsg && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-lg border border-emerald-500/25 bg-emerald-950/90 backdrop-blur-md px-4 py-3 text-emerald-400 text-xs font-mono shadow-2xl animate-fade-in-up">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}
      {actionError && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-lg border border-red-500/25 bg-red-950/90 backdrop-blur-md px-4 py-3 text-red-400 text-xs font-mono shadow-2xl">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-emerald-500" />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Panel de Control Editorial</h1>
          </div>
          <span className="text-[9px] font-mono text-zinc-550 block tracking-widest uppercase">// 50 ARTÍCULOS DETECTADOS EN SISTEMA</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchArticles}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-700 transition-all"
            title="Refrescar datos"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-mono text-red-400 bg-red-950/20 border border-red-950/30 rounded-lg hover:bg-red-900/20 transition-all uppercase font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Search Bar */}
        <div className="relative md:col-span-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950/40 border border-zinc-900 rounded-xl pl-10 pr-4 py-3 text-white text-xs placeholder-zinc-650 focus:outline-none focus:border-emerald-500/50 transition-all"
            placeholder="Buscar por Título, Keyword o Excerpt..."
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-650" />
        </div>

        {/* Category selector */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-zinc-950/40 border border-zinc-900 rounded-xl px-4 py-3 text-zinc-400 text-xs focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="todas">Todas las Categorías</option>
            <option value="selecciones">Noticias de Selecciones</option>
            <option value="lesiones">Lesiones y Convocatorias</option>
            <option value="resultados">Resultados en Vivo</option>
            <option value="estadisticas">Estadísticas de Jugadores</option>
          </select>
          <Filter className="absolute right-3.5 top-3.5 h-4 w-4 text-zinc-650 pointer-events-none" />
        </div>

      </div>

      {/* Tabs list (Todos, Publicados, Programados, Vacios) */}
      <div className="flex border-b border-zinc-900/60 p-1 bg-zinc-950/20 rounded-xl gap-2 overflow-x-auto">
        <button
          onClick={() => setSelectedTab('todos')}
          className={`px-4 py-2.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all tracking-wider shrink-0 border ${
            selectedTab === 'todos'
              ? 'bg-zinc-900 border-zinc-800 text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Todos ({articles.length})
        </button>
        <button
          onClick={() => setSelectedTab('publicados')}
          className={`px-4 py-2.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all tracking-wider shrink-0 border ${
            selectedTab === 'publicados'
              ? 'bg-zinc-900 border-zinc-800 text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Publicados ({articles.filter(a => getStatus(a.published_at) === 'publicado').length})
        </button>
        <button
          onClick={() => setSelectedTab('programados')}
          className={`px-4 py-2.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all tracking-wider shrink-0 border ${
            selectedTab === 'programados'
              ? 'bg-zinc-900 border-zinc-800 text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Programados ({articles.filter(a => getStatus(a.published_at) === 'programado').length})
        </button>
        <button
          onClick={() => setSelectedTab('vacios')}
          className={`px-4 py-2.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all tracking-wider shrink-0 border ${
            selectedTab === 'vacios'
              ? 'bg-zinc-900 border-emerald-950/50 text-emerald-400 shadow-inner shadow-emerald-500/5'
              : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-emerald-950/10'
          }`}
        >
          Artículos Vacíos ({articles.filter(a => getWordCount(a.content) === 0).length})
        </button>
      </div>

      {/* Articles Table Grid */}
      <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950/30 backdrop-blur-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// SINCRONIZANDO ARTÍCULOS</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <FileText className="h-8 w-8 text-zinc-700" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">No se encontraron registros de artículos</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/60 font-mono text-[9px] text-zinc-550 uppercase tracking-wider">
                  <th className="p-4 w-12 text-center">ID</th>
                  <th className="p-4">Artículo</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Fecha / Hora</th>
                  <th className="p-4 text-center">Palabras</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60">
                {filteredArticles.map((art) => {
                  const wordCount = getWordCount(art.content);
                  const isPublished = getStatus(art.published_at) === 'publicado';
                  
                  return (
                    <tr 
                      key={art.id} 
                      className="hover:bg-zinc-900/10 transition-colors"
                    >
                      {/* ID */}
                      <td className="p-4 text-center font-mono text-zinc-500 font-bold">{art.id}</td>
                      
                      {/* Title & Keyword */}
                      <td className="p-4 max-w-xs md:max-w-sm">
                        <div className="font-bold text-white leading-tight truncate">{art.title}</div>
                        <div className="font-mono text-[9px] text-zinc-550 mt-1 block truncate">
                          KEYWORD: <span className="text-zinc-400">{art.keyword}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full border text-[8px] font-mono font-bold uppercase ${
                          art.category === 'selecciones' ? 'text-blue-400 border-blue-950 bg-blue-950/20' :
                          art.category === 'lesiones' ? 'text-red-400 border-red-950 bg-red-950/20' :
                          art.category === 'resultados' ? 'text-amber-400 border-amber-950 bg-amber-950/20' :
                          'text-emerald-400 border-emerald-950 bg-emerald-950/20'
                        }`}>
                          {art.category}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="p-4 font-mono text-[10px] text-zinc-400">
                        <div>{art.date}</div>
                        <div className="text-[8px] text-zinc-600 mt-0.5">
                          {new Date(art.published_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} HS
                        </div>
                      </td>

                      {/* Word Count */}
                      <td className={`p-4 text-center font-mono font-bold text-sm ${wordCount === 0 ? 'text-red-400/80' : 'text-emerald-400'}`}>
                        {wordCount}
                      </td>

                      {/* Status */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[8px] font-mono font-bold uppercase ${
                          isPublished
                            ? 'text-emerald-400 border-emerald-950 bg-emerald-950/10'
                            : 'text-zinc-500 border-zinc-900 bg-zinc-900/10'
                        }`}>
                          {isPublished ? 'PUBLICADO' : 'PROGRAMADO'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Copiar para IA */}
                          <button
                            onClick={() => handleCopyForAI(art)}
                            className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 rounded border border-transparent hover:border-zinc-850 transition-all cursor-pointer"
                            title="Copiar para IA"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          
                          {/* Editar */}
                          <button
                            onClick={() => openEditModal(art)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded border border-transparent hover:border-zinc-850 transition-all cursor-pointer"
                            title="Editar Artículo"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          
                          {/* Ver */}
                          <Link
                            href={`/articulo/${art.id}`}
                            target="_blank"
                            className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-zinc-900 rounded border border-transparent hover:border-zinc-850 transition-all"
                            title="Ver en Portal"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal (Glassmorphic) */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setEditingArticle(null)} />
          
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-2xl transition-all max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
              <div>
                <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase">// EDITOR DE REGISTRO</span>
                <h3 className="text-base font-bold text-white mt-1 uppercase">Editar Artículo #{editingArticle.id}</h3>
              </div>
              <button 
                onClick={() => setEditingArticle(null)}
                className="text-zinc-550 hover:text-white rounded-lg p-1.5 hover:bg-zinc-900 border border-transparent hover:border-zinc-850"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Título del Artículo</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550"
                  />
                </div>

                {/* SEO Meta Title */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">SEO Meta Title</label>
                  <input
                    type="text"
                    required
                    value={editMetaTitle}
                    onChange={(e) => setEditMetaTitle(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550"
                  />
                </div>

                {/* Keyword */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Keyword Principal (Única)</label>
                  <input
                    type="text"
                    required
                    value={editKeyword}
                    onChange={(e) => setEditKeyword(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550 font-mono"
                  />
                </div>

                {/* URL Slug */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">URL Slug (Único)</label>
                  <input
                    type="text"
                    required
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550 font-mono"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Categoría</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-zinc-400 text-xs focus:outline-none focus:border-emerald-550"
                  >
                    <option value="selecciones">Noticias de Selecciones</option>
                    <option value="lesiones">Lesiones y Convocatorias</option>
                    <option value="resultados">Resultados en Vivo</option>
                    <option value="estadisticas">Estadísticas de Jugadores</option>
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Fecha de Publicación</label>
                  <input
                    type="date"
                    required
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550 font-mono"
                  />
                </div>

                {/* Time */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Hora de Publicación</label>
                  <input
                    type="time"
                    required
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550 font-mono"
                  />
                </div>

              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Extracto Breve (Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  value={editExcerpt}
                  onChange={(e) => setEditExcerpt(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-550 resize-none"
                />
              </div>

              {/* Content Body */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Cuerpo del Artículo (Contenido HTML/Texto)</label>
                  <span className="text-[8px] font-mono text-zinc-650">Palabras actuales: {getWordCount(editContent)}</span>
                </div>
                <textarea
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-emerald-550 font-mono custom-scrollbar"
                  placeholder="Aquí puedes redactar o pegar el texto de 2000 a 2500 palabras optimizado para tu SEO..."
                />
              </div>

              <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 text-xs font-mono text-zinc-500 hover:text-white transition-all uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
                  <span>Guardar Cambios</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
