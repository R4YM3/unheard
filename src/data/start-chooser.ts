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
