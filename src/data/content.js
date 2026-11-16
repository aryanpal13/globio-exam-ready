/**
 * Globio "Am I Exam-Ready?" Brand & Assessment Copy
 * Explicitly aligned with Globio product philosophy and user requirements.
 */

export const content = {
  brand: {
    name: 'Globio',
    tagline: 'Your Gateway to Germany',
    supportNumber: '+91 99999 99999',
    websiteUrl: 'https://globio.ai'
  },

  welcome: {
    eyebrow: 'YOUR GERMAN LEARNING CHECK-IN',
    heading: 'How comfortable are you with your German so far?',
    supportingText:
      'Before taking your next step towards the A1 examination, take a few minutes to understand where your preparation stands.\n\nThis short assessment will help you review your vocabulary, grammar and reading skills, identify topics that may need a little more attention, and understand what you can practise next.',
    reassurance:
      'There is no pressure to get everything right. Each answer helps us understand your current learning progress and guide you towards more focused practice.',
    details: [
      {
        icon: 'HelpCircle',
        label: '12 diagnostic questions',
        desc: '4 Vocabulary, 4 Grammar, and 4 Reading questions'
      },
      {
        icon: 'Clock',
        label: 'Approximately 10 minutes',
        desc: 'Take your time — there is no countdown pressure'
      },
      {
        icon: 'BookOpen',
        label: 'Vocabulary, Grammar & Reading',
        desc: 'Based on authentic Goethe A1 Start Deutsch 1 standards'
      },
      {
        icon: 'Sparkles',
        label: 'Personalised learning suggestions',
        desc: 'Targeted actions for the specific topics that need review'
      }
    ],
    primaryCta: "Let's begin",
    secondaryInfo: 'Take your time. Read each question carefully and choose the answer that feels right to you.'
  },

  instructions: {
    heading: 'A quick note before you begin',
    intro: "You'll come across questions from three areas of German A1:",
    areas: [
      {
        title: 'Vocabulary',
        desc: 'Understanding everyday German words, food, places in town, transport, and daily expressions.'
      },
      {
        title: 'Grammar',
        desc: 'Using basic German sentence structures correctly, verb positions, accusative articles, and modal verbs.'
      },
      {
        title: 'Reading',
        desc: 'Understanding short messages, notices, public schedules, invitations, and everyday written information.'
      }
    ],
    guidance:
      "Choose the answer you think is most appropriate.\n\nIf you're unsure about something, that's completely fine. The assessment is designed to help identify what you understand and what might benefit from more practice.",
    cta: 'Start assessment'
  },

  assessment: {
    unansweredNotice: "This question hasn't been answered yet. You can revisit it before completing your assessment.",
    btnPrev: 'Previous',
    btnContinue: 'Continue',
    btnReviewSubmit: 'Review and complete',
    btnChangeAnswer: 'Change answer',
    sectionLabels: {
      vocabulary: 'Vocabulary',
      grammar: 'Grammar',
      reading: 'Reading (Lesen)'
    }
  },

  resultCategories: {
    cat1: {
      range: 'Below 60%',
      min: 0,
      max: 59,
      heading: "Let's strengthen your foundations.",
      badge: 'Foundation Review Needed',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      message:
        "Some of the concepts in this assessment may need a little more attention before you move towards booking your examination.\n\nThat's completely okay. Identifying these areas now gives you an opportunity to work on them in a focused way.\n\nStart with the recommended topics below and build your understanding one step at a time.",
      cta: 'Explore what to practise'
    },
    cat2: {
      range: '60% to 69%',
      min: 60,
      max: 69,
      heading: "You're building your understanding.",
      badge: 'Developing Competency',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      message:
        'You already have some of the A1 concepts in place. A few topics, however, could benefit from additional revision.\n\nBefore taking your next step, consider spending some time on the areas highlighted below.\n\nA little focused practice can help you approach similar questions with greater confidence.',
      cta: 'Review my learning areas'
    },
    cat3: {
      range: '70% to 79%',
      min: 70,
      max: 79,
      heading: "You're getting closer.",
      badge: 'Good Preparation',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      message:
        "You're demonstrating a good understanding of the topics covered in this assessment.\n\nThere are still a few concepts worth revisiting, especially the ones where your answers suggest some uncertainty.\n\nFocus on these areas and consider checking your progress again after practising.",
      cta: 'See my recommended practice'
    },
    cat4: {
      range: '80% and above',
      min: 80,
      max: 100,
      heading: "You're building strong confidence.",
      badge: 'High Readiness',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      message:
        'That’s encouraging progress. Your answers show a strong understanding of the A1 topics covered in this assessment.\n\nBefore considering your examination booking, it would be useful to review any remaining gaps and check your listening and speaking skills as well.\n\nThis assessment covers only vocabulary, grammar and reading, so a broader evaluation will give you a more complete picture.',
      cta: 'Review my final practice areas'
    }
  },

  transparency: {
    heading: 'A note about your assessment',
    content:
      'This check-in evaluates selected vocabulary, grammar and reading concepts. The official Goethe A1 examination also includes listening, writing and speaking. Your result is intended to guide your preparation, not guarantee an examination outcome.'
  },

  answerReview: {
    heading: "Let's look at your answers.",
    supportingText:
      "Reviewing your answers can help you understand which concepts you've already picked up and which ones are worth revisiting.",
    labels: {
      yourAnswer: 'Your answer',
      correctAnswer: 'Correct answer',
      conceptHeading: "Let's understand the concept",
      unansweredTag: 'This question was left unanswered.'
    }
  },

  nextSteps: {
    heading: 'Your next step starts here.',
    supportingText:
      "You now have a clearer picture of the topics you've understood and the areas that could use a little more attention.\n\nYou don't have to work on everything at once. Start with the recommendations that matter most and check your progress as you go.",
    primaryCta: 'Review recommended topics',
    secondaryCta: 'Take the assessment again',
    additionalNote:
      'A repeat assessment can help you track your progress. Try revisiting the recommended topics first so that your next attempt gives you a more meaningful comparison.'
  }
};
