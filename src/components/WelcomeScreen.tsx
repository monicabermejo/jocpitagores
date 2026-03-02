import { motion } from 'framer-motion';
import type { Language } from '../types';
import { UI, ROOMS } from '../constants';

interface Props {
  lang: Language;
  studentName: string;
  totalProblems: number;
  onStart: () => void;
}

export default function WelcomeScreen({ lang, studentName, totalProblems, onStart }: Props) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10
                    bg-gradient-to-b from-egypt-darker via-stone-900 to-egypt-darker">

      {/* Torches */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-24 left-4 text-3xl animate-torch-flicker">🔥</div>
        <div className="absolute top-24 right-4 text-3xl animate-torch-flicker" style={{ animationDelay: '0.9s' }}>🔥</div>
        <div className="absolute bottom-0 left-4 text-3xl animate-torch-flicker" style={{ animationDelay: '0.4s' }}>🔥</div>
        <div className="absolute bottom-0 right-4 text-3xl animate-torch-flicker" style={{ animationDelay: '1.2s' }}>🔥</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Warning banner */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-3"
          >
            ⚠️
          </motion.div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-200 text-glow-gold mb-1">
            {UI.welcomeTitle[lang]}
          </h1>
          {studentName && (
            <p className="text-egypt-gold font-medium text-sm">
              {lang === 'ca' ? `Hola, ${studentName}!` : `¡Hola, ${studentName}!`}
            </p>
          )}
        </div>

        {/* Story card */}
        <div className="bg-stone-900/80 border border-sand-700/40 rounded-2xl p-6 mb-6
                        shadow-2xl bg-stone-pattern">
          <p className="text-sand-300 text-sm leading-relaxed whitespace-pre-line">
            {UI.welcomeStory[lang]}
          </p>
        </div>

        {/* Rooms overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {ROOMS.map((room) => (
            <div key={room.id}
                 className="bg-stone-800/60 border border-stone-700/50 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{room.emoji}</div>
              <div className="text-xs font-serif text-sand-400 leading-tight">{room.name[lang]}</div>
              <div className="text-[10px] text-stone-500 mt-1">
                {room.problems.length} {lang === 'ca' ? 'problemes' : 'problemas'}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-6 text-sm text-sand-500">
          <span>🧩 {totalProblems} {UI.totalProblems[lang]}</span>
          <span>🔗 {lang === 'ca' ? 'Resposta encadenada' : 'Respuesta encadenada'}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full bg-gradient-to-r from-egypt-amber to-egypt-gold
                     text-egypt-dark font-bold py-4 rounded-xl text-base
                     shadow-lg hover:brightness-110 transition-all duration-200
                     font-serif tracking-wide"
        >
          {UI.welcomeStart[lang]}
        </motion.button>
      </motion.div>
    </div>
  );
}
