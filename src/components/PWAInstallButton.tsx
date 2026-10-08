import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Monitor, Check } from 'lucide-react';

interface PWAInstallButtonProps {
  onOpenWindowsModal?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenWindowsModal }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed, show a subtle active badge or button to open Windows modal
  if (isInstalled) {
    return (
      <button
        onClick={onOpenWindowsModal}
        className="px-2.5 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-600/70 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5 hover:bg-emerald-900/60 transition-colors cursor-pointer"
        title="Приложение установлено на рабочий стол Windows"
      >
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">Windows App</span>
      </button>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        setJustInstalled(true);
      }
    } else if (onOpenWindowsModal) {
      onOpenWindowsModal();
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      title="Установить приложение на Windows (.exe / Рабочий стол)"
    >
      <Monitor className="w-3.5 h-3.5" />
      <span>{isInstallable ? 'Установить Windows App' : 'Windows App (.exe)'}</span>
      <Download className="w-3 h-3 opacity-80" />
    </button>
  );
};
