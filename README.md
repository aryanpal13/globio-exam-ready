# Globio – Am I Exam-Ready? (German A1 Diagnostic)

A production-quality, empathetic, and linguistically accurate diagnostic web application created for **Globio**. It helps German language learners evaluate their preparation across **Vocabulary**, **Grammar**, and **Reading** before making decisions about booking an official Goethe-Zertifikat A1 examination.

---

## 1. Product Philosophy: Supportive Honesty

> *"You are learning. We are here to help you understand your progress and guide your next step."*

The application avoids both discouraging labels (*"You failed"*, *"You are weak"*) and artificial positivity (*telling every learner they are ready regardless of performance*). If gaps exist, they are communicated with clarity, respect, and actionable practice steps.

---

## 2. Brand & Visual Identity Alignment

Crafted directly from Globio’s official web platform (`globio.ai` / `globio.in`):

- **Primary Brand Color:** Deep Navy/Royal Blue (`#18268e` / `bg-[#18268e]`)
- **Accent Brand Color:** Warm Amber/Gold (`#fbbf24` / `#f59e0b`)
- **Background & Card Contrast:** Cool Off-White Canvas (`#f8fafc`) with bordered cards (`border-slate-200/90 rounded-2xl` & `rounded-3xl`)
- **Typography:** Modern Google Fonts **Poppins** and **Inter**
- **Action Pattern:** Signature CTAs with directional arrow indicators (`→`)
- **Support Integration:** Floating WhatsApp advisory trigger

---

## 3. Product Architecture

```
globio-exam-ready/
├── public/
│   └── favicon.svg                  # Globio SVG Favicon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx            # Reusable status/skill pill badges
│   │   │   ├── Button.jsx           # Signature Globio primary, secondary, and accent buttons
│   │   │   ├── Card.jsx             # Clean rounded cards matching brand
│   │   │   ├── Footer.jsx           # Globio links, legal, disclaimer, floating WhatsApp
│   │   │   ├── Modal.jsx            # Accessible overlay modal
│   │   │   ├── Navbar.jsx           # Sticky navy navbar with reset & mock test triggers
│   │   │   └── ProgressBar.jsx      # Dynamic progress indicator with completion state
│   │   ├── assessment/
│   │   │   ├── ExplanationCard.jsx  # Educational concept explanations
│   │   │   ├── OptionItem.jsx       # Large accessible answer selection targets
│   │   │   ├── QuestionCard.jsx     # Main question presentation container
│   │   │   ├── ReadingPassage.jsx   # Distinct containers for notices, emails, schedules
│   │   │   └── UnansweredReviewModal.jsx # Review step before final submission
│   │   └── results/
│   │       ├── AnswerReviewAccordion.jsx # Complete 12-question answer breakdown
│   │       ├── NextStepsCard.jsx    # CTAs, retesting guidance, and Globio pathways
│   │       ├── OverallScoreCard.jsx # Circular score gauge, category message, and gap alerts
│   │       ├── RecommendationsCard.jsx # Top 2-3 personalized improvement actions
│   │       ├── SkillBreakdownCard.jsx # Vocabulary, Grammar, and Reading performance cards
│   │       └── TransparencyNote.jsx # Clear CEFR/Goethe A1 scope clarification
│   ├── data/
│   │   ├── content.js               # Brand copy, reassurance notes, and exact UI text
│   │   ├── questions.js             # 12 authentic Goethe A1 diagnostic questions
│   │   └── recommendations.js       # Recommendation catalog with topic tags
│   ├── hooks/
│   │   └── useAssessment.js         # State machine, LocalStorage persistence, answers map
│   ├── utils/
│   │   └── scoring.js               # Boundary calculation, category assignment, anomaly detection
│   ├── pages/
│   │   ├── Welcome.jsx              # Product introduction & reassurance screen
│   │   ├── Instructions.jsx         # Section guidance before diagnostic start
│   │   ├── Assessment.jsx           # Calm, focused question interface
│   │   └── Results.jsx              # Comprehensive diagnostic report & next steps
│   ├── App.jsx                      # App root and navigation router
│   ├── index.css                    # Tailwind CSS configuration
│   └── main.jsx                     # Vite entry point
├── test-scoring.js                  # 28-point automated QA test suite
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 4. Assessment Design & Diagnostic Scope

### 12 Authentic A1 Questions:
1. **Vocabulary (Questions 1–4):** Everyday groceries & units of weight, public institutions (*die Post*), modes of transport & stations (*Zug / Hauptbahnhof*), daily meal times (*Mittagessen / am Mittag*).
2. **Grammar (Questions 5–8):** The Verb-Second Rule (V2) with adverb inversion, Accusative masculine article (*einen Bleistift*), Irregular present tense stem changes (*du liest*), Modal verbs & the Sentence Bracket (*Satzklammer* with *müssen*).
3. **Reading / Lesen (Questions 9–12):** Store opening hours notice (*Bäckerei Schmidt*), personal invitation email (*Markus' Geburtstag & Bescheid sagen*), railway platform change alert (*Gleis 5*), medical appointment time shift (*Dr. Weber / verschoben*).

---

## 5. Scoring & Diagnostic Hypotheses

| Category | Range | Assessment Message | Next Step CTA |
|---|---|---|---|
| **Category 1** | `< 60%` | *"Let's strengthen your foundations."* | Explore what to practise |
| **Category 2** | `60% – 69%` | *"You're building your understanding."* | Review my learning areas |
| **Category 3** | `70% – 79%` | *"You're getting closer."* | See my recommended practice |
| **Category 4** | `≥ 80%` | *"You're building strong confidence."* | Review my final practice areas |

### Key Evaluation Rules:
- **Unanswered Distinction:** Skipped questions are kept separately and not silently merged into wrong choices.
- **Skill Gap Alert:** If a learner achieves `≥ 70%` overall but scores `≤ 25%` in a single skill, a **Skill Balance Note** warns against blind spots.
- **Top 2–3 Prioritization:** Learners receive the 2–3 most critical practice areas first to prevent cognitive overload.
- **Exam Scope Transparency:** Explains that listening, writing, and speaking are evaluated on the official Goethe exam.

---

## 6. Local Setup & Testing

### Installation:
```bash
npm install
```

### Run Local Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Automated QA & Boundary Test Suite:
```bash
node test-scoring.js
```
Runs 28 automated tests verifying:
- Question counts & skill distribution
- 0%, 58%, 67%, 75%, 83%, and 100% boundary scoring
- Unanswered question isolation
- Anomaly skill gap detection
- Recommendation priority sorting and cap at 3 items

### Production Build:
```bash
npm run build
```
Creates an optimized, minified bundle in `dist/`.

---

## 7. Deployment Instructions (Vercel)

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/), select **Import Project** and link the repository.
3. Configuration:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy with one click.
