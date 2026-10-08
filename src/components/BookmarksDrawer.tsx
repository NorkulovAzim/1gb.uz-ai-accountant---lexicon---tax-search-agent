import React from 'react';
import { X, Bookmark, Trash2, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { AccountingTerm } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: AccountingTerm[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectTerm: (term: AccountingTerm) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onClearAll,
  onSelectTerm,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleExportCsv = () => {
    if (bookmarks.length === 0) return;
    const headers = [
      'Русский термин',
      'Аббревиатура RU',
      'Ўзбекча (Кирилл)',
      'Аббревиатура UZ (Кирилл)',
      'O\'zbekcha (Lotin)',
      'Аббревиатура UZ (Lotin)',
      'Категория',
      'Солиқ кодекси / НСБУ',
      'Счета учета',
      'Ставка / Норматив',
    ];

    const rows = bookmarks.map((b) => [
      `"${b.termRu.replace(/"/g, '""')}"`,
      `"${(b.abbreviationRu || '').replace(/"/g, '""')}"`,
      `"${b.termUzCyrillic.replace(/"/g, '""')}"`,
      `"${(b.abbreviationUzCyrillic || '').replace(/"/g, '""')}"`,
      `"${b.termUzLatin.replace(/"/g, '""')}"`,
      `"${(b.abbreviationUzLatin || '').replace(/"/g, '""')}"`,
      `"${b.category}"`,
      `"${(b.taxCodeArticle || '').replace(/"/g, '""')}"`,
      `"${(b.chartOfAccounts || '').replace(/"/g, '""')}"`,
      `"${(b.rateOrNorm || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `1gb_uz_accounting_glossary_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyTextList = () => {
    if (bookmarks.length === 0) return;
    const textList = bookmarks
      .map(
        (b, idx) =>
          `${idx + 1}. ${b.abbreviationRu ? `[${b.abbreviationRu}] ` : ''}${b.termRu} ➔ ` +
          `${b.abbreviationUzCyrillic ? `[${b.abbreviationUzCyrillic}] ` : ''}${b.termUzCyrillic} / ` +
          `${b.abbreviationUzLatin ? `[${b.abbreviationUzLatin}] ` : ''}${b.termUzLatin}` +
          (b.taxCodeArticle ? ` (${b.taxCodeArticle})` : '')
      )
      .join('\n');

    navigator.clipboard.writeText(textList);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h3 className="text-white font-bold text-base">
              Сохраненные термины ({bookmarks.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        {bookmarks.length > 0 && (
          <div className="p-3 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleExportCsv}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center space-x-1 shadow transition-colors"
                title="Экспорт в Excel / CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Excel (CSV)</span>
              </button>
              <button
                onClick={handleCopyTextList}
                className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium flex items-center space-x-1 transition-colors"
                title="Скопировать списком"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Копировать список</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onClearAll}
              className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-950/40 transition-colors"
              title="Очистить все закладки"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs sm:text-sm">
              <Bookmark className="w-10 h-10 mx-auto text-slate-600 mb-2 stroke-1" />
              <p>У вас пока нет сохраненных терминов.</p>
              <p className="mt-1 text-slate-400">
                Нажмите на иконку закладки возле любого термина в списке результатов, чтобы добавить
                его сюда.
              </p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 space-y-1.5 transition-all text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    onClick={() => {
                      onSelectTerm(b);
                      onClose();
                    }}
                    className="cursor-pointer group flex-1"
                  >
                    <div className="flex items-center space-x-1.5 font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {b.abbreviationRu && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[11px]">
                          {b.abbreviationRu}
                        </span>
                      )}
                      <span>{b.termRu}</span>
                    </div>

                    <div className="text-emerald-400 font-semibold mt-1">
                      {b.abbreviationUzCyrillic && `${b.abbreviationUzCyrillic} • `}
                      {b.termUzCyrillic}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(b.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    title="Удалить из закладок"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {b.taxCodeArticle && (
                  <div className="text-slate-400 text-[11px]">{b.taxCodeArticle}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
