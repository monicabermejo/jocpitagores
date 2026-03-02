import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Language, EscapeProblem } from '../types';

// Image for each problem (files live in public/imatges/)
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const PROBLEM_IMAGE: Record<string, string> = {
  r1p1:  `${base}/imatges/problema-1.png`,
  r1p2:  `${base}/imatges/problema-2.png`,
  r1p3:  `${base}/imatges/problema-3.png`,
  r2p1:  `${base}/imatges/problema-4.png`,
  r2p2:  `${base}/imatges/problema-5.png`,
  r2p3:  `${base}/imatges/problema-6.png`,
  r3p1:  `${base}/imatges/problema-7.png`,
  r3p2:  `${base}/imatges/problema-8.png`,
  r3p3:  `${base}/imatges/problema-9.png`,
  r3p4:  `${base}/imatges/problema-10.png`,
};

interface Props {
  problem: EscapeProblem;
  lang: Language;
  chainedValue: number | null;
  /** Fires whenever the value in the final answer box changes */
  onAnswerChange: (val: string) => void;
  /** External signal to clear fields (e.g. on wrong answer) */
  resetKey: number;
  /** Whether the answer has been accepted (locks fields) */
  locked: boolean;
  /** Extra content rendered below the answer box (e.g. check button) */
  children?: ReactNode;
}

type SideType = 'known' | 'chain' | 'unknown';

interface SideConfig {
  type: SideType;
  knownValue: number | null;
}

function getSideConfig(
  v: number | null | 'chain',
  chainedValue: number | null,
): SideConfig {
  if (v === 'chain') return { type: 'chain', knownValue: chainedValue };
  if (v === null)    return { type: 'unknown', knownValue: null };
  return { type: 'known', knownValue: v };
}

// ─────────────────────────────────────────────────────────────
export default function InteractiveTriangle({
  problem,
  lang,
  chainedValue,
  onAnswerChange,
  resetKey,
  locked,
  children,
}: Props) {
  const { triangle } = problem;

  const leg1Config = getSideConfig(triangle.leg1, chainedValue);
  const leg2Config = getSideConfig(triangle.leg2, chainedValue);
  const hypConfig  = getSideConfig(triangle.hyp,  chainedValue);

  // One controlled input per side
  const [leg1Input, setLeg1Input] = useState('');
  const [leg2Input, setLeg2Input] = useState('');
  const [hypInput,  setHypInput]  = useState('');
  const [answerInput, setAnswerInput] = useState('');

  const answerRef = useRef<HTMLInputElement>(null);

  // Reset fields when problem changes or resetKey changes
  useEffect(() => {
    setLeg1Input('');
    setLeg2Input('');
    setHypInput('');
    setAnswerInput('');
    onAnswerChange('');
    setTimeout(() => answerRef.current?.focus(), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, problem.id]);

  const handleChange = (side: 'leg1' | 'leg2' | 'hyp', val: string) => {
    if (side === 'leg1') setLeg1Input(val);
    if (side === 'leg2') setLeg2Input(val);
    if (side === 'hyp')  setHypInput(val);
    // Triangle fields are for annotation only — answer comes from the dedicated box
  };

  const handleAnswerInput = (val: string) => {
    setAnswerInput(val);
    onAnswerChange(val);
  };

  const imageUrl = PROBLEM_IMAGE[problem.id];

  return (
    <div className="w-full grid gap-4 items-center"
         style={{ gridTemplateColumns: 'minmax(90px,1fr) auto minmax(160px,1.5fr)' }}>

      {/* ── LEFT: annotation fields ── */}
      <div className="flex flex-col gap-3 justify-center">
        <SideField label="h"  type={hypConfig.type}  value={hypInput}  onChange={v => handleChange('hyp',  v)} locked={locked} />
        <SideField label="c₁" type={leg1Config.type} value={leg1Input} onChange={v => handleChange('leg1', v)} locked={locked} />
        <SideField label="c₂" type={leg2Config.type} value={leg2Input} onChange={v => handleChange('leg2', v)} locked={locked} />
      </div>

      {/* ── CENTER: problem image ── */}
      <div className="flex justify-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Triangle problema ${problem.id}`}
            className="max-w-full rounded-xl"
            style={{ maxHeight: 420 }}
          />
        )}
      </div>

      {/* ── RIGHT: answer box + actions slot ── */}
      <div className="flex flex-col gap-3 justify-center self-stretch">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-sand-400">
            {lang === 'ca' ? 'Resposta:' : 'Respuesta:'}
          </span>
          <div className="flex items-center gap-1.5">
            <input
              ref={answerRef}
              type="text"
              inputMode="decimal"
              value={answerInput}
              disabled={locked}
              onChange={e => handleAnswerInput(e.target.value)}
              placeholder="···"
              className="flex-1 rounded-lg px-3 py-1.5 text-sm text-center
                         bg-stone-800 placeholder-stone-600 text-sand-100
                         focus:outline-none transition-colors disabled:opacity-60"
              style={{ border: '1.5px solid #e67c1b' }}
            />
            {problem.unit ? (
              <span className="text-xs text-stone-400 shrink-0">{problem.unit}</span>
            ) : null}
          </div>
        </div>
        {children}
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

interface SideFieldProps {
  label: string;
  type: SideType;
  value: string;
  onChange: (v: string) => void;
  locked: boolean;
}

function SideField({ label, type, value, onChange, locked }: SideFieldProps) {
  const color = type === 'unknown' ? '#e67c1b' : type === 'chain' ? '#c9a227' : '#d4c4a0';

  const borderColor =
    type === 'unknown' ? '#e67c1b' :
    type === 'chain'   ? '#c9a227' :
                         '#4a3e2e';

  return (
    <div className="flex flex-col gap-1">
      {/* Label only */}
      <span className="font-bold text-xs" style={{ color }}>{label}</span>

      {/* Input — accepts any text, including "?" */}
      <input
        type="text"
        inputMode="decimal"
        value={value}
        disabled={locked}
        onChange={e => onChange(e.target.value)}
        placeholder="···"
        className="w-full rounded-lg px-2 py-1.5 text-sm text-center
                   bg-stone-800 placeholder-stone-600 text-sand-100
                   focus:outline-none transition-colors disabled:opacity-60"
        style={{ border: `1.5px solid ${borderColor}` }}
      />
    </div>
  );
}
