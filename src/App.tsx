import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CleanListRow } from './components/CleanListRow';
import { TableView } from './components/TableView';
import { OneGbAccountModal } from './components/OneGbAccountModal';
import { AdvisorDrawer } from './components/AdvisorDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { OneGbArticlesCard } from './components/OneGbArticlesCard';
import { WindowsAppModal } from './components/WindowsAppModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { LexUzSourcesCard } from './components/LexUzSourcesCard';
import {
  AccountingTerm,
  OneGbUserAccount,
  OneGbArticle,
  LexUzSource,
} from './types';
import {
  List,
  Table as TableIcon,
  Sparkles,
  BookCheck,
  ShieldCheck,
  Building2,
  ExternalLink,
  HelpCircle,
  Scale,
} from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState<string>('ндс');
  const [results, setResults] = useState<AccountingTerm[]>([]);
  const [articles1gb, setArticles1gb] = useState<OneGbArticle[]>([]);
  const [sourcesLexUz, setSourcesLexUz] = useState<LexUzSource[]>([]);
  const [searchSource, setSearchSource] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [forceAi, setForceAi] = useState<boolean>(false);
  const [scriptPreference, setScriptPreference] = useState<'both' | 'cyrillic' | 'latin'>('both');
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  // Account integration
  const [userAccount, setUserAccount] = useState<OneGbUserAccount>(() => {
    const saved = localStorage.getItem('1gb_user_account');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      accountIdentifier: '',
      authType: 'guest',
      isConnected: false,
      userFullName: 'Гостевой режим (Справочник 1gb.uz)',
      subscriptionPlan: 'Открытый доступ и AI-агент',
      companyName: '',
    };
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<AccountingTerm[]>(() => {
    const saved = localStorage.getItem('1gb_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Modals state
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isWindowsModalOpen, setIsWindowsModalOpen] = useState(false);
  const [activeAdvisorTerm, setActiveAdvisorTerm] = useState<AccountingTerm | null>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('1gb_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync userAccount to localStorage
  useEffect(() => {
    localStorage.setItem('1gb_user_account', JSON.stringify(userAccount));
  }, [userAccount]);

  // Perform search
  const performSearch = async (overrideQuery?: string, overrideForceAi?: boolean) => {
    const targetQuery = overrideQuery !== undefined ? overrideQuery : query;
    const clean = targetQuery.trim();
    if (!clean) {
      setResults([]);
      setArticles1gb([]);
      setSourcesLexUz([]);
      setSearchSource('');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: clean,
          userAccount,
          forceAi: overrideForceAi !== undefined ? overrideForceAi : forceAi,
        }),
      });
      const data = await res.json();

      if (data.success && data.results) {
        setResults(data.results);
        setArticles1gb(data.articles1gb || []);
        setSourcesLexUz(data.sourcesLexUz || []);
        setSearchSource(data.source);
      } else {
        setResults([]);
        setArticles1gb([]);
        setSourcesLexUz([]);
      }
    } catch (err) {
      console.error('Search request failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load: search for 'ндс' immediately as requested by user
  useEffect(() => {
    performSearch('ндс', false);
  }, []);

  const handleToggleBookmark = (term: AccountingTerm) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === term.id);
      if (exists) {
        return prev.filter((b) => b.id !== term.id);
      } else {
        return [...prev, term];
      }
    });
  };

  const handleOpenAdvisorForTerm = (term: AccountingTerm) => {
    setActiveAdvisorTerm(term);
    setIsAdvisorOpen(true);
  };

  // Filter results by category if selected
  const filteredResults =
    selectedCategory === 'Все'
      ? results
      : results.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        userAccount={userAccount}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
        scriptPreference={scriptPreference}
        onScriptChange={setScriptPreference}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAdvisor={() => {
          setActiveAdvisorTerm(null);
          setIsAdvisorOpen(true);
        }}
        onOpenWindowsModal={() => setIsWindowsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Banner / Personal Account Status */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                userAccount.isConnected
                  ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  {userAccount.isConnected
                    ? `Подключен аккаунт: ${userAccount.accountIdentifier}`
                    : 'Личный аккаунт 1gb.uz не подключен'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    userAccount.isConnected
                      ? 'bg-emerald-950 border-emerald-700/80 text-emerald-300'
                      : 'bg-amber-950/70 border-amber-800 text-amber-300'
                  }`}
                >
                  {userAccount.isConnected
                    ? 'Персональный доступ активен'
                    : 'Режим открытого справочника'}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                {userAccount.isConnected
                  ? 'Поиск выполняется с учетом вашей персональной подписки Главбух (1gb.uz).'
                  : 'Сейчас поиск использует открытый глоссарий БҲМС/НК и AI-агент. Вы можете подключить свой аккаунт 1gb.uz для закрытых рекомендаций.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                userAccount.isConnected
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
              }`}
            >
              {userAccount.isConnected ? 'Настройки аккаунта' : 'Подключить личный 1gb.uz'}
            </button>
            <span className="text-slate-600">•</span>
            <a
              href="https://1gb.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>Портал 1gb.uz</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="space-y-2">
          <SearchBar
            query={query}
            onChangeQuery={setQuery}
            onSearch={(forcedQuery) => performSearch(forcedQuery)}
            isLoading={isLoading}
            forceAi={forceAi}
            onToggleForceAi={() => {
              const nextVal = !forceAi;
              setForceAi(nextVal);
              performSearch(query, nextVal);
            }}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Results Controls Bar (Count & View Switcher) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 pt-2">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
            <span className="font-bold text-white">
              Результаты поиска {query && `по «${query}»`}:
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-xs font-semibold">
              {filteredResults.length}{' '}
              {filteredResults.length === 1 ? 'термин' : 'термина(ов)'}
            </span>

            {searchSource && (
              <span className="hidden md:inline-flex items-center space-x-1 text-slate-400 text-xs">
                <span>• Источник:</span>
                <span className="text-emerald-400 font-medium">
                  {searchSource === 'knowledge_base'
                    ? 'Официальный справочник 1gb.uz & БҲМС'
                    : 'AI-агент 1gb.uz (Gemini 3.8 Flash)'}
                </span>
              </span>
            )}
          </div>

          {/* View Mode Toggle: List vs Table */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Понятный список карточек"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Список</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Сравнительная таблица терминов"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Таблица</span>
            </button>
          </div>
        </div>

        {/* Main Results View */}
        {isLoading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
            <div className="text-slate-300 font-medium text-sm">
              AI-агент 1gb.uz выполняет поиск переводов и налогового контекста...
            </div>
            <p className="text-slate-500 text-xs">
              Анализ Солиқ кодекси, счетов 21-сон БҲМС и рекомендаций Главбуха
            </p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-4">
            {viewMode === 'list' ? (
              <div className="space-y-3.5">
                {filteredResults.map((item) => (
                  <CleanListRow
                    key={item.id}
                    term={item}
                    scriptPreference={scriptPreference}
                    isBookmarked={bookmarks.some((b) => b.id === item.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onAskAdvisor={handleOpenAdvisorForTerm}
                  />
                ))}
              </div>
            ) : (
              <TableView
                terms={filteredResults}
                scriptPreference={scriptPreference}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {/* Dual Research Sources: Lex.uz Official Legislation & 1gb.uz Chief Accountant Practice */}
            <div className="pt-4 space-y-4">
              {sourcesLexUz.length > 0 && (
                <LexUzSourcesCard sources={sourcesLexUz} query={query} />
              )}

              {articles1gb.length > 0 && (
                <OneGbArticlesCard articles={articles1gb} query={query} />
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-4 max-w-xl mx-auto my-8">
            <div className="w-14 h-14 bg-slate-800 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                По запросу «{query}» точных совпадений не найдено
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                Попробуйте включить режим «Глубокий AI-анализ 1gb.uz» или выберите один из
                популярных бухгалтерских запросов ниже:
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  setQuery('ндс');
                  performSearch('ндс', false);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold hover:bg-emerald-900 transition-colors"
              >
                НДС ➔ ҚҚС
              </button>
              <button
                onClick={() => {
                  setQuery('ндфл');
                  performSearch('ндфл', false);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                НДФЛ ➔ ЖШДС
              </button>
              <button
                onClick={() => {
                  setQuery('брв');
                  performSearch('брв', false);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                БРВ ➔ БҲМ
              </button>
              <button
                onClick={() => {
                  setForceAi(true);
                  performSearch(query, true);
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-semibold hover:bg-indigo-900 transition-colors"
              >
                Запустить глубокий поиск через AI
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 mt-12 text-slate-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-400">1gb.uz AI Agent</span>
            <span>•</span>
            <span>Система Главбух (Узбекистан)</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://1gb.uz"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Официальный сайт 1gb.uz
            </a>
            <a
              href="https://lex.uz"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Lex.uz (Законодательство)
            </a>
            <a
              href="https://soliq.uz"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Налоговый комитет РУз
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <OneGbAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentAccount={userAccount}
        onSaveAccount={(acc) => setUserAccount(acc)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={(id) => setBookmarks((prev) => prev.filter((b) => b.id !== id))}
        onClearAll={() => setBookmarks([])}
        onSelectTerm={(term) => {
          setQuery(term.abbreviationRu || term.termRu);
          performSearch(term.abbreviationRu || term.termRu);
        }}
      />

      <AdvisorDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        activeTerm={activeAdvisorTerm}
      />

      <WindowsAppModal
        isOpen={isWindowsModalOpen}
        onClose={() => setIsWindowsModalOpen(false)}
      />

      <OfflineIndicator />
    </div>
  );
}
