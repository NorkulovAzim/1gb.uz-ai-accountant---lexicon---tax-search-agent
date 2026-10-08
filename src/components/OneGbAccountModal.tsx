import React, { useState } from 'react';
import { X, ShieldCheck, KeyRound, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { OneGbUserAccount } from '../types';

interface OneGbAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccount: OneGbUserAccount;
  onSaveAccount: (account: OneGbUserAccount) => void;
}

export const OneGbAccountModal: React.FC<OneGbAccountModalProps> = ({
  isOpen,
  onClose,
  currentAccount,
  onSaveAccount,
}) => {
  const [authType, setAuthType] = useState<'credentials' | 'session_cookie'>(
    currentAccount.authType === 'session_cookie' ? 'session_cookie' : 'credentials'
  );
  const [identifier, setIdentifier] = useState(
    currentAccount.authType !== 'guest' ? currentAccount.accountIdentifier : ''
  );
  const [secret, setSecret] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerifyStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/account/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          secretOrCookie: secret.trim(),
          authType,
        }),
      });
      const data = await res.json();

      if (data.success && data.account) {
        onSaveAccount(data.account);
        setVerifyStatus({
          type: 'success',
          message: 'Аккаунт 1gb.uz успешно подключен и верифицирован!',
        });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setVerifyStatus({
          type: 'error',
          message: data.error || 'Не удалось авторизоваться в 1gb.uz',
        });
      }
    } catch (err: any) {
      setVerifyStatus({
        type: 'error',
        message: err.message || 'Ошибка сетевого соединения с сервером',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisconnect = () => {
    const guestAccount: OneGbUserAccount = {
      accountIdentifier: 'Гость (Открытый доступ)',
      authType: 'guest',
      isConnected: false,
      subscriptionPlan: 'Базовый режим справочника',
    };
    onSaveAccount(guestAccount);
    setIdentifier('');
    setSecret('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
              1GB
            </div>
            <div>
              <h2 className="text-white font-bold text-base">
                Личный аккаунт 1gb.uz (Главбух)
              </h2>
              <p className="text-slate-400 text-xs">
                Подключение подписки и персональных рекомендаций
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Current Status banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-start space-x-3 text-xs ${
              currentAccount.isConnected
                ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-300'
            }`}
          >
            <ShieldCheck
              className={`w-5 h-5 shrink-0 ${
                currentAccount.isConnected ? 'text-emerald-400' : 'text-slate-400'
              }`}
            />
            <div className="flex-1">
              <div className="font-semibold text-white">
                {currentAccount.isConnected
                  ? 'Подключен персональный профиль 1gb.uz'
                  : 'Режим открытого справочника 1gb.uz'}
              </div>
              <div className="text-slate-400 mt-0.5">
                {currentAccount.userFullName || 'Доступ к общему налоговому глоссарию'} •{' '}
                {currentAccount.subscriptionPlan || 'Главбух Pro'}
              </div>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setAuthType('credentials')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                authType === 'credentials'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Логин и пароль
            </button>
            <button
              type="button"
              onClick={() => setAuthType('session_cookie')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                authType === 'session_cookie'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Сессионный токен / Cookie
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleTestAndSave} className="space-y-3.5">
            {authType === 'credentials' ? (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 text-xs font-semibold">
                      Номер телефона или Email на 1gb.uz:
                    </label>
                    {!identifier && (
                      <button
                        type="button"
                        onClick={() => setIdentifier('therock7701@gmail.com')}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 underline"
                      >
                        Заполнить therock7701@gmail.com
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="therock7701@gmail.com или +998 90 123 45 67"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">
                    Пароль от аккаунта:
                  </label>
                  <input
                    type="password"
                    required
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">
                  Cookie или токен авторизации MCFR (id2 / hostToken):
                </label>
                <textarea
                  rows={3}
                  required
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Вставьте значение cookie из браузера с сайта 1gb.uz (например: HostToken=... или capi.mcfr.uz токен)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            )}

            {/* Helper info */}
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-start space-x-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Ваши данные используются исключительно для авторизованного доступа к рекомендациям и
                закрытым справочникам{' '}
                <a
                  href="https://1gb.uz"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center"
                >
                  1gb.uz <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                .
              </span>
            </div>

            {/* Status alerts */}
            {verifyStatus.type === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{verifyStatus.message}</span>
              </div>
            )}

            {verifyStatus.type === 'error' && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>{verifyStatus.message}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              {currentAccount.isConnected ? (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 text-xs font-medium transition-colors"
                >
                  Отключить аккаунт
                </button>
              ) : (
                <div></div>
              )}

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold shadow transition-all disabled:opacity-50 flex items-center space-x-1.5"
                >
                  {isVerifying ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Проверка...</span>
                    </>
                  ) : (
                    <span>Сохранить и проверить</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
