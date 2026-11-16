/**
 * Globio German A1 "Am I Exam-Ready?" Diagnostic Assessment
 * 12 authentic, high-quality questions structured across 3 core skills:
 * - Vocabulary (Fragen 1–4)
 * - Grammar (Fragen 5–8)
 * - Reading / Lesen (Fragen 9–12)
 *
 * Each question includes:
 * - skill: 'vocabulary' | 'grammar' | 'reading'
 * - topic: Topic key matching recommendation rules
 * - topicLabel: Human-readable topic name
 * - difficulty: 'A1 Foundation' | 'A1 Core' | 'A1 Application'
 * - question: Clear question statement
 * - context: Optional reading passage or situational dialogue
 * - options: 4 distinct choices
 * - correctIndex: Zero-based index of correct option
 * - explanation: Detailed concept breakdowns for both correct and incorrect responses
 */

export const questions = [
  // ==========================================
  // SECTION 1: VOCABULARY (Wortschatz)
  // ==========================================
  {
    id: 1,
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'everyday_vocabulary',
    topicLabel: 'Everyday Groceries & Measures',
    difficulty: 'A1 Core',
    question: 'Welches Wort passt in die Lücke?',
    context: 'Im Supermarkt kauft Herr Weber frisches Brot, Käse und ein Kilo ______.',
    options: [
      'Milch',
      'Äpfel',
      'Kaffee',
      'Wasser'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'In German, solid food items sold by weight (Kilo / Gramm) take countable plural nouns or mass nouns (z. B. ein Kilo Äpfel, ein Kilo Mehl), whereas liquids use volume measures like Liter (z. B. ein Liter Milch / Wasser).',
      germanExample: '„Ich möchte bitte ein Kilo Äpfel und einen Liter Milch.“',
      correctNote: 'You correctly identified that "ein Kilo" pairs with countable solid groceries in the plural ("Äpfel").',
      incorrectNote: 'The question tests everyday grocery measures. "Milch" and "Wasser" are liquids measured in Litern, not Kilos. "Kaffee" as a drink is measured in Tassen/Packungen, while apples as solid fruits are weighed in "Kilo Äpfel".'
    }
  },
  {
    id: 2,
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'places_and_town',
    topicLabel: 'Places in Town & Public Services',
    difficulty: 'A1 Foundation',
    question: 'Wo kann man Briefmarken kaufen und Briefe abschicken?',
    context: null,
    options: [
      'Auf der Post',
      'In der Apotheke',
      'Im Bahnhof',
      'In der Bibliothek'
    ],
    correctIndex: 0,
    explanation: {
      rule: 'Public institutions have fixed everyday functions in German: "Die Post" is the post office where you buy stamps (Briefmarken) and mail letters (Briefe aufgeben / abschicken). Notice the idiomatic preposition "auf der Post".',
      germanExample: '„Ich muss zur Post gehen, um mein Paket abzuholen.“',
      correctNote: 'You recognized the correct public facility and its everyday function in German town life.',
      incorrectNote: 'The question evaluates everyday locations: "Die Apotheke" is a pharmacy for medications, "die Bibliothek" is a library for borrowing books, and "der Bahnhof" is a train station. Mail and stamp services are located "auf der Post".'
    }
  },
  {
    id: 3,
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'transport_and_mobility',
    topicLabel: 'Public Transport & Destinations',
    difficulty: 'A1 Core',
    question: 'Welches Ziel passt zum Verkehrsmittel?',
    context: 'Anna möchte pünktlich ankommen. Sie nimmt den Zug, weil er direkt am ______ hält.',
    options: [
      'Flughafen',
      'Hauptbahnhof',
      'Kino',
      'Supermarkt'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'Modes of transport (Verkehrsmittel) correlate with specific terminals in German cities: "der Zug" (the train) arrives at and departs from "der Bahnhof" or "der Hauptbahnhof" (central railway station).',
      germanExample: '„Der ICE-Zug kommt um 14:00 Uhr am Hauptbahnhof an.“',
      correctNote: 'You correctly matched the mode of travel ("Zug") with its primary hub ("Hauptbahnhof").',
      incorrectNote: 'The sentence describes travel by train ("Zug"). While planes land at "der Flughafen" and buses stop at "die Haltestelle", passenger trains primarily stop at "der Hauptbahnhof" (main railway station).'
    }
  },
  {
    id: 4,
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    topic: 'daily_routines_and_time',
    topicLabel: 'Daily Routines & Times of Day',
    difficulty: 'A1 Foundation',
    question: 'Welche Tageszeit passt am besten?',
    context: 'Am Sonntag hat Lukas frei. Er schläft lange und kocht am ______ ein leckeres Mittagessen.',
    options: [
      'Morgen',
      'Mittag',
      'Abend',
      'Mitternacht'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'German compound nouns often give a direct clue: "das Mittagessen" (midday meal / lunch) is eaten "am Mittag" (at noon / midday). The morning meal is "das Frühstück" (am Morgen), and evening meal is "das Abendessen" (am Abend).',
      germanExample: '„Am Mittag essen wir zusammen in der Kantine.“',
      correctNote: 'You spotted the compound connection between "am Mittag" and "das Mittagessen".',
      incorrectNote: 'Look at the root words: "Mittagessen" specifically means the meal eaten around noon. Lukas cooks this meal "am Mittag". Morning is "am Morgen" (Frühstück), and evening is "am Abend" (Abendessen).'
    }
  },

  // ==========================================
  // SECTION 2: GRAMMAR (Grammatik)
  // ==========================================
  {
    id: 5,
    skill: 'grammar',
    skillLabel: 'Grammar',
    topic: 'german_sentence_structure',
    topicLabel: 'Word Order & Verb Position in Main Clauses',
    difficulty: 'A1 Core',
    question: 'Wählen Sie den Satz mit der korrekten deutschen Wortstellung:',
    context: null,
    options: [
      'Morgen meine Schwester fährt nach Berlin.',
      'Morgen fährt meine Schwester nach Berlin.',
      'Morgen meine Schwester nach Berlin fährt.',
      'Fährt morgen meine Schwester nach Berlin.'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'The "Verb-Second Rule" (V2): In a standard German declarative main clause (Aussagesatz), the conjugated verb MUST occupy Position 2. When an adverb or time phrase like "Morgen" occupies Position 1, the subject moves to Position 3 right after the verb.',
      germanExample: '„Heute [1] lerne [2] ich [3] Deutsch.“ (Inversion)',
      correctNote: 'Excellent! You applied the fundamental V2 rule with adverb inversion ("Morgen" = Pos 1, "fährt" = Pos 2).',
      incorrectNote: 'German sentence structure strictly requires the conjugated verb in Position 2 of a statement. In Option A ("Morgen meine Schwester fährt..."), the verb is mistakenly pushed to Position 3. Unlike English, placing a time expression first forces the verb into second position, followed by the subject.'
    }
  },
  {
    id: 6,
    skill: 'grammar',
    skillLabel: 'Grammar',
    topic: 'article_usage_and_cases',
    topicLabel: 'Definite/Indefinite Articles & Accusative Case',
    difficulty: 'A1 Core',
    question: 'Welcher Artikel steht im Akkusativ?',
    context: '„Ich habe keinen Stift dabei. Hast du ______ Bleistift für mich?“',
    options: [
      'ein',
      'einen',
      'einem',
      'einer'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'Transitive verbs like "haben" or "brauchen" take direct objects in the Accusative case (Akkusativ). The noun "Bleistift" is masculine (der Bleistift). In the accusative case, masculine "ein" changes to "einen" (and "der" to "den"). Feminine (eine) and neuter (ein) remain unchanged.',
      germanExample: '„Ich habe einen [Akk. Mask.] Bleistift und ein [Akk. Neut.] Buch.“',
      correctNote: 'You accurately applied the masculine accusative case ending (-en) triggered by the verb "haben".',
      incorrectNote: 'The verb "hast" (haben) requires the direct object to be in the accusative case. Since "Bleistift" is masculine (der Bleistift), its indefinite article must change from "ein" (nominative) to "einen" (accusative).'
    }
  },
  {
    id: 7,
    skill: 'grammar',
    skillLabel: 'Grammar',
    topic: 'verb_conjugation_and_stem_change',
    topicLabel: 'Present Tense Verb Conjugation & Stem Vowel Changes',
    difficulty: 'A1 Core',
    question: 'Welche Verbform von „lesen“ ist hier grammatikalisch richtig?',
    context: '„Lisa, ______ du heute Nachmittag das Buch über Deutschland?“',
    options: [
      'lest',
      'liest',
      'lese',
      'lesen'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'Strong verbs (unregelmäßige Verben) like "lesen", "sehen", or "sprechen" experience a stem vowel change in the 2nd (du) and 3rd person singular (er/sie/es). For "lesen", the vowel "e" becomes "ie": ich lese, du liest, er/sie/es liest.',
      germanExample: '„Liest du gern deutsche Zeitungen?“ — „Ja, ich lese jeden Tag.“',
      correctNote: 'You recognized the stem vowel mutation (e -> ie) for the 2nd person singular of "lesen".',
      incorrectNote: 'The verb "lesen" is a strong verb. When addressing "du", the stem vowel "e" changes to "ie", yielding "du liest". "Lest" is the plural form for "ihr" (you all), while "lese" belongs to "ich".'
    }
  },
  {
    id: 8,
    skill: 'grammar',
    skillLabel: 'Grammar',
    topic: 'modal_verbs_and_bracket',
    topicLabel: 'Modal Verbs & the Sentence Bracket (Satzklammer)',
    difficulty: 'A1 Application',
    question: 'Welcher Satz verwendet das Modalverb „müssen“ mit der richtigen Satzklammer?',
    context: null,
    options: [
      'Wir müssen heute Abend unsere Hausaufgaben machen.',
      'Wir müssen heute Abend machen unsere Hausaufgaben.',
      'Wir heute Abend müssen unsere Hausaufgaben machen.',
      'Wir machen heute Abend unsere Hausaufgaben müssen.'
    ],
    correctIndex: 0,
    explanation: {
      rule: 'Modal verbs (können, müssen, wollen, dürfen, sollen, möchten) create a "sentence bracket" (Satzklammer): The conjugated modal verb sits in Position 2, and the full action verb in its base infinitive form (-en) moves to the absolute end of the sentence.',
      germanExample: '„Ich [1] kann [2] heute leider nicht zum Unterricht [Ende] kommen.“',
      correctNote: 'Spot on! You mastered the German modal bracket: conjugated "müssen" at Position 2 and infinitive "machen" at the end.',
      incorrectNote: 'With German modal verbs, sentence elements are "bracketed": Position 2 holds the conjugated modal verb ("müssen"), and the second verb must stay in the infinitive at the very end ("machen"). Option B violates this by keeping the second verb in the middle.'
    }
  },

  // ==========================================
  // SECTION 3: READING (Leseverstehen)
  // ==========================================
  {
    id: 9,
    skill: 'reading',
    skillLabel: 'Reading',
    topic: 'reading_notices_and_schedules',
    topicLabel: 'Understanding Schedules & Store Notices',
    difficulty: 'A1 Core',
    question: 'Wann kann man am Samstag frische Brötchen in der Bäckerei kaufen?',
    context: `Bäckerei Schmidt – Frische Backwaren
Öffnungszeiten:
Montag bis Freitag: 06:30 – 18:30 Uhr
Samstag: 07:00 – 13:00 Uhr
Sonn- und Feiertage: Geschlossen!
Vorbestellungen für das Wochenende bitte bis Freitag, 12:00 Uhr abgeben.`,
    options: [
      'Bis 18:30 Uhr',
      'Den ganzen Tag durchgehend',
      'Von 07:00 bis 13:00 Uhr',
      'Am Samstag ist die Bäckerei geschlossen.'
    ],
    correctIndex: 2,
    explanation: {
      rule: 'In Goethe A1 Reading (Teil 1 & 2), candidates locate specific factual details within short notices. Scanning keywords: "Samstag" points directly to the line "Samstag: 07:00 – 13:00 Uhr".',
      germanExample: '„Samstag: 07:00 – 13:00 Uhr“',
      correctNote: 'You accurately scanned the schedule and matched the specific Saturday window ("07:00 bis 13:00 Uhr").',
      incorrectNote: 'Check the line specifically labeled "Samstag": it states "07:00 – 13:00 Uhr". The later time 18:30 Uhr applies only to weekdays ("Montag bis Freitag"), and Sunday ("Sonn- und Feiertage") is closed.'
    }
  },
  {
    id: 10,
    skill: 'reading',
    skillLabel: 'Reading',
    topic: 'reading_personal_messages',
    topicLabel: 'Personal Invitations & Core Action Requests',
    difficulty: 'A1 Core',
    question: 'Was bittet Markus Julia in dieser E-Mail zu tun?',
    context: `Liebe Julia,
ich feiere am kommenden Samstag meinen 25. Geburtstag! Die Party beginnt um 19:00 Uhr bei mir zu Hause.
Bring bitte keinen Kuchen mit, dafür habe ich schon gesorgt. Aber wenn du möchtest, kannst du gerne einen Salat oder etwas zu trinken mitbringen.
Sag mir bitte bis Donnerstag Bescheid, ob du kommen kannst.
Liebe Grüße,
Markus`,
    options: [
      'Einen Geburtstagskuchen für Markus backen.',
      'Bis Donnerstag antworten, ob sie zur Party kommt.',
      'Erst nach 21:00 Uhr zur Party kommen.',
      'Die Party bei sich zu Hause organisieren.'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'The German idiom "Bescheid sagen" means to let someone know or confirm plans. In invitations, identifying polite requests ("Sag mir bitte...") is a standard A1 examination task.',
      germanExample: '„Sag mir bitte Bescheid.“ = Please let me know.',
      correctNote: 'You correctly identified Markus’s key request: confirming attendance by Thursday ("Bescheid sagen").',
      incorrectNote: 'Carefully note the negations and core requests: Markus explicitly says "Bring bitte keinen Kuchen mit" (Please bring NO cake). His real request to Julia is "Sag mir bitte bis Donnerstag Bescheid, ob du kommen kannst" (Let me know by Thursday if you can come).'
    }
  },
  {
    id: 11,
    skill: 'reading',
    skillLabel: 'Reading',
    topic: 'reading_announcements_and_alerts',
    topicLabel: 'Station Announcements & Travel Updates',
    difficulty: 'A1 Core',
    question: 'Was müssen die Fahrgäste nach Köln tun?',
    context: `Achtung an Gleis 3:
Der Regional-Express RE 7 nach Köln Hauptbahnhof, planmäßige Abfahrt um 14:15 Uhr, fährt heute ausnahmsweise von Gleis 5 ab.
Grund dafür sind kurzfristige Reparaturarbeiten an den Gleisanlagen.
Wir bitten alle Fahrgäste nach Köln, sich zu Gleis 5 zu begeben.`,
    options: [
      'Bis 15:00 Uhr im Warteraum bleiben.',
      'Zu Gleis 5 gehen, weil der Zug dort abfährt.',
      'Eine neue Fahrkarte am Schalter kaufen.',
      'Auf einen Ersatzbus umsteigen.'
    ],
    correctIndex: 1,
    explanation: {
      rule: 'Public transport notices often communicate track/platform changes with phrases like "fährt von Gleis X ab" (departs from track X) or "begeben Sie sich zu..." (please proceed to...).',
      germanExample: '„Der Zug fährt heute von Gleis 5 ab.“',
      correctNote: 'You successfully comprehended the platform change announcement and identified Track 5.',
      incorrectNote: 'The announcement alerts travelers that the train to Köln is departing from Track 5 ("fährt heute ausnahmsweise von Gleis 5 ab") and asks passengers to head there ("sich zu Gleis 5 zu begeben"). It does not mention ticket changes or buses.'
    }
  },
  {
    id: 12,
    skill: 'reading',
    skillLabel: 'Reading',
    topic: 'reading_appointments_and_time_shifts',
    topicLabel: 'Appointments, Confirmations & Schedule Changes',
    difficulty: 'A1 Application',
    question: 'Um wie viel Uhr findet der Arzttermin von Herrn Santos am Dienstag statt?',
    context: `Guten Tag Herr Santos,
Ihr Termin bei Zahnarzt Dr. Weber am Dienstag um 10:30 Uhr muss leider um 30 Minuten verschoben werden.
Bitte kommen Sie daher erst um 11:00 Uhr in die Praxis.
Vielen Dank für Ihr Verständnis,
Praxis Dr. Weber`,
    options: [
      'Um 10:00 Uhr',
      'Um 10:30 Uhr',
      'Um 11:00 Uhr',
      'Der Termin wurde komplett abgesagt.'
    ],
    correctIndex: 2,
    explanation: {
      rule: 'In medical and administrative notices, the verb "verschieben" means to postpone or reschedule. A1 reading requires distinguishing between the original time and the updated revised time.',
      germanExample: '„Der Termin wird um 30 Minuten verschoben: von 10:30 auf 11:00 Uhr.“',
      correctNote: 'You correctly differentiated between the original booking and the rescheduled appointment time at 11:00 Uhr.',
      incorrectNote: 'While 10:30 Uhr was the original scheduled slot, the notice states it was postponed by 30 minutes ("um 30 Minuten verschoben"). The definitive instruction reads: "Bitte kommen Sie daher erst um 11:00 Uhr in die Praxis".'
    }
  }
];
