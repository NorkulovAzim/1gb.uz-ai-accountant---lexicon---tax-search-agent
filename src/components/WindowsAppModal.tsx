import React, { useState } from 'react';
import {
  X,
  Monitor,
  Download,
  Terminal,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Laptop,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { BrandLogo } from './BrandLogo';

interface WindowsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WindowsAppModal: React.FC<WindowsAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [appTarget, setAppTarget] = useState<'1gb' | 'current'>('1gb');

  if (!isOpen) return null;

  const targetUrl = appTarget === '1gb' ? 'https://1gb.uz' : window.location.origin;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const handleDownloadLauncherBat = () => {
    const batContent = `@echo off
:: ==========================================================
:: 1GB.uz Главбух Узбекистан - Windows App Launcher
:: ==========================================================
title 1GB.uz AI Главбух
echo Запуск настольного приложения 1GB.uz (%TARGET_URL%)...

set "TARGET_URL=${targetUrl}"

:: Попытка запустить через Microsoft Edge в режиме нативного приложения
where msedge >nul 2>nul
if %errorlevel% equ 0 (
    start "" msedge --app="%TARGET_URL%"
    exit /b
)

:: Попытка запустить через Google Chrome в режиме приложения
where chrome >nul 2>nul
if %errorlevel% equ 0 (
    start "" chrome --app="%TARGET_URL%"
    exit /b
)

:: Стандартный браузер
start "" "%TARGET_URL%"
exit /b
`;
    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '1GB_uz_Главбух.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const powershellExeCommand = `Add-Type -TypeDefinition @"
using System;
using System.Diagnostics;
public class App {
    public static void Main() {
        string url = "${targetUrl}";
        try { Process.Start("msedge.exe", "--app=" + url); }
        catch {
            try { Process.Start("chrome.exe", "--app=" + url); }
            catch { Process.Start(url); }
        }
    }
}
"@ -OutputAssembly "$HOME\\Desktop\\1GB_Главбух.exe" -OutputType WindowsApplication`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BrandLogo className="w-10 h-10" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center space-x-2">
                <span>Установка приложения для Windows (.exe)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Windows 10 / 11
                </span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Запускайте 1GB.uz прямо с рабочего стола с новой официальной иконкой
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Target URL Selector */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold mb-2">Куда должно вести приложение:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAppTarget('1gb')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all border ${
                  appTarget === '1gb'
                    ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>https://1gb.uz (Официальный)</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Работает без авторизации и без 403</div>
              </button>
              <button
                type="button"
                onClick={() => setAppTarget('current')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all border ${
                  appTarget === 'current'
                    ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Текущий AI-Помощник</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Словарь и AI-советник Главбух</div>
              </button>
            </div>
          </div>

          {/* 403 Error Explanation Note */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 flex items-start space-x-3 text-xs text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-amber-300">Почему возникала ошибка «403. That’s an error»?</div>
              <p className="text-amber-200/90 leading-relaxed text-[11px]">
                Адрес тестовой среды (<code>ais-dev-*.run.app</code>) закрыт системой безопасности Google и требует сессии разработчика. Сторонние программы вроде Nativefier не имеют этих куки и получают 403.
                <br />
                <strong>Решение:</strong> используйте <strong>Способ 1 (PWA)</strong> прямо в этом браузере или скомпилируйте .exe для <strong>https://1gb.uz</strong> с помощью кнопки ниже!
              </p>
            </div>
          </div>

          {/* Method 1: Instant PWA Windows App (Recommended) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-emerald-500/40 shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                    СПОСОБ 1 (РЕКОМЕНДУЕТСЯ)
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Работает 100% без ошибки 403</span>
                </div>
                <h4 className="text-white font-bold text-base">
                  Установка как Windows App через Edge / Chrome
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Приложение регистрируется в системе Windows с новой иконкой: появляется на Рабочем столе, в меню «Пуск», на Панели задач и запускается в собственном отдельном окне.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {isInstallable ? (
                <button
                  onClick={install}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Установить на рабочий стол Windows</span>
                </button>
              ) : isInstalled ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Приложение уже установлено в Windows!</span>
                </div>
              ) : (
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-emerald-400">В браузере Edge / Chrome:</div>
                  <div>
                    Нажмите иконку <strong>«Установить приложение»</strong> в адресной строке справа (компьютер со стрелкой) или меню браузера (три точки) ➔ <strong>Приложения ➔ Установить этот сайт как приложение</strong>.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Method 2: One-Click Windows Launcher File (.bat) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                СПОСОБ 2
              </span>
              <h4 className="text-white font-bold text-sm">
                Скачать ярлык запуска для Рабочего стола (.bat)
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Скачайте готовый скрипт запуска. Положите его на Рабочий стол Windows и открывайте двойным кликом: он мгновенно открывает 1GB.uz в отдельном окне программы.
            </p>

            <button
              onClick={handleDownloadLauncherBat}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Скачать «1GB_uz_Главбух.bat»</span>
            </button>
          </div>

          {/* Method 3: Standalone .EXE Build with Native PowerShell (No Node.js needed!) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
                СПОСОБ 3
              </span>
              <h4 className="text-white font-bold text-sm">
                Создание файла «1GB_Главбух.exe» через PowerShell (без Node.js)
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Если вам нужен отдельный бинарный файл <strong>.exe</strong> на рабочем столе, просто вставьте эту команду в окно <strong>PowerShell</strong> (в Windows уже встроен штатный компилятор C# / .NET, никаких программ ставить не нужно):
            </p>

            {/* Terminal Command Box */}
            <div className="relative bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center space-x-2 min-w-0">
                <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="truncate">Add-Type -TypeDefinition @"... -OutputAssembly "$HOME\Desktop\1GB_Главбух.exe"</span>
              </div>
              <button
                onClick={() => handleCopy(powershellExeCommand, 'powershell')}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-1 transition-colors shrink-0 cursor-pointer"
                title="Скопировать команду для PowerShell"
              >
                {copiedCmd === 'powershell' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать команду</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Команда за 2 секунды скомпилирует файл <strong>1GB_Главбух.exe</strong> и положит его прямо на ваш <strong>Рабочий стол Windows</strong>!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Совместимо со всеми версиями Windows 10, 11 и Windows Server</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

