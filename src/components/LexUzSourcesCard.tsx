import React from 'react';
import { ExternalLink, Scale, BookOpen, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { LexUzSource } from '../types';

interface LexUzSourcesCardProps {
  sources: LexUzSource[];
  query: string;
}

export const LexUzSourcesCard: React.FC<LexUzSourcesCardProps> = ({
  sources,
  query,
}) => {
  if (!sources || sources.length === 0) return null;

  const encQuery = encodeURIComponent(query.trim());
  const lexSearchAllUrl = `https://lex.uz/search/natsearch?all=${encQuery}`;

  return (
    <div className="bg-slate-800/85 border border-blue-900/50 hover:border-blue-700/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 transition-all">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-bold text-sm sm:text-base">
                Нормативно-правовая база Lex.uz (Законодательство РУз)
              </h3>
              <span className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span>Официальный источник</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Все поисковые термины сверены с действующими кодексами и актами РУз
            </p>
          </div>
        </div>

        <a
          href={lexSearchAllUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1 shrink-0 self-start sm:self-center font-medium hover:underline"
          title="Открыть полный поиск по всем законам на Lex.uz"
        >
          <span>Искать «{query}» на Lex.uz</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sources.map((src, idx) => (
          <div
            key={src.id || idx}
            className="group p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/70 hover:border-blue-500/80 transition-all flex flex-col justify-between text-xs space-y-2.5"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between mb-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/70 font-semibold flex items-center space-x-1">
                  <FileText className="w-3 h-3 text-blue-400" />
                  <span>{src.actType}</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{src.status}</span>
                </span>
              </div>

              {/* Title */}
              <h4 className="text-slate-100 font-bold group-hover:text-blue-300 transition-colors line-clamp-2">
                {src.titleRu}
              </h4>

              {/* Uzbek Title if present */}
              {src.titleUz && (
                <div className="text-emerald-400/90 text-[11px] font-medium line-clamp-1 mt-0.5">
                  {src.titleUz}
                </div>
              )}

              {/* Description */}
              <p className="text-slate-400 line-clamp-2 mt-1.5 text-[11px] leading-relaxed">
                {src.descriptionRu}
              </p>
            </div>

            {/* Bottom Link bar */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-mono text-[10px]">
                {src.docId && src.docId !== 'search' ? `Doc #${src.docId}` : 'Lex.uz'}
              </span>
              <div className="flex items-center space-x-2">
                {src.urlUz && (
                  <a
                    href={src.urlUz}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center space-x-0.5"
                    title="Матнни ўзбек тилида очиш (Lex.uz)"
                  >
                    <span>Ўзб</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold hover:underline flex items-center space-x-0.5"
                  title="Открыть официальный текст на Lex.uz"
                >
                  <span>Текст на Lex.uz</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
