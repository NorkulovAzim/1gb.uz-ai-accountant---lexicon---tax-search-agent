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
  commonCollocations: Array<{
    ru: string;
    uzCyrillic: string;
    uzLatin: string;
  }>;
  keywords: string[];
}

export const UZ_ACCOUNTING_TERMS: AccountingTerm[] = [
  {
    id: 'vat-nds-qqs',
    abbreviationRu: 'НДС',
    termRu: 'Налог на добавленную стоимость',
    abbreviationUzCyrillic: 'ҚҚС',
    termUzCyrillic: 'Қўшилган қиймат солиғи',
    abbreviationUzLatin: 'QQS',
    termUzLatin: "Qo'shilgan qiymat solig'i",
    category: 'Налоги',
    taxCodeArticle: 'НК РУз Раздел Х, Главы 36–40 (Статьи 235–277)',
    chartOfAccounts: 'Счет 4410 (Бюджетга бўнак тўловлари - ҚҚС) / Счет 6410 (Бюджетга тўловлар бўйича қарздорлик - ҚҚС)',
    rateOrNorm: 'Базовая ставка: 12% (с 1 января 2023 г.)',
    definitionRu: 'Косвенный налог, взимаемый при реализации товаров, работ и услуг на территории Узбекистана, а также при импорте. Начисляется на добавленную стоимость.',
    definitionUz: 'Ўзбекистон ҳудудида товарлар (хизматлар) реализация қилинганда ва импорт жараёнида ундириладиган эгри солиқ. Қўшилган қиймат базасидан ҳисобланади.',
    context1gb: '1gb.uz: Зачет (ҳисобга олиш) производится исключительно по электронным счетам-фактурам (ЭҲФ) через системы электронного документооборота (Didox, Soliq.uz). Отрицательное сальдо подлежит ускоренному или общему возврату на расчетный счет.',
    commonCollocations: [
      { ru: 'Уплата НДС', uzCyrillic: 'ҚҚС тўлаш', uzLatin: "QQS to'lash" },
      { ru: 'Зачет входного НДС', uzCyrillic: 'Кирувчи ҚҚСни ҳисобга олиш (зачёт)', uzLatin: "Kiruvchi QQSni hisobga olish" },
      { ru: 'Счет-фактура с НДС', uzCyrillic: 'ҚҚСли ҳисоб-фактура', uzLatin: "QQSli hisob-faktura" },
      { ru: 'Ставка НДС 12%', uzCyrillic: '12 фоизли ҚҚС ставкаси', uzLatin: "12 foizli QQS stavkasi" },
      { ru: 'Возврат НДС', uzCyrillic: 'ҚҚСни қайтариш (қоплаш)', uzLatin: "QQSni qaytarish (qoplash)" },
      { ru: 'Освобождение от НДС (льгота)', uzCyrillic: 'ҚҚСдан озод этиш (имтиёз)', uzLatin: "QQSdan ozod etish (imtiyoz)" },
      { ru: 'Налоговая база по НДС', uzCyrillic: 'ҚҚС бўйича солиқ солиш базаси', uzLatin: "QQS bo'yicha soliq solish bazasi" }
    ],
    keywords: ['ндс', 'ккс', 'ққс', 'qqs', 'vat', 'налог на добавленную стоимость', 'кошилган киймат', 'кушилган киймат солиги', 'qo\'shilgan qiymat']
  },
  {
    id: 'pit-ndfl-jshds',
    abbreviationRu: 'НДФЛ',
    termRu: 'Налог на доходы физических лиц',
    abbreviationUzCyrillic: 'ЖШДС / ЖШОДС',
    termUzCyrillic: 'Жисмоний шахслардан олинадиган даромад солиғи',
    abbreviationUzLatin: 'JSHDS / JSHODS',
    termUzLatin: "Jismoniy shaxslardan olinadigan daromad solig'i",
    category: 'Налоги',
    taxCodeArticle: 'НК РУз Раздел ХII, Главы 48–53 (Статьи 364–392)',
    chartOfAccounts: 'Счет 6710 (Ходимлар билан меҳнат ҳақи бўйича ҳисоб-китоблар) / Счет 6410/ЖШДС',
    rateOrNorm: 'Плоская ставка: 12% (доходы резидентов). Дивиденды/проценты: 5%.',
    definitionRu: 'Прямой налог, удерживаемый налоговым агентом (работодателем) с доходов физических лиц (заработная плата, премии, материальная выгода, дивиденды).',
    definitionUz: 'Жисмоний шахсларнинг даромадларидан (ойлик маош, мукофотлар, дивидендлар) солиқ агенти томонидан ушлаб қолинадиган тўғридан-тўғри солиқ.',
    context1gb: '1gb.uz: Отчетность по НДФЛ (ЖШДС/ЖШОДС) и социальному налогу сдается ежемесячно до 15 числа месяца, следующего за отчетным. 0.1% от начисленного дохода перечисляется на ИНПС (ШЖБПҲ).',
    commonCollocations: [
      { ru: 'Удержание НДФЛ', uzCyrillic: 'ЖШДС / ЖШОДС ушлаб қолиш', uzLatin: "JSHDS ushlab qolish" },
      { ru: 'Декларация о доходах', uzCyrillic: 'Даромадлар тўғрисида декларация', uzLatin: "Daromadlar to'g'risida deklaratsiya" },
      { ru: 'Налоговый вычет', uzCyrillic: 'Солиқ чегирмаси', uzLatin: "Soliq chegirmasi" },
      { ru: 'Доходы в виде оплаты труда', uzCyrillic: 'Меҳнатга ҳақ тўлаш тарзидаги даромадлар', uzLatin: "Mehnatga haq to'lash tarzidagi daromadlar" }
    ],
    keywords: [
      'ндфл',
      'жшдс',
      'жшодс',
      'jshds',
      'jshods',
      'налог на доходы физических лиц',
      'подоходный',
      'подоходный налог',
      'жисмоний шахслардан олинадиган даромад солиги',
      'жисмоний шахслар даромад солиги'
    ]
  },
  {
    id: 'brv-bhm',
    abbreviationRu: 'БРВ',
    termRu: 'Базовая расчетная величина',
    abbreviationUzCyrillic: 'БҲМ',
    termUzCyrillic: 'Базавий ҳисоблаш миқдори',
    abbreviationUzLatin: 'BHM',
    termUzLatin: 'Bazaviy hisoblash miqdori',
    category: 'Отчетность и документы',
    taxCodeArticle: 'Указы Президента РУз о повышении зарплат и пособий',
    chartOfAccounts: 'Расчетный норматив для штрафов, пошлин, сборов и налоговых пределов',
    rateOrNorm: 'Устанавливается указами Президента РУз',
    definitionRu: 'Единый нормативный расчетный показатель в Республике Узбекистан, используемый для исчисления налогов, пошлин, штрафов, государственных сборов и предельных сумм.',
    definitionUz: 'Ўзбекистонда солиқлар, давлат божлари, жарималар, йиғимлар ва имтиёз меъёрларини ҳисоблаш учун қўлланиладиган асосий кўрсаткич.',
    context1gb: '1gb.uz: При изменении БРВ пересчитываются минимальные уставные фонды, размеры пошлин, административные штрафы и пороги обязательного аудита.',
    commonCollocations: [
      { ru: 'Кратность БРВ', uzCyrillic: 'БҲМ баравари', uzLatin: 'BHM baravari' },
      { ru: 'Штраф в размере 5 БРВ', uzCyrillic: 'БҲМнинг 5 баравари миқдоридаги жарима', uzLatin: "BHMning 5 baravari miqdoridagi jarima" },
      { ru: 'Госпошлина от БРВ', uzCyrillic: 'БҲМдан ҳисобланган давлат божи', uzLatin: "BHMdan hisoblangan davlat boji" }
    ],
    keywords: ['брв', 'бҳм', 'бхм', 'bhm', 'brv', 'базовая расчетная величина', 'базавий хисоблаш микдори', 'bazaviy hisoblash miqdori']
  },
  {
    id: 'mrot-mhekm',
    abbreviationRu: 'МРОТ',
    termRu: 'Минимальный размер оплаты труда',
    abbreviationUzCyrillic: 'МҲЭКМ',
    termUzCyrillic: 'Меҳнатга ҳақ тўлашнинг энг кам миқдори',
    abbreviationUzLatin: 'MHEKM',
    termUzLatin: "Mehnatga haq to'lashning eng kam miqdori",
    category: 'Зарплата и кадры',
    taxCodeArticle: 'Трудовой кодекс РУз, ст. 245; НК РУз ст. 388',
    chartOfAccounts: 'Минимальный порог начисления заработной платы (Счет 6710)',
    rateOrNorm: 'Устанавливается указами Президента (ниже платить за полный месяц запрещено)',
    definitionRu: 'Гарантированный законодательством минимум месячной оплаты труда работника за выполнение трудовых обязанностей при нормальной продолжительности рабочего времени.',
    definitionUz: 'Иш вақтининг нормал давомийлигида ўз меҳнат мажбуриятларини бажарган ходим учун қонунчиликда кафолатланган ойлик иш ҳақининг энг қуйи чегараси.',
    context1gb: '1gb.uz: Заработная плата сотрудника за полностью отработанную месячную норму часов не может быть ниже 1 МРОТ. Нарушение влечет штраф по ст. 49 КоАО РУз.',
    commonCollocations: [
      { ru: 'Оклад не ниже МРОТ', uzCyrillic: 'МҲЭКМдан кам бўлмаган маош', uzLatin: "MHEKMdan kam bo'lmagan maosh" },
      { ru: 'Тарифная сетка', uzCyrillic: 'Ягона тариф сеткаси', uzLatin: 'Yagona tarif setkasi' }
    ],
    keywords: ['мрот', 'мҳэкм', 'мхэкм', 'mhekm', 'mrot', 'минимальный размер оплаты труда', 'мехнатга хак толашнинг энг кам микдори']
  },
  {
    id: 'esf-ehf',
    abbreviationRu: 'ЭСФ',
    termRu: 'Электронная счет-фактура',
    abbreviationUzCyrillic: 'ЭҲФ',
    termUzCyrillic: 'Электрон ҳисоб-фактура',
    abbreviationUzLatin: 'EHF',
    termUzLatin: 'Elektron hisob-faktura',
    category: 'Отчетность и документы',
    taxCodeArticle: 'НК РУз Статья 47; Положение КМ РУз № 489',
    chartOfAccounts: 'Первичный документ для Счетов 4010, 6010, 4410, 6410',
    rateOrNorm: 'Обязательна для всех юрлиц и ИП через аккредитованных операторов ЭДО',
    definitionRu: 'Электронный первичный документ строгой отчетности с ЭЦП, подтверждающий отгрузку товаров, выполнение работ или оказание услуг.',
    definitionUz: 'Товарлар етказиб берилганлиги, ишлар бажарилганлиги ёки хизматлар кўрсатилганлигини тасдиқловчи ЭРИ билан имзоланган электрон бирламчи ҳужжат.',
    context1gb: '1gb.uz: Счет-фактура выставляется не позднее даты фактической отгрузки или выполнения работ (при длящихся услугах — до 10 числа следующего месяца).',
    commonCollocations: [
      { ru: 'Выставить счет-фактуру', uzCyrillic: 'Ҳисоб-фактурани тақдим этиш (расмийлаштириш)', uzLatin: "Hisob-fakturani taqdim etish" },
      { ru: 'Подписать ЭСФ с ЭЦП', uzCyrillic: 'ЭҲФни ЭРИ билан тасдиқлаш', uzLatin: "EHFni ERI bilan tasdiqlash" },
      { ru: 'Исправительная счет-фактура', uzCyrillic: 'Тузетувчи ҳисоб-фактура', uzLatin: 'Tuzatuvchi hisob-faktura' },
      { ru: 'Дополнительная счет-фактура', uzCyrillic: 'Қўшимча ҳисоб-фактура', uzLatin: "Qo'shimcha hisob-faktura" }
    ],
    keywords: ['эсф', 'эҳф', 'эхф', 'ehf', 'esf', 'электронная счет-фактура', 'счет-фактура', 'ҳисоб-фактура', 'хисоб-фактура', 'hisob-faktura']
  },
  {
    id: 'ikpu-mxik',
    abbreviationRu: 'ИКПУ',
    termRu: 'Идентификационный код товаров и услуг',
    abbreviationUzCyrillic: 'МХИК',
    termUzCyrillic: 'Маҳсулотлар ва хизматларнинг идентификация коди',
    abbreviationUzLatin: 'MXIK',
    termUzLatin: 'Mahsulotlar va xizmatlarning identifikatsiya kodi',
    category: 'Отчетность и документы',
    taxCodeArticle: 'Положение КМ РУз № 249; Tasnif.soliq.uz',
    chartOfAccounts: 'Классификатор номенклатуры в счетах-фактурах и чеках онлайн-ККМ',
    rateOrNorm: '17-значный цифровой код Единого электронного национального каталога',
    definitionRu: 'Универсальный цифровой код в Узбекистане, определяющий категорию, бренд и единицу измерения товара или услуги в чеках ККМ и электронных счетах-фактурах.',
    definitionUz: 'Товар ва хизматларнинг миллий электрон каталоги (tasnif.soliq.uz) бўйича тури, ўлчов бирлиги ва таснифини белгиловчи ягона 17 хонали код.',
    context1gb: '1gb.uz: Неправильное указание ИКПУ в чеке или ЭСФ приравнивается к нарушению правил торговли и влечет блокировку льгот или штрафы со стороны Налогового комитета.',
    commonCollocations: [
      { ru: 'Каталог ИКПУ', uzCyrillic: 'МХИК классификатори (каталоги)', uzLatin: 'MXIK katalogi' },
      { ru: 'Привязка ИКПУ к номенклатуре', uzCyrillic: 'МХИКни номенклатурага бириктириш', uzLatin: "MXIKni nomenklaturaga biriktirish" }
    ],
    keywords: ['икпу', 'мхик', 'mxik', 'ikpu', 'идентификационный код товаров и услуг', 'махсулотлар ва хизматлар идентификация коди']
  },
  {
    id: 'corporate-income-tax',
    abbreviationRu: 'НП',
    termRu: 'Налог на прибыль',
    abbreviationUzCyrillic: 'ФС',
    termUzCyrillic: 'Фойда солиғи',
    abbreviationUzLatin: 'FS',
    termUzLatin: "Foyda solig'i",
    category: 'Налоги',
    taxCodeArticle: 'НК РУз Раздел ХI, Главы 41–47 (Статьи 301–363)',
    chartOfAccounts: 'Счет 9810 (Фойда солиғи бўйича харажатлар) / Счет 6410/Фойда солиғи',
    rateOrNorm: 'Базовая ставка: 15% (Банки, сотовые операторы, рынки: 20%)',
    definitionRu: 'Прямой налог с совокупного совокупного дохода за вычетом экономически оправданных и документально подтвержденных расходов предприятия.',
    definitionUz: 'Корхонанинг жами даромадидан иқтисодий жиҳатдан асосланган ва ҳужжатлар билан тасдиқланган харажатларни чегириб ташлаган ҳолда ундириладиган солиқ.',
    context1gb: '1gb.uz: Авансовые справки по налогу на прибыль предоставляются ежемесячно до 23 числа, если совокупный доход превысил 10 млрд сумов.',
    commonCollocations: [
      { ru: 'Налогооблагаемая прибыль', uzCyrillic: 'Солиқ солинадиган фойда', uzLatin: "Soliq solinadigan foyda" },
      { ru: 'Невычитаемые расходы', uzCyrillic: 'Чегириб ташланмайдиган харажатлар', uzLatin: "Chegirib tashlanmaydigan xarajatlar" },
      { ru: 'Убытки прошлых лет', uzCyrillic: 'Ўтган йиллар зарарларини кўчириш', uzLatin: "O'tgan yillar zararlarini ko'chirish" }
    ],
    keywords: ['налог на прибыль', 'фойда солиги', 'foyda soligi', 'прибыль солиғи']
  },
  {
    id: 'turnover-tax',
    abbreviationRu: 'НО',
    termRu: 'Налог с оборота',
    abbreviationUzCyrillic: 'АС',
    termUzCyrillic: 'Айланмадан олинадиган солиқ',
    abbreviationUzLatin: 'AS',
    termUzLatin: 'Aylanmadan olinadigan soliq',
    category: 'Налоги',
    taxCodeArticle: 'НК РУз Раздел ХVIII, Глава 66 (Статьи 461–470)',
    chartOfAccounts: 'Счет 9820 / Счет 6410 (Айланмадан солиқ)',
    rateOrNorm: 'Базовая ставка: 4% (или фиксированная сумма 20-30 млн сумов в год)',
    definitionRu: 'Упрощенный режим налогообложения для субъектов малого бизнеса с совокупным доходом до 1 миллиарда сумов в год, заменяющий НДС и налог на прибыль.',
    definitionUz: 'Йиллик жами даромади 1 миллиард сўмгача бўлган кичик бизнес субъектлари учун ҚҚС ва фойда солиғи ўрнига қўлланиладиган соддалаштирилган солиқ тартиби.',
    context1gb: '1gb.uz: При превышении порога в 1 млрд сумов в течение года налогоплательщик обязан с первого числа следующего месяца перейти на уплату НДС и налога на прибыль.',
    commonCollocations: [
      { ru: 'Фиксированный налог с оборота', uzCyrillic: 'Қатъий белгиланган суммадаги айланма солиғи', uzLatin: "Qat'iy belgilangan aylanma solig'i" },
      { ru: 'Переход на НДС с оборота', uzCyrillic: 'Айланма солиғидан ҚҚСга ўтиш', uzLatin: "Aylanma solig'idan QQSga o'tish" }
    ],
    keywords: ['налог с оборота', 'айланмадан олинадиган солиқ', 'айланма солик', 'aylanmadan olinadigan soliq']
  },
  {
    id: 'social-tax',
    abbreviationRu: 'СН',
    termRu: 'Социальный налог',
    abbreviationUzCyrillic: 'ИС',
    termUzCyrillic: 'Ижтимоий солиқ',
    abbreviationUzLatin: 'IS',
    termUzLatin: 'Ijtimoiy soliq',
    category: 'Налоги',
    taxCodeArticle: 'НК РУз Раздел ХIII, Глава 54 (Статьи 402–407)',
    chartOfAccounts: 'Счет 9400/Расходы по соц.налогу / Счет 6520 (Давлат мақсадли жамғармалари)',
    rateOrNorm: '12% для коммерческих предприятий (25% для бюджетных организаций)',
    definitionRu: 'Налог, начисляемый работодателем сверх фонда оплаты труда работников для финансирования пенсионного обеспечения и социальных фондов.',
    definitionUz: 'Пенсия таъминоти ва ижтимоий фондларни молиялаштириш учун иш берувчи томонидан ходимларнинг меҳнат ҳақи фонди устига ҳисобланадиган солиқ.',
    context1gb: '1gb.uz: Социальный налог уплачивается за счет средств работодателя и относится на расходы периода или себестоимость продукции (Счета 2010, 2310, 9410, 9420).',
    commonCollocations: [
      { ru: 'Начисление соцналога', uzCyrillic: 'Ижтимоий солиқни ҳисоблаш', uzLatin: "Ijtimoiy soliqni hisoblash" },
      { ru: 'Льгота по соцналогу', uzCyrillic: 'Ижтимоий солиқ бўйича имтиёз', uzLatin: "Ijtimoiy soliq bo'yicha imtiyoz" }
    ],
    keywords: ['социальный налог', 'соцналог', 'ижтимоий солиқ', 'ижтимоий солик', 'ijtimoiy soliq']
  },
  {
    id: 'os-av',
    abbreviationRu: 'ОС',
    termRu: 'Основные средства',
    abbreviationUzCyrillic: 'АВ',
    termUzCyrillic: 'Асосий воситалар',
    abbreviationUzLatin: 'AV',
    termUzLatin: 'Asosiy vositalar',
    category: 'Бухучет',
    taxCodeArticle: 'НСБУ №5 (5-сон БҲМС); НК РУз ст. 306 (Амортизация)',
    chartOfAccounts: 'Счет 0100 (Асосий воситалар) / Счет 0200 (Эскириш)',
    rateOrNorm: 'Срок службы более 1 года и стоимость выше лимита учетной политики (обычно 50 БҲМ)',
    definitionRu: 'Материальные активы, действующие в качестве средств труда в течение длительного времени (более 1 года) при производстве продукции или управлении.',
    definitionUz: 'Корхонада маҳсулот ишлаб чиқариш ёки маъмурий мақсадларда бир йилдан ортиқ фойдаланиладиган меҳнат воситалари тарзидаги моддий активлар.',
    context1gb: '1gb.uz: Амортизация начисляется ежемесячно начиная с месяца, следующего за вводом объекта в эксплуатацию (Линейный метод, уменьшаемого остатка и др.).',
    commonCollocations: [
      { ru: 'Ввод в эксплуатацию ОС', uzCyrillic: 'Асосий воситани фойдаланишга топшириш', uzLatin: "Asosiy vositani foydalanishga topshirish" },
      { ru: 'Амортизация ОС', uzCyrillic: 'Асосий воситаларнинг эскириши (амортизацияси)', uzLatin: "Asosiy vositalarning eskirishi" },
      { ru: 'Списание ОС', uzCyrillic: 'Асосий воситани ҳисобдан чиқариш', uzLatin: "Asosiy vositani hisobdan chiqarish" },
      { ru: 'Переоценка основных средств', uzCyrillic: 'Асосий воситаларни қайта баҳолаш', uzLatin: "Asosiy vositalarni qayta baholash" }
    ],
    keywords: ['ос', 'ав', 'av', 'os', 'основные средства', 'асосий воситалар', 'asosiy vositalar']
  },
  {
    id: 'tmc-tmb',
    abbreviationRu: 'ТМЦ',
    termRu: 'Товарно-материальные ценности (запасы)',
    abbreviationUzCyrillic: 'ТМБ',
    termUzCyrillic: 'Товар-моддий бойликлар (захиралар)',
    abbreviationUzLatin: 'TMB',
    termUzLatin: 'Tovar-moddiy boyliklar',
    category: 'Бухучет',
    taxCodeArticle: 'НСБУ №4 (4-сон БҲМС "Товар-моддий захиралар")',
    chartOfAccounts: 'Счет 1000 (Материаллар), Счет 2800 (Тайёр маҳсулот), Счет 2900 (Товарлар)',
    rateOrNorm: 'Оценка по себестоимости (метод средней взвешенной или ФИФО/АВЕКО)',
    definitionRu: 'Активы в виде сырья, материалов, незавершенного производства, готовой продукции и товаров, предназначенных для продажи или потребления.',
    definitionUz: 'Ишлаб чиқаришда ишлатиш ёки сотиш учун мўлжалланган хом ашё, материаллар, чала маҳсулотлар ва тайёр товарлар шаклидаги захиралар.',
    context1gb: '1gb.uz: Поступление ТМЦ оформляется доверенностью и накладной/ЭСФ. Списание в производство отражается требованием-накладной.',
    commonCollocations: [
      { ru: 'Оприходование ТМЦ', uzCyrillic: 'ТМБларни кирим қилиш', uzLatin: 'TMBlarni kirim qilish' },
      { ru: 'Списание материалов', uzCyrillic: 'Материалларни харажатга чиқариш', uzLatin: 'Materiallarni xarajatga chiqarish' },
      { ru: 'Инвентаризация запасов', uzCyrillic: 'Захираларни инвентаризация қилиш (рўйхатдан ўтказиш)', uzLatin: "Zaxiralarni inventarizatsiya qilish" }
    ],
    keywords: ['тмц', 'тмб', 'tmb', 'tmc', 'товарно-материальные ценности', 'товар-моддий бойликлар', 'запасы']
  },
  {
    id: 'akt-sverki',
    abbreviationRu: 'Акт сверки',
    termRu: 'Акт сверки взаиморасчетов',
    abbreviationUzCyrillic: 'Таққослаш далолатномаси',
    termUzCyrillic: 'Ўзаро ҳисоб-китобларни таққослаш далолатномаси',
    abbreviationUzLatin: 'Taqqoslash dalolatnomasi',
    termUzLatin: "O'zaro hisob-kitoblarni taqqoslash dalolatnomasi",
    category: 'Отчетность и документы',
    taxCodeArticle: 'Гражданский кодекс РУз; Закон "О бухгалтерском учете" ст. 19',
    chartOfAccounts: 'Счета 4010, 6010, 4310, 6310',
    rateOrNorm: 'Обязателен перед составлением годовой отчетности и инвентаризацией расчетов',
    definitionRu: 'Документ, отражающий состояние взаимных финансовых расчетов между двумя контрагентами за определенный период времени.',
    definitionUz: 'Икки ҳамкор корхона ўртасида муайян давр учун ўзаро қарздорлик ва ҳисоб-китоблар ҳолатини кўрсатувчи ҳужжат.',
    context1gb: '1gb.uz: Подписанный обеими сторонами акт сверки прерывает срок исковой давности (3 года) по взысканию дебиторской задолженности.',
    commonCollocations: [
      { ru: 'Подписание акта сверки', uzCyrillic: 'Таққослаш далолатномасини имзолаш', uzLatin: 'Taqqoslash dalolatnomasini imzolash' },
      { ru: 'Расхождения в расчетах', uzCyrillic: 'Ҳисоб-китоблардаги тафовутлар', uzLatin: "Hisob-kitoblardagi tafovutlar" }
    ],
    keywords: ['акт сверки', 'таккослаш далолатномаси', 'таққослаш далолатномаси', 'akt sverki', 'taqqoslash dalolatnomasi']
  },
  {
    id: 'osv-saldo',
    abbreviationRu: 'ОСВ',
    termRu: 'Оборотно-сальдовая ведомость',
    abbreviationUzCyrillic: 'АСҚ',
    termUzCyrillic: 'Айланма-салдо қайдномаси',
    abbreviationUzLatin: 'ASQ',
    termUzLatin: 'Aylanma-saldo qaydnomasi',
    category: 'Бухучет',
    taxCodeArticle: 'НСБУ №21 "Единый план счетов бухгалтерского учета"',
    chartOfAccounts: 'Сводная сводка по счетам 0100 – 9900',
    rateOrNorm: 'Основной рабочий регистр главного бухгалтера',
    definitionRu: 'Сводная бухгалтерская таблица, содержащая начальное сальдо, дебетовые и кредитовые обороты и конечное сальдо по всем синтетическим счетам.',
    definitionUz: 'Барча синтетик счётлар бўйича бошланғич қолдиқ, дебет-кредит айланмалари ва охирги сальдони акс эттирувчи бош бухгалтернинг асосий ҳисобот жадвали.',
    context1gb: '1gb.uz: ОСВ является основой для составления Бухгалтерского баланса (Форма №1) и Отчета о финансовых результатах (Форма №2).',
    commonCollocations: [
      { ru: 'Сформировать ОСВ', uzCyrillic: 'Айланма-салдо қайдномасини шакллантириш', uzLatin: "Aylanma-saldo qaydnomasini shakllantirish" },
      { ru: 'Кредитовое сальдо', uzCyrillic: 'Кредит қолдиғи (сальдоси)', uzLatin: "Kredit qoldig'i" },
      { ru: 'Дебетовый оборот', uzCyrillic: 'Дебет айланмаси', uzLatin: 'Debet aylanmasi' }
    ],
    keywords: ['осв', 'оборотно-сальдовая ведомость', 'айланма салдо', 'aylanma saldo', 'сальдо', 'оборотка']
  },
  {
    id: 'doverennost-ishonchnoma',
    abbreviationRu: 'Доверенность',
    termRu: 'Доверенность на получение ТМЦ',
    abbreviationUzCyrillic: 'Ишончнома',
    termUzCyrillic: 'ТМБ олиш учун ишончнома',
    abbreviationUzLatin: 'Ishonchnoma',
    termUzLatin: 'TMB olish uchun ishonchnoma',
    category: 'Отчетность и документы',
    taxCodeArticle: 'НСБУ №19 "Порядок выдачи доверенностей на получение ТМЦ"',
    chartOfAccounts: 'Забалансовый учет бланков строгой отчетности',
    rateOrNorm: 'Срок действия обычно не превышает 10-15 дней (при регулярных поставках — до месяца)',
    definitionRu: 'Письменное уполномочие сотрудника на прием материальных ценностей от поставщика по договору.',
    definitionUz: 'Ходимга етказиб берувчидан шартнома асосида товар ва моддий бойликларни қабул қилиб олиш ҳуқуқини берувчи ёзма ваколат ҳужжати.',
    context1gb: '1gb.uz: Отпуск товаров без надлежаще оформленной доверенности или по доверенности с истекшим сроком признается нарушением порядка отгрузки.',
    commonCollocations: [
      { ru: 'Срок действия доверенности', uzCyrillic: 'Ишончноманинг амал қилиш муддати', uzLatin: "Ishonchnomaning amal qilish muddati" },
      { ru: 'Реестр выданных доверенностей', uzCyrillic: 'Берилган ишончномалар реестри (дафтари)', uzLatin: 'Berilgan ishonchnomalar reyestri' }
    ],
    keywords: ['доверенность', 'ишончнома', 'ishonchnoma', 'doverennost']
  },
  {
    id: 'komandirovka-safari',
    abbreviationRu: 'Командировочные',
    termRu: 'Командировочные расходы',
    abbreviationUzCyrillic: 'Хизмат сафари',
    termUzCyrillic: 'Хизмат сафари харажатлари',
    abbreviationUzLatin: 'Xizmat safari',
    termUzLatin: 'Xizmat safari xarajatlari',
    category: 'Зарплата и кадры',
    taxCodeArticle: 'Положение КМ РУз № 424; НК РУз ст. 305, 369',
    chartOfAccounts: 'Счет 4220 (Хизмат сафарлари бўйича бўнак берилган суммалар) / Счет 9420',
    rateOrNorm: 'Суточные, расходы по найму жилья и проезд по установленным нормативам',
    definitionRu: 'Компенсационные выплаты работнику, направленному работодателем в служебную поездку вне постоянного места работы.',
    definitionUz: 'Иш берувчининг буйруғи билан доимий иш жойидан ташқарида хизмат вазифасини бажариш учун юборилган ходимга тўланадиган харажатлар.',
    context1gb: '1gb.uz: Суточные в пределах установленных норм не облагаются НДФЛ и социальным налогом. Сверхнормативные суточные включаются в доход в виде матвыгоды.',
    commonCollocations: [
      { ru: 'Суточные расходы', uzCyrillic: 'Кундалик харажатлар (суточные)', uzLatin: 'Kundalik xarajatlar' },
      { ru: 'Авансовый отчет', uzCyrillic: 'Бўнак (аванс) ҳисоботи', uzLatin: "Bo'nak (avans) hisoboti" },
      { ru: 'Командировочное удостоверение', uzCyrillic: 'Хизмат сафари гувоҳномаси', uzLatin: 'Xizmat safari guvohnomasi' }
    ],
    keywords: ['командировочные расходы', 'командировка', 'хизмат сафари', 'xizmat safari', 'суточные']
  },
  {
    id: 'debitor-kreditor',
    abbreviationRu: 'ДЗ / КЗ',
    termRu: 'Дебиторская и кредиторская задолженность',
    abbreviationUzCyrillic: 'Дебиторлик ва кредиторлик қарзлари',
    termUzCyrillic: 'Дебиторлик ва кредиторлик қарздорлиги',
    abbreviationUzLatin: 'Debitorlik va kreditorlik qarzlari',
    termUzLatin: 'Debitorlik va kreditorlik qarzdorligi',
    category: 'Бухучет',
    taxCodeArticle: 'НК РУз ст. 313 (Безнадежные долги); Указ Президента РУз УП-1114',
    chartOfAccounts: 'Счета 4000 (Дебиторы) / Счета 6000 (Кредиторы)',
    rateOrNorm: 'Срок исковой давности: 3 года (90 дней без движения для госпредприятий)',
    definitionRu: 'Обязательства контрагентов перед организацией (дебиторская) и организации перед контрагентами/бюджетом (кредиторская).',
    definitionUz: 'Бошқа шахсларнинг корхона олдидаги (дебиторлик) ва корхонанинг ҳамкорлар, ходимлар ҳамда бюджет олдидаги (кредиторлик) молиявий мажбуриятлари.',
    context1gb: '1gb.uz: Просроченная кредиторская задолженность с истекшим сроком исковой давности списывается на доходы предприятия (Счет 9360) и облагается налогом.',
    commonCollocations: [
      { ru: 'Списание безнадежной дебиторской задолженности', uzCyrillic: 'Умидсиз дебиторлик қарзини ҳисобдан чиқариш', uzLatin: "Umidsiz debitorlik qarzini hisobdan chiqarish" },
      { ru: 'Резерв по сомнительным долгам', uzCyrillic: 'Шубҳали қарзлар бўйича захира', uzLatin: "Shubhali qarzlar bo'yicha zaxira" }
    ],
    keywords: ['дебиторская задолженность', 'кредиторская задолженность', 'дебиторка', 'кредиторка', 'дебиторлик карзи', 'debitorlik qarzi']
  },
  {
    id: 'buxgalteriya-balansi',
    abbreviationRu: 'Баланс',
    termRu: 'Бухгалтерский баланс (Форма №1)',
    abbreviationUzCyrillic: 'Баланс',
    termUzCyrillic: 'Бухгалтерия баланси (1-сон шакл)',
    abbreviationUzLatin: 'Balans',
    termUzLatin: 'Buxgalteriya balansi (1-son shakl)',
    category: 'Отчетность и документы',
    taxCodeArticle: 'НСБУ №15 "Бухгалтерский баланс"; Закон "О бухгалтерском учете"',
    chartOfAccounts: 'Актив (100-400 строки) = Пассив (410-790 строки)',
    rateOrNorm: 'Годовая финансовая отчетность для субъектов малого бизнеса до 15 февраля/марта',
    definitionRu: 'Главная форма финансовой отчетности, отражающая состав и стоимость активов, обязательств и капитала предприятия на определенную отчетную дату.',
    definitionUz: 'Корхонанинг муайян ҳисобот санасидаги активлари, мажбуриятлари ва хусусий капитали ҳолатини пул қийматида акс эттирувчи асосий молиявий ҳисобот шакли.',
    context1gb: '1gb.uz: Баланс сдается в налоговые органы исключительно в электронном виде через кабинет налогоплательщика (my.soliq.uz).',
    commonCollocations: [
      { ru: 'Валюта баланса', uzCyrillic: 'Баланс валютаси (жами қиймати)', uzLatin: 'Balans valyutasi' },
      { ru: 'Нераспределенная прибыль в балансе', uzCyrillic: 'Балансдаги тақсимланмаган фойда', uzLatin: 'Taqsimlanmagan foyda' }
    ],
    keywords: ['бухгалтерский баланс', 'баланс', 'форма 1', 'бухгалтерия баланси', 'balans', '1-сон шакл']
  },
  {
    id: 'amortizatsiya-eskirish',
    abbreviationRu: 'Амортизация',
    termRu: 'Амортизация основных средств и нематериальных активов',
    abbreviationUzCyrillic: 'Эскириш',
    termUzCyrillic: 'Асосий воситалар ва номоддий активларнинг эскириши (амортизацияси)',
    abbreviationUzLatin: 'Eskirish',
    termUzLatin: "Asosiy vositalar va nomoddiy aktivlarning eskirishi (amortizatsiyasi)",
    category: 'Бухучет',
    taxCodeArticle: 'НК РУз Статья 306; НСБУ №5',
    chartOfAccounts: 'Счет 0200 (Эскириш) / Счет 0500 (НМА эскириши)',
    rateOrNorm: 'По нормам ст. 306 НК РУз или по учетной политике',
    definitionRu: 'Постепенный перенос стоимости основных средств и НМА по мере их физического и морального износа на себестоимость производимой продукции или расходы.',
    definitionUz: 'Асосий воситалар ва номоддий активлар қийматини уларнинг жисмоний ва маънавий эскиришига қараб ишлаб чиқарилаётган маҳсулот таннархига ёки давр харажатларига босқичма-босқич ўтказиб бориш.',
    context1gb: '1gb.uz: Для целей налога на прибыль применяются предельные нормы амортизации по Налоговому кодексу. Если в бухучете ставка выше, возникает временная разница.',
    commonCollocations: [
      { ru: 'Норма амортизации', uzCyrillic: 'Амортизация нормаси (меъёри)', uzLatin: "Amortizatsiya normasi" },
      { ru: 'Накопленная амортизация', uzCyrillic: 'Жамғарилган эскириш', uzLatin: "Jamg'arilgan eskirish" }
    ],
    keywords: ['амортизация', 'износ', 'эскириш', 'amortizatsiya', 'eskirish']
  },
  {
    id: 'ustavniy-fond',
    abbreviationRu: 'УФ / УК',
    termRu: 'Уставный фонд (уставный капитал)',
    abbreviationUzCyrillic: 'УФ',
    termUzCyrillic: 'Устав фонди (устав капитали)',
    abbreviationUzLatin: 'UF',
    termUzLatin: 'Ustav fondi (ustav kapitali)',
    category: 'Бухучет',
    taxCodeArticle: 'Закон РУз "Об обществах с ограниченной ответственностью"',
    chartOfAccounts: 'Счет 8330 (Пай ва улушлар) / Счет 4610 (Устав фондига таъсисчиларнинг қарзлари)',
    rateOrNorm: 'Размер определяется уставом при государственной регистрации в fo.birdarcha.uz',
    definitionRu: 'Совокупность вкладов (в денежной или натуральной форме), внесенных учредителями при создании коммерческой организации.',
    definitionUz: 'Тижорат ташкилоти ташкил этилаётганда муассислар томонидан киритилган улушлар (пул ёки мол-мулк тарзида) йиғиндиси.',
    context1gb: '1gb.uz: Увеличение или уменьшение уставного фонда подлежит государственной перерегистрации в Центре госуслуг (ЯИДХП/birdarcha).',
    commonCollocations: [
      { ru: 'Формирование уставного фонда', uzCyrillic: 'Устав фондини шакллантириш', uzLatin: 'Ustav fondini shakllantirish' },
      { ru: 'Вклад в уставный капитал', uzCyrillic: 'Устав капиталига улуш қўшиш', uzLatin: "Ustav kapitaliga ulush qo'shish" }
    ],
    keywords: ['уставный фонд', 'уставный капитал', 'устав фонди', 'ustav fondi', 'ук', 'уф']
  }
];

