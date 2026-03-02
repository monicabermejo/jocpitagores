import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Language, EscapeProblem } from '../types';
import { UI } from '../constants';
import InteractiveTriangle from './InteractiveTriangle';

interface Props {
  problem: EscapeProblem;
  problemIndex: number;    // 0-based within the room
  totalInRoom: number;
  lang: Language;
  chainedValue: number | null;
  accentColor: string;
  onCorrect: (answer: number) => void;
  onWrong: () => void;
}

export default function ProblemPanel({
  problem,
  problemIndex,
  totalInRoom,
  lang,
  chainedValue,
  accentColor,
  onCorrect,
  onWrong,
}: Props) {
  const [answerValue, setAnswerValue] = useState('');
  const [feedback, setFeedback]       = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint]       = useState(false);
  const [attempts, setAttempts]       = useState(0);
  const [resetKey, setResetKey]       = useState(0);
  const answerRef = useRef('');

  useEffect(() => {
    answerRef.current = '';
    setAnswerValue('');
    setFeedback('idle');
    setShowHint(false);
    setAttempts(0);
    setResetKey(k => k + 1);
  }, [problem.id]);

  const handleAnswerChange = useCallback((val: string) => {
    answerRef.current = val;
    setAnswerValue(val);
    if (feedback === 'wrong') setFeedback('idle');
  }, [feedback]);

  const resolveNarrative = (text: string) => {
    if (chainedValue == null) return text;
    return text.replace(/\[CHAIN\]/g, String(chainedValue));
  };

  const check = () => {
    const val = parseFloat(answerRef.current.trim().replace(',', '.'));
    if (isNaN(val)) return;
    const isOk = Math.abs(val - problem.answer) < 0.1;
    if (isOk) {
      setFeedback('correct');
      setTimeout(() => onCorrect(problem.answer), 1200);
    } else {
      setFeedback('wrong');
      setAttempts(a => a + 1);
      onWrong();
      setTimeout(() => {
        setFeedback('idle');
        setResetKey(k => k + 1);
        answerRef.current = '';
        setAnswerValue('');
      }, 1400);
    }
  };

  return (
    <motion.div
      key={problem.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="w-full"
      onKeyDown={(e) => { if (e.key === 'Enter' && feedback === 'idle') check(); }}
    >
      {/* Problem counter dots */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {Array.from({ length: totalInRoom }).map((_, i) => (
            <span key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < problemIndex   ? 'bg-green-500' :
                    i === problemIndex ? 'bg-egypt-gold' :
                                        'bg-stone-700'
                  }`}/>
          ))}
        </div>
        <span className="text-sand-500 text-xs">
          {UI.problemOf[lang]} {problemIndex + 1}/{totalInRoom}
        </span>
      </div>

      {/* Main card */}
      <div className="bg-stone-900/80 border border-sand-800/40 rounded-2xl overflow-hidden shadow-2xl
                      bg-stone-pattern">

        {/* Chain alert banner */}
        <AnimatePresence>
          {problem.usesChain && chainedValue != null && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="flex items-center gap-2 px-4 py-2 border-b"
              style={{ backgroundColor: `${accentColor}22`, borderColor: `${accentColor}44` }}
            >
              <span className="text-xs font-medium" style={{ color: accentColor }}>
                {UI.chainLabel[lang]}
              </span>
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="font-bold text-sm px-2 py-0.5 rounded"
                style={{
                  color: '#1c1208',
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}88`,
                }}
              >
                {chainedValue}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Narrative */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-sand-400 text-sm leading-relaxed italic">
            {resolveNarrative(problem.narrative[lang])}
          </p>
        </div>

        {/* Question */}
        <div className="px-5 pb-3">
          <p className="text-sand-200 text-sm font-semibold">
            {resolveNarrative(problem.question[lang])}
          </p>
        </div>

        {/* Interactive Triangle — 3-col layout: fields | image | answer+actions */}
        <div className="px-5 pb-4">
          <InteractiveTriangle
            problem={problem}
            lang={lang}
            chainedValue={chainedValue}
            onAnswerChange={handleAnswerChange}
            resetKey={resetKey}
            locked={feedback === 'correct'}
          >
            {/* Feedback */}
            <AnimatePresence mode="wait">
              {feedback === 'correct' && (
                <motion.div
                  key="correct"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-900/40 border border-green-600/40 rounded-lg px-3 py-2
                             text-green-300 text-sm flex items-center gap-2"
                >
                  <span>✅</span> {UI.correctMsg[lang]}
                </motion.div>
              )}
              {feedback === 'wrong' && (
                <motion.div
                  key="wrong"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-900/40 border border-red-700/40 rounded-lg px-3 py-2
                             text-red-300 text-sm flex items-center gap-2"
                >
                  <span>❌</span> {UI.wrongMsg[lang]}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            {feedback !== 'correct' && (
              <div className="flex gap-2">
                <button
                  onClick={check}
                  disabled={!answerValue.trim() || feedback !== 'idle'}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-egypt-dark
                             shadow-md hover:brightness-110 active:brightness-90
                             disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, #c9a227)` }}
                >
                  {UI.checkBtn[lang]}
                </button>
                <button
                  onClick={() => setShowHint(h => !h)}
                  className="px-3 py-2 rounded-xl text-sm border border-stone-600 text-sand-400
                             hover:bg-stone-800 hover:text-sand-200 transition-colors"
                >
                  {showHint ? UI.hideHintBtn[lang] : UI.hintBtn[lang]}
                </button>
              </div>
            )}

            {/* Attempt counter */}
            {attempts > 0 && feedback !== 'correct' && (
              <p className="text-stone-600 text-[11px] text-center">
                {lang === 'ca'
                  ? `${attempts} intent${attempts !== 1 ? 's' : ''}`
                  : `${attempts} intento${attempts !== 1 ? 's' : ''}`}
              </p>
            )}
          </InteractiveTriangle>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mx-5 mb-4 bg-egypt-dark/60 border border-egypt-gold/20 rounded-xl
                              px-4 py-3 text-sand-400 text-xs leading-relaxed">
                <span className="text-egypt-gold font-semibold">💡 </span>
                {resolveNarrative(problem.hint[lang])}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
