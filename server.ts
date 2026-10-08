import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  UZ_ACCOUNTING_TERMS,
  findMatchesInKnowledgeBase,
  AccountingTerm,
} from './server/knowledgeBase';
import {
  queryGeminiAccountingAgent,
  askAdvisorQuestion,
} from './server/geminiAgent';
import {
  verifyOneGbAccount,
  search1gbLiveContent,
} from './server/oneGbScraper';
import { findLexUzSourcesForQuery } from './server/lexUzIntegration';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route: Popular accounting terms
  app.get('/api/terms/popular', (_req: Request, res: Response) => {
    res.json({
      success: true,
      terms: UZ_ACCOUNTING_TERMS,
    });
  });

  // API Route: Verify 1gb.uz personal account
  app.post('/api/account/verify', async (req: Request, res: Response) => {
    try {
      const { identifier, secretOrCookie, authType } = req.body;
      const accountInfo = await verifyOneGbAccount(
        identifier || '',
        secretOrCookie || '',
        authType || 'credentials'
      );
      res.json({
        success: true,
        account: accountInfo,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: err?.message || 'Ошибка проверки аккаунта 1gb.uz',
      });
    }
  });

  // API Route: Bilingual Term & Phrase Search
  app.post('/api/search', async (req: Request, res: Response) => {
    try {
      const { query, userAccount, forceAi } = req.body;
      const cleanQuery = (query || '').trim();

      if (!cleanQuery) {
        return res.json({
          success: true,
          query: '',
          results: [],
          source: 'empty',
        });
      }

      // 1. Search high-precision pre-indexed knowledge base
      const localMatches = findMatchesInKnowledgeBase(cleanQuery);

      let finalResults: AccountingTerm[] = [...localMatches];
      let searchSource = localMatches.length > 0 ? 'knowledge_base' : 'ai_agent';

      // 2. If no exact match or user requested deep AI search or compound phrase
      if (finalResults.length === 0 || forceAi || cleanQuery.split(' ').length > 2) {
        try {
          const aiResults = await queryGeminiAccountingAgent(
            cleanQuery,
            userAccount?.accountIdentifier
          );
          if (aiResults && aiResults.length > 0) {
            if (forceAi || finalResults.length === 0) {
              finalResults = aiResults;
            } else {
              const existingIds = new Set(finalResults.map((r) => r.id));
              for (const item of aiResults) {
                if (!existingIds.has(item.id)) {
                  finalResults.push(item);
                  existingIds.add(item.id);
                }
              }
            }
            searchSource = 'ai_agent_grounded';
          }
        } catch (aiErr) {
          console.error('AI Search fallback error:', aiErr);
        }
      }

      // 3. Attach 1gb.uz live search links and recommendations
      const liveOneGbArticles = await search1gbLiveContent(
        cleanQuery,
        userAccount?.sessionToken
      );

      // 4. Attach verified Lex.uz legislation sources and exact laws
      const sourcesLexUz = findLexUzSourcesForQuery(
        cleanQuery,
        finalResults[0]?.taxCodeArticle
      );

      res.json({
        success: true,
        query: cleanQuery,
        results: finalResults,
        articles1gb: liveOneGbArticles,
        sourcesLexUz,
        source: searchSource,
        totalMatches: finalResults.length,
      });
    } catch (err: any) {
      console.error('Search endpoint error:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Ошибка поиска терминов',
      });
    }
  });

  // API Route: Ask Chief Accountant Advisor
  app.post('/api/advisor/ask', async (req: Request, res: Response) => {
    try {
      const { question, termContext } = req.body;
      if (!question || !question.trim()) {
        return res.status(400).json({ error: 'Вопрос не может быть пустым' });
      }

      const answer = await askAdvisorQuestion(question.trim(), termContext);
      res.json({
        success: true,
        answer,
      });
    } catch (err: any) {
      console.error('Advisor error:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Ошибка генерации ответа',
      });
    }
  });

  // Vite middleware setup
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`1gb.uz AI Lexicon Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
