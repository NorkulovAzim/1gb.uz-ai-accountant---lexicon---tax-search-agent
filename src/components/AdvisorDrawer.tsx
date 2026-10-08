import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Copy, Check, BookOpen } from 'lucide-react';
import { AccountingTerm } from '../types';

interface AdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTerm?: AccountingTerm | null;
}

interface Message {
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export const AdvisorDrawer: React.FC<AdvisorDrawerProps> = ({
  isOpen,
  onClose,
  activeTerm,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: activeTerm
        ? `Здравствуйте! Я AI-советник по учету и законодательству Узбекистана. Вы исследуете термин **«${activeTerm.termRu}»** (${activeTerm.abbreviationUzCyrillic || activeTerm.termUzCyrillic}).\n\nМои ответы выверены по официальной базе **Lex.uz** (НПА: ${activeTerm.lexUzReference || 'НК РУз'}) и практическим рекомендациям портала **1gb.uz** (Система Главбух). Задайте любой вопрос по расчету, проводкам или документам.`
        : 'Здравствуйте! Я AI-советник Главбуха Узбекистана. Мои консультации основаны на **двойной сверке**: официальная правовая база **Lex.uz** (Налоговый кодекс, БҲМС, Трудовой кодекс) и практические рекомендации **1gb.uz** (проводки, проводки 21-сон БҲМС, Didox). Задайте любой вопрос!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/advisor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          termContext: activeTerm,
        }),
      });
      const data = await res.json();

      if (!res.ok && !data.answer) {
        throw new Error(data.error || 'Ошибка консультации');
      }

      const agentMsg: Message = {
        sender: 'agent',
        text: data.answer || data.error || 'Ответ сформирован.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Временная задержка связи с AI-советником. Пожалуйста, повторите вопрос или выберите рекомендуемую тему ниже.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const SAMPLE_QUESTIONS = [
    'Что означает аббревиатура ЖШОДС и какие ставки применяются?',
    'Как рассчитать и зачесть НДС (ҚҚС) при импорте товаров в Узбекистане?',
    'Какие проводки составить по удержанию ЖШОДС (НДФЛ) с зарплаты?',
    'Порядок оформления электронной счет-фактуры (ЭҲФ) в Didox',
    'В каких случаях применяется ставка НДС 0%?',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base">
                AI Советник Главбуха (Lex.uz & 1gb.uz)
              </h3>
              <p className="text-slate-400 text-xs">
                Правовая база Lex.uz + Практика Главбуха 1gb.uz
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

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'agent' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/80 shrink-0 flex items-center justify-center text-white mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'agent' && (
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="hover:text-white flex items-center space-x-1"
                      title="Скопировать ответ"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Копировать</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-700 shrink-0 flex items-center justify-center text-white mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-indigo-400 text-xs p-2">
              <span className="w-4 h-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></span>
              <span>AI-эксперт 1gb.uz анализирует налоговое законодательство...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40">
          <div className="text-[11px] text-slate-400 mb-1.5 flex items-center space-x-1">
            <BookOpen className="w-3 h-3 text-indigo-400" />
            <span>Рекомендуемые вопросы:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_QUESTIONS.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(sq)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Задайте бухгалтерский или налоговый вопрос..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuestion.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
              title="Отправить вопрос"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
