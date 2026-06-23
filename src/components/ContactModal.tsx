'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl transition-all duration-300 md:p-8">
        
        {/* Futuristic glowing grid background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase">
              // CANAL DE COMUNICACIÓN
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
              Enviar Mensaje
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all border border-transparent hover:border-zinc-800"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {status === 'success' ? (
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-500 border border-emerald-500/20 animate-pulse">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-bold text-white">Transmisión Exitosa</h4>
              <p className="text-zinc-400 text-sm max-w-sm">
                Tu mensaje ha sido encriptado y enviado a la red del portal. Nos comunicaremos contigo a la brevedad.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  onClose();
                }}
                className="mt-4 px-6 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs border border-zinc-800 hover:border-zinc-700 transition-all uppercase tracking-wider"
              >
                Cerrar Terminal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === 'error' && (
                <div className="flex items-center space-x-3 rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-red-400 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Por favor, rellena todos los campos obligatorios del formulario.</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                  placeholder="ej. Alexis Sánchez"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                  placeholder="ej. alexis@noticiasmundial.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase mb-2">
                  Mensaje / Consulta
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-lg shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Estableciendo Conexión...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-emerald-100" />
                      <span>Transmitir Mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
