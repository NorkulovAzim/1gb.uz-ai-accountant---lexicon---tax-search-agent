import React from 'react';
import { Copy, Check, Bookmark, ExternalLink } from 'lucide-react';
import { AccountingTerm } from '../types';

interface TableViewProps {
  terms: AccountingTerm[];
  scriptPreference: 'both' | 'cyrillic' | 'latin';
  bookmarks: AccountingTerm[];
  onToggleBookmark: (term: AccountingTerm) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  terms,
  scriptPreference,
  bookmarks,
  onToggleBookmark,
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">RU Сокращение</th>
              <th className="py-3.5 px-4">Русский термин</th>
              {(scriptPreference === 'both' || scriptPreference === 'cyrillic') && (
                <th className="py-3.5 px-4 text-emerald-300">Ўзбекча (Кирилл)</th>
              )}
              {(scriptPreference === 'both' || scriptPreference === 'latin') && (
                <th className="py-3.5 px-4 text-teal-300">O'zbekcha (Lotin)</th>
              )}
              <th className="py-3.5 px-4">НК РУз / Lex.uz</th>
              <th className="py-3.5 px-4">Ставка / Счета</th>
              <th className="py-3.5 px-4 text-center">Источники (Lex.uz & 1gb.uz)</th>
              <th className="py-3.5 px-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 text-slate-200">
            {terms.map((t, idx) => (
              <tr
                key={t.id || idx}
                className="hover:bg-slate-700/40 transition-colors"
              >
                {/* RU Abbr */}
                <td className="py-3 px-4 font-black text-white whitespace-nowrap">
                  {t.abbreviationRu ? (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                      {t.abbreviationRu}
                    </span>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>

                {/* RU Full Term */}
                <td className="py-3 px-4 font-semibold text-slate-100 max-w-xs">
                  {t.termRu}
                </td>

                {/* UZ Cyrillic */}
                {(scriptPreference === 'both' || scriptPreference === 'cyrillic') && (
                  <td className="py-3 px-4 text-emerald-300 font-medium max-w-xs">
                    <div className="flex items-center space-x-1.5">
                      {t.abbreviationUzCyrillic && (
                        <span className="font-extrabold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                          {t.abbreviationUzCyrillic}
                        </span>
                      )}
                      <span>{t.termUzCyrillic}</span>
                      <button
                        onClick={() =>
                          handleCopy(
                            t.abbreviationUzCyrillic || t.termUzCyrillic,
                            `t-cyr-${idx}`
                          )
                        }
                        className="text-slate-400 hover:text-white p-0.5"
                        title="Скопировать"
                      >
                        {copiedKey === `t-cyr-${idx}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                )}

                {/* UZ Latin */}
                {(scriptPreference === 'both' || scriptPreference === 'latin') && (
                  <td className="py-3 px-4 text-teal-300 font-medium max-w-xs">
                    <div className="flex items-center space-x-1.5">
                      {t.abbreviationUzLatin && (
                        <span className="font-extrabold text-teal-400 bg-teal-950 px-1.5 py-0.5 rounded border border-teal-800">
                          {t.abbreviationUzLatin}
                        </span>
                      )}
                      <span>{t.termUzLatin}</span>
                      <button
                        onClick={() =>
                          handleCopy(
                            t.abbreviationUzLatin || t.termUzLatin,
                            `t-lat-${idx}`
                          )
                        }
                        className="text-slate-400 hover:text-white p-0.5"
                        title="Nusxalash"
                      >
                        {copiedKey === `t-lat-${idx}` ? (
                          <Check className="w-3 h-3 text-teal-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                )}

                {/* Tax Code & Lex.uz reference */}
                <td className="py-3 px-4 text-slate-300 max-w-xs">
                  <div className="font-medium text-slate-200">
                    {t.taxCodeArticle || 'Общие нормы РУз'}
                  </div>
                  {t.lexUzReference && (
                    <div className="text-[11px] text-blue-300 flex items-center space-x-1 mt-0.5">
                      <span>{t.lexUzReference}</span>
                    </div>
                  )}
                </td>

                {/* Rate / Accounts */}
                <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                  {t.rateOrNorm && <div className="text-amber-300">{t.rateOrNorm}</div>}
                  {t.chartOfAccounts && (
                    <div className="text-purple-300 text-[11px] mt-0.5">
                      {t.chartOfAccounts}
                    </div>
                  )}
                </td>

                {/* Dual Source Buttons: Lex.uz & 1gb.uz */}
                <td className="py-3 px-4 whitespace-nowrap text-center">
                  <div className="inline-flex items-center space-x-1.5">
                    {/* Lex.uz link */}
                    <a
                      href={t.lexUzUrl || `https://lex.uz/search/natsearch?all=${encodeURIComponent(t.abbreviationRu || t.termRu)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-blue-950/80 hover:bg-blue-900 border border-blue-700/80 text-blue-300 text-[11px] font-semibold transition-colors"
                      title="Открыть закон на Lex.uz"
                    >
                      <span>Lex.uz</span>
                      <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                    </a>

                    {/* 1gb.uz link */}
                    <a
                      href={`https://1gb.uz/#/recommendations/found/phrase=${encodeURIComponent(
                        t.abbreviationRu || t.termRu
                      )}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 text-[11px] font-semibold transition-colors"
                      title="Перейти к материалам слова на 1gb.uz"
                    >
                      <span>1gb.uz</span>
                      <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
                    </a>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-1">
                    <button
                      onClick={() => onToggleBookmark(t)}
                      className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                      title="В закладки"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked(t.id) ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() =>
                        handleCopy(
                          `https://1gb.uz/#/recommendations/found/phrase=${encodeURIComponent(
                            t.abbreviationRu || t.termRu
                          )}/`,
                          `tbl-copy-${idx}`
                        )
                      }
                      className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                      title="Скопировать ссылку на 1gb.uz"
                    >
                      {copiedKey === `tbl-copy-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={`https://1gb.uz/#/recommendations/found/phrase=${encodeURIComponent(
                        t.abbreviationRu || t.termRu
                      )}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-emerald-400"
                      title="Открыть на 1gb.uz"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
