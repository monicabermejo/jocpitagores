import { motion } from 'framer-motion';
import type { Language, RoomResult, EscapeRoom } from '../types';
import { UI } from '../constants';

interface Props {
  lang: Language;
  studentName: string;
  totalCorrect: number;
  totalProblems: number;
  roomResults: RoomResult[];
  rooms: EscapeRoom[];
  onReplay: () => void;
}

const stars = (correct: number, total: number): number => {
  const ratio = correct / total;
  if (ratio >= 1)    return 3;
  if (ratio >= 0.7)  return 2;
  if (ratio >= 0.5)  return 1;
  return 0;
};

export default function VictoryScreen({
  lang, studentName, totalCorrect, totalProblems, roomResults, rooms, onReplay
}: Props) {
  const globalStars = stars(totalCorrect, totalProblems);
  const pct = Math.round((totalCorrect / totalProblems) * 100);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10
                    bg-gradient-to-b from-yellow-950 via-stone-900 to-egypt-darker">

      {/* Particles / sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${8 + i * 7.5}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + (i % 3) * 0.6, repeat: Infinity, delay: i * 0.15 }}
          >
            {['✨','⭐','🌟','🔺'][i % 4]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Trophy */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-3"
          >
            🏆
          </motion.div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-glow-gold text-sand-100 mb-2">
            {UI.victoryTitle[lang]}
          </h1>
          {studentName && (
            <p className="text-egypt-gold font-semibold">
              {lang === 'ca' ? `Ben fet, ${studentName}!` : `¡Bien hecho, ${studentName}!`}
            </p>
          )}
        </div>

        {/* Story */}
        <div className="bg-stone-900/70 border border-sand-700/40 rounded-2xl p-5 mb-5 shadow-xl">
          <p className="text-sand-300 text-sm leading-relaxed">
            {UI.victoryStory[lang]}
          </p>
        </div>

        {/* Global score */}
        <div className="bg-stone-900/80 border border-egypt-gold/30 rounded-2xl p-5 mb-4 shadow-xl
                        text-center">
          <p className="text-sand-400 text-xs uppercase tracking-widest mb-2">{UI.victoryScore[lang]}</p>

          {/* Stars */}
          <div className="flex justify-center gap-2 text-4xl mb-3">
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 260 }}
              >
                {i < globalStars ? '⭐' : '☆'}
              </motion.span>
            ))}
          </div>

          <div className="text-3xl font-bold text-egypt-gold font-serif mb-1">
            {totalCorrect} / {totalProblems}
          </div>
          <div className="text-sand-500 text-xs">
            {totalCorrect} {UI.victoryCorrect[lang]} {totalProblems} ({pct}%)
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-800 rounded-full h-2 mt-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-egypt-amber to-egypt-gold"
            />
          </div>
        </div>

        {/* Per-room breakdown */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {rooms.map((room, i) => {
            const result = roomResults[i];
            const s = result ? stars(result.correctCount, result.totalCount) : 0;
            return (
              <div key={room.id}
                   className="bg-stone-900/60 border border-stone-700/40 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{room.emoji}</div>
                <div className="text-xs font-serif text-sand-400 leading-tight mb-1">{room.name[lang]}</div>
                {result ? (
                  <>
                    <div className="text-sm font-bold text-sand-200">
                      {result.correctCount}/{result.totalCount}
                    </div>
                    <div className="flex justify-center gap-0.5 text-xs">
                      {[0,1,2].map(j => (
                        <span key={j}>{j < s ? '⭐' : '☆'}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-stone-600">—</div>
                )}
              </div>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReplay}
          className="w-full py-4 rounded-xl font-bold font-serif text-base text-egypt-dark
                     bg-gradient-to-r from-egypt-amber to-egypt-gold
                     shadow-lg hover:brightness-110 transition-all"
        >
          {UI.victoryReplay[lang]}
        </motion.button>
      </motion.div>
    </div>
  );
}
