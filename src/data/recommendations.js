/**
 * Personalised Improvement Recommendations Catalog
 *
 * Mapped to question-level topic tags. Each recommendation provides:
 * - title: Clear, encouraging topic title
 * - whyItMatters: Simple, empathetic explanation of practical impact
 * - whatToRevisit: Concrete grammatical or lexical bullet points
 * - suggestedAction: Actionable practice prompt
 * - skill: 'vocabulary' | 'grammar' | 'reading'
 */

export const recommendationCatalog = {
  // 1. Sentence Structure (Section 8 - Recommendation 1)
  german_sentence_structure: {
    id: 'rec_sentence_structure',
    skill: 'grammar',
    skillLabel: 'Grammar',
    title: 'Practise German sentence structure',
    priority: 1,
    whyItMatters: 'German sentence structure can feel different from English. Understanding where the verb belongs is essential when forming clear, confident simple sentences.',
    whatToRevisit: [
      'Basic subject-verb-object declarative statements.',
      'Verb position in simple statements (the V2 rule: finite verb in Position 2).',
      'Inversion when time or place expressions begin the sentence (e.g., „Morgen fahre ich...“).'
    ],
    suggestedAction: 'Practise 5–10 simple sentence-building questions focusing on moving time words to the front.'
  },

  // 2. Article Usage & Cases (Section 8 - Recommendation 2)
  article_usage_and_cases: {
    id: 'rec_article_usage',
    skill: 'grammar',
    skillLabel: 'Grammar',
    title: 'Strengthen article usage and cases',
    priority: 2,
    whyItMatters: 'German nouns have grammatical genders, and articles change depending on their role in the sentence. Accusative case is used whenever someone or something receives the action.',
    whatToRevisit: [
      'Der, die, and das noun genders for common objects.',
      'Indefinite articles: ein, eine, and ein.',
      'Basic accusative usage: how masculine „der/ein“ transforms into „den/einen“ with verbs like haben and brauchen.'
    ],
    suggestedAction: 'Try a short 10-item exercise pairing common everyday nouns with „Ich habe... / Ich brauche...“.'
  },

  // 3. Everyday Vocabulary (Section 8 - Recommendation 3)
  everyday_vocabulary: {
    id: 'rec_everyday_vocab',
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    title: 'Improve everyday vocabulary and measures',
    priority: 3,
    whyItMatters: 'Recognising common everyday words helps you navigate shops, markets, and casual daily interactions with ease.',
    whatToRevisit: [
      'Supermarket items, food categories, and everyday groceries.',
      'Units of measure (Kilo, Gramm, Liter, Stück, Packung).',
      'Simple shopping dialogues and asking for quantities.'
    ],
    suggestedAction: 'Review a visual vocabulary list of 20 staple groceries and their standard units.'
  },

  // 4. Places and Town Life
  places_and_town: {
    id: 'rec_places_town',
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    title: 'Explore town locations and public services',
    priority: 4,
    whyItMatters: 'Finding your way around a German city requires recognizing key public buildings, offices, and service points.',
    whatToRevisit: [
      'Everyday facilities: die Post, die Apotheke, der Bahnhof, die Bank, das Rathaus.',
      'Prepositions with places (zur Post, in die Apotheke, am Bahnhof).',
      'Asking for directions and public service opening hours.'
    ],
    suggestedAction: 'Match 10 public buildings with the specific service or item you can get there.'
  },

  // 5. Public Transport & Directions
  transport_and_mobility: {
    id: 'rec_transport',
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    title: 'Consolidate transport and travel vocabulary',
    priority: 5,
    whyItMatters: 'Whether catching a train or boarding a tram, knowing transport terms ensures smooth travel across Germany.',
    whatToRevisit: [
      'Transport modes: der Zug, der Bus, die U-Bahn, die S-Bahn, das Flugzeug.',
      'Stations and hubs: der Hauptbahnhof, die Haltestelle, der Flughafen, das Gleis.',
      'Verbs of movement: abfahren, ankommen, umsteigen.'
    ],
    suggestedAction: 'Review a standard German train timetable to spot origin, destination, and transfer stations.'
  },

  // 6. Daily Routines & Time
  daily_routines_and_time: {
    id: 'rec_daily_routines',
    skill: 'vocabulary',
    skillLabel: 'Vocabulary',
    title: 'Master times of day and routine verbs',
    priority: 6,
    whyItMatters: 'Expressing your daily routine and scheduling activities is a core requirement in the Goethe A1 speaking and writing modules.',
    whatToRevisit: [
      'Times of day with prepositions: am Morgen, am Vormittag, am Mittag, am Abend, in der Nacht.',
      'Common meal compound nouns: das Frühstück, das Mittagessen, das Abendessen.',
      'Separable routine verbs: aufstehen, anfangen, frühstücken, einkaufen.'
    ],
    suggestedAction: 'Write down a simple 4-sentence diary entry describing your typical Sunday routine.'
  },

  // 7. Verb Conjugation & Stem Changes
  verb_conjugation_and_stem_change: {
    id: 'rec_verb_conjugation',
    skill: 'grammar',
    skillLabel: 'Grammar',
    title: 'Strengthen irregular verb conjugations',
    priority: 4,
    whyItMatters: 'High-frequency verbs like „lesen“, „sehen“, „fahren“, and „sprechen“ change their stem vowels in the present tense.',
    whatToRevisit: [
      'Vowel change e → ie (lesen → du liest, er liest; sehen → du siehst).',
      'Vowel change e → i (sprechen → du sprichst; helfen → du hilfst).',
      'Vowel change a → ä (fahren → du fährst; schlafen → du schläfst).'
    ],
    suggestedAction: 'Practise conjugating 5 essential irregular German verbs across all six personal pronouns.'
  },

  // 8. Modal Verbs & Sentence Bracket
  modal_verbs_and_bracket: {
    id: 'rec_modal_verbs',
    skill: 'grammar',
    skillLabel: 'Grammar',
    title: 'Master modal verbs and the sentence bracket',
    priority: 5,
    whyItMatters: 'Modal verbs (können, müssen, möchten, wollen) allow you to express ability, obligation, and polite wishes.',
    whatToRevisit: [
      'Conjugation of müssen, können, möchten, and wollen.',
      'The German sentence bracket (Satzklammer): Modal verb in Position 2, Infinitive at sentence end.',
      'Forming polite questions with modal verbs (e.g., „Können Sie mir helfen?“).'
    ],
    suggestedAction: 'Transform 5 basic sentences into modal sentences using „müssen“ and „können“.'
  },

  // 9. Reading Schedules & Notices
  reading_notices_and_schedules: {
    id: 'rec_reading_schedules',
    skill: 'reading',
    skillLabel: 'Reading',
    title: 'Extract key details from schedules and notices',
    priority: 7,
    whyItMatters: 'Goethe A1 Reading tests your ability to spot specific practical facts (opening hours, restrictions, deadlines) without needing to understand every single word.',
    whatToRevisit: [
      'Days of the week and abbreviations (Mo–Fr, Sa, So, Feiertage).',
      '24-hour time notation and periods (z. B. 08:00 – 17:30 Uhr).',
      'Notice keywords: geöffnet, geschlossen, Vorbestellung, Ermäßigung.'
    ],
    suggestedAction: 'Scan 3 authentic German store notices and locate their weekend operating times.'
  },

  // 10. Reading Personal Invitations & Messages
  reading_personal_messages: {
    id: 'rec_reading_messages',
    skill: 'reading',
    skillLabel: 'Reading',
    title: 'Identify requests in short emails and notes',
    priority: 8,
    whyItMatters: 'Personal emails in A1 often ask for attendance confirmations, items to bring, or meeting times.',
    whatToRevisit: [
      'Key phrases: „Sag mir bitte Bescheid“, „Bring bitte mit“, „Ich lade dich ein“.',
      'Distinguishing between polite requests and gentle negations („bitte keinen Kuchen“).',
      'Salutations and sign-offs: Liebe / Lieber ..., Liebe Grüße.'
    ],
    suggestedAction: 'Read a short sample invitation email and highlight what the recipient is asked to do.'
  },

  // 11. Travel Alerts & Station Announcements
  reading_announcements_and_alerts: {
    id: 'rec_reading_alerts',
    skill: 'reading',
    skillLabel: 'Reading',
    title: 'Interpret public transport announcements',
    priority: 9,
    whyItMatters: 'Public travel alerts tell passengers what action to take when unexpected delays or platform changes occur.',
    whatToRevisit: [
      'Track and platform terms: das Gleis, der Bahnsteig, die Haltestelle.',
      'Delay & change indicators: fällt aus, verspätet sich, fährt heute von Gleis X ab.',
      'Instruction verbs: sich begeben nach, umsteigen in, warten auf.'
    ],
    suggestedAction: 'Practise 3 short train announcement exercises to identify the destination and new track number.'
  },

  // 12. Appointment Rescheduling & Confirmations
  reading_appointments_and_time_shifts: {
    id: 'rec_reading_appointments',
    skill: 'reading',
    skillLabel: 'Reading',
    title: 'Track appointment updates and time changes',
    priority: 10,
    whyItMatters: 'Medical, official, and business appointments frequently shift, requiring you to identify the updated time quickly.',
    whatToRevisit: [
      'Rescheduling verbs: verschieben auf, verschoben um, absagen, vereinbaren.',
      'Calculating new times from shifts („um 30 Minuten verschoben“).',
      'Official letter & SMS terms: der Termin, die Praxis, die Sprechstunde.'
    ],
    suggestedAction: 'Read two brief clinic notes and note down the original vs. final appointment time.'
  }
};
