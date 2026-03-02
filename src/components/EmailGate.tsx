import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { UI } from '../constants';
import { validateEmail } from '../utils/trackAnswer';
import LangToggle from './LangToggle';

interface Props {
  lang: Language;
  onSuccess: (email: string, name: string) => void;
  onLangToggle: (lang: Language) => void;
}

export default function EmailGate({ lang, onSuccess, onLangToggle }: Props) {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    const result = await validateEmail(trimmed);
    if (result.valid) {
      onSuccess(trimmed, result.name || trimmed.split('@')[0]);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4
                    bg-gradient-to-b from-egypt-darker via-stone-900 to-egypt-darker">
      {/* Decorative torches */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-4  text-4xl animate-torch-flicker">🔥</div>
        <div className="absolute top-0 right-4 text-4xl animate-torch-flicker" style={{ animationDelay: '0.7s' }}>🔥</div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <LangToggle lang={lang} onToggle={onLangToggle} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        {/* Title card */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl mb-4"
          >
            🔺
          </motion.div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-glow-gold text-sand-200 mb-1">
            {UI.appTitle[lang]}
          </h1>
          <p className="text-sand-500 text-sm tracking-widest uppercase font-body">
            {UI.appSubtitle[lang]}
          </p>
        </div>

        {/* Email card */}
        <div className="bg-stone-900/80 border border-sand-700/40 rounded-2xl p-6 sm:p-8
                        shadow-2xl backdrop-blur bg-stone-pattern">
          <h2 className="font-serif text-xl font-semibold text-sand-300 mb-1">
            {UI.emailGateTitle[lang]}
          </h2>
          <p className="text-sand-500 text-sm mb-5">
            {UI.emailGateDesc[lang]}
          </p>

          <input
            ref={inputRef}
            type="email"
            value={email}
            autoFocus
            onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
            onKeyDown={handleKey}
            placeholder={UI.emailPlaceholder[lang]}
            className="w-full bg-stone-800 border border-stone-600 rounded-xl px-4 py-3
                       text-sand-100 placeholder-stone-500 text-sm
                       focus:outline-none focus:border-egypt-gold focus:ring-1 focus:ring-egypt-gold/40
                       transition-colors mb-4"
          />

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-400 text-xs mb-3"
            >
              {email.trim() && !email.includes('@')
                ? UI.emailInvalid[lang]
                : UI.emailError[lang]}
            </motion.p>
          )}

          <button
            onClick={submit}
            disabled={status === 'loading' || !email.trim()}
            className="w-full bg-gradient-to-r from-egypt-amber to-egypt-gold
                       text-egypt-dark font-semibold py-3 rounded-xl text-sm
                       hover:brightness-110 active:brightness-90
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 shadow-lg"
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin text-base">⏳</span>
                {UI.emailLoading[lang]}
              </span>
            ) : (
              UI.emailEnter[lang]
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
