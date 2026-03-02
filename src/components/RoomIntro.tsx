import { motion } from 'framer-motion';
import type { Language, EscapeRoom } from '../types';
import { UI } from '../constants';

interface Props {
  lang: Language;
  room: EscapeRoom;
  roomIndex: number;
  onStart: () => void;
}

export default function RoomIntro({ lang, room, roomIndex, onStart }: Props) {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-4
                     bg-gradient-to-b ${room.bgGradient}`}>

      {/* Torches */}
      <div className="fixed top-0 left-0 w-full pointer-events-none">
        <div className="absolute top-24 left-4 text-3xl animate-torch-flicker">🔥</div>
        <div className="absolute top-24 right-4 text-3xl animate-torch-flicker" style={{ animationDelay: '0.8s' }}>🔥</div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-center relative z-10"
      >
        {/* Room number badge */}
        <div className="inline-flex items-center gap-2 bg-stone-800/70 border border-stone-600/50
                        rounded-full px-4 py-1 text-xs text-sand-400 mb-4 tracking-widest uppercase">
          {UI.roomN[lang]} {roomIndex + 1} / 3
        </div>

        {/* Room emoji */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-4"
        >
          {room.emoji}
        </motion.div>

        {/* Room name */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-100 mb-1"
            style={{ textShadow: `0 0 20px ${room.accentColor}66` }}>
          {room.name[lang]}
        </h1>
        <p className="text-sand-500 text-sm tracking-widest uppercase mb-6">
          {room.subtitle[lang]}
        </p>

        {/* Intro text */}
        <div className="bg-stone-900/70 border rounded-2xl p-5 mb-6 text-left
                        shadow-xl bg-stone-pattern"
             style={{ borderColor: `${room.accentColor}30` }}>
          <p className="text-sand-300 text-sm leading-relaxed">
            {room.intro[lang]}
          </p>
        </div>

        {/* Problem count */}
        <p className="text-sand-500 text-xs mb-6">
          {room.problems.length} {lang === 'ca' ? 'problemes encadenats' : 'problemas encadenados'}
          {' · '}
          {lang === 'ca'
            ? 'Cada resposta pot ser la clau de la següent.'
            : 'Cada respuesta puede ser la clave de la siguiente.'}
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full py-4 rounded-xl font-bold font-serif text-base text-egypt-dark
                     shadow-lg hover:brightness-110 transition-all duration-200"
          style={{ background: `linear-gradient(135deg, ${room.accentColor}, #c9a227)` }}
        >
          {lang === 'ca' ? '🔓 Entrar a la sala' : '🔓 Entrar a la sala'}
        </motion.button>
      </motion.div>
    </div>
  );
}
