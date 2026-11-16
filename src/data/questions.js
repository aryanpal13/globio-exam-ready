/**
 * Globio "Am I Exam-Ready?" — 12 Diagnostic Questions
 * Aligned with the official prototype and CEFR A1 Goethe Start Deutsch 1 standards.
 */

export const questions = [
  {
    id: 'q1',
    number: 1,
    skill: 'Vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'Telling time',
    group: 'numbers',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: 'Es ist halb drei. Wie spät ist es?',
    options: [
      '3:30',
      '2:15',
      '3:00',
      '2:30'
    ],
    answer: 3,
    why: '„halb drei“ means “half way to three”, so it is 2:30, not 3:30. German counts towards the next full hour.',
    tip: 'halb vier = 3:30. Example: „Der Film beginnt um halb acht.“ = The film starts at 7:30.'
  },
  {
    id: 'q2',
    number: 2,
    skill: 'Vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'Numbers',
    group: 'numbers',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: 'Welche Zahl ist „siebzehn“?',
    options: [
      '70',
      '17',
      '7',
      '27'
    ],
    answer: 1,
    why: '„sieben“ is 7 and „-zehn“ adds ten, so „siebzehn“ is 17. The ending „-zig“ is used for tens, like „siebzig“ (70).',
    tip: 'Teens end in -zehn: dreizehn (13), vierzehn (14), siebzehn (17).'
  },
  {
    id: 'q3',
    number: 3,
    skill: 'Vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'Daily verbs',
    group: 'words',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: 'Ich ___ jeden Morgen um 7 Uhr auf.',
    options: [
      'komme',
      'stehe',
      'gehe',
      'mache'
    ],
    answer: 1,
    why: '„aufstehen“ (to get up) splits in a sentence: the verb goes to position 2 and „auf“ goes to the end. The other verbs do not fit with „auf“ here.',
    tip: 'Learn separable verbs as pairs: „Ich stehe um 7 Uhr auf.“'
  },
  {
    id: 'q4',
    number: 4,
    skill: 'Vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'Travel & shopping words',
    group: 'words',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: '„Hin und zurück“ an der Fahrkarten-Kasse bedeutet:',
    options: [
      'Platform',
      'Delay',
      'Round trip',
      'One way'
    ],
    answer: 2,
    why: 'At a ticket counter, „hin und zurück“ means you want a round trip: there and back. One way is „einfach“.',
    tip: 'Example: „Einmal hin und zurück, bitte.“ = One round trip, please.'
  },
  {
    id: 'q5',
    number: 5,
    skill: 'Grammar',
    skillLabel: 'Grammar',
    topic: 'German articles',
    group: 'forms',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: '___ Tisch ist groß.',
    options: [
      'Die',
      'Das',
      'Den',
      'Der'
    ],
    answer: 3,
    why: '„Tisch“ is masculine, so the article is „der“. As the subject of the sentence it stays „der“. „Den“ is only used for a masculine object, like „Ich sehe den Tisch.“',
    tip: 'Learn every noun with its article: der Tisch, die Lampe, das Buch.'
  },
  {
    id: 'q6',
    number: 6,
    skill: 'Grammar',
    skillLabel: 'Grammar',
    topic: 'haben & sein',
    group: 'forms',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: 'Wir ___ aus Indien.',
    options: [
      'sind',
      'haben',
      'seid',
      'bin'
    ],
    answer: 0,
    why: '„wir“ goes with „sind“ (from sein). „Haben“ means to have something. We use „sein“ to say where we are from.',
    tip: 'ich bin, du bist, wir sind: „Wir sind aus Indien.“'
  },
  {
    id: 'q7',
    number: 7,
    skill: 'Grammar',
    skillLabel: 'Grammar',
    topic: 'Modal verbs',
    group: 'forms',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: 'Ich ___ ein bisschen Deutsch sprechen.',
    options: [
      'könnt',
      'kann',
      'können',
      'kannst'
    ],
    answer: 1,
    why: 'With „ich“ the modal verb is „kann“. The second verb stays in the infinitive at the end of the sentence.',
    tip: 'ich kann, du kannst, wir können: „Ich kann Deutsch sprechen.“'
  },
  {
    id: 'q8',
    number: 8,
    skill: 'Grammar',
    skillLabel: 'Grammar',
    topic: 'W-Fragen word order',
    group: 'order',
    difficulty: 'A1',
    passage: null,
    instruction: 'Choose the correct answer.',
    prompt: 'Welcher Satz ist richtig?',
    options: [
      'Du wohnst wo?',
      'Wohnst wo du?',
      'Wo wohnst du?',
      'Wo du wohnst?'
    ],
    answer: 2,
    why: 'In a question with a question word, the verb comes straight after it: question word + verb + subject.',
    tip: 'More examples: „Woher kommst du?“ and „Was machst du?“'
  },
  {
    id: 'q9',
    number: 9,
    skill: 'Reading',
    skillLabel: 'Reading',
    topic: 'Reading train announcements',
    group: 'details',
    difficulty: 'A1',
    passage: 'Achtung am Gleis 5: Der Zug nach München fährt heute um 14:20 Uhr ab.',
    instruction: 'Read the text, then choose the best answer.',
    prompt: '„Der Zug fährt um 14:02 Uhr.“',
    options: [
      'Richtig',
      'Falsch'
    ],
    answer: 1,
    why: 'The announcement says 14:20. The statement says 14:02, so it does not match the text. Numbers with the same digits are easy to mix up.',
    tip: 'Tip: underline every time in the text before you answer.'
  },
  {
    id: 'q10',
    number: 10,
    skill: 'Reading',
    skillLabel: 'Reading',
    topic: 'Reading opening hours',
    group: 'details',
    difficulty: 'A1',
    passage: 'Praxis Dr. Weber\nMo–Fr 8–12 Uhr · Mo, Di, Do auch 15–18 Uhr\nMittwochnachmittag und Wochenende geschlossen',
    instruction: 'Read the text, then choose the best answer.',
    prompt: '„Am Mittwoch um 16 Uhr ist die Praxis offen.“',
    options: [
      'Richtig',
      'Falsch'
    ],
    answer: 1,
    why: 'The notice says Wednesday afternoon is closed („Mittwochnachmittag … geschlossen“). 16 Uhr is in the afternoon, so the statement is wrong.',
    tip: 'Tip: check each day and time slot against the notice, one by one.'
  },
  {
    id: 'q11',
    number: 11,
    skill: 'Reading',
    skillLabel: 'Reading',
    topic: 'Reading shop signs',
    group: 'details',
    difficulty: 'A1',
    passage: 'Heute im Angebot: Äpfel 1 kg nur 1,99 €\nBrot ab 18 Uhr 50 % billiger',
    instruction: 'Read the text, then choose the best answer.',
    prompt: 'Wann ist das Brot billiger?',
    options: [
      'Nur am Sonntag',
      'Ab 18 Uhr',
      'Bis 18 Uhr',
      'Um 8 Uhr'
    ],
    answer: 1,
    why: '„ab 18 Uhr“ means from 6 pm onwards, so the bread is cheaper from then. „bis“ would mean until.',
    tip: 'ab = from, bis = until: „ab Montag“, „bis Freitag“.'
  },
  {
    id: 'q12',
    number: 12,
    skill: 'Reading',
    skillLabel: 'Reading',
    topic: 'Reading notices & negation',
    group: 'notices',
    difficulty: 'A1',
    passage: 'Hier ist kein Eingang.\nBitte benutzen Sie den Eingang in der Bahnhofstraße.',
    instruction: 'Read the text, then choose the best answer.',
    prompt: 'Was soll man tun?',
    options: [
      'Draußen warten',
      'Hier klingeln',
      'Hier hineingehen',
      'Zur Bahnhofstraße gehen'
    ],
    answer: 3,
    why: '„Kein Eingang“ means there is no entrance here. The next sentence tells you where to go instead: the entrance in Bahnhofstraße.',
    tip: 'Tip: look for „kein“, „nicht“ and „verboten“ first. They reverse the meaning.'
  }
];

export const QUESTIONS = questions;
