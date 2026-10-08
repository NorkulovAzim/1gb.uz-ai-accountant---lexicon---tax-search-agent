import React from 'react';
import { ExternalLink, BookOpen, FileCheck2, Scale } from 'lucide-react';
import { OneGbArticle } from '../types';

interface OneGbArticlesCardProps {
  articles: OneGbArticle[];
  query: string;
}

export const OneGbArticlesCard: React.FC<OneGbArticlesCardProps> = ({
  articles,
  query,
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
            1GB
          </div>
          <h3 className="text-white font-bold text-sm sm:text-base">
            Материалы и рекомендации портала 1gb.uz
          </h3>
        </div>
        <a
          href={`https://1gb.uz/#/recommendations/found/phrase=${encodeURIComponent(query)}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
        >
          <span>Смотреть все на 1gb.uz</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {articles.map((art, idx) => (
          <a
            key={idx}
            href={art.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-emerald-600/80 transition-all flex flex-col justify-between text-xs"
          >
            <div>
              <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold mb-1 text-[11px]">
                {idx === 0 && <BookOpen className="w-3.5 h-3.5" />}
                {idx === 1 && <FileCheck2 className="w-3.5 h-3.5" />}
                {idx === 2 && <Scale className="w-3.5 h-3.5" />}
                <span>{art.rubric}</span>
              </div>
              <h4 className="text-slate-100 font-semibold line-clamp-2 group-hover:text-emerald-300 transition-colors">
                {art.title}
              </h4>
              <p className="text-slate-400 line-clamp-2 mt-1 text-[11px] leading-relaxed">
                {art.snippet}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>{art.publishedDate || '1gb.uz Редакция'}</span>
              <span className="text-emerald-400 group-hover:underline flex items-center space-x-0.5">
                <span>Перейти</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