export function enrichTermWithLexUz(item: AccountingTerm): AccountingTerm {
  if (item.lexUzUrl && item.lexUzReference) {
    return item;
  }

  const queryKey = (item.abbreviationRu || item.termRu || '').toLowerCase();
  const cat = item.category || 'Бухучет';

  let lexUzUrl = 'https://lex.uz/docs/4674902';
  let lexUzReference = item.taxCodeArticle || 'Законодательство Республики Узбекистан (Lex.uz)';
  let lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
  let lexUzExactTermRu = item.abbreviationRu ? `${item.termRu} (${item.abbreviationRu})` : item.termRu;
  let lexUzExactTermUz = item.abbreviationUzCyrillic ? `${item.termUzCyrillic} (${item.abbreviationUzCyrillic})` : item.termUzCyrillic;

  if (item.id === 'vat-nds-qqs' || queryKey.includes('ндс') || queryKey.includes('ққс')) {
    lexUzUrl = 'https://lex.uz/docs/4674902';
    lexUzReference = 'НК РУз Раздел Х (Статьи 235–277)';
    lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Налог на добавленную стоимость (НДС)';
    lexUzExactTermUz = 'Қўшилган қиймат солиғи (ҚҚС)';
  } else if (item.id === 'pit-ndfl-jshds' || queryKey.includes('ндфл') || queryKey.includes('жшодс') || queryKey.includes('жшдс')) {
    lexUzUrl = 'https://lex.uz/docs/4674902';
    lexUzReference = 'НК РУз Раздел ХII (Статьи 364–392)';
    lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Налог на доходы физических лиц (НДФЛ)';
    lexUzExactTermUz = 'Жисмоний шахслардан олинадиган даромад солиғи (ЖШОДС / ЖШДС)';
  } else if (item.id === 'brv-bhm' || queryKey.includes('брв') || queryKey.includes('бҳм')) {
    lexUzUrl = 'https://lex.uz/search/natsearch?all=%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F+%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82%D0%BD%D0%B0%D1%8F+%D0%B2%D0%B5%D0%BB%D0%B8%D1%87%D0%B8%D0%BD%D0%B0';
    lexUzReference = 'Указы Президента РУз о размерах БҲМ / БРВ';
    lexUzActTitle = 'Официальные нормативы БҲМ (БРВ)';
    lexUzExactTermRu = 'Базовая расчетная величина (БРВ)';
    lexUzExactTermUz = 'Базавий ҳисоблаш миқдори (БҲМ)';
  } else if (item.id === 'mrot-mhekm' || queryKey.includes('мрот') || queryKey.includes('мҳэкм')) {
    lexUzUrl = 'https://lex.uz/docs/6257291';
    lexUzReference = 'Трудовой кодекс РУз, ст. 245; НК РУз ст. 388';
    lexUzActTitle = 'Трудовой кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Минимальный размер оплаты труда (МРОТ)';
    lexUzExactTermUz = 'Меҳнатга ҳақ тўлашнинг энг кам миқдори (МҲЭКМ)';
  } else if (item.id === 'esf-ehf' || queryKey.includes('эсф') || queryKey.includes('эҳф') || queryKey.includes('счет-фактура')) {
    lexUzUrl = 'https://lex.uz/docs/4952044';
    lexUzReference = 'Постановление КМ РУз №489; НК РУз ст. 47';
    lexUzActTitle = 'Положение о формах счетов-фактур и порядке их заполнения (ПКМ №489)';
    lexUzExactTermRu = 'Электронная счет-фактура (ЭСФ)';
    lexUzExactTermUz = 'Электрон ҳисоб-фактура (ЭҲФ)';
  } else if (item.id === 'ikpu-mxik' || queryKey.includes('икпу') || queryKey.includes('мхик')) {
    lexUzUrl = 'https://lex.uz/docs/5404179';
    lexUzReference = 'Постановление КМ РУз №249 (Каталог товаров и услуг)';
    lexUzActTitle = 'ПКМ РУз №249 об электронном каталоге ИКПУ / МХИК';
    lexUzExactTermRu = 'Идентификационный код товаров и услуг (ИКПУ)';
    lexUzExactTermUz = 'Маҳсулотлар ва хизматларнинг идентификация коди (МХИК)';
  } else if (item.id === 'corporate-income-tax' || queryKey.includes('прибыль') || queryKey.includes('фойда')) {
    lexUzUrl = 'https://lex.uz/docs/4674902';
    lexUzReference = 'НК РУз Раздел ХI (Статьи 301–363)';
    lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Налог на прибыль';
    lexUzExactTermUz = 'Фойда солиғи';
  } else if (item.id === 'turnover-tax' || queryKey.includes('оборот') || queryKey.includes('айланма')) {
    lexUzUrl = 'https://lex.uz/docs/4674902';
    lexUzReference = 'НК РУз Раздел ХVIII (Статьи 461–470)';
    lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Налог с оборота';
    lexUzExactTermUz = 'Айланмадан олинадиган солиқ';
  } else if (item.id === 'social-tax' || queryKey.includes('соцналог') || queryKey.includes('ижтимоий')) {
    lexUzUrl = 'https://lex.uz/docs/4674902';
    lexUzReference = 'НК РУз Раздел ХIII (Статьи 402–407)';
    lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Социальный налог';
    lexUzExactTermUz = 'Ижтимоий солиқ';
  } else if (item.id === 'os-av' || queryKey.includes('основные') || queryKey.includes('асосий')) {
    lexUzUrl = 'https://lex.uz/docs/832560';
    lexUzReference = '5-сон БҲМС «Асосий воситалар» (НСБУ №5)';
    lexUzActTitle = '5-сон БҲМС «Асосий воситалар»';
    lexUzExactTermRu = 'Основные средства (ОС)';
    lexUzExactTermUz = 'Асосий воситалар (АВ)';
  } else if (item.id === 'tmc-tmb' || queryKey.includes('тмц') || queryKey.includes('тмб') || queryKey.includes('запас')) {
    lexUzUrl = 'https://lex.uz/docs/3004381';
    lexUzReference = '4-сон БҲМС «Товар-моддий захиралар» (НСБУ №4)';
    lexUzActTitle = '4-сон БҲМС «Товар-моддий захиралар»';
    lexUzExactTermRu = 'Товарно-материальные ценности (ТМЦ)';
    lexUzExactTermUz = 'Товар-моддий бойликлар (ТМБ)';
  } else if (item.id === 'akt-sverki' || queryKey.includes('сверк') || queryKey.includes('таққос')) {
    lexUzUrl = 'https://lex.uz/docs/111181';
    lexUzReference = 'Гражданский кодекс РУз; Закон «О бухучете» ст. 19';
    lexUzActTitle = 'Гражданский кодекс Республики Узбекистан';
    lexUzExactTermRu = 'Акт сверки взаиморасчетов';
    lexUzExactTermUz = 'Ўзаро ҳисоб-китобларни таққослаш далолатномаси';
  } else if (item.id === 'osv-saldo' || queryKey.includes('осв') || queryKey.includes('сальдо') || queryKey.includes('айланма-салдо')) {
    lexUzUrl = 'https://lex.uz/docs/803450';
    lexUzReference = '21-сон БҲМС «Счётлар режаси» (НСБУ №21)';
    lexUzActTitle = '21-сон БҲМС «Хўжалик юритувчи субъектлар счётлар режаси»';
    lexUzExactTermRu = 'Оборотно-сальдовая ведомость (ОСВ)';
    lexUzExactTermUz = 'Айланма-салдо қайдномаси (АСҚ)';
  } else if (item.id === 'doverennost-ishonchnoma' || queryKey.includes('доверен') || queryKey.includes('ишонч')) {
    lexUzUrl = 'https://lex.uz/docs/703673';
    lexUzReference = '19-сон БҲМС «Ишончномалар» (НСБУ №19)';
    lexUzActTitle = '19-сон БҲМС «Ишончномалар бериш тартиби»';
    lexUzExactTermRu = 'Доверенность на получение ТМЦ';
    lexUzExactTermUz = 'ТМБ олиш учун ишончнома';
  } else if (item.id === 'komandirovka-safari' || queryKey.includes('командир') || queryKey.includes('сафар')) {
    lexUzUrl = 'https://lex.uz/docs/6144888';
    lexUzReference = 'Постановление КМ РУз №424 (Служебные командировки)';
    lexUzActTitle = 'ПКМ №424 о служебных командировках в РУз';
    lexUzExactTermRu = 'Командировочные расходы';
    lexUzExactTermUz = 'Хизмат сафари харажатлари';
  } else if (cat === 'Налоги') {
    lexUzUrl = 'https://lex.uz/docs/4674902';
    lexUzReference = item.taxCodeArticle || 'Налоговый кодекс Республики Узбекистан';
    lexUzActTitle = 'Налоговый кодекс Республики Узбекистан';
  } else if (cat === 'Бухучет') {
    lexUzUrl = 'https://lex.uz/docs/803450';
    lexUzReference = item.chartOfAccounts ? '21-сон БҲМС «Счётлар режаси»' : 'Закон «О бухгалтерском учете»';
    lexUzActTitle = '21-сон БҲМС / Закон «О бухучете»';
  } else {
    lexUzUrl = `https://lex.uz/search/natsearch?all=${encodeURIComponent(item.termRu)}`;
    lexUzReference = item.taxCodeArticle || 'Законодательство Республики Узбекистан';
    lexUzActTitle = 'Национальная база законодательства (Lex.uz)';
  }

  return {
    ...item,
    lexUzUrl,
    lexUzReference,
    lexUzActTitle,
    lexUzExactTermRu,
    lexUzExactTermUz,
  };
}

