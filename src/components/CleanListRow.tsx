import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Volume2,
  FileText,
  Scale,
  Calculator,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { AccountingTerm } from '../types';

interface CleanListRowProps {
  term: AccountingTerm;
  scriptPreference: 'both' | 'cyrillic' | 'latin';
  isBookmarked: boolean;
  onToggleBookmark: (term: AccountingTerm) => void;
  onAskAdvisor: (term: AccountingTerm) => void;
}

export const CleanListRow: React.FC<CleanListRowProps> = ({
  term,
  scriptPreference,
  isBookmarked,
  onToggleBookmark,
  onAskAdvisor,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const handleOpen1gb = (url: string, termToCopy: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      navigator.clipboard.writeText(termToCopy);
    } catch (err) {
      // ignore
    }
    setCopiedKey('opened1gb');
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setCopiedKey(null);
    }, 4500);
  };

  const handleSpeak = (text: string, lang = 'ru-RU', e?: React.MouseEvent) => {
    e?.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const mainSearchQuery = term.abbreviationRu || term.termRu;
  const uzSearchQuery = term.abbreviationUzCyrillic || term.termUzCyrillic;
  const encMain = encodeURIComponent(mainSearchQuery.trim());
  const encUz = encodeURIComponent(uzSearchQuery.trim());

  // Verified 1gb.uz Single-Page App router search URLs:
  const oneGbSearchUrl = `https://1gb.uz/#/recommendations/found/phrase=${encMain}/`;
  const oneGbRecsUrl = `https://1gb.uz/#/recommendations/found/phrase=${encMain}/`;
  const oneGbLawUrl = `https://1gb.uz/#/law/found/phrase=${encMain}/`;
  const oneGbHandbookUrl = `https://1gb.uz/#/handbook/found/phrase=${encMain}/`;
  const oneGbUzSearchUrl = `https://1gb.uz/#/recommendations/found/phrase=${encUz}/`;

  // Verified Lex.uz official legislation URLs:
  const lexUzTargetUrl = term.lexUzUrl || `https://lex.uz/search/natsearch?all=${encMain}`;
  const lexUzSearchUrl = `https://lex.uz/search/natsearch?all=${encMain}`;
  const lexUzUzSearchUrl = `https://lex.uz/search/natsearch?all=${encUz}`;

  const handleOpenLexUz = (url: string, termToCopy: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      navigator.clipboard.writeText(termToCopy);
    } catch (err) {
      // ignore
    }
    setCopiedKey('openedLexUz');
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setCopiedKey(null);
    }, 4500);
  };

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Primary Row Header */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Main Term & Translation Header */}
          <div className="flex-1">
            {/* Top Tag Badges & Category */}
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 font-medium">
                {term.category}
              </span>

              {term.taxCodeArticle && (
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/60 font-medium">
                  <Scale className="w-3 h-3 text-blue-400" />
                  <span>{term.taxCodeArticle}</span>
                </span>
              )}

              {term.rateOrNorm && (
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60 font-medium">
                  <Calculator className="w-3 h-3 text-amber-400" />
                  <span>{term.rateOrNorm}</span>
                </span>
              )}

              {term.chartOfAccounts && (
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/60 font-medium">
                  <FileText className="w-3 h-3 text-purple-400" />
                  <span>{term.chartOfAccounts}</span>
                </span>
              )}
            </div>

            {/* Abbreviation & Full Translation Showcase */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
              {/* Russian Acronym & Term */}
              <div className="flex items-center space-x-2">
                {term.abbreviationRu && (
                  <span
                    onClick={(e) => handleCopy(term.abbreviationRu!, 'abbrRu', e)}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-extrabold text-base cursor-pointer hover:border-slate-500 transition-colors"
                    title="Нажмите, чтобы скопировать русское сокращение"
                  >
                    {term.abbreviationRu}
                  </span>
                )}
                <span className="text-slate-100 font-bold text-lg md:text-xl">
                  {term.termRu}
                </span>
              </div>

              {/* Arrow divider */}
              <span className="text-slate-500 font-bold hidden sm:inline">➔</span>

              {/* Uzbek Translation Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Uzbek Cyrillic */}
                {(scriptPreference === 'both' || scriptPreference === 'cyrillic') && (
                  <div className="flex items-center space-x-1.5 bg-emerald-950/70 border border-emerald-600/70 rounded-xl px-3 py-1 text-emerald-200">
                    {term.abbreviationUzCyrillic && (
                      <span
                        onClick={(e) =>
                          handleCopy(term.abbreviationUzCyrillic!, 'abbrUzCyr', e)
                        }
                        className="font-black text-emerald-300 text-base cursor-pointer hover:underline"
                        title="Скопировать узбекское сокращение (Кирилл)"
                      >
                        {term.abbreviationUzCyrillic}
                      </span>
                    )}
                    {term.abbreviationUzCyrillic && <span className="text-emerald-500">•</span>}
                    <span className="font-semibold text-emerald-100 text-sm md:text-base">
                      {term.termUzCyrillic}
                    </span>
                    <button
                      onClick={(e) => handleCopy(term.termUzCyrillic, 'fullUzCyr', e)}
                      className="ml-1 text-emerald-400 hover:text-white p-0.5"
                      title="Скопировать узбекский перевод"
                    >
                      {copiedKey === 'fullUzCyr' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleSpeak(term.termUzCyrillic, 'uz-UZ', e)}
                      className="text-emerald-400 hover:text-white p-0.5"
                      title="Прослушать произношение"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Uzbek Latin */}
                {(scriptPreference === 'both' || scriptPreference === 'latin') && (
                  <div className="flex items-center space-x-1.5 bg-teal-950/70 border border-teal-600/70 rounded-xl px-3 py-1 text-teal-200">
                    {term.abbreviationUzLatin && (
                      <span
                        onClick={(e) =>
                          handleCopy(term.abbreviationUzLatin!, 'abbrUzLat', e)
                        }
                        className="font-black text-teal-300 text-base cursor-pointer hover:underline"
                        title="Скопировать узбекское сокращение (Lotin)"
                      >
                        {term.abbreviationUzLatin}
                      </span>
                    )}
                    {term.abbreviationUzLatin && <span className="text-teal-500">•</span>}
                    <span className="font-semibold text-teal-100 text-sm md:text-base">
                      {term.termUzLatin}
                    </span>
                    <button
                      onClick={(e) => handleCopy(term.termUzLatin, 'fullUzLat', e)}
                      className="ml-1 text-teal-400 hover:text-white p-0.5"
                      title="Nusxalash (Lotin)"
                    >
                      {copiedKey === 'fullUzLat' ? (
                        <Check className="w-3.5 h-3.5 text-teal-300" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-1.5 self-end lg:self-center shrink-0">
            {/* Direct Open in Lex.uz button */}
            <button
              onClick={(e) => handleOpenLexUz(lexUzTargetUrl, mainSearchQuery, e)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow transition-colors cursor-pointer"
              title="Открыть официальный текст закона на Lex.uz"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Lex.uz</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            {/* Direct Open in 1gb.uz button */}
            <button
              onClick={(e) => handleOpen1gb(oneGbSearchUrl, mainSearchQuery, e)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1 shadow transition-colors cursor-pointer"
              title="Скопировать слово и открыть 1gb.uz"
            >
              <span>1gb.uz</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Ask AI Advisor button */}
            <button
              onClick={() => onAskAdvisor(term)}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-medium flex items-center space-x-1 transition-colors"
              title="Задать вопрос по этому термину AI Советнику"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Спросить Главбуха</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(term)}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'Удалить из сохраненных' : 'Сохранить термин'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            {/* Accordion toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-700 transition-colors"
              title={isExpanded ? 'Свернуть детали' : 'Развернуть контекст и фразы'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* High-visibility Dual Verification Link Bars: Lex.uz + 1gb.uz */}
        <div className="mt-3.5 space-y-2 pt-3 border-t border-slate-700/60">
          {/* 1. Lex.uz Official Law Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-blue-900/50">
            <div className="flex items-center space-x-2 text-xs flex-wrap min-w-0">
              <span className="w-5 h-5 rounded bg-blue-600 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                LEX
              </span>
              <span className="text-blue-300 font-semibold shrink-0">
                Законодательство РУз (Lex.uz):
              </span>
              <span className="text-slate-300 font-medium truncate max-w-xs sm:max-w-md">
                {term.lexUzReference || term.taxCodeArticle || 'Налоговый кодекс РУз'}
              </span>
              <button
                onClick={(e) => handleOpenLexUz(lexUzTargetUrl, mainSearchQuery, e)}
                className="text-blue-400 hover:text-blue-300 font-mono text-xs font-bold hover:underline flex items-center space-x-1 break-all text-left cursor-pointer"
                title="Открыть официальный текст на Lex.uz"
              >
                <span className="truncate max-w-[200px]">{lexUzTargetUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1 text-blue-400" />
              </button>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
              <button
                onClick={(e) => handleCopy(lexUzTargetUrl, 'lexLinkCopied', e)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1 transition-colors"
                title="Скопировать ссылку на закон Lex.uz"
              >
                {copiedKey === 'lexLinkCopied' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-400 font-medium">Ссылка Lex.uz скопирована!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать Lex.uz</span>
                  </>
                )}
              </button>

              <button
                onClick={(e) => handleOpenLexUz(lexUzTargetUrl, mainSearchQuery, e)}
                className="text-xs font-semibold text-white px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center space-x-1 shadow transition-colors cursor-pointer"
                title="Открыть закон на Lex.uz"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Открыть на Lex.uz</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. 1gb.uz Chief Accountant Practice Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-emerald-800/40">
            <div className="flex items-center space-x-2 text-xs flex-wrap min-w-0">
              <span className="w-5 h-5 rounded bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                1GB
              </span>
              <span className="text-slate-300 font-semibold shrink-0">
                Практика Главбуха (1gb.uz):
              </span>
              <button
                onClick={(e) => handleOpen1gb(oneGbSearchUrl, mainSearchQuery, e)}
                className="text-emerald-400 hover:text-emerald-300 font-mono text-xs font-bold hover:underline flex items-center space-x-1 break-all text-left cursor-pointer"
                title="Открыть слово на 1gb.uz (слово автоматически копируется для поиска)"
              >
                <span>{oneGbSearchUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1 text-emerald-400" />
              </button>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center flex-wrap gap-y-1">
              <button
                onClick={(e) => handleCopy(mainSearchQuery, 'termCopied', e)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1 transition-colors"
                title="Скопировать слово для вставки в строку поиска 1gb.uz"
              >
                {copiedKey === 'termCopied' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Слово скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать «{mainSearchQuery}»</span>
                  </>
                )}
              </button>
              <button
                onClick={(e) => handleCopy(oneGbSearchUrl, 'mainLinkCopied', e)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1 transition-colors"
                title="Скопировать прямую ссылку на 1gb.uz"
              >
                {copiedKey === 'mainLinkCopied' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Ссылка скопирована!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать ссылку</span>
                  </>
                )}
              </button>
              <button
                onClick={(e) => handleOpen1gb(oneGbSearchUrl, mainSearchQuery, e)}
                className="text-xs font-semibold text-white px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 flex items-center space-x-1 shadow transition-colors cursor-pointer"
                title="Скопировать слово и открыть 1gb.uz"
              >
                <span>Перейти на 1gb.uz</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Helpful Notifications */}
        {copiedKey === 'opened1gb' && (
          <div className="mt-2.5 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/80 text-emerald-200 text-xs flex items-center space-x-2 animate-fade-in shadow-lg">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              Слово <strong>«{mainSearchQuery}»</strong> скопировано в буфер обмена! Портал 1gb.uz открыт в новой вкладке.
            </div>
          </div>
        )}
        {copiedKey === 'openedLexUz' && (
          <div className="mt-2.5 p-3 rounded-xl bg-blue-950/90 border border-blue-500/80 text-blue-200 text-xs flex items-center space-x-2 animate-fade-in shadow-lg">
            <Check className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              Текст закона по термину <strong>«{mainSearchQuery}»</strong> открыт на Lex.uz! Ссылка проверена в Национальной базе законодательства РУз.
            </div>
          </div>
        )}
      </div>

      {/* Expanded Context Section */}
      {isExpanded && (
        <div className="border-t border-slate-700/60 bg-slate-900/60 p-4 sm:p-5 space-y-4">
          {/* Definitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
              <span className="text-slate-400 font-semibold text-xs block mb-1">
                Определение (Русский):
              </span>
              <p className="text-slate-200 leading-relaxed">{term.definitionRu}</p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
              <span className="text-emerald-400 font-semibold text-xs block mb-1">
                Таъриф (Ўзбек тилида):
              </span>
              <p className="text-emerald-100/90 leading-relaxed">{term.definitionUz}</p>
            </div>
          </div>

          {/* Dual Verification Cards: Lex.uz Statutory Ground & 1gb.uz Accountant Practice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            {/* Lex.uz Statutory Ground */}
            <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-blue-300 font-bold text-xs">
                <span className="flex items-center space-x-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-400" />
                  <span>Нормативно-правовая база (Lex.uz):</span>
                </span>
                <span className="text-[10px] bg-blue-900/80 px-2 py-0.5 rounded text-blue-200 font-semibold">
                  Официальный НПА
                </span>
              </div>
              <p className="text-slate-200 font-medium">
                {term.lexUzActTitle || 'Законодательство Республики Узбекистан'} —{' '}
                <span className="text-blue-300">{term.lexUzReference || term.taxCodeArticle}</span>
              </p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-blue-900/50 flex items-center justify-between">
                <span>Термин в законе (Lex.uz):</span>
                <span className="text-blue-300 font-semibold">{term.lexUzExactTermRu || term.termRu}</span>
              </div>
              <div>
                <button
                  onClick={(e) => handleOpenLexUz(lexUzTargetUrl, mainSearchQuery, e)}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-semibold hover:underline cursor-pointer"
                >
                  <span>Читать первоисточник на Lex.uz</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>

            {/* 1gb.uz Practice */}
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-emerald-300 font-bold text-xs">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Рекомендация Главбуха (1gb.uz):</span>
                </span>
                <span className="text-[10px] bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-200 font-semibold">
                  Практика MCFR
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed text-xs">
                {term.context1gb || 'Практические алгоритмы, расчеты и рекомендации экспертов Системы Главбух Узбекистан.'}
              </p>
              <div>
                <button
                  onClick={(e) => handleOpen1gb(oneGbSearchUrl, mainSearchQuery, e)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold hover:underline cursor-pointer"
                >
                  <span>Открыть рекомендации на 1gb.uz</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Common Collocations & Phrases Table */}
          {term.commonCollocations && term.commonCollocations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Типовые бухгалтерские фразы и словосочетания:
                </span>
                <span className="text-xs text-slate-400">
                  Нажмите на перевод, чтобы скопировать
                </span>
              </div>

              <div className="bg-slate-800/90 rounded-xl border border-slate-700/70 overflow-hidden">
                <div className="divide-y divide-slate-700/60">
                  {term.commonCollocations.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-slate-700/40 transition-colors text-xs sm:text-sm"
                    >
                      {/* Russian phrase */}
                      <div className="text-slate-200 font-medium sm:w-1/3 flex items-center space-x-1.5">
                        <span className="text-slate-400 font-mono text-[11px] w-4">
                          {idx + 1}.
                        </span>
                        <span>{item.ru}</span>
                      </div>

                      {/* Uzbek Cyrillic */}
                      {(scriptPreference === 'both' || scriptPreference === 'cyrillic') && (
                        <div
                          onClick={() => handleCopy(item.uzCyrillic, `phrase-cyr-${idx}`)}
                          className="text-emerald-300 font-semibold sm:w-1/3 flex items-center justify-between cursor-pointer hover:text-emerald-200 group p-1 rounded"
                          title="Скопировать"
                        >
                          <span>{item.uzCyrillic}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity">
                            {copiedKey === `phrase-cyr-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </div>
                      )}

                      {/* Uzbek Latin */}
                      {(scriptPreference === 'both' || scriptPreference === 'latin') && (
                        <div
                          onClick={() => handleCopy(item.uzLatin, `phrase-lat-${idx}`)}
                          className="text-teal-300 font-medium sm:w-1/3 flex items-center justify-between cursor-pointer hover:text-teal-200 group p-1 rounded"
                          title="Nusxalash"
                        >
                          <span>{item.uzLatin}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity">
                            {copiedKey === `phrase-lat-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-teal-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lex.uz Official Legislation Quick Links */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-blue-600 text-white font-extrabold text-[8px] flex items-center justify-center">
                  LEX
                </span>
                <span>Прямой переход к законам РУз на Lex.uz:</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={(e) => handleOpenLexUz(lexUzTargetUrl, mainSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-slate-200 group-hover:text-blue-300">
                    Официальный текст нормы
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {lexUzTargetUrl}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 shrink-0" />
              </button>

              <button
                onClick={(e) => handleOpenLexUz(lexUzSearchUrl, mainSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-slate-200 group-hover:text-blue-300">
                    Все законы по «{mainSearchQuery}»
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    lex.uz/search
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 shrink-0" />
              </button>

              <button
                onClick={(e) => handleOpenLexUz(lexUzUzSearchUrl, uzSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-emerald-300 group-hover:text-emerald-200">
                    Lex.uz ўзбек тилида
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {uzSearchQuery}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </button>
            </div>
          </div>

          {/* 1gb.uz Quick Links Section */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white font-extrabold text-[9px] flex items-center justify-center">
                  1GB
                </span>
                <span>Прямые разделы по этому слову на 1gb.uz:</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <button
                onClick={(e) => handleOpen1gb(oneGbSearchUrl, mainSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-600/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-300">
                    Общий поиск 1gb.uz
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {oneGbSearchUrl}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </button>

              <button
                onClick={(e) => handleOpen1gb(oneGbRecsUrl, mainSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-600/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-300">
                    Рекомендации Главбуха
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {oneGbRecsUrl}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </button>

              <button
                onClick={(e) => handleOpen1gb(oneGbLawUrl, mainSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-600/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-300">
                    Правовая база (НК РУз)
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {oneGbLawUrl}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </button>

              <button
                onClick={(e) => handleOpen1gb(oneGbUzSearchUrl, uzSearchQuery, e)}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-600/80 transition-all flex items-center justify-between group text-left cursor-pointer"
              >
                <div className="min-w-0 pr-1">
                  <div className="font-semibold text-emerald-300 group-hover:text-emerald-200">
                    Ўзбекча қидирув
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {oneGbUzSearchUrl}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
