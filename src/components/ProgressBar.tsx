import type { Language } from '../types';
import type { EscapeRoom } from '../types';
import { UI } from '../constants';

interface Props {
  lang: Language;
  currentRoom: number;
  currentProblem: number;
  rooms: EscapeRoom[];
}

export default function ProgressBar({ lang, currentRoom, currentProblem, rooms }: Props) {
  const totalProblems = rooms.reduce((s, r) => s + r.problems.length, 0);
  const problemsDone  = rooms
    .slice(0, currentRoom)
    .reduce((s, r) => s + r.problems.length, 0) + currentProblem;
  const pct = Math.round((problemsDone / totalProblems) * 100);

  return (
    <div className="flex flex-col items-center gap-1 min-w-[160px]">
      <div className="flex items-center gap-1.5 text-xs text-sand-400">
        {rooms.map((room, i) => (
          <div key={room.id} className="flex items-center gap-1">
            <span className={`text-base ${i <= currentRoom ? 'opacity-100' : 'opacity-30'}`}>
              {room.emoji}
            </span>
            {i < rooms.length - 1 && (
              <span className={`text-sand-600 ${i < currentRoom ? '' : 'opacity-40'}`}>›</span>
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-egypt-amber to-egypt-gold rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-sand-500">
        {problemsDone}/{totalProblems} {UI.totalProblems[lang]}
      </span>
    </div>
  );
}
