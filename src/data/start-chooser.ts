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
    question: 'Ik twijfel of wat ik meemaak normaal is',
    intro:
      'Je hoeft het nog geen naam te geven. Begin bij wat je voelt, en lees daarna over het verschil tussen conflict en een patroon.',
    keys: ['zelftwijfel', 'conflict-of-patroon', 'emotioneel-misbruik'],
  },
  {
    question: 'Ik zit nog in de relatie en wil voorzichtig zijn',
    intro:
      'Veiligheid gaat voor gelijk krijgen. Lees eerst hoe je veilig informatie zoekt en waar je anoniem advies kunt vragen.',
    keys: ['veilig-gebruik', 'hulp-vinden', 'kaart-zelfreflectie'],
  },
  {
    question: 'De relatie is voorbij, maar het laat me niet los',
    intro: 'Begrijpen en voelen gaan niet altijd in hetzelfde tempo. Daar is niets mis mee.',
    keys: ['pijn-na-inzicht', 'gemis', 'herstel'],
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
  {
    question: 'Ik maak me zorgen om iemand anders',
    intro: 'Steunen zonder te duwen is lastig. Je hoeft het ook niet alleen te doen.',
    keys: ['voor-naasten', 'kaart-naaste', 'hulp-vinden'],
  },
];
