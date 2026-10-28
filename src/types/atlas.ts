export type RealmId =
  | 'job'
  | 'panchatantra'
  | 'ramayana'
  | 'mahabharata'
  | 'iliad'
  | 'odyssey'
  | 'roland';

export type ExperienceSection =
  | 'home'
  | 'atlas'
  | 'journal'
  | 'odyssey-spotlight'
  | 'constellations'
  | 'reflection';

export interface VerifiedQuote {
  text: string;
  citation: string;
  translationNote: string;
  isParaphrase?: boolean;
}

export interface HighlightedConcept {
  term: string;
  originalScriptOrRoot?: string;
  definition: string;
  analyticalSignificance: string;
}

export interface AnalyticalSection {
  heading: string;
  paragraphs: string[];
}

export interface LiteraryRealm {
  id: RealmId;
  romanNumeral: string;
  realmName: string;
  properTitle: string;
  attribution: string;
  historicalContext: string;
  civilizationRegion: 'Ancient Near East' | 'Ancient India' | 'Archaic Greece' | 'Medieval Europe';
  monumentName: string;
  monumentDescription: string;
  materialsUsed: string;
  cartographicNote: string;
  bearingLabel: string;
  compassAngleDeg: number;
  coordinates: [number, number, number];
  celestialDesignation: string;
  isFavoriteMasterpiece?: boolean;
  accentHex: string;
  secondaryHex: string;
  badgeColorClass: string;
  borderColorClass: string;
  shortEvocativeTagline: string;
  contextualIntroduction: string;
  literaryLenses: string[];
  analyticalThesis: string;
  analyticalSections: AnalyticalSection[];
  highlightedConcepts: HighlightedConcept[];
  verifiedQuotes: VerifiedQuote[];
  thematicConnections: {
    targetRealmId: RealmId;
    targetWorkTitle: string;
    connectionInsight: string;
  }[];
  contemporaryReflection: string;
  comparativeSummary: {
    culturalContext: string;
    primaryLenses: string;
    centralHumanConcern: string;
    enduringInsight: string;
  };
}

export interface TravelerProfile {
  isCustomized: boolean;
  fullName: string;
  course: string;
  yearAndSection: string;
  institution: string;
  photoDataUrl: string | null;
  personalIntroduction: string;
  readingInterestsAndExperiences: string;
  greatBooksExpectationsAndLearning: string;
  odysseyPersonalConnection: string;
  reflections: {
    changedUnderstanding: string;
    challengesAndOvercoming: string;
    mostInfluentialLens: string;
    realizationsAboutHumanity: string;
    futureApplications: string;
    concludingPassage: string;
  };
}

export interface UserPreferences {
  audioMuted: boolean;
  reducedMotion: boolean;
  showConstellationLines: boolean;
  visitedRealms: RealmId[];
}
