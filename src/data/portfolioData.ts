import type { TravelerProfile } from '../types/atlas';
import nyorPhoto from './Nyor.jpg';

/**
 * ============================================================================
 * PORTFOLIO DATA (CENTRALIZED SOURCE OF TRUTH)
 * ============================================================================
 * This file is the single source of truth for the academic portfolio.
 * Edit the fields below to personalize the traveler's biographical information,
 * academic program, institution, portrait, and reflections.
 *
 * All visitors across different browsers and devices will see these exact
 * entries without relying on browser localStorage.
 */

export const PORTFOLIO_PROFILE: TravelerProfile = {
  isCustomized: true,
  fullName: 'Wilson Dl. Mayao Jr.',
  course: 'Bachelor of Science in Computer Science',
  yearAndSection: '4th Year & GB-NRn - 1454',
  institution: 'UNC School of Computer and Information Sciences',
  photoDataUrl: nyorPhoto,
  personalIntroduction:
    'I open this navigator\'s logbook as an undergraduate reader charting how ancient works speak to contemporary questions of character, obligation, and endurance. Before this voyage, I often approached classic texts as distant academic monuments; tracing these seven realms across the parchment has taught me to read them as living dialogues across time.',
  readingInterestsAndExperiences:
    'My reading life began with narrative fiction and essays, gradually expanding toward mythic epics, philosophical dialogues, and comparative world literature. Throughout Great Books, I have been drawn to moments where characters must weigh competing loyalties or rely on quiet discernment rather than brute force.',
  greatBooksExpectationsAndLearning:
    'At the start of the semester, I expected Great Books to focus on memorizing ancient plots and historical dates. Instead, I learned to use literary lenses (existential, archetypal, moral-philosophical, deontological, psychological, and historical-cultural) as navigational instruments that reveal why these stories endure and how their questions illuminate our own choices.',
  odysseyPersonalConnection:
    'Reading The Odyssey alongside university coursework felt remarkably personal. There are weeks in college when distractions resemble the Lotus-Eaters and academic pressure feels like steering between Scylla and Charybdis. Odysseus striking his breast in Book 20 ("Endure, my heart") and Penelope testing the rooted olive-tree bed reminded me that genuine maturity comes from patience, intellectual honesty, and staying anchored to the people and principles that feel like home.',
  reflections: {
    changedUnderstanding:
      'At the outset of this course, I viewed literary masterpieces primarily as historical artifacts: admirable for their antiquity, yet separated from everyday life by centuries of archaic language and custom. Exploring these seven works across the Ancient Near East, India, Greece, and Medieval Europe transformed that perspective. When Job refuses his friends\' hollow platitudes, when Arjuna lowers his bow in grief before his kinsmen, or when Priam kneels before Achilles to weep for Hector, the distance of millennia disappears. I came to appreciate literature not as a static museum of moral rules, but as a testing ground where humanity wrestles honestly with suffering, duty, pride, and grace.',
    challengesAndOvercoming:
      'Reading across four distinct cultural and philosophical traditions presented genuine analytical challenges. Initially, the density of genealogical epithets in Homer, the nested frame stories within stories in The Panchatantra, and the intricate Sanskrit ethical concepts in The Ramayana and The Mahabharata (such as dharma-sankata and Nishkama Karma) required slowing down my reading pace. I overcame these obstacles by mapping each work\'s structural architecture, tracing key original terms rather than relying on surface summaries, and pairing each masterpiece with an appropriate critical lens so that recurring motifs came into sharp focus.',
    mostInfluentialLens:
      'While every critical approach offered valuable insight, combining Psychological Criticism with Ethical and Moral-Philosophical Inquiry influenced my reading the most. Ancient epics are often mistaken for stories purely about external monsters and battlefields, yet their most decisive turning points happen inside human consciousness. Examining Odysseus\' self-command in Book 20, Arjuna\'s moral crisis at Kurukshetra, Sita\'s unyielding dignity in captivity, and Roland\'s fatal tension between prouesse and mesure revealed how inner character shapes outward destiny.',
    realizationsAboutHumanity:
      'Comparing these seven realms side by side revealed that across vastly different civilizations, human beings share the same fundamental vulnerabilities and aspirations. Every culture grapples with the temptation to confuse pride with honor (as seen in Achilles, Ravana, and Roland) and the danger of allowing manipulative rhetoric to fracture trust (as seen in Damanaka and Ganelon). Yet every tradition also preserves a vision of redemptive humanity: the cosmic humility of Job, the cooperative solidarity of Mitra-samprapti, the selfless devotion of Hanuman, Yudhishthira\'s compassion for a stray dog, Priam and Achilles mourning together, and the equal-minded partnership (homophrosyne) of Odysseus and Penelope.',
    futureApplications:
      'The lessons gathered in this portfolio carry direct weight for my personal growth, academic studies, and future professional path. From The Panchatantra and The Odyssey, I take the discipline of metis and niti: verifying information critically, resisting impulsive reactions, and adapting thoughtfully under pressure. From The Mahabharata, the principle of Nishkama Karma offers a sustainable antidote to academic and career burnout by anchoring my effort in integrity rather than obsession over external metrics. Finally, Oliver\'s call for mesure in The Song of Roland reminds me that in any collaborative profession, true leadership means setting ego aside and asking for counsel when the team\'s well-being is at stake.',
    concludingPassage:
      'Closing this journal on the chart table does not mark the end of the voyage. Like the sheltered Harbor of Ithaca at the center of our parchment map, each of these seven masterpieces remains a reliable landmark by which to steer through future seasons of uncertainty, ambition, and discovery. To read the Great Books attentively is to realize that we never cross the seas of the human condition alone.'
  }
};

export const REFLECTION_PROMPTS = [
  {
    key: 'changedUnderstanding' as const,
    numeral: 'I',
    question: 'How has your understanding and appreciation of literature changed throughout the course?',
    subtitle: 'From Distant Monuments to Living Human Dialogue'
  },
  {
    key: 'challengesAndOvercoming' as const,
    numeral: 'II',
    question: 'What challenges did you encounter when reading and analyzing literary masterpieces, and how did you overcome them?',
    subtitle: 'Navigating Archaic Forms, Nested Narratives, and Cultural Contexts'
  },
  {
    key: 'mostInfluentialLens' as const,
    numeral: 'III',
    question: 'Which literary lens or approach influenced your interpretation of literature the most, and why?',
    subtitle: 'Navigational Instruments for the Inner Landscape of Conscience'
  },
  {
    key: 'realizationsAboutHumanity' as const,
    numeral: 'IV',
    question: 'What important realizations about life, society, culture, or human nature have you gained?',
    subtitle: 'Shared Vulnerability, Pride, Empathy, and Cross-Civilizational Wisdom'
  },
  {
    key: 'futureApplications' as const,
    numeral: 'V',
    question: 'How can you apply the lessons and values learned from Great Books in your personal, academic, or future professional life?',
    subtitle: 'Practicing Metis, Nishkama Karma, and Mesure Beyond the Classroom'
  }
];
