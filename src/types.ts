export interface Collocation {
  ru: string;
  uzCyrillic: string;
  uzLatin: string;
}

export interface LexUzSource {
  id: string;
  titleRu: string;
  titleUz: string;
  actType: 'Кодекс' | 'Закон' | 'БҲМС' | 'Постановление' | 'Приказ' | 'Инструкция';
  docId: string;
  url: string;
  urlUz?: string;
  articleOrSection?: string;
  status: 'Официальный текст' | 'Действующая редакция';
  descriptionRu: string;
  descriptionUz: string;
  keywords: string[];
}

export interface AccountingTerm {
  id: string;
  abbreviationRu?: string;
  termRu: string;
  abbreviationUzCyrillic?: string;
  termUzCyrillic: string;
  abbreviationUzLatin?: string;
  termUzLatin: string;
  category: 'Налоги' | 'Бухучет' | 'Зарплата и кадры' | 'Отчетность и документы' | 'Банк и финансы' | 'Право и проверки';
  taxCodeArticle?: string;
  chartOfAccounts?: string;
  rateOrNorm?: string;
  definitionRu: string;
  definitionUz: string;
  context1gb: string;
  lexUzReference?: string;
  lexUzUrl?: string;
  lexUzActTitle?: string;
  lexUzExactTermRu?: string;
  lexUzExactTermUz?: string;
  commonCollocations: Collocation[];
  keywords?: string[];
}

export interface OneGbUserAccount {
  accountIdentifier: string;
  authType: 'credentials' | 'session_cookie' | 'guest';
  isConnected: boolean;
  userFullName?: string;
  subscriptionPlan?: string;
  companyName?: string;
  lastVerifiedAt?: string;
  sessionToken?: string;
}

export interface OneGbArticle {
  title: string;
  rubric: string;
  url: string;
  snippet: string;
  publishedDate?: string;
}

export interface SearchResponse {
  success: boolean;
  query: string;
  results: AccountingTerm[];
  articles1gb?: OneGbArticle[];
  sourcesLexUz?: LexUzSource[];
  source: 'knowledge_base' | 'ai_agent' | 'ai_agent_grounded' | 'empty';
  totalMatches: number;
}
