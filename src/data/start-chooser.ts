/**
 * "Waar kan ik beginnen?" — orientation by situation and feeling, not a clinical triage.
 * Links are translation keys and are validated at build time.
 */
export interface ChooserOption {
  question: string;
  intro: string;
  keys: string[];
}

export const startChooser: ChooserOption[] = [
  {
    question: 'Ik twijfel nog',
    intro:
      'Je hoeft het nog geen naam te geven. Lees wat zelftwijfel met je kan doen, vergelijk een conflict met een terugkerend patroon en kies een vraag die je voor jezelf wilt verkennen.',
    keys: ['zelftwijfel', 'conflict-of-patroon', 'kaart-zelfreflectie', 'hulp-vinden'],
  },
  {
    question: 'Ik zit er nog middenin',
    intro:
      'Lees hoe herhaalde druk kan werken en wat die met je kan doen. Je vindt ook stappen die je nu al kunt zetten: een grens oefenen waar het veilig is, of het aan iemand vertellen.',
    keys: ['dwingende-controle', 'wat-het-met-je-kan-doen', 'herstel-grenzen', 'het-vertellen'],
  },
  {
    question: 'De relatie is voorbij',
    intro:
      'Twijfel, gemis of pijn kunnen blijven. Lees waarom inzicht en gevoel niet altijd gelijk oplopen, wat je praktisch kunt regelen en hoe je steun om je heen kunt zoeken.',
    keys: ['praktisch-na-breuk', 'pijn-na-inzicht', 'gemis', 'herstel-steunnetwerk'],
  },
  {
    question: 'Ik maak me zorgen om iemand',
    intro:
      'Lees hoe je iemand kunt steunen zonder te duwen. Gebruik de steunkaart voor een gesprek of vraag zelf advies als je je zorgen maakt.',
    keys: ['voor-naasten', 'kaart-naaste', 'hulp-vinden'],
  },
  {
    question: 'Het gaat (ook) over geld',
    intro:
      'Financiële controle is een eigen onderwerp. Er zijn veilige eerste stappen die niets forceren.',
    keys: ['geld-praten', 'financieel-misbruik', 'kaart-financieel'],
  },
  {
    question: 'Ik ben altijd gespannen of op mijn hoede',
    intro: 'Langdurige spanning kan veel energie kosten. Je mag ook naar je lichaam luisteren.',
    keys: ['spanning', 'grenzen', 'hulp-vinden'],
  },
];

/**
 * The same component on Hulpmiddelen, in that context: start from what you want to do, and
 * land on the card that helps. Copy for editorial review.
 */
export const toolsChooser: ChooserOption[] = [
  {
    question: 'Ik wil ordenen wat ik voel',
    intro:
      'Begin met zes korte vragen, of met een kaart die helpt om te ordenen wat je voelt en nodig hebt.',
    keys: ['woorden-vinden', 'kaart-zelfreflectie'],
  },
  {
    question: 'Ik wil een gesprek voorbereiden',
    intro:
      'Voor de huisarts of een therapeut, of voor een gesprek met je partner als dat veilig voelt.',
    keys: ['kaart-hulpverlener', 'kaart-partnergesprek', 'hulp-vinden'],
  },
  {
    question: 'Ik wil iemand steunen',
    intro: 'Een kaart voor wie een vriend of familielid wil steunen, zonder het over te nemen.',
    keys: ['kaart-naaste', 'voor-naasten'],
  },
  {
    question: 'Ik wil geld en papieren op een rij',
    intro: 'Eerst kijken wat veilig is, daarna ordenen wat je weet over geld en papieren.',
    keys: ['kaart-financieel', 'financieel-misbruik'],
  },
  {
    question: 'Ik begrijp het, maar het blijft pijn doen',
    intro: 'Vragen voor als inzicht er al is en het gevoel nog niet meegaat.',
    keys: ['kaart-pijn-na-inzicht', 'pijn-na-inzicht'],
  },
];

export interface ChooserCopy {
  lead: string;
  needsHeading: string;
  direct: Array<{ href: string; label: string }>;
  situationsHeading: string;
  options: ChooserOption[];
}

export const chooserCopy: Record<'default' | 'tools', ChooserCopy> = {
  default: {
    lead: 'Begin bij wat je nu nodig hebt of kies de situatie die het dichtst bij jouw ervaring komt.',
    needsHeading: 'Waar heb je nu behoefte aan?',
    direct: [
      { href: 'nl/wat-voel-ik/ik-twijfel-aan-mezelf/', label: 'Ik twijfel steeds aan mezelf' },
      { href: 'nl/hulpmiddelen/help-me-woorden-vinden/', label: 'Ik wil begrijpen wat ik voel' },
      { href: 'nl/herstel/', label: 'Hoe vind ik weer wat rust?' },
    ],
    situationsHeading: 'Welke situatie past bij jou?',
    options: startChooser,
  },
  tools: {
    lead: 'Kies wat je nu wilt doen. Elke kaart kun je lezen, op het scherm invullen of printen.',
    needsHeading: 'Direct naar een kaart',
    direct: [
      { href: 'nl/hulpmiddelen/help-me-woorden-vinden/', label: 'Help me woorden vinden' },
      {
        href: 'nl/hulpmiddelen/voorbereiding-gesprek-huisarts-of-therapeut/',
        label: 'Een gesprek met de huisarts voorbereiden',
      },
      { href: 'nl/hulpmiddelen/iemand-steunen/', label: 'Iemand steunen' },
    ],
    situationsHeading: 'Wat wil je doen?',
    options: toolsChooser,
  },
};