export function findMatchesInKnowledgeBase(query: string): AccountingTerm[] {
  const raw = (query || '').trim();
  if (!raw) return [];

  // Extract candidate tokens and cleaned queries
  const candidates: string[] = [];
  const cleanFull = raw.toLowerCase();
  candidates.push(cleanFull);

  // Strip common prompt/filler words in English, Russian, Uzbek
  const stripped = cleanFull
    .replace(/\b(find\s+this\s+word|find\s+word|find\s+term|find|search|lookup|what\s+is|translate)\b/gi, ' ')
    .replace(/\b(найди\s+это\s+слово|найди\s+слово|найди\s+термин|найдите|поиск|что\s+такое|что\s+значит|перевод|переведи|переведите|слово|термин)\b/gi, ' ')
    .replace(/\b(bu\s+so'zni\s+top|so'zni\s+top|topib\s+ber|tarjima\s+qil|bu\s+nima|qidir|so'z)\b/gi, ' ')
    .replace(/["'«»?!.,;:()]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  if (stripped && !candidates.includes(stripped)) {
    candidates.push(stripped);
  }

  // Also add individual words if multiple words provided
  const words = cleanFull
    .replace(/["'«»?!.,;:()]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 2);

  const stopWords = new Set([
    'find', 'this', 'word', 'term', 'search',
    'найди', 'это', 'слово', 'термин', 'поиск', 'что', 'такое', 'как',
    'top', 'qidir', 'bu', 'nima',
  ]);

  for (const w of words) {
    if (!stopWords.has(w) && !candidates.includes(w)) {
      candidates.push(w);
    }
  }

  // 1. Exact abbreviation or term match against any candidate
  for (const cand of candidates) {
    const exact = UZ_ACCOUNTING_TERMS.filter((item) => {
      // Check abbreviations (including splitting combined abbreviations like 'ЖШДС / ЖШОДС')
      const abbrRuParts = (item.abbreviationRu || '').toLowerCase().split(/[\s,/]+/).filter(Boolean);
      const abbrUzCyrParts = (item.abbreviationUzCyrillic || '').toLowerCase().split(/[\s,/]+/).filter(Boolean);
      const abbrUzLatParts = (item.abbreviationUzLatin || '').toLowerCase().split(/[\s,/]+/).filter(Boolean);

      if (abbrRuParts.includes(cand) || abbrUzCyrParts.includes(cand) || abbrUzLatParts.includes(cand)) {
        return true;
      }

      if (
        item.abbreviationRu?.toLowerCase() === cand ||
        item.abbreviationUzCyrillic?.toLowerCase() === cand ||
        item.abbreviationUzLatin?.toLowerCase() === cand ||
        item.termRu.toLowerCase() === cand ||
        item.termUzCyrillic.toLowerCase() === cand ||
        item.termUzLatin.toLowerCase() === cand
      ) {
        return true;
      }

      return false;
    });

    if (exact.length > 0) {
      return exact.map(enrichTermWithLexUz);
    }
  }

  // 2. Exact keyword / alias match against any candidate
  for (const cand of candidates) {
    const aliasMatch = UZ_ACCOUNTING_TERMS.filter((item) => {
      return item.keywords.some((k) => k.toLowerCase() === cand);
    });

    if (aliasMatch.length > 0) {
      return aliasMatch.map(enrichTermWithLexUz);
    }
  }

  // 3. Substring matching (e.g. partial matches in terms or keywords)
  for (const cand of candidates) {
    if (cand.length < 3) continue;
    const partialMatch = UZ_ACCOUNTING_TERMS.filter((item) => {
      return (
        item.termRu.toLowerCase().includes(cand) ||
        item.termUzCyrillic.toLowerCase().includes(cand) ||
        item.termUzLatin.toLowerCase().includes(cand) ||
        item.keywords.some((k) => k.toLowerCase().includes(cand))
      );
    });

    if (partialMatch.length > 0) {
      return partialMatch.map(enrichTermWithLexUz);
    }
  }

  return [];
}
