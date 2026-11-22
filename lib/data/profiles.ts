import type { LawyerProfile } from "@/lib/types";

/**
 * Placeholder profile data for local development.
 * Replace with API/DB calls (P1.2) once the backend is in place –
 * `LawyerProfile` already matches the schema design.
 */
export const profiles: LawyerProfile[] = [
  {
    slug: "anna-svensson",
    name: "Anna Svensson",
    title: "Advokat",
    firmName: "Svensson & Partners Advokatbyrå",
    bio: "Anna har arbetat med arbetsrätt i mer än 15 år och har hjälpt hundratals klienter i frågor om arbetsskador, uppsägningar och lönefrågor. Hon är känd för sin tydliga kommunikation och sitt pragmatiska angreppssätt – du får alltid en konkret handlingsplan.",
    specialties: ["Arbetsskada", "Arbetsrätt"],
    isPremium: true,
    services: [
      {
        id: "as-1",
        name: "Arbetsskadeförhandling",
        description:
          "Vi förhandlar med arbetsgivaren om en rättvis ersättning för din arbetsskada, från första kontakt till slutligt avtal.",
      },
      {
        id: "as-2",
        name: "Uppsägning & friskrivning",
        description:
          "Rådgivning vid uppsägning och tvister om arbetsvillkor. Vi säkerställer att dina rättigheter respekteras.",
      },
      {
        id: "as-3",
        name: "Löne- och villkorfrågor",
        description:
          "Hjälp med lönekartläggning, kollektivavtal och andra frågor kring dina arbetsvillkor.",
      },
    ],
    rating: 4.9,
    reviewCount: 87,
  },
  {
    slug: "johan-lindqvist",
    name: "Johan Lindqvist",
    title: "Jurist",
    firmName: "Lindqvist Juridisk Konsult",
    bio: "Johan specialiserar sig på familjerätt och har bistått par i skilsmässor, samboavtal och vårdnadsfrågor sedan 2015. Hans fokus är att göra processen så smidig och konfliktsfri som möjligt för alla inblandade.",
    specialties: ["Skilsmässa", "Familjerätt"],
    isPremium: false,
    services: [
      {
        id: "jl-1",
        name: "Samboavtal & bodelning",
        description:
          "Upprättande och genomgång av samboavtal samt delning av gemensam egendom vid separation.",
      },
      {
        id: "jl-2",
        name: "Skilsmässohandel",
        description:
          "Stöd i hela skilsmässoprocessen, från ansökan till slutlig bodelning och ekonomisk avräkning.",
      },
      {
        id: "jl-3",
        name: "Vårdnad & umgänge",
        description:
          "Rådgivning och förhandling kring gemensam vårdnad, umgängesplaner och underhållsbidrag.",
      },
    ],
    rating: 4.6,
    reviewCount: 52,
  },
  {
    slug: "maria-bergstrom",
    name: "Maria Bergström",
    title: "Advokat",
    firmName: "Bergström & Co Advokatbyrå",
    bio: "Maria driver bolag och företag i frågor om avtal, upphandling och affärsjuridik. Med bakgrund från både advokatbyrå och näringsliv ger hon praktisk rådgivning som balanserar juridisk säkerhet med affärsmässiga behov.",
    specialties: ["Företagsjuridik", "Avtalsrätt"],
    isPremium: false,
    services: [
      {
        id: "mb-1",
        name: "Avtalsgenomgång & upprättande",
        description:
          "Vi granskar och upprättar avtal – köpeavtal, hyresavtal, serviceavtal och NDA – så att du undviker dyra misstag.",
      },
      {
        id: "mb-2",
        name: "Bolagfrågor & styrelseuppdrag",
        description:
          "Stöd med bolagsstruktur, aktiefrågor, styrelsearbete och ägarbyten.",
      },
      {
        id: "mb-3",
        name: "Upphandling & offentlig sektor",
        description:
          "Rådgivning i anbudsförfaranden, upphandlingsavtal och dialog med beställare.",
      },
    ],
    rating: 4.7,
    reviewCount: 64,
  },
  {
    slug: "erik-johansson",
    name: "Erik Johansson",
    title: "Advokat",
    firmName: "Nordlaw Advokatbyrå",
    bio: "Erik har specialiserat sig på arbetsskador och arbetsrättsliga tvister i över 10 år. Han har förhandlat fram ersättningar för hundratals klienter och är en ledande expert på MSB-skador – de långtidsskador som ofta missas i första instans.",
    specialties: ["Arbetsskada", "Arbetsrätt", "Uppsägning"],
    isPremium: true,
    services: [
      {
        id: "ej-1",
        name: "MSB & långtidsskador",
        description:
          "Vi kartlägger och förhandlar ersättning för mus- och stressrelaterade arbetsskador som ofta missas i första instans.",
      },
      {
        id: "ej-2",
        name: "Arbetsskadeförhandling",
        description:
          "Genomföring av hela förhandlingsprocessen med arbetsgivaren, från skadeanmälan till slutligt ersättningsavtal.",
      },
      {
        id: "ej-3",
        name: "Uppsägningstvister",
        description:
          "Rådgivning och tvisthantering vid uppsägningar, friskrivningar och arbetsvillkorstvister.",
      },
    ],
    rating: 4.8,
    reviewCount: 73,
  },
  {
    slug: "sofia-nilsson",
    name: "Sofia Nilsson",
    title: "Jurist",
    firmName: "Familjerätt & Vårdnad Konsult",
    bio: "Sofia hjälper föräldrar i vårdnads- och umgängesfrågor med fokus på barnets bästa. Med över 100 sluten ärenden är hon en av de mest betrodda juristerna inom familjerätt – tydlig, lugn och alltid på ditt barns sida.",
    specialties: ["Familjerätt", "Vårdnad", "Umgänge"],
    isPremium: false,
    services: [
      {
        id: "sn-1",
        name: "Gemensam vårdnad",
        description:
          "Rådgivning och avtal kring gemensam vårdnad så att ni kan samarbeta tryggt även efter separation.",
      },
      {
        id: "sn-2",
        name: "Umgängesplaner",
        description:
          "Vi upprättar umgängesplaner som fungerar i praktiken – med tydliga rutiner och flexibilitet.",
      },
      {
        id: "sn-3",
        name: "Vårdnadstvister",
        description:
          "Stöd i tvistefrågor om vårdnad, från förhandling till domstolsprocess vid behov.",
      },
    ],
    rating: 4.9,
    reviewCount: 104,
  },
  {
    slug: "petra-gustafsson",
    name: "Petra Gustafsson",
    title: "Jurist",
    firmName: "Bostad & Hyra Konsult",
    bio: "Petra hjälper dig med juridiska frågor kring bostadsrätt, köp och hyra. Hon har bistått hundratals köpare och hyresgäster i att få rätt pris och rätt villkor.",
    specialties: ["Boförvärv", "Hyresrätt", "Köpeavtal"],
    isPremium: false,
    services: [
      {
        id: "pg-1",
        name: "Köpeavtal & granskning",
        description:
          "Vi granskar köpeavtalet innan du signerar – så att du undviker dyra överraskningar.",
      },
      {
        id: "pg-2",
        name: "Hyrestvister",
        description:
          "Stöd i tvister med hyresvärd, från uppsägning till skadestånd och hyresavtalstvister.",
      },
      {
        id: "pg-3",
        name: "Bostadsrättsfrågor",
        description:
          "Rådgivning kring bostadsrättsföreningar, styrelsebeslut och omfördelning av andelar.",
      },
    ],
    rating: 4.5,
    reviewCount: 38,
  },
  {
    slug: "ingrid-forsberg",
    name: "Ingrid Forsberg",
    title: "Advokat",
    firmName: "Forsberg & Partner Advokatbyrå",
    bio: "Ingrid specialiserar sig på hyresrätt och bostadsfrågor. Hon har förhandlat fram lösningar i över 200 ärenden kring uppsägning, hyresnivåer och bostadsrättskonflikter.",
    specialties: ["Hyresrätt", "Boförvärv"],
    isPremium: false,
    services: [
      {
        id: "if-1",
        name: "Uppsägning & utflytt",
        description:
          "Rådgivning vid uppsägning av hyresbostad – villkor, tider och vad du har rätt till.",
      },
      {
        id: "if-2",
        name: "Hyresnivå & omfördelning",
        description:
          "Vi granskar hyresavtalet och förhandlar om orimliga hyresökningar eller villkor.",
      },
      {
        id: "if-3",
        name: "Bostadsrättskonflikter",
        description:
          "Stöd i konflikter med bostadsrättsföreningen, från styrelsebeslut till domstolsprocess.",
      },
    ],
    rating: 4.3,
    reviewCount: 21,
  },
  {
    slug: "henrik-dahl",
    name: "Henrik Dahl",
    title: "Advokat",
    firmName: "Dahl & Partners Advokatbyrå",
    bio: "Henrik rådgiver med små och medelstora företag i bolagsfrågor, avtal och skatt. Med bakgrund från både advokatbyrå och konsultbolag ger han råd som balanserar juridisk säkerhet med affärsmässig verklighet.",
    specialties: ["Företagsjuridik", "Skattefrågor", "Bolag"],
    isPremium: true,
    services: [
      {
        id: "hd-1",
        name: "Bolagsbildning & struktur",
        description:
          "Vi hjälper dig att välja rätt bolagsform och upprätta de avtal som skyddar dina intressen.",
      },
      {
        id: "hd-2",
        name: "M&A & ägarbyten",
        description:
          "Stöd i köp och försäljning av företag, från due diligence till slutligt avtal.",
      },
      {
        id: "hd-3",
        name: "Skatteplanering för bolag",
        description:
          "Rådgivning kring bolagsskatt, moms och skatteeffektiva ägarstrukturer.",
      },
    ],
    rating: 4.8,
    reviewCount: 69,
  },
  {
    slug: "lars-andersson",
    name: "Lars Andersson",
    title: "Advokat",
    firmName: "Andersson Advokatbyrå",
    bio: "Lars har bistått par i skilsmässor och bodelningar sedan 2010. Hans metod är att hitta den lösning som är mest rättvis – oavsett om det går via förhandling eller domstol.",
    specialties: ["Skilsmässa", "Familjerätt", "Bodelning"],
    isPremium: true,
    services: [
      {
        id: "la-1",
        name: "Skilsmässoprocessen",
        description:
          "Stöd i hela skilsmässoprocessen – från ansökan till ekonomisk avräkning.",
      },
      {
        id: "la-2",
        name: "Bodelning & bostad",
        description:
          "Vi delar gemensam egendom rättvist, med fokus på bostaden och pensionssparande.",
      },
      {
        id: "la-3",
        name: "Samboavtal",
        description:
          "Upprättande av samboavtal som skyddar båda parter vid en framtida separation.",
      },
    ],
    rating: 4.7,
    reviewCount: 91,
  },
  {
    slug: "karin-osterberg",
    name: "Karin Österberg",
    title: "Jurist",
    firmName: "Skatt & Ekonomi Konsult",
    bio: "Karin hjälper dig att förstå och hantera skattefrågor – från inkomstskatt till moms. Hon har bistått både frilansare, småföretagare och privatpersoner i skattekontroller och förhandlingar med Skatteverket.",
    specialties: ["Skattefrågor", "Moms", "Inkomstskatt"],
    isPremium: false,
    services: [
      {
        id: "ko-1",
        name: "Skattekontroll & anmärkning",
        description:
          "Vi stöder dig i skattekontroller och förhandlar med Skatteverket om anmärkningar.",
      },
      {
        id: "ko-2",
        name: "Momsrådgivning",
        description:
          "Rådgivning kring momsregistrering, avdrag och internationella köp.",
      },
      {
        id: "ko-3",
        name: "Inkomstskatt för frilansare",
        description:
          "Hjälp med inkomstskatt, arbetsgivaravgifter och skatteplanering för dig som är egen arbetsgivare.",
      },
    ],
    rating: 4.6,
    reviewCount: 45,
  },
  {
    slug: "magnus-holm",
    name: "Magnus Holm",
    title: "Advokat",
    firmName: "Konsumenträtt Sverige",
    bio: "Magnus har hjälpt tusentals konsumenter i garanti- och reklamationstvister. Han är känd för sin förmåga att få handlare att stå upp för sina avtal – utan att du behöver gå till domstol.",
    specialties: ["Konsumenträtt", "Garanti", "Reklamationer"],
    isPremium: false,
    services: [
      {
        id: "mh-1",
        name: "Garanti & reklamationsärenden",
        description:
          "Vi hanterar dina reklamationer och garantiärenden – från första kontakt till slutlig lösning.",
      },
      {
        id: "mh-2",
        name: "Köptvister",
        description:
          "Stöd i tvister kring köp av varor, tjänster och digitala produkter.",
      },
      {
        id: "mh-3",
        name: "Skadestånd & byten",
        description:
          "Vi förhandlar skadestånd, byten eller pengar tillbaka när en produkt inte håller måttet.",
      },
    ],
    rating: 4.7,
    reviewCount: 58,
  },
  {
    slug: "astrid-sandberg",
    name: "Astrid Sandberg",
    title: "Jurist",
    firmName: "Arv & Testamente Konsult",
    bio: "Astrid hjälper familjer i arv- och testamentsfrågor med känsla för både juridik och mänskliga relationer. Hon har upprättat över 300 testamenten och bistått i arvskiften av alla storlekar.",
    specialties: ["Arv", "Testamente", "Arvskifte"],
    isPremium: true,
    services: [
      {
        id: "asb-1",
        name: "Testamentstolkning & upprättande",
        description:
          "Vi upprättar och tolkar testamenten så att din vilja respekteras – utan tvivel eller tvist.",
      },
      {
        id: "asb-2",
        name: "Arvskifte & bodelning",
        description:
          "Stöd i hela arvskiftet, från inventering till slutlig delning av efterlämnad egendom.",
      },
      {
        id: "asb-3",
        name: "Familjeavtal & donationer",
        description:
          "Rådgivning kring familjeavtal, gåvor och skatteeffektiva överlåtelser.",
      },
    ],
    rating: 4.9,
    reviewCount: 66,
  },
  {
    slug: "fredrik-nystrom",
    name: "Fredrik Nyström",
    title: "Advokat",
    firmName: "Nyström Advokatbyrå",
    bio: "Fredrik specialiserar sig på underhållsbidrag och ekonomiska frågor i skilsmässor. Hans mål är att ni ska lämna processen med en lösning som fungerar – inte en ny konflikt.",
    specialties: ["Familjerätt", "Underhållsbidrag", "Skilsmässa"],
    isPremium: false,
    services: [
      {
        id: "fn-1",
        name: "Underhållsbidragstvister",
        description:
          "Vi förhandlar och prövar underhållsbidrag så att nivån speglar den verkliga situationen.",
      },
      {
        id: "fn-2",
        name: "Skilsmässomedling",
        description:
          "Stöd i skilsmässomedling – en snabbare och billigare väg än domstolsprocess.",
      },
      {
        id: "fn-3",
        name: "Umgång & samordning",
        description:
          "Rådgivning kring umgänge och samordning av vårdnad vid skilsmässa.",
      },
    ],
    rating: 4.4,
    reviewCount: 29,
  },
  {
    slug: "elin-vikstrom",
    name: "Elin Vikström",
    title: "Jurist",
    firmName: "Vikström Juridisk Konsult",
    bio: "Elin hjälper dig i köp- och konsumentfrågor – från onlineköp till större inköp. Hon har bistått i över 150 reklamationstvister och är skarp på vad du faktiskt har rätt till.",
    specialties: ["Konsumenträtt", "Reklamationer"],
    isPremium: false,
    services: [
      {
        id: "ev-1",
        name: "Onlineköp & distansavtal",
        description:
          "Vi granskar dina rättigheter vid onlineköp – ångerrätt, leverans och felaktiga varor.",
      },
      {
        id: "ev-2",
        name: "Reklamationer & garanti",
        description:
          "Stöd i reklamationstvister och garantifrågor, från första anmälan till slutlig lösning.",
      },
      {
        id: "ev-3",
        name: "Köp av begagnade varor",
        description:
          "Rådgivning kring köp av begagnade varor – vad säljaren är skyldig att täcka och när.",
      },
    ],
    rating: 4.5,
    reviewCount: 33,
  },
  {
    slug: "eva-lundberg",
    name: "Eva Lundberg",
    title: "Advokat",
    firmName: "Lundberg Familjerätt Advokatbyrå",
    bio: "Eva har hjälpt hundratals familjer i vårdnads- och umgängesfrågor. Hon är känd för sin förmåga att hitta lugna, praktiska lösningar som prioriterar barnets bästa – utan onödiga konflikter.",
    specialties: ["Vårdnad", "Umgång", "Familjerätt"],
    isPremium: true,
    services: [
      {
        id: "evl-1",
        name: "Vårdnadsöverenskommelser",
        description:
          "Vi hjälper er att komma överens om vårdnad och umgänge – med en plan som fungerar i praktiken.",
      },
      {
        id: "evl-2",
        name: "Umgängesplaner",
        description:
          "Tydliga umgängesplaner med rutiner för helger, semester och vardag – så att ni slipper tvister.",
      },
      {
        id: "evl-3",
        name: "Konflikter kring barn",
        description:
          "Stöd när samarbetet bryts ner – från medling till domstolsprocess vid behov.",
      },
    ],
    rating: 4.8,
    reviewCount: 112,
  },
  {
    slug: "oskar-lindholm",
    name: "Oskar Lindholm",
    title: "Jurist",
    firmName: "Lindholm Arbetsrätt Konsult",
    bio: "Oskar hjälper dig med arbetsskador och uppsägningar. Med över 10 års erfarenhet från både facket och advokatbyrå vet han vad som krävs för att få rätt ersättning – snabbt och utan onödig stress.",
    specialties: ["Arbetsskada", "Uppsägning"],
    isPremium: false,
    services: [
      {
        id: "ol-1",
        name: "Arbetsskadeförhandling",
        description:
          "Vi förhandlar med arbetsgivaren om rättvis ersättning – från skadeanmälan till slutligt avtal.",
      },
      {
        id: "ol-2",
        name: "Uppsägning & friskrivning",
        description:
          "Rådgivning vid uppsägningar, friskrivningar och tvister om arbetsvillkor.",
      },
      {
        id: "ol-3",
        name: "Lönerätt & villkor",
        description:
          "Hjälp med lönekartläggning, kollektivavtal och andra frågor kring dina arbetsvillkor.",
      },
    ],
    rating: 4.5,
    reviewCount: 36,
  },
  {
    slug: "alva-noren",
    name: "Alva Norén",
    title: "Advokat",
    firmName: "Norén Konsumenträtt Advokatbyrå",
    bio: "Alva har vunnit tusentals reklamationer och garantiärenden. Hon är skarp på vad du faktiskt har rätt till – och får handlare att stå upp för sina avtal, utan att du behöver gå till domstol.",
    specialties: ["Konsumenträtt", "Garanti"],
    isPremium: true,
    services: [
      {
        id: "an-1",
        name: "Reklamationer & garanti",
        description:
          "Vi hanterar dina reklamationer och garantiärenden – från första anmälan till slutlig lösning.",
      },
      {
        id: "an-2",
        name: "Köptvister",
        description:
          "Stöd i tvister kring köp av varor, tjänster och digitala produkter.",
      },
      {
        id: "an-3",
        name: "Skadestånd & byten",
        description:
          "Vi förhandlar skadestånd, byten eller pengar tillbaka när en produkt inte håller måttet.",
      },
    ],
    rating: 4.8,
    reviewCount: 71,
  },
  {
    slug: "tove-akesson",
    name: "Tove Åkesson",
    title: "Jurist",
    firmName: "Åkesson Arv & Testamente Konsult",
    bio: "Tove hjälper familjer i arv- och testamentsfrågor med lugn hand. Hon har upprättat över 200 testamenten och bistått i arvskiften av alla storlekar – alltid med fokus på att undvika tvist.",
    specialties: ["Arv", "Testamente"],
    isPremium: false,
    services: [
      {
        id: "ta-1",
        name: "Testamenten & upprättande",
        description:
          "Vi upprättar och tolkar testamenten så att din vilja respekteras – utan tvivel eller tvist.",
      },
      {
        id: "ta-2",
        name: "Arvskifte & delning",
        description:
          "Stöd i hela arvskiftet, från inventering till slutlig delning av efterlämnad egendom.",
      },
      {
        id: "ta-3",
        name: "Gåvor & överlåtelser",
        description:
          "Rådgivning kring gåvor, familjeavtal och skatteeffektiva överlåtelser.",
      },
    ],
    rating: 4.6,
    reviewCount: 44,
  },
];

/** Look up a profile by its URL slug (the [id] route param). */
export function getProfileBySlug(slug: string): LawyerProfile | undefined {
  return profiles.find((profile) => profile.slug === slug);
}

/** All profiles – will be replaced by the search API endpoint (P1.2). */
export function getAllProfiles(): LawyerProfile[] {
  return profiles;
}
