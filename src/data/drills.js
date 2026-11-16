export const DRILLS={
 "Telling time": {
  "rule": "halb = half BEFORE the hour (halb acht = 7:30). Viertel nach = quarter past, vor = before.",
  "items": [
   {
    "prompt": "Es ist Viertel nach vier.",
    "options": [
     "3:45",
     "4:45",
     "4:30",
     "4:15"
    ],
    "answer": 3,
    "why": "Viertel nach 4 = quarter past 4 = 4:15."
   },
   {
    "prompt": "Es ist halb acht.",
    "options": [
     "7:15",
     "8:00",
     "8:30",
     "7:30"
    ],
    "answer": 3,
    "why": "halb acht = 7:30, half an hour before eight."
   },
   {
    "prompt": "Zehn vor neun ist:",
    "options": [
     "9:50",
     "9:10",
     "8:50",
     "10:09"
    ],
    "answer": 2,
    "why": "vor = before. Ten before nine = 8:50."
   }
  ]
 },
 "Numbers": {
  "rule": "-zehn = 13–19, -zig = tens. Ones come first: einundzwanzig = 21.",
  "items": [
   {
    "prompt": "Welche Zahl ist „dreißig“?",
    "options": [
     "3",
     "33",
     "13",
     "30"
    ],
    "answer": 3,
    "why": "-ßig/-zig = tens. dreizehn is 13."
   },
   {
    "prompt": "Was ist „einundzwanzig“?",
    "options": [
     "121",
     "12",
     "21",
     "20"
    ],
    "answer": 2,
    "why": "German says the 1 first: ein-und-zwanzig = 21."
   },
   {
    "prompt": "Wie schreibt man 15?",
    "options": [
     "fünfzig",
     "fünfzehn",
     "fünfunddreißig",
     "fünf"
    ],
    "answer": 1,
    "why": "15 = fünfzehn. 50 = fünfzig."
   }
  ]
 },
 "Daily verbs": {
  "rule": "Learn separable verbs as pairs: aufstehen → ich stehe auf. Strong verbs change: lesen → er liest.",
  "items": [
   {
    "prompt": "Ich ___ morgens die Zähne.",
    "options": [
     "lese",
     "putze",
     "koche",
     "fahre"
    ],
    "answer": 1,
    "why": "Zähne putzen = to brush teeth."
   },
   {
    "prompt": "Wir ___ mit dem Bus zur Arbeit.",
    "options": [
     "fahren",
     "essen",
     "schlafen",
     "kochen"
    ],
    "answer": 0,
    "why": "fahren = to travel by vehicle."
   },
   {
    "prompt": "Er ___ am Abend ein Buch.",
    "options": [
     "putzt",
     "fährt",
     "schläft",
     "liest"
    ],
    "answer": 3,
    "why": "lesen → er liest (e becomes ie)."
   }
  ]
 },
 "Travel & shopping words": {
  "rule": "Memorise 15 survival words: Gleis, Fahrkarte, einfach, hin und zurück, Kasse, Angebot, Verspätung.",
  "items": [
   {
    "prompt": "Du fragst nach dem Preis. Was sagst du?",
    "options": [
     "Was kostet das?",
     "Wo ist das?",
     "Wer ist das?",
     "Wann ist das?"
    ],
    "answer": 0,
    "why": "Was kostet das? = How much is this?"
   },
   {
    "prompt": "Der Zug fährt auf ___ 3 ab.",
    "options": [
     "Kasse",
     "Tüte",
     "Straße",
     "Gleis"
    ],
    "answer": 3,
    "why": "Gleis = platform / track."
   },
   {
    "prompt": "Wo bezahlt man im Supermarkt?",
    "options": [
     "Im Zug",
     "In der Küche",
     "An der Kasse",
     "Am Gleis"
    ],
    "answer": 2,
    "why": "die Kasse = checkout."
   }
  ]
 },
 "German articles": {
  "rule": "Never learn a noun alone. der/die/das + noun, every time. -chen is always das; -ung is always die.",
  "items": [
   {
    "prompt": "___ Frau ist Ärztin.",
    "options": [
     "Die",
     "Das",
     "Den",
     "Der"
    ],
    "answer": 0,
    "why": "Frau is feminine: die Frau."
   },
   {
    "prompt": "Ich habe ___ Hund.",
    "options": [
     "einen",
     "ein",
     "der",
     "die"
    ],
    "answer": 0,
    "why": "der Hund becomes einen Hund as the object (accusative)."
   },
   {
    "prompt": "___ Mädchen ist neun Jahre alt.",
    "options": [
     "Den",
     "Der",
     "Die",
     "Das"
    ],
    "answer": 3,
    "why": "Nouns ending in -chen are always das."
   }
  ]
 },
 "haben & sein": {
  "rule": "sein: bin, bist, ist, sind, seid, sind. haben: habe, hast, hat, haben, habt, haben. Age and origin use sein.",
  "items": [
   {
    "prompt": "Ich ___ 25 Jahre alt.",
    "options": [
     "ist",
     "hat",
     "habe",
     "bin"
    ],
    "answer": 3,
    "why": "In German you ARE 25 (ich bin), you do not have it."
   },
   {
    "prompt": "Er ___ zwei Kinder.",
    "options": [
     "sind",
     "hat",
     "ist",
     "haben"
    ],
    "answer": 1,
    "why": "er hat. Possession = haben."
   },
   {
    "prompt": "Ihr ___ müde.",
    "options": [
     "seid",
     "habt",
     "sind",
     "ist"
    ],
    "answer": 0,
    "why": "ihr seid. Tiredness is a state, so sein."
   }
  ]
 },
 "Modal verbs": {
  "rule": "können, müssen, wollen, dürfen: modal verb in position 2, main verb (infinitive) at the very end.",
  "items": [
   {
    "prompt": "Wir ___ jetzt gehen.",
    "options": [
     "müsst",
     "muss",
     "müssen",
     "musst"
    ],
    "answer": 2,
    "why": "wir → müssen, same as the infinitive."
   },
   {
    "prompt": "Ich ___ Deutsch lernen. (I want to)",
    "options": [
     "will",
     "willst",
     "wollt",
     "wollen"
    ],
    "answer": 0,
    "why": "ich will. ich/er/sie have no ending."
   },
   {
    "prompt": "Hier ___ man nicht rauchen.",
    "options": [
     "dürfen",
     "darfst",
     "durft",
     "darf"
    ],
    "answer": 3,
    "why": "man darf nicht = not allowed. The verb rauchen goes to the end."
   }
  ]
 },
 "W-Fragen word order": {
  "rule": "W-word first, verb second, subject third: Wo wohnst du? Was machst du?",
  "items": [
   {
    "prompt": "Welcher Satz ist richtig?",
    "options": [
     "Woher kommst du?",
     "Woher du kommst?",
     "Du kommst woher?",
     "Kommst woher du?"
    ],
    "answer": 0,
    "why": "W-word, then verb: Woher kommst du?"
   },
   {
    "prompt": "Welcher Satz ist richtig?",
    "options": [
     "Wann der Kurs beginnt?",
     "Der Kurs wann beginnt?",
     "Beginnt wann der Kurs?",
     "Wann beginnt der Kurs?"
    ],
    "answer": 3,
    "why": "Verb stays in position 2 after the W-word."
   },
   {
    "prompt": "Welcher Satz ist richtig?",
    "options": [
     "Was heute machst du?",
     "Machst was du heute?",
     "Was machst du heute?",
     "Was du machst heute?"
    ],
    "answer": 2,
    "why": "Was + verb + subject: Was machst du heute?"
   }
  ]
 },
 "Reading train announcements": {
  "rule": "Spot three things first: destination, time, Gleis. Then check for Verspätung or fällt aus.",
  "items": [
   {
    "prompt": "Der ICE nach Hamburg hat 20 Minuten Verspätung. Der Zug ist ...",
    "options": [
     "20 Minuten zu spät",
     "20 Minuten früher",
     "ausgefallen",
     "pünktlich"
    ],
    "answer": 0,
    "why": "Verspätung = delay."
   },
   {
    "prompt": "Der Zug nach Köln fällt heute aus. Was ist richtig?",
    "options": [
     "Der Zug hat Verspätung.",
     "Der Zug fährt von Gleis 2.",
     "Der Zug fährt nicht.",
     "Der Zug fährt früher."
    ],
    "answer": 2,
    "why": "ausfallen = cancelled."
   },
   {
    "prompt": "Letzte Abfahrt nach Bonn: 23:10 Uhr, Gleis 4.\n„Um 23:30 fährt noch ein Zug nach Bonn.“",
    "options": [
     "Richtig",
     "Falsch"
    ],
    "answer": 1,
    "why": "Letzte = last. The last train left at 23:10."
   }
  ]
 },
 "Reading opening hours": {
  "rule": "Tick each day and time slot against the statement. Look for geschlossen and nachmittags.",
  "items": [
   {
    "prompt": "Café Sonne: Mo–Fr 7–18 Uhr, Sa 8–14 Uhr, So geschlossen.\nAm Sonntag ist das Café ...",
    "options": [
     "nur bis 14 Uhr",
     "nur ab 8 Uhr",
     "offen",
     "geschlossen"
    ],
    "answer": 3,
    "why": "geschlossen = closed."
   },
   {
    "prompt": "Café Sonne: Mo–Fr 7–18 Uhr, Sa 8–14 Uhr.\n„Am Samstag um 15 Uhr ist das Café offen.“",
    "options": [
     "Richtig",
     "Falsch"
    ],
    "answer": 1,
    "why": "Saturday closes at 14 Uhr."
   },
   {
    "prompt": "Bibliothek: Di und Do 10–19 Uhr.\n„Am Mittwoch ist die Bibliothek offen.“",
    "options": [
     "Richtig",
     "Falsch"
    ],
    "answer": 1,
    "why": "Only Tuesday and Thursday are listed."
   }
  ]
 },
 "Reading shop signs": {
  "rule": "Numbers, prices and ab / bis are where marks are lost. Underline them.",
  "items": [
   {
    "prompt": "Heute: Milch 1 Liter nur 0,99 €. Milch kostet ...",
    "options": [
     "1,99 €",
     "0,99 € pro Liter",
     "99 € pro Liter",
     "0,99 € pro Tag"
    ],
    "answer": 1,
    "why": "Comma = decimal point in German. 0,99 = 99 cents."
   },
   {
    "prompt": "Bitte nehmen Sie einen Korb. Was soll man nehmen?",
    "options": [
     "Einen Korb",
     "Eine Tüte",
     "Einen Wagen",
     "Ein Ticket"
    ],
    "answer": 0,
    "why": "der Korb = basket."
   },
   {
    "prompt": "Kasse 3 geschlossen. Bitte Kasse 1 oder 2. Wohin geht man?",
    "options": [
     "Zu Kasse 1 oder 2",
     "Nach Hause",
     "Zum Ausgang",
     "Zu Kasse 3"
    ],
    "answer": 0,
    "why": "geschlossen = closed, so use another till."
   }
  ]
 },
 "Reading notices & negation": {
  "rule": "kein / nicht / verboten flip the meaning. Find the negative word before you answer.",
  "items": [
   {
    "prompt": "Kein Zutritt für Kinder unter 12 Jahren.\n„Ein Kind (10 Jahre) darf hinein.“",
    "options": [
     "Richtig",
     "Falsch"
    ],
    "answer": 1,
    "why": "kein Zutritt = no entry. 10 is under 12."
   },
   {
    "prompt": "Das Büro ist heute nicht geöffnet. Das Büro ist heute ...",
    "options": [
     "zu",
     "bis 12 offen",
     "ab 12 offen",
     "offen"
    ],
    "answer": 0,
    "why": "nicht geöffnet = closed."
   },
   {
    "prompt": "Eintritt frei. Fotografieren verboten. Was ist erlaubt?",
    "options": [
     "Eintritt 5 €",
     "Essen",
     "Eintritt kostet nichts",
     "Fotos machen"
    ],
    "answer": 2,
    "why": "frei = free. verboten = forbidden."
   }
  ]
 }
}
