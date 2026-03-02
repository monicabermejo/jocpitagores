import type { Language } from '../types';
import type { EscapeProblem } from '../types';

interface Props {
  problem: EscapeProblem;
  lang: Language;
  chainedValue: number | null; // the resolved chain value (previous answer)
}

/**
 * Draws a right-angle triangle with labeled sides.
 * - Known sides: shown in sand color
 * - Chain side: shown in gold with glow
 * - Unknown side: shown as "?" in accent color
 */
export default function TriangleDiagram({ problem, lang, chainedValue }: Props) {
  const { triangle } = problem;

  // Resolve actual display values
  const resolve = (v: number | null | 'chain'): number | null =>
    v === 'chain' ? chainedValue : v;

  const leg1Val = resolve(triangle.leg1);
  const leg2Val = resolve(triangle.leg2);
  const hypVal  = resolve(triangle.hyp);

  const isChain = (v: number | null | 'chain') => v === 'chain';

  // SVG dimensions
  const W = 260, H = 200;
  const margin = 30;
  // right-angle at bottom-left
  const A = { x: margin,       y: H - margin };  // bottom-left (right angle)
  const B = { x: W - margin,   y: H - margin };  // bottom-right
  const C = { x: margin,       y: margin };      // top-left

  // label positions (midpoint of each side + offset)
  const midAB = { x: (A.x + B.x) / 2, y: A.y + 18 };     // leg2 (horizontal, bottom)
  const midAC = { x: A.x - 22,         y: (A.y + C.y) / 2 }; // leg1 (vertical, left)
  const midBC = { x: (B.x + C.x) / 2 + 14, y: (B.y + C.y) / 2 }; // hypotenuse

  const unknown     = '#e67c1b';
  const known       = '#d4c4a0';
  const chainColor  = '#c9a227';
  const chainGlow   = '#ffd700';
  const rightAngle  = '#888';

  const sideColor = (v: number | null | 'chain', resolved: number | null): string => {
    if (resolved === null) return unknown;
    if (isChain(v)) return chainColor;
    return known;
  };

  const sideText = (_v: number | null | 'chain', resolved: number | null): string => {
    if (resolved === null) return '?';
    return `${resolved}`;
  };

  const leg1Color  = sideColor(triangle.leg1, leg1Val);
  const leg2Color  = sideColor(triangle.leg2, leg2Val);
  const hypColor   = sideColor(triangle.hyp,  hypVal);

  const fontWeight = (v: number | null | 'chain') => isChain(v) ? 'bold' : 'normal';

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full"
        aria-label="Triangle diagram"
      >
        <defs>
          <filter id="chain-glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Right-angle marker */}
        <polyline
          points={`${A.x + 16},${A.y}  ${A.x + 16},${A.y - 16}  ${A.x},${A.y - 16}`}
          fill="none"
          stroke={rightAngle}
          strokeWidth="1.5"
        />

        {/* Triangle sides */}
        {/* leg1 (vertical) A → C */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y}
              stroke={leg1Color} strokeWidth={leg1Val === null ? 2.5 : (isChain(triangle.leg1) ? 2.5 : 2)}
              strokeDasharray={leg1Val === null ? '6 4' : 'none'}
              filter={isChain(triangle.leg1) ? 'url(#chain-glow)' : undefined} />
        {/* leg2 (horizontal) A → B */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke={leg2Color} strokeWidth={leg2Val === null ? 2.5 : (isChain(triangle.leg2) ? 2.5 : 2)}
              strokeDasharray={leg2Val === null ? '6 4' : 'none'}
              filter={isChain(triangle.leg2) ? 'url(#chain-glow)' : undefined} />
        {/* hypotenuse B → C */}
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y}
              stroke={hypColor} strokeWidth={hypVal === null ? 2.5 : (isChain(triangle.hyp) ? 2.5 : 2)}
              strokeDasharray={hypVal === null ? '6 4' : 'none'}
              filter={isChain(triangle.hyp) ? 'url(#chain-glow)' : undefined} />

        {/* Labels */}
        {/* leg1 label */}
        <text x={midAC.x} y={midAC.y}
              textAnchor="middle" fill={leg1Color} fontSize="13"
              fontWeight={fontWeight(triangle.leg1)} fontFamily="Inter, sans-serif">
          {sideText(triangle.leg1, leg1Val)}
        </text>
        {/* leg2 label */}
        <text x={midAB.x} y={midAB.y}
              textAnchor="middle" fill={leg2Color} fontSize="13"
              fontWeight={fontWeight(triangle.leg2)} fontFamily="Inter, sans-serif">
          {sideText(triangle.leg2, leg2Val)}
        </text>
        {/* hyp label */}
        <text x={midBC.x} y={midBC.y - 4}
              textAnchor="middle" fill={hypColor} fontSize="13"
              fontWeight={fontWeight(triangle.hyp)} fontFamily="Inter, sans-serif">
          {sideText(triangle.hyp, hypVal)}
        </text>

        {/* Chain badge: small golden dot + annotation on chain side */}
        {(triangle.leg1 === 'chain' || triangle.leg2 === 'chain' || triangle.hyp === 'chain') && (
          <>
            {triangle.leg1 === 'chain' && (
              <circle cx={midAC.x + 20} cy={midAC.y - 8} r="5" fill={chainGlow} opacity="0.8"/>
            )}
            {triangle.leg2 === 'chain' && (
              <circle cx={midAB.x + 10} cy={midAB.y - 14} r="5" fill={chainGlow} opacity="0.8"/>
            )}
            {triangle.hyp === 'chain' && (
              <circle cx={midBC.x - 20} cy={midBC.y - 10} r="5" fill={chainGlow} opacity="0.8"/>
            )}
          </>
        )}
      </svg>

      {/* Colour legend */}
      <div className="flex items-center gap-4 text-[11px] text-stone-400 mt-1">
        <span className="flex items-center gap-1">
          <span className="w-4 h-0.5 rounded" style={{ backgroundColor: known, display: 'inline-block' }}/>
          {lang === 'ca' ? 'Donat' : 'Dado'}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-0.5 rounded" style={{ backgroundColor: chainColor, display: 'inline-block' }}/>
          {lang === 'ca' ? 'Resultat anterior' : 'Resultado anterior'}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-0.5 rounded border-dashed border border-orange-400" style={{ display: 'inline-block' }}/>
          {lang === 'ca' ? 'Busques' : 'Buscas'}
        </span>
      </div>
    </div>
  );
}
