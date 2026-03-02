import type { Language } from '../types';
import { UI } from '../constants';

interface Props {
  lang: Language;
  onToggle: (lang: Language) => void;
}

export default function LangToggle({ lang, onToggle }: Props) {
  return (
    <button
      onClick={() => onToggle(lang === 'ca' ? 'es' : 'ca')}
      className="px-3 py-1 rounded text-xs font-semibold border border-sand-600 text-sand-300
                 hover:bg-sand-800 hover:text-sand-100 transition-colors tracking-wider"
      title="Canviar idioma / Cambiar idioma"
    >
      {UI.langToggle[lang]}
    </button>
  );
}
