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
      'Lees hoe je herhaalde druk kunt herkennen en hoe je deze informatie veilig kunt bekijken. Als je wilt overleggen over jouw situatie, kun je advies vragen.',
    keys: ['dwingende-controle', 'veilig-gebruik', 'hulp-vinden'],
  },
  {
    question: 'De relatie is voorbij',
    intro:
      'Twijfel, gemis of pijn kunnen blijven. Lees waarom inzicht en gevoel niet altijd gelijk oplopen en hoe je steun om je heen kunt zoeken.',
    keys: ['pijn-na-inzicht', 'herstel-steunnetwerk', 'hulp-vinden'],
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
