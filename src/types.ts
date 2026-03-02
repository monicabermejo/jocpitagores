// ───────────────────────────────────────
// Core app types
// ───────────────────────────────────────

export type Language = 'ca' | 'es';

export type Screen =
  | 'welcome'
  | 'room'
  | 'room-transition'
  | 'victory';

export type FindTarget = 'hyp' | 'leg';

// ───────────────────────────────────────
// Problem structure
// ───────────────────────────────────────
export interface EscapeProblem {
  id: string;
  /** Does this problem visually reference the previous answer? */
  usesChain: boolean;
  /** The numerical answer */
  answer: number;
  /** Narrative flavour text (above the problem) */
  narrative: { ca: string; es: string };
  /** The actual question asked */
  question: { ca: string; es: string };
  /** Hint shown when student asks for help */
  hint: { ca: string; es: string };
  /** Triangle sides given to the student.
   *  Use null to indicate the unknown (what they must find).
   *  Use 'chain' to indicate the value comes from the previous answer. */
  triangle: {
    leg1: number | null | 'chain';
    leg2: number | null | 'chain';
    hyp:  number | null | 'chain';
    /** Label shown next to each side in the diagram */
    leg1Label?: string;
    leg2Label?: string;
    hypLabel?: string;
  };
  unit: string;
}

export interface EscapeRoom {
  id: string;
  name: { ca: string; es: string };
  subtitle: { ca: string; es: string };
  emoji: string;
  /** Short atmospheric description shown at room entrance */
  intro: { ca: string; es: string };
  /** Message shown when room is completed */
  success: { ca: string; es: string };
  bgGradient: string;
  accentColor: string;
  problems: EscapeProblem[];
}

// ───────────────────────────────────────
// App state
// ───────────────────────────────────────
export interface AppState {
  screen: Screen;
  lang: Language;
  studentEmail: string;
  studentName: string;
  sessionId: string;
  currentRoom: number;
  currentProblem: number;
  /** Accumulated answers from current room, used for chain highlighting */
  chainValues: number[];
  roomResults: RoomResult[];
}

export interface RoomResult {
  roomId: string;
  correctCount: number;
  totalCount: number;
}

// ───────────────────────────────────────
// Tracking
// ───────────────────────────────────────
export interface TrackPayload {
  email: string;
  questionId: string;
  questionText: string;
  userAnswer: string | number;
  correctAnswer: string | number;
  isCorrect: boolean;
  section: string;
  lang: Language;
  sessionId: string;
}
