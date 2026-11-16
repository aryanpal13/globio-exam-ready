/**
 * Recommendations Catalog & Practice Groups
 * Mapped to question topic groups with practice drills.
 */

export const GROUPS = {
  numbers: {
    id: 'numbers',
    title: 'Practise numbers and telling time',
    why: 'Numbers and clock times appear in prices, timetables and appointments. Mixing up 17 and 70, or 2:30 and 3:30, can change the whole meaning.',
    revisit: [
      'Teens (-zehn) and tens (-zig)',
      'halb (half before), Viertel nach (quarter past) and vor (before)',
      'Saying times out loud in everyday situations'
    ],
    action: 'Do the short practice set, then say five clock times out loud in German.',
    topics: ['Numbers', 'Telling time']
  },
  words: {
    id: 'words',
    title: 'Improve everyday vocabulary',
    why: 'Recognising common words helps you understand everyday conversations, messages and written information.',
    revisit: [
      'Daily routine separable verbs, like aufstehen (ich stehe auf)',
      'Travel words: Gleis, Fahrkarte, hin und zurück',
      'Shopping words: Kasse, Preis, Angebot'
    ],
    action: 'Learn five new words a day and write one short example sentence for each.',
    topics: ['Daily verbs', 'Travel & shopping words']
  },
  forms: {
    id: 'forms',
    title: 'Strengthen articles and verb forms',
    why: 'German nouns have grammatical genders, and verbs change with the subject. Articles and verb forms appear in almost every sentence.',
    revisit: [
      'der, die and das with every new noun (der Tisch)',
      'ich bin, du bist, wir sind (sein vs. haben)',
      'Modal verbs (können) with the second verb at the end of the sentence'
    ],
    action: 'Try a short exercise: write each new noun with its article and use it in a sentence.',
    topics: ['German articles', 'haben & sein', 'Modal verbs']
  },
  order: {
    id: 'order',
    title: 'Practise German sentence structure',
    why: 'German sentence structure can feel different from English. Knowing where the verb belongs is important when forming simple sentences and questions.',
    revisit: [
      'Verb in second position in statements (V2 rule)',
      'Question word + verb + subject (Wo wohnst du?)',
      'Basic statements vs. W-Fragen word order'
    ],
    action: 'Practise 5 to 10 simple question-building exercises.',
    topics: ['W-Fragen word order']
  },
  details: {
    id: 'details',
    title: 'Read times, days and prices carefully',
    why: 'Real announcements and notices are full of times, days and prices. A small detail often decides the answer.',
    revisit: [
      'Times and days in announcements (14:20 vs. 14:02)',
      'ab (from) and bis (until): ab 18 Uhr vs. bis 18 Uhr',
      'Prices written with commas, like 1,99 €'
    ],
    action: 'Read short notices and underline every number before you answer.',
    topics: ['Reading train announcements', 'Reading opening hours', 'Reading shop signs']
  },
  notices: {
    id: 'notices',
    title: 'Notice small words that change meaning',
    why: 'Words like kein, nicht and verboten reverse the meaning of a sign. Missing them can lead you to the opposite answer.',
    revisit: [
      'kein, nicht and verboten (Kein Eingang)',
      'geschlossen (closed) and geöffnet (open)',
      'What a sign tells you to do instead (use other entrance)'
    ],
    action: 'Read five short signs and find the negative word first.',
    topics: ['Reading notices & negation']
  }
};
