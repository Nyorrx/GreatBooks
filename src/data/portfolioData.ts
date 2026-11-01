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
    'I am a fourth-year Computer Science student sharing what I learned in our Great Books course. Before this class, I mostly saw classic literature as old texts read only for school. Reading these seven works showed me how they speak to real questions of pride, loyalty, and grit.',
  readingInterestsAndExperiences:
    'I started out reading modern fiction and essays before getting into older epics and philosophy. Throughout this course, I was drawn to quiet turning points more than big battle scenes. I liked seeing how characters handle pressure when duties clash or when they must outthink a crisis.',
  greatBooksExpectationsAndLearning:
    'At the start of the semester, I thought Great Books would just mean memorizing old plots and dates. Instead, we used literary lenses like psychological, existential, and ethical criticism. Those lenses gave me a clear way to see why characters make hard choices that still matter today.',
  odysseyPersonalConnection:
    'Reading The Odyssey during a busy college semester hit closer to home than I expected. Some weeks, distractions feel a lot like the Lotus-Eaters, and trying to balance deadlines feels like steering between Scylla and Charybdis. The scene in Book 20 where Odysseus tells his own heart to endure, along with Penelope testing him with their olive-tree bed, reminded me that real maturity comes from patience, self-control, and staying grounded in the people who matter most.',
  reflections: {
    changedUnderstanding:
      'When this course started, I thought of classic literature as distant history. The language felt old, and the worlds of ancient kings and warriors seemed completely separate from my own life. Reading these seven books from the Near East, India, Greece, and medieval Europe changed my mind. When Job pushes back against his friends\' empty advice, when Arjuna breaks down before fighting his own family, or when Priam kneels in front of Achilles to ask for his son\'s body, the centuries between us fade away. I stopped seeing these books as a list of stiff moral lessons and started seeing them as honest stories about how people deal with pain, duty, and pride.',
    challengesAndOvercoming:
      'The hardest part of reading these seven works was adjusting to how differently each culture tells a story. At first, I got bogged down by the long family histories in Homer, the stories nested inside other stories in The Panchatantra, and the unfamiliar Sanskrit ethical terms in The Ramayana and The Mahabharata, like dharma-sankata and Nishkama Karma. To get through them, I had to slow down and stop skimming. I started keeping track of how each book was structured, looking up the actual meaning of key terms instead of guessing, and using one or two literary lenses per reading so I could focus on the main conflicts.',
    mostInfluentialLens:
      'Out of all the approaches we used, combining Psychological Criticism with Ethical Inquiry helped me the most. On the surface, a lot of ancient epics look like simple action stories about monsters, gods, and battlefields. Looking at the psychology and ethics behind the scenes showed me that the real turning points actually happen inside the characters\' minds. Watching Odysseus hold back his anger in Book 20, Arjuna freeze up at Kurukshetra, Sita stand her ground in captivity, and Roland argue with Oliver about pride and caution made it clear how a person\'s inner character shapes their choices.',
    realizationsAboutHumanity:
      'Looking at all seven books together made me realize how much people across different times and cultures have in common. Almost every tradition warns about how easily pride can disguise itself as honor, like we see with Achilles, Ravana, and Roland, and how quickly dishonest advice can ruin trust, like with Damanaka and Ganelon. At the same time, every culture holds on to moments of real decency. You see it in Job\'s honesty, the teamwork of the animals in Mitra-samprapti, Hanuman\'s loyalty, Yudhishthira refusing to leave a stray dog behind, Achilles and Priam crying together, and the equal partnership between Odysseus and Penelope.',
    futureApplications:
      'There are several habits from these readings that I want to carry into my studies and my future work in tech. From The Panchatantra and The Odyssey, the ideas of niti and metis remind me to double-check information, think a problem through before reacting, and stay adaptable when plans fall apart. From The Mahabharata, Nishkama Karma is a good reminder during stressful semesters to focus on doing honest work instead of stressing over every grade or outcome I cannot control. Finally, Oliver\'s advice in The Song of Roland taught me that in any team project, good leadership means setting your ego aside and asking for help early before a mistake hurts everyone.',
    concludingPassage:
      'Finishing this portfolio does not mean I am done learning from these books. Like Ithaca at the center of this map, these seven stories are steady reference points I can come back to whenever I run into tough choices or uncertain times. Reading them closely showed me that the questions we face today are ones people have been trying to answer for thousands of years.'
  }
};

export const REFLECTION_PROMPTS = [
  {
    key: 'changedUnderstanding' as const,
    numeral: 'I',
    question: 'How has your understanding and appreciation of literature changed throughout the course?',
    subtitle: 'Seeing Old Classics as Real Human Stories'
  },
  {
    key: 'challengesAndOvercoming' as const,
    numeral: 'II',
    question: 'What challenges did you encounter when reading and analyzing literary masterpieces, and how did you overcome them?',
    subtitle: 'Slowing Down for Unfamiliar Styles and Terms'
  },
  {
    key: 'mostInfluentialLens' as const,
    numeral: 'III',
    question: 'Which literary lens or approach influenced your interpretation of literature the most, and why?',
    subtitle: 'Looking at Inner Choices Through Psychology and Ethics'
  },
  {
    key: 'realizationsAboutHumanity' as const,
    numeral: 'IV',
    question: 'What important realizations about life, society, culture, or human nature have you gained?',
    subtitle: 'Common Struggles with Pride, Trust, and Empathy'
  },
  {
    key: 'futureApplications' as const,
    numeral: 'V',
    question: 'How can you apply the lessons and values learned from Great Books in your personal, academic, or future professional life?',
    subtitle: 'Using Patience, Steady Work, and Good Judgment Every Day'
  }
];
