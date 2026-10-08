import React from 'react';
import { Search, X, Sparkles, ArrowRightLeft, Filter } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChangeQuery: (val: string) => void;
  onSearch: (forcedQuery?: string) => void;
  isLoading: boolean;
  forceAi: boolean;
  onToggleForceAi: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CATEGORIES = [
  'Все',
  'Налоги',
  'Бухучет',
  'Зарплата и кадры',
  'Отчетность и документы',
  'Банк и финансы',
  'Право и проверки',
];

export const QUICK_SUGGESTIONS = [
  { label: 'НДС → ҚҚС', query: 'ндс', highlight: true },
  { label: 'ЖШОДС → НДФЛ', query: 'жшодс', highlight: true },
  { label: 'НДФЛ → ЖШОДС / ЖШДС', query: 'ндфл' },
  { label: 'БРВ → БҲМ', query: 'брв' },
  { label: 'МРОТ → МҲЭКМ', query: 'мрот' },
  { label: 'ЭСФ → ЭҲФ', query: 'эсф' },
  { label: 'ИКПУ → МХИК', query: 'икпу' },
  { label: 'Налог на прибыль', query: 'налог на прибыль' },
  { label: 'Акт сверки', query: 'акт сверки' },
  { label: 'Основные средства', query: 'основные средства' },
  { label: 'Амортизация', query: 'амортизация' },
  { label: 'Уставный фонд', query: 'уставный фонд' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChangeQuery,
  onSearch,
  isLoading,
  forceAi,
  onToggleForceAi,
  selectedCategory,
  onSelectCategory,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Dual Source Verification Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 mb-2 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/60 font-semibold">
            <span>⚖️ Lex.uz</span>
          </span>
          <span className="text-slate-500 font-bold">+</span>
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
            <span>📗 1gb.uz</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Двойная сверка каждого слова: закон РУз + практика Главбуха
          </span>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Официальная база законодательства подключена</span>
        </div>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 focus-within:border-emerald-500 rounded-2xl shadow-xl transition-all">
          <div className="pl-5 text-slate-400">
            <Search className="w-6 h-6 text-emerald-400" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
            placeholder="Введите термин или аббревиатуру: например «ндс», «счет-фактура», «бҳм»..."
            className="w-full py-4 pl-3.5 pr-28 text-white placeholder-slate-400 text-base md:text-lg bg-transparent focus:outline-none"
            autoFocus
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                onChangeQuery('');
                onSearch('');
              }}
              className="p-1.5 mr-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
              title="Очистить"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mr-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-sm flex items-center space-x-1.5 shadow transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Поиск...</span>
              </>
            ) : (
              <>
                <span>Найти</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Options Bar: Force AI Agent & Category Filters */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Частые запросы:</span>
          {QUICK_SUGGESTIONS.map((s) => (
            <button
              key={s.query}
              type="button"
              onClick={() => {
                onChangeQuery(s.query);
                onSearch(s.query);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                s.highlight
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* AI Agent Deep Search Toggle */}
        <div className="flex items-center space-x-2 pt-1 ml-auto">
          <button
            type="button"
            onClick={onToggleForceAi}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg border text-xs transition-colors ${
              forceAi
                ? 'bg-indigo-950 text-indigo-300 border-indigo-700 shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Принудительно использовать нейросеть Gemini 3.8 Flash для глубокого законодательного анализа"
          >
            <Sparkles className={`w-3.5 h-3.5 ${forceAi ? 'text-indigo-400' : 'text-slate-400'}`} />
            <span>Глубокий AI-анализ 1gb.uz</span>
            <span
              className={`w-2 h-2 rounded-full ${forceAi ? 'bg-indigo-400' : 'bg-slate-600'}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-3 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-100 text-slate-900 font-semibold shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
