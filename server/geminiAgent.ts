import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { AccountingTerm } from './knowledgeBase';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const generateConfig = {
  responseMimeType: 'application/json',
  responseSchema: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        abbreviationRu: { type: Type.STRING },
        termRu: { type: Type.STRING },
        abbreviationUzCyrillic: { type: Type.STRING },
        termUzCyrillic: { type: Type.STRING },
        abbreviationUzLatin: { type: Type.STRING },
        termUzLatin: { type: Type.STRING },
        category: {
          type: Type.STRING,
          enum: [
            'Налоги',
            'Бухучет',
            'Зарплата и кадры',
            'Отчетность и документы',
            'Банк и финансы',
            'Право и проверки',
          ],
        },
        taxCodeArticle: { type: Type.STRING },
        chartOfAccounts: { type: Type.STRING },
        rateOrNorm: { type: Type.STRING },
        definitionRu: { type: Type.STRING },
        definitionUz: { type: Type.STRING },
        context1gb: { type: Type.STRING },
        lexUzReference: { type: Type.STRING },
        lexUzUrl: { type: Type.STRING },
        lexUzActTitle: { type: Type.STRING },
        lexUzExactTermRu: { type: Type.STRING },
        lexUzExactTermUz: { type: Type.STRING },
        commonCollocations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              ru: { type: Type.STRING },
              uzCyrillic: { type: Type.STRING },
              uzLatin: { type: Type.STRING },
            },
            required: ['ru', 'uzCyrillic', 'uzLatin'],
          },
        },
        keywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: [
        'id',
        'termRu',
        'termUzCyrillic',
        'termUzLatin',
        'category',
        'definitionRu',
        'definitionUz',
        'context1gb',
        'lexUzReference',
        'lexUzUrl',
        'commonCollocations',
        'keywords',
      ],
    },
  },
  systemInstruction:
    'You are the official Chief Accounting & Tax AI Search Agent for 1gb.uz (Система Главбух Узбекистан - ACTION MCFR) and the official legal terminology of the Republic of Uzbekistan (Lex.uz). Analyze accounting and tax terms for Uzbekistan, and return 100% accurate Uzbek translations in Cyrillic and Latin alongside Russian terms, strictly verified against the National Database of Legislation (Lex.uz) and practical recommendations from 1gb.uz.',
};

export async function queryGeminiAccountingAgent(
  query: string,
  userContext?: string
): Promise<AccountingTerm[]> {
  try {
    const prompt = `
A user is researching the Uzbekistan accounting/tax term or abbreviation: "${query}".

Analyze the query according to current Uzbekistan legislation (Tax Code of the Republic of Uzbekistan / Солиқ кодекси, National Accounting Standards / БҲМС / НСБУ, Chart of Accounts / Счётлар режаси, and 1gb.uz guidelines).

MANDATORY LEX.UZ & 1GB.UZ COMPLIANCE RULES:
1. Ensure EVERY searching word and legal concept is 100% legally accurate according to the official text of laws published on Lex.uz (Қонунчилик маълумотлари миллий базаси) and practical guides on https://1gb.uz/.
2. If searching for an abbreviation like "ЖШОДС" or "ЖШДС", provide:
   - Russian abbreviation: "НДФЛ"
   - Russian term: "Налог на доходы физических лиц"
   - Uzbek Cyrillic abbreviation: "ЖШОДС" (or "ЖШДС")
   - Uzbek Cyrillic term: "Жисмоний шахслардан олинадиган даромад солиғи"
   - Uzbek Latin abbreviation: "JSHODS" (or "JSHDS")
   - Uzbek Latin term: "Jismoniy shaxslardan olinadigan daromad solig'i"
3. Provide exact Lex.uz reference (e.g. "НК РУз Раздел XII, ст. 364-392 (Lex.uz doc/4674902)").
4. Provide direct Lex.uz URL (e.g. "https://lex.uz/docs/4674902" for Tax Code, "https://lex.uz/docs/803450" for BHMS 21, "https://lex.uz/docs/6257291" for Labor Code, "https://lex.uz/docs/4952044" for ESF / PKM 489).
5. Provide Chart of Accounts (e.g. Счет 6710, 6410).
6. Provide current rate or norm: 12% (плоская шкала), дивиденды 5%.
7. Provide official definitions in Russian and Uzbek.
8. Provide practical recommendations from 1gb.uz (Система Главбух).
9. Provide 3-5 frequent practical collocations with translations in Cyrillic and Latin.
`;

    let text: string | undefined;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: generateConfig,
      });
      text = response.text;
    } catch (primaryErr) {
      console.warn('gemini-3.8-flash busy/failed, falling back to gemini-3.1-flash-lite:', primaryErr);
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: generateConfig,
        });
        text = fallbackResponse.text;
      } catch (liteErr) {
        console.warn('gemini-3.1-flash-lite also failed, retrying simple prompt:', liteErr);
        const simpleResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt + '\nReturn ONLY a valid JSON array of objects matching the schema.',
        });
        text = simpleResponse.text;
      }
    }

    if (!text) {
      return [];
    }

    // Clean possible markdown code fences
    const cleanedText = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedText) as AccountingTerm[];
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error('Gemini query error:', error);
    return [];
  }
}

