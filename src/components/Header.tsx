import React from 'react';
import { Bookmark, Sparkles, UserCheck, KeyRound, Globe, BookOpen, Monitor } from 'lucide-react';
import { OneGbUserAccount } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  userAccount: OneGbUserAccount;
  onOpenAccountModal: () => void;
  scriptPreference: 'both' | 'cyrillic' | 'latin';
  onScriptChange: (pref: 'both' | 'cyrillic' | 'latin') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenAdvisor: () => void;
  onOpenWindowsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userAccount,
  onOpenAccountModal,
  scriptPreference,
  onScriptChange,
  bookmarksCount,
  onOpenBookmarks,
  onOpenAdvisor,
  onOpenWindowsModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <a
              href="https://1gb.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 group"
              title="Перейти на официальный портал 1gb.uz"
            >
              <BrandLogo className="w-10 h-10" />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-white font-bold text-lg tracking-tight">
                    1gb.uz
                  </span>
                  <span className="text-emerald-400 text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                    AI Agent
                  </span>
                  <span className="text-blue-300 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800/80">
                    + Lex.uz
                  </span>
                </div>
                <span className="text-slate-400 text-xs hidden sm:inline">
                  Система Главбух Узбекистан • Законодательство Lex.uz &amp; БҲМС
                </span>
              </div>
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Script Preference Toggle */}
            <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => onScriptChange('cyrillic')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  scriptPreference === 'cyrillic'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Отображать узбекский на кириллице (ҚҚС)"
              >
                Кирилл (ҚҚС)
              </button>
              <button
                onClick={() => onScriptChange('latin')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  scriptPreference === 'latin'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="O'zbekcha lotin alifbosida (QQS)"
              >
                Lotin (QQS)
              </button>
              <button
                onClick={() => onScriptChange('both')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  scriptPreference === 'both'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Отображать оба варианта"
              >
                Оба
              </button>
            </div>

            {/* 1gb.uz Account Button */}
            <button
              onClick={onOpenAccountModal}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                userAccount.isConnected
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/80 hover:bg-emerald-900/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title="Управление подключением личного кабинета 1gb.uz"
            >
              {userAccount.isConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">1gb.uz: Подключен</span>
                  <span className="sm:hidden">1gb.uz</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Личный аккаунт 1gb.uz</span>
                </>
              )}
            </button>

            {/* Windows App / PWA Install Button */}
            <PWAInstallButton onOpenWindowsModal={onOpenWindowsModal} />

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition-colors"
              title="Сохраненные бухгалтерские термины"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-colors"
              title="Задать сложный налоговый вопрос AI-советнику 1gb.uz"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span className="hidden sm:inline">AI Советник Главбуха</span>
              <span className="sm:hidden">Советник</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
