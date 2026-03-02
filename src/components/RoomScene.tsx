import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Language, EscapeRoom, RoomResult } from '../types';
import { UI } from '../constants';
import ProblemPanel from './ProblemPanel';
import { trackAnswer } from '../utils/trackAnswer';

// ── History panel: shows already-solved problems in the current room ─────────
function HistoryPanel({ room, chainValues, lang, accentColor }: {
  room: EscapeRoom;
  chainValues: number[];
  lang: Language;
  accentColor: string;
}) {
  if (chainValues.length === 0) return null;
  return (
    <div className="w-full mb-3">
      <div className="bg-stone-900/70 border border-stone-700/50 rounded-xl px-4 py-3 text-xs space-y-2">
        <p className="text-stone-400 font-semibold uppercase tracking-wide text-[10px] mb-1">
          {lang === 'ca' ? "📋 Respostes anteriors d'aquesta sala" : "📋 Respuestas anteriores de esta sala"}
        </p>
        {chainValues.map((ans, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="shrink-0 font-bold" style={{ color: accentColor }}>
              P{i + 1}.
            </span>
            <span className="text-stone-400 leading-snug flex-1">
              {room.problems[i].question[lang].replace(/\[CHAIN\]/g,
                i === 0 ? '' : String(chainValues[i - 1]))}
            </span>
            <span className="shrink-0 font-bold text-green-400 ml-1">
              {ans} {room.problems[i].unit ?? ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  lang: Language;
  room: EscapeRoom;
  initialProblemIndex: number;
  initialChainValues: number[];
  studentEmail: string;
  sessionId: string;
  onRoomComplete: (result: RoomResult) => void;
  onProblemAdvance: (chainValues: number[], problemIndex: number) => void;
}

export default function RoomScene({
  lang,
  room,
  initialProblemIndex,
  initialChainValues,
  studentEmail,
  sessionId,
  onRoomComplete,
  onProblemAdvance,
}: Props) {
  const [problemIndex, setProblemIndex] = useState(initialProblemIndex);
  const [chainValues,  setChainValues]  = useState<number[]>(initialChainValues);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount,   setWrongCount]   = useState(0);
  const [roomDone,     setRoomDone]     = useState(false);
  const [showHistory,  setShowHistory]  = useState(false);

  const currentProblem   = room.problems[problemIndex];
  // The chained value for the current problem (last answer from this room)
  const chainedValue     = chainValues.length > 0 ? chainValues[chainValues.length - 1] : null;

  const handleCorrect = useCallback((answer: number) => {
    // Track answer
    trackAnswer({
      email: studentEmail,
      questionId: currentProblem.id,
      questionText: currentProblem.question[lang],
      userAnswer: answer,
      correctAnswer: currentProblem.answer,
      isCorrect: true,
      section: room.id,
      lang,
      sessionId,
    });

    const newChain  = [...chainValues, answer];
    const newCorrect = correctCount + 1;
    setCorrectCount(newCorrect);

    const nextIndex = problemIndex + 1;
    if (nextIndex >= room.problems.length) {
      // Room complete
      setChainValues(newChain);
      setRoomDone(true);
    } else {
      setChainValues(newChain);
      setProblemIndex(nextIndex);
      onProblemAdvance(newChain, nextIndex);
    }
  }, [
    chainValues, correctCount, currentProblem, lang, problemIndex,
    room, sessionId, studentEmail, onProblemAdvance,
  ]);

  const handleWrong = useCallback(() => {
    setWrongCount(c => c + 1);
    trackAnswer({
      email: studentEmail,
      questionId: currentProblem.id,
      questionText: currentProblem.question[lang],
      userAnswer: '?',
      correctAnswer: currentProblem.answer,
      isCorrect: false,
      section: room.id,
      lang,
      sessionId,
    });
  }, [currentProblem, lang, room.id, sessionId, studentEmail]);

  const handleContinue = () => {
    onRoomComplete({
      roomId: room.id,
      correctCount,
      totalCount: room.problems.length,
    });
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center px-4 py-6 pt-20
                     bg-gradient-to-b ${room.bgGradient}`}>

      {/* Ambiance torches */}
      <div className="fixed top-24 left-2 text-2xl animate-torch-flicker pointer-events-none">🔥</div>
      <div className="fixed top-24 right-2 text-2xl animate-torch-flicker pointer-events-none"
           style={{ animationDelay: '0.7s' }}>🔥</div>

      {/* History toggle — shown when at least 1 problem solved and room not done */}
      {problemIndex > 0 && !roomDone && (
        <div className="w-full mb-1">
          <button
            onClick={() => setShowHistory(h => !h)}
            className="text-xs text-stone-400 hover:text-sand-300 transition-colors flex items-center gap-1"
          >
            <span>{showHistory ? '▲' : '▼'}</span>
            {showHistory
              ? (lang === 'ca' ? 'Amaga anteriors' : 'Ocultar anteriores')
              : (lang === 'ca' ? `📋 Revisa anteriors (${chainValues.length})` : `📋 Revisar anteriores (${chainValues.length})`)}
          </button>
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-2"
              >
                <HistoryPanel
                  room={room}
                  chainValues={chainValues}
                  lang={lang}
                  accentColor={room.accentColor}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!roomDone ? (
          <ProblemPanel
            key={currentProblem.id}
            problem={currentProblem}
            problemIndex={problemIndex}
            totalInRoom={room.problems.length}
            lang={lang}
            chainedValue={currentProblem.usesChain ? chainedValue : null}
            accentColor={room.accentColor}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        ) : (
          <motion.div
            key="room-done"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center"
          >
            {/* Celebration */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: 2 }}
              className="text-7xl mb-4"
            >
              {room.emoji}
            </motion.div>

            <div className="bg-stone-900/80 border rounded-2xl p-6 mb-5 shadow-2xl"
                 style={{ borderColor: `${room.accentColor}40` }}>
              <h2 className="font-serif text-2xl font-bold text-sand-100 mb-3">
                {UI.roomSuccess[lang]}
              </h2>
              <p className="text-sand-400 text-sm leading-relaxed mb-4">
                {room.success[lang]}
              </p>

              {/* Score */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{correctCount}</div>
                  <div className="text-stone-500 text-xs">{lang === 'ca' ? 'correctes' : 'correctas'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{wrongCount}</div>
                  <div className="text-stone-500 text-xs">{lang === 'ca' ? 'errors' : 'errores'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sand-300">{room.problems.length}</div>
                  <div className="text-stone-500 text-xs">{lang === 'ca' ? 'problemes' : 'problemas'}</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="w-full py-4 rounded-xl font-bold font-serif text-base text-egypt-dark
                         shadow-lg hover:brightness-110 transition-all"
              style={{ background: `linear-gradient(135deg, ${room.accentColor}, #c9a227)` }}
            >
              {UI.roomContinue[lang]}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
