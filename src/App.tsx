import { useState, useCallback } from 'react';
import type { AppState, Language, RoomResult } from './types';
import { ROOMS } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import RoomIntro    from './components/RoomIntro';
import RoomScene    from './components/RoomScene';
import VictoryScreen from './components/VictoryScreen';
import LangToggle   from './components/LangToggle';
import ProgressBar  from './components/ProgressBar';

// Generate a session ID
const makeSessionId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const STORAGE_KEY = 'escape_pitagores';

function loadSaved(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<AppState>) : {};
  } catch {
    return {};
  }
}

export default function App() {
  const saved = loadSaved();

  const [state, setState] = useState<AppState>({
    screen:         saved.screen === 'room' || saved.screen === 'room-transition' ? 'room' : (saved.screen ?? 'welcome'),
    lang:           saved.lang ?? 'ca',
    studentEmail:   'anonymous',
    studentName:    '',

    sessionId:      saved.sessionId ?? makeSessionId(),
    currentRoom:    saved.currentRoom ?? 0,
    currentProblem: saved.currentProblem ?? 0,
    chainValues:    saved.chainValues ?? [],
    roomResults:    saved.roomResults ?? [],
  });

  const save = useCallback((partial: Partial<AppState>) => {
    setState(prev => {
      const next = { ...prev, ...partial };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setLang = useCallback((lang: Language) => save({ lang }), [save]);

  const handleWelcomeStart = useCallback(() => {
    save({ screen: 'room-transition', currentRoom: 0, currentProblem: 0, chainValues: [] });
  }, [save]);

  const handleRoomIntroStart = useCallback(() => {
    save({ screen: 'room' });
  }, [save]);

  const handleRoomComplete = useCallback((result: RoomResult) => {
    const roomResults = [...state.roomResults, result];
    const nextRoom = state.currentRoom + 1;
    if (nextRoom >= ROOMS.length) {
      save({ screen: 'victory', roomResults });
    } else {
      save({
        screen: 'room-transition',
        currentRoom: nextRoom,
        currentProblem: 0,
        chainValues: [],
        roomResults,
      });
    }
  }, [save, state.roomResults, state.currentRoom]);

  const handleProblemAdvance = useCallback((chainValues: number[], problemIndex: number) => {
    save({ currentProblem: problemIndex, chainValues });
  }, [save]);

  const handleReplay = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      screen: 'welcome',
      lang: state.lang,
      studentEmail: 'anonymous',
      studentName: '',

      sessionId: makeSessionId(),
      currentRoom: 0,
      currentProblem: 0,
      chainValues: [],
      roomResults: [],
    });
  }, [state.lang]);

  const totalCorrect = state.roomResults.reduce((s, r) => s + r.correctCount, 0);
  const totalProblems = ROOMS.reduce((s, r) => s + r.problems.length, 0);

  return (
    <div className="min-h-screen bg-egypt-darker text-sand-100 flex flex-col">
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2
                         bg-egypt-darker/90 backdrop-blur border-b border-sand-800/40">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔺</span>
            <span className="font-serif text-sand-300 text-sm hidden sm:block">
              {state.lang === 'ca' ? 'Escapada de la Piràmide' : 'Escapada de la Pirámide'}
            </span>
            {state.screen !== 'welcome' && (
              <button
                onClick={() => {
                  const msg = state.lang === 'ca'
                    ? '⚠️ Segur que vols reiniciar? Es perdrà tot el progrés.'
                    : '⚠️ ¿Seguro que quieres reiniciar? Se perderá todo el progreso.';
                  if (window.confirm(msg)) handleReplay();
                }}
                title={state.lang === 'ca' ? 'Reiniciar' : 'Reiniciar'}
                className="ml-1 px-2 py-1 rounded-lg text-xs text-stone-400 border border-stone-700
                           hover:bg-stone-800 hover:text-sand-300 transition-colors"
              >
                🔄 {state.lang === 'ca' ? 'Reinicia' : 'Reinicia'}
              </button>
            )}
          </div>

          {state.screen === 'room' && (
            <ProgressBar
              lang={state.lang}
              currentRoom={state.currentRoom}
              currentProblem={state.currentProblem}
              rooms={ROOMS}
            />
          )}

          <LangToggle lang={state.lang} onToggle={setLang} />
        </header>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col items-center justify-center pt-14">
        {state.screen === 'welcome' && (
          <WelcomeScreen
            lang={state.lang}
            studentName={state.studentName}
            totalProblems={totalProblems}
            onStart={handleWelcomeStart}
          />
        )}

        {state.screen === 'room-transition' && (
          <RoomIntro
            lang={state.lang}
            room={ROOMS[state.currentRoom]}
            roomIndex={state.currentRoom}
            onStart={handleRoomIntroStart}
          />
        )}

        {state.screen === 'room' && (
          <RoomScene
            lang={state.lang}
            room={ROOMS[state.currentRoom]}
            initialProblemIndex={state.currentProblem}
            initialChainValues={state.chainValues}
            studentEmail={state.studentEmail}
            sessionId={state.sessionId}
            onRoomComplete={handleRoomComplete}
            onProblemAdvance={handleProblemAdvance}
          />
        )}

        {state.screen === 'victory' && (
          <VictoryScreen
            lang={state.lang}
            studentName={state.studentName}
            totalCorrect={totalCorrect}
            totalProblems={totalProblems}
            roomResults={state.roomResults}
            rooms={ROOMS}
            onReplay={handleReplay}
          />
        )}
      </main>

      {/* ── Author credit ── */}
      <p className="fixed bottom-1 right-2 text-[10px] italic text-stone-600 pointer-events-none select-none z-40">
        © Mónica Bermejo Abellán
      </p>
    </div>
  );
}