export async function askAdvisorQuestion(
  question: string,
  termContext?: AccountingTerm
): Promise<string> {
  const prompt = `
User asks a practical Uzbekistan accounting/tax research question:
Question: "${question}"
${termContext ? `Related Term: ${termContext.termRu} (${termContext.termUzCyrillic} / ${termContext.termUzLatin}) | Lex.uz: ${termContext.lexUzReference || 'НК РУз'}` : ''}

Answer as the Chief Accounting & Legal Advisor for 1gb.uz (Система Главбух Узбекистан) with strict verification against Lex.uz (Национальная база законодательства РУз).
Provide a structured, authoritative, and practical explanation:
1. ⚖️ **Официальная норма и законодательство (Lex.uz):**
   - Укажите точную норму права (Налоговый кодекс РУз, БҲМС/НСБУ, ТК РУз или ПКМ).
   - Приведите прямую ссылку или реквизиты документа на Lex.uz (например, https://lex.uz/docs/4674902).
   - Точные официальные термины на русском и узбекском языках (кириллица ва лотинча).
2. 💼 **Практика Главбуха и расчеты (1gb.uz):**
   - Типовые бухгалтерские проводки по 21-сон БҲМС (Дт / Кт).
   - Алгоритм расчета, формулы или пошаговый порядок действий.
3. 📑 **Электронный документооборот и отчетность:**
   - Регламент в Didox, E-Faktura, my.soliq.uz, сроки сдачи отчетов и уплаты.
4. ⚠️ **Налоговые риски и частые ошибки:**
   - Рекомендации экспертов Системы Главбух (1gb.uz), как избежать штрафов по КоАО РУз.

Format cleanly in Markdown with bold key terms, clear headers, and bullet points.
`;

  try {
    let text: string | undefined;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            'You are the official Chief Accountant Advisor on 1gb.uz (Система Главбух Узбекистан). Give precise, up-to-date, legally grounded answers for Uzbekistan accountants.',
        },
      });
      text = response.text;
    } catch (primaryErr) {
      console.warn('Advisor gemini-3.8-flash busy, falling back to gemini-3.1-flash-lite:', primaryErr);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          systemInstruction:
            'You are the official Chief Accountant Advisor on 1gb.uz (Система Главбух Узбекистан). Give precise, up-to-date, legally grounded answers for Uzbekistan accountants.',
        },
      });
      text = fallbackResponse.text;
    }

    return text || 'Ответ подготовлен экспертами 1gb.uz.';
  } catch (error) {
    console.error('Advisor error:', error);
    
    // Resilient fallback for common terms if model is temporarily unavailable
    const qLower = question.toLowerCase();
    if (qLower.includes('жшодс') || qLower.includes('жшдс') || qLower.includes('ндфл')) {
      return `### Разъяснение по термину ЖШОДС / ЖШДС (НДФЛ) от 1gb.uz

**ЖШОДС** — аббревиатура на узбекском языке: **Жисмоний шахслардан олинадиган даромад солиғи** (в русском бухгалтерском учете — **НДФЛ**, Налог на доходы физических лиц). Также часто сокращается как **ЖШДС**.

1. **Законодательная база:**
   - Налоговый кодекс Республики Узбекистан (Раздел XII, Главы 48–53, Статьи 364–392).
   - Ставка для доходов резидентов: **12%** (плоская шкала).
   - Налог у источника выплаты удерживается работодателем (налоговым агентом).

2. **Бухгалтерские проводки (21-сон БҲМС):**
   - **Дт 6710** (Расчеты с персоналом по оплате труда) — **Кт 6410/ЖШОДС** (Задолженность по платежам в бюджет — НДФЛ) — *удержан налог с начисленной зарплаты*.
   - **Дт 6410/ЖШОДС** — **Кт 5110** (Расчетный счет) — *перечислен налог в бюджет*.
   - **0.1%** перечисляется на накопительные пенсионные счета (ШЖБПҲ / ИНПС в Халк банке) за счет уменьшения суммы ЖШОДС.

3. **Сроки уплаты и отчетности:**
   - Отчетность по ЖШОДС и социальному налогу сдается ежемесячно не позднее **15 числа** следующего месяца через *my.soliq.uz*.
   - Налог уплачивается одновременно с выплатой заработной платы (или не позднее даты перечисления средств в банк).`;
    }

    if (qLower.includes('ндс') || qLower.includes('ққс') || qLower.includes('qqs')) {
      return `### Разъяснение по налогу на добавленную стоимость (ҚҚС / НДС) от 1gb.uz

**ҚҚС (QQS)** — **Қўшилган қиймат солиғи** (НДС).

1. **Ставка:** **12%** (с 1 января 2023 года) по ст. 258 Налогового кодекса РУз.
2. **Проводки:**
   - **Дт 4410** — **Кт 6010** — *отражен входной НДС по полученной ЭСФ (ЭҲФ)*.
   - **Дт 6410/ҚҚС** — **Кт 4410** — *зачет входного НДС*.
   - **Дт 4010** — **Кт 6410/ҚҚС** — *начислен НДС при реализации покупателю*.
3. **Отчетность:** ежемесячно до **20 числа** следующего месяца. Зачет возможен только при наличии подтвержденного электронного счета-фактуры.`;
    }

    return 'Из-за временной нагрузки на сервер AI-консультация временно недоступна. Пожалуйста, повторите запрос через несколько секунд.';
  }
}
