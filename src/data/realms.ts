import type { LiteraryRealm, RealmId } from '../types/atlas';

export const REALM_ORDER: RealmId[] = [
  'odyssey',
  'job',
  'panchatantra',
  'ramayana',
  'mahabharata',
  'iliad',
  'roland',
];

export const LITERARY_REALMS: LiteraryRealm[] = [
  {
      id: 'odyssey',
      romanNumeral: 'I',
      realmName: 'The Harbor of Ithaca',
      properTitle: 'The Odyssey',
      attribution: 'Homer (according to traditional attribution)',
      historicalContext: 'Archaic Greece, approximately the eighth century BCE',
      civilizationRegion: 'Archaic Greece',
      monumentName: 'The Harbor of Ithaca',
      monumentDescription:
        'A finely crafted miniature Greek trireme with carved cedar hull, ivory oars, mast, rigging, and weathered sail entering a sheltered harbor framed by rocky Ithacan cliffs, olive trees, a coastal path, and an inlaid brass compass rose.',
      materialsUsed: 'Aged cedar, carved ivory, antique brass compass rose, muted sea slate, and olive green',
      cartographicNote: 'Portus Ithacae • The homeward harbor of Odysseus and the rooted olive tree',
      bearingLabel: '000° Origin • Heart of the Chart Table',
      compassAngleDeg: 0,
      coordinates: [0, 0.25, 0],
      celestialDesignation: 'Chart Origin • Sector I • 38° 22\' N, 20° 43\' E [ITHACA]',
      isFavoriteMasterpiece: true,
      accentHex: '#873B35',
      secondaryHex: '#A98545',
      badgeColorClass: 'text-[#F4ECD8] border-[#873B35] bg-[#873B35]',
      borderColorClass: 'border-[#873B35]',
      shortEvocativeTagline: 'A carved cedar trireme gliding into the sheltered cliffs and olive groves of home.',
      contextualIntroduction:
        'Positioned at the heart of the Navigator\'s Chart Table, Homer\'s Odyssey charts the ten-year homeward voyage of Odysseus, polytropos ("the man of twists and turns"), following the fall of Troy. More than an adventure across monster-haunted seas, the poem is a psychological and philosophical voyage about reclaiming human identity, resisting forgetfulness, learning humility, and rebuilding a fractured household alongside an intellectual equal.',
      literaryLenses: ['Archetypal Criticism', 'Psychological Criticism'],
      analyticalThesis:
        'Read through archetypal and psychological criticism, The Odyssey redefines heroism from the Iliadic ideal of battlefield force to the enduring discipline of metis (adaptive intelligence), showing that genuine nostos (homecoming) requires resisting the temptations of oblivion and timeless stasis, embracing the humility of the beggar\'s disguise, and restoring homophrosyne (like-minded partnership) with Penelope.',
      analyticalSections: [
        {
          heading: 'Metis and the Psychological Trials of the Sea (Lotus-Eaters, Circe, Sirens, Calypso)',
          paragraphs: [
            'As Odysseus navigates the Mediterranean borderlands between myth and memory, each island functions as a psychological archetype testing what it means to remain human. The Lotus-Eaters offer sweet narcotic amnesia that erases the desire for home; Circe\'s drugs reduce unguarded appetites to swine; the Sirens weaponize nostalgia itself, singing of Troy\'s past glories to lure sailors onto a reef of bleached bones.',
            'Most subtle of all is Calypso on Ogygia ("the Concealer"), who offers Odysseus ageless immortality if he stays with her in paradise. By sitting on the rocky shore weeping for mortal Ithaca and an aging wife (Book 5), Odysseus chooses finite, flawed, relational human life over static, isolated perfection. Throughout these trials, survival depends on metis (resourceful, self-regulating intelligence), though Odysseus must first outgrow the hubris that made him shout his real name to Polyphemus.'
          ]
        },
        {
          heading: 'Nostos, the Beggar Disguise, and the Discipline of Humility (Book 20)',
          paragraphs: [
            'Physical arrival on Ithaca\'s soil in Book 13 is only the midpoint of the epic; the true psychological test unfolds inside Odysseus\' own palace. Disguised by Athena as a weathered, elderly beggar, the hero of Troy must endure footstools hurled at his head, mockery from arrogant suitors devouring his estate, and the sight of corrupt household betrayals without revealing himself prematurely.',
            'In Book 20, lying awake on an untanned oxhide in the vestibule, Odysseus feels his heart "barking within him" like a mother dog defending her pups. Striking his breast, he speaks to his own heart: "Endure, my heart; a worse thing even than this didst thou once endure..." This moment marks the pinnacle of psychological self-mastery: heroism is no longer explosive wrath, but patient endurance guided by strategic timing.'
          ]
        },
        {
          heading: 'Penelope, the Immovable Bed, and Homophrosyne (Harmony of Equal Minds)',
          paragraphs: [
            'The Odyssey\'s emotional architecture rests on homophrosyne, the rare, profound harmony of two equal minds that Odysseus praises to Nausicaa in Book 6 and shares with Penelope in Book 23. For twenty years, Penelope has waged her own siege on Ithaca using dolos (craft) and metis: weaving and unweaving Laertes\' shroud by torchlight, testing strangers, and staging the contest of the great bow.',
            'Even after the suitors lie slain and Eurycleia announces Odysseus\' return, Penelope refuses to be swept away before verifying the truth herself. By calmly instructing the nurse to move their bridal bed outside the chamber, she tests the one secret only the real Odysseus knows: that he built their bed around the living trunk of an olive tree rooted in the earth. In that flash of recognition, Odysseus is outwitted by his wife, and their reunion becomes the true harbor of the poem.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Metis (Adaptive Intelligence)',
          originalScriptOrRoot: 'Greek: μῆτις',
          definition: 'Resourceful cunning, strategic foresight, emotional self-regulation, and practical adaptability.',
          analyticalSignificance: 'Shared by Athena, Odysseus, and Penelope; allows mortals to survive crises where brute strength (biê) fails.'
        },
        {
          term: 'Nostos (Homecoming)',
          originalScriptOrRoot: 'Greek: νόστος',
          definition: 'The return to home, identity, memory, and community, which is also the root of "nostalgia" (the ache for return).',
          analyticalSignificance: 'Requires not merely crossing geographical distance, but choosing mortal accountability over the amnesia of the Lotus-Eaters or the stasis of Calypso.'
        },
        {
          term: 'Homophrosyne (Like-Mindedness)',
          originalScriptOrRoot: 'Greek: ὁμοφροσύνη',
          definition: 'Deep intellectual and spiritual consonance between two partners of equal discernment.',
          analyticalSignificance: 'Culminates in Penelope\'s test of the olive-tree bed in Book 23, proving that homecoming is relational rather than solitary.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"Endure, my heart; a worse thing even than this didst thou once endure on that day when the Cyclops, unrestrained in daring, devoured my mighty comrades; yet thou didst endure until thy craft found a way for thee forth from the cave, where thou thoughtest to die."',
          citation: 'Homer, The Odyssey, Book 20, lines 18-21',
          translationNote: 'Translated from the Greek by A. T. Murray (Loeb Classical Library, 1919 public domain edition)'
        },
        {
          text: '"For nothing is nobler or more admirable than when two people who see eye to eye keep house as man and wife, confounding their enemies and delighting their friends..."',
          citation: 'Homer, The Odyssey, Book 6, lines 182-185',
          translationNote: 'Translated from the Greek by Samuel Butler / A. T. Murray public domain tradition'
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'iliad',
          targetWorkTitle: 'The Iliad',
          connectionInsight: 'Directly answers The Iliad\'s meditation on heroic death with a new heroism of survival, memory, and domestic restoration.'
        },
        {
          targetRealmId: 'panchatantra',
          targetWorkTitle: 'The Panchatantra',
          connectionInsight: 'Parallels Niti-shastra in prizing strategic discernment, patience, and rhetorical intelligence over impulsive force.'
        },
        {
          targetRealmId: 'ramayana',
          targetWorkTitle: 'The Ramayana',
          connectionInsight: 'Penelope and Sita stand across cultures as archetypes of unwavering moral agency and intellectual resilience during decades of separation.'
        }
      ],
      contemporaryReflection:
        'In modern university life and early adulthood, we constantly encounter our own Lotus-Eaters (digital distraction and escapism) and Sirens (comparison and perfectionist ego). The Odyssey teaches that maturity is the willingness to start over humbly, regulate our impulses when tested, and remember the people and values that anchor our home.',
      comparativeSummary: {
        culturalContext: 'Archaic Greece (Homeric oral epic tradition, c. 8th century BCE)',
        primaryLenses: 'Archetypal & Psychological Criticism',
        centralHumanConcern: 'Adaptive wisdom (metis), homecoming (nostos), humility, and intellectual partnership (homophrosyne)',
        enduringInsight: 'True mastery lies not in conquering cities, but in governing one\'s own heart, resisting escapism, and returning humbly to rebuild meaningful relationships.'
      }
    },
  {
      id: 'job',
      romanNumeral: 'II',
      realmName: 'The Whirlwind',
      properTitle: 'The Book of Job',
      attribution: 'Anonymous Hebrew poet',
      historicalContext: 'Ancient Near East, approximately sixth to fourth century BCE (dating remains a subject of scholarly debate)',
      civilizationRegion: 'Ancient Near East',
      monumentName: 'The Whirlwind of Uz',
      monumentDescription:
        'A swirling sandstorm pillar rising from wind-swept ochre and sandstone formations around a small weathered altar, with delicate carved wooden wind ribbons spiraling upward.',
      materialsUsed: 'Layered ochre sandstone, weathered walnut, muted gold, and sepia ink',
      cartographicNote: 'Hic furit turbo super terram Uz • Where finite grief meets the untamed desert storm',
      bearingLabel: '315° NNW • 8 Leagues from Ithaca',
      compassAngleDeg: 315,
      coordinates: [-5.5, 0.2, -4.8],
      celestialDesignation: 'Chart Sector II • 31° 18\' N, 37° 40\' E',
      accentHex: '#A98545',
      secondaryHex: '#D8B978',
      badgeColorClass: 'text-[#3B261A] border-[#A98545] bg-[#E6D6B5]',
      borderColorClass: 'border-[#A98545]',
      shortEvocativeTagline: 'A swirling desert pillar over ancient Uz where honest grief confronts cosmic mystery.',
      contextualIntroduction:
        'Set in the wind-scoured land of Uz, The Book of Job opens within the Ancient Near Eastern wisdom tradition only to dismantle its most comforting assumption: that prosperity always rewards virtue and catastrophe always indicts sin. Stripped of family, wealth, and bodily health, Job refuses the tidy orthodoxy of his three companions and demands an honest reckoning with the Almighty.',
      literaryLenses: ['Existential Criticism', 'Archetypal Criticism'],
      analyticalThesis:
        'Through existential and archetypal lenses, The Book of Job exposes the bankruptcy of mechanical retributive justice, demonstrating that authentic faith and intellectual honesty require confronting suffering without reducing the universe to a human-centered moral transaction.',
      analyticalSections: [
        {
          heading: 'The Collapse of Retributive Orthodoxy and Job\'s Existential Protest',
          paragraphs: [
            'In the poetic dialogues (Chapters 3 to 31), Eliphaz, Bildad, and Zophar defend a rigid theology of retributive justice: because God is just, suffering is proof of hidden transgression. Viewed through an existential lens, Job\'s companions represent the human impulse to preserve systemic certainty at the expense of lived truth. They would rather condemn an innocent friend than inhabit an unpredictable universe.',
            'Job\'s greatness lies in his refusal to falsify his own conscience. Rather than offering a performative confession to appease his friends or bargain for recovery, he maintains his integrity ("Till I die I will not put away mine integrity from me," Job 27:5, KJV). His lamentations do not signal the absence of reverence; rather, his willingness to bring raw anguish and legal complaint directly before God becomes the highest form of spiritual authenticity.'
          ]
        },
        {
          heading: 'The Divine Speeches (Chapters 38 to 41): From Moral Ledger to Cosmic Scale',
          paragraphs: [
            'When the Lord finally answers Job out of the whirlwind (Chapters 38 to 41), the text executes a profound philosophical pivot. The voice from the tempest never mentions the heavenly wager of the prologue, nor does it catalog sins to justify Job\'s ordeal. Instead, the divine speeches unfold a breathtaking panorama of creation: the laying of the earth\'s foundations, the storehouses of snow and hail, the birthing of mountain goats, and the wild freedom of the wild ass.',
            'By shifting the frame from a courtroom ledger to the vast architecture of the cosmos, the poem decenters anthropocentric morality. Creation is not a utilitarian stage built solely to reward or punish human behavior; it is a wild, intricate order where rain falls even "on the wilderness, wherein there is no man" (Job 38:26, KJV).'
          ]
        },
        {
          heading: 'Behemoth, Leviathan, and the Archetype of Untamed Creation',
          paragraphs: [
            'The divine discourse culminates in the portraits of Behemoth and Leviathan (Chapters 40 to 41), primordial creatures of land and sea that defy human domestication. Under an archetypal reading, Behemoth and Leviathan embody the fierce, chaotic vitality woven into the fabric of existence. Neither beast is depicted as an evil mistake outside divine sovereignty; instead, Leviathan is celebrated as "a king over all the children of pride" (Job 41:34, KJV).',
            'Job\'s final response in Chapter 42 is therefore not a humiliated surrender to tyranny, but a transformation from inherited rumor ("by the hearing of the ear") to direct cosmic encounter ("now mine eye seeth thee"). The Book of Job resists reducing suffering to a single moral lesson, leaving the reader with the humility required to live meaningfully amid mystery.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Retributive Theology',
          definition: 'The doctrine that earthly prosperity and suffering are direct, proportional payouts for moral virtue or sin.',
          analyticalSignificance: 'Exposed as inadequate by Job\'s innocent suffering and explicitly rebuked when God tells Eliphaz that the friends "have not spoken of me the thing that is right, as my servant Job hath" (Job 42:7).'
        },
        {
          term: 'Theophany in the Whirlwind',
          originalScriptOrRoot: 'Se\'arah (Hebrew: סְעָרָה)',
          definition: 'The manifestation of the divine voice from within a turbulent storm in Chapters 38 to 41.',
          analyticalSignificance: 'Replaces abstract theological debate with direct sensory awe, shifting the inquiry from "Why do I suffer?" to "What is the human place within a vast, non-anthropocentric cosmos?"'
        },
        {
          term: 'Behemoth & Leviathan',
          definition: 'Monumental primeval beasts described at the climax of the divine speeches.',
          analyticalSignificance: 'Archetypes of untamable cosmic power that exist beyond human utility, proving that order and wildness coexist within creation.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"Where wast thou when I laid the foundations of the earth? declare, if thou hast understanding. Who hath laid the measures thereof, if thou knowest? or who hath stretched the line upon it?"',
          citation: 'The Book of Job 38:4-5',
          translationNote: 'King James Version (KJV, 1611 public domain text)'
        },
        {
          text: '"I have heard of thee by the hearing of the ear: but now mine eye seeth thee."',
          citation: 'The Book of Job 42:5',
          translationNote: 'King James Version (KJV, 1611 public domain text)'
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'mahabharata',
          targetWorkTitle: 'The Mahabharata',
          connectionInsight: 'Both works confront moments where conventional moral rules fracture under extreme crisis, requiring a broader cosmic vision.'
        },
        {
          targetRealmId: 'iliad',
          targetWorkTitle: 'The Iliad',
          connectionInsight: 'Like Priam and Achilles weeping together in Book 24, Job confronts the inescapable vulnerability of mortal existence without false consolation.'
        }
      ],
      contemporaryReflection:
        'In an era that often blames individuals for systemic misfortune or demands instant positivity in the face of grief, The Book of Job validates honest questioning. It reminds us that sitting truthfully with someone in pain is far more ethical than offering hollow platitudes.',
      comparativeSummary: {
        culturalContext: 'Ancient Near East (Hebrew Wisdom Literature, c. 6th to 4th century BCE)',
        primaryLenses: 'Existential & Archetypal Criticism',
        centralHumanConcern: 'Innocent suffering, limits of retributive justice, and cosmic humility',
        enduringInsight: 'Honest questioning is wiser than false orthodoxy; humanity inhabits a cosmos larger than our moral ledgers.'
      }
    },
  {
      id: 'panchatantra',
      romanNumeral: 'III',
      realmName: 'The Emerald Court',
      properTitle: 'The Panchatantra',
      attribution: 'Traditionally associated with Vishnu Sharma; also transmitted across Persia, the Arab world, and Europe through traditions associated with Bidpai (Kalila wa-Dimna)',
      historicalContext: 'Ancient India; oral roots and Sanskrit recensions span a debated period (often placed between ~300 BCE and 300 CE)',
      civilizationRegion: 'Ancient India',
      monumentName: 'The Emerald Banyan Court',
      monumentDescription:
        'A tiered banyan-tree court with five interlocking carved wooden platforms, aerial roots, canopy branches, and miniature animal figures integrated into the architecture.',
      materialsUsed: 'Carved walnut timber, muted moss green foliage, and aged brass',
      cartographicNote: 'Silva Niti • Five tiered banyan courts of statecraft, animal counsel, and alliance',
      bearingLabel: '045° NNE • 8 Leagues from Ithaca',
      compassAngleDeg: 45,
      coordinates: [5.5, 0.2, -4.8],
      celestialDesignation: 'Chart Sector III • 24° 45\' N, 78° 12\' E',
      accentHex: '#68704A',
      secondaryHex: '#A98545',
      badgeColorClass: 'text-[#2C1E12] border-[#68704A] bg-[#DDE0CE]',
      borderColorClass: 'border-[#68704A]',
      shortEvocativeTagline: 'A tiered banyan-tree court of five treatises on alliance, deception, and practical wisdom.',
      contextualIntroduction:
        'Framed as a royal curriculum devised by the scholar Vishnu Sharma to awaken the dull-witted sons of King Amarashakti within six months, The Panchatantra ("Five Treatises") is far more than a collection of charming animal tales. It is a rigorous manual of Niti-shastra: the wise conduct of life, diplomacy, alliance-building, and political survival.',
      literaryLenses: ['Structuralist / Narrative Criticism', 'Political-Pragmatic (Niti-shastra) Criticism'],
      analyticalThesis:
        'Through its nested frame narratives and anthropomorphized courtly fauna, The Panchatantra operates as an unsentimental anatomy of power, demonstrating that security in public and personal life depends equally on guarding against rhetorical manipulation (Mitra-bheda) and cultivating reciprocal solidarity (Mitra-samprapti).',
      analyticalSections: [
        {
          heading: 'Nested Frame Narratives as Cognitive Architecture',
          paragraphs: [
            'Structurally, The Panchatantra pioneers the "kathagarbha" (story-within-a-story) technique, where characters inside an outer narrative recite inner fables to justify a policy, warn an ally, or deceive a rival. This architectural nesting mirrors the complexity of real political deliberation: every action is interpreted through competing precedents, proverbs, and counter-narratives.',
            'By casting lions, jackals, bulls, crows, and doves as courtiers and sovereigns, the text achieves critical distance. Anthropomorphism strips away individual vanity so the reader can observe the structural mechanics of ambition, flattery, paranoia, and trust with analytical clarity.'
          ]
        },
        {
          heading: 'Mitra-bheda: Karataka, Damanaka, and the Anatomy of Manufactured Distrust',
          paragraphs: [
            'The first and longest book, Mitra-bheda ("The Loss of Friends"), centers on the friendship between Pingalaka, the lion king, and Sanjivaka, a virtuous bull whose bellowing initially terrifies the monarch. Observing the king\'s fear and subsequent affection for Sanjivaka, two sidelined jackal ministers, Karataka and Damanaka, debate how to reclaim their influence at court.',
            'While Karataka counsels caution against meddling in affairs beyond their station, the ambitious Damanaka weaponizes psychological insight and selective storytelling. By whispering symmetric suspicions to both the lion and the bull, Damanaka transforms mutual respect into lethal paranoia without ever lifting a weapon himself. The episode serves as a timeless warning about how unchecked ambition and sycophantic intermediaries corrode institutional trust from within.'
          ]
        },
        {
          heading: 'Mitra-samprapti: Strategic Cooperation and Collective Resilience',
          paragraphs: [
            'Balancing the bleak realpolitik of Book I, the second treatise, Mitra-samprapti ("The Winning of Friends"), demonstrates how intelligence and genuine reciprocity enable the vulnerable to overcome superior force. When a flock of doves led by Chitragriva is snared in a fowler\'s net, they escape only by beating their wings in disciplined unison, carrying the net into the sky so their ally, the mouse Hiranyaka, can gnaw through their bonds.',
            'Subsequent alliance between the crow Laghupatanaka, the mouse Hiranyaka, the tortoise Manthara, and the deer Chitranga illustrates that sustainable security arises not from wealth or brute strength, but from cross-disciplinary cooperation among discerning allies who recognize their shared vulnerability.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Niti-shastra',
          originalScriptOrRoot: 'Nītiśāstra (Sanskrit: नीतिशास्त्र)',
          definition: 'The science of wise conduct, pragmatic ethics, diplomacy, and statecraft.',
          analyticalSignificance: 'Distinguishes The Panchatantra from moralistic children\'s fables; its goal is worldly discernment (prajna) and strategic survival in a competitive world.'
        },
        {
          term: 'Mitra-bheda & Mitra-samprapti',
          originalScriptOrRoot: 'Sanskrit: मित्रभेद / मित्रसंप्राप्ति',
          definition: 'Book I ("The Separation of Friends") and Book II ("The Winning of Friends").',
          analyticalSignificance: 'Form a dialectical pair examining how alliances are destroyed through calculated disinformation (Damanaka) and forged through disciplined solidarity.'
        },
        {
          term: 'Kathagarbha (Emboxed Narrative)',
          definition: 'A nested structure in which characters within a story narrate sub-stories to persuade or mislead.',
          analyticalSignificance: 'Demonstrates that language and storytelling are themselves instruments of power that can either illuminate truth or manufacture fatal illusion.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"One who reads this work on the art of intelligent living, or listens to it continuously, will never be defeated, not even by Indra himself."',
          citation: 'The Panchatantra, Kathamukha (Prelude)',
          translationNote: 'Translated from the Sanskrit by Patrick Olivelle (Oxford World\'s Classics, 1997)'
        },
        {
          text: '"Even weak creatures, when they are united in a tight group, easily accomplish their purpose, just as grass fibers, when twisted into a rope, are used to tie up an elephant."',
          citation: 'The Panchatantra, Book II (Mitra-samprapti)',
          translationNote: 'Paraphrased synthesis from Arthur W. Ryder\'s 1925 translation and Patrick Olivelle\'s 1997 Sanskrit edition',
          isParaphrase: true
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'odyssey',
          targetWorkTitle: 'The Odyssey',
          connectionInsight: 'Both celebrate cunning intelligence (Niti / Metis) and rhetorical adaptability as essential tools for surviving asymmetrical power.'
        },
        {
          targetRealmId: 'roland',
          targetWorkTitle: 'The Song of Roland',
          connectionInsight: 'Damanaka\'s courtly manipulation in Mitra-bheda parallels Ganelon\'s calculated diplomacy with Blancandrin to engineer Roland\'s downfall.'
        }
      ],
      contemporaryReflection:
        'In an information ecosystem saturated with algorithmic outrage and persuasive rhetoric, Karataka and Damanaka read like modern media strategists. The Panchatantra trains us to inspect the incentives of whoever is telling the story before acting on second-hand suspicion.',
      comparativeSummary: {
        culturalContext: 'Ancient India (Sanskrit Niti-shastra & global Bidpai transmission)',
        primaryLenses: 'Structuralist Narrative & Political-Pragmatic Criticism',
        centralHumanConcern: 'Pragmatic wisdom, political survival, rhetoric, trust, and collective cooperation',
        enduringInsight: 'Discernment requires recognizing how stories can be used to divide allies while building resilient networks of mutual trust.'
      }
    },
  {
      id: 'ramayana',
      romanNumeral: 'IV',
      realmName: 'The Bridge to Lanka',
      properTitle: 'The Ramayana',
      attribution: 'Traditionally attributed to the sage Valmiki (Adi Kavi)',
      historicalContext: 'Ancient India; oral epic traditions and Sanskrit recensions developed across several centuries BCE to CE',
      civilizationRegion: 'Ancient India',
      monumentName: 'The Sculpted Bridge to Lanka',
      monumentDescription:
        'A carved stone bridge crossing a miniature sea channel with weathered stone arches, tiny sculpted trees, and a distant fortified citadel of Lanka with restrained golden details.',
      materialsUsed: 'Warm sandstone, aged ivory, muted gold, and subdued moss green',
      cartographicNote: 'Pons ad Lankam • The stone causeway of devotion crossing the southern strait',
      bearingLabel: '090° E • 11 Leagues from Ithaca',
      compassAngleDeg: 90,
      coordinates: [11.0, 0.2, 0.0],
      celestialDesignation: 'Chart Sector IV • 09° 17\' N, 79° 18\' E',
      accentHex: '#A98545',
      secondaryHex: '#68704A',
      badgeColorClass: 'text-[#3B261A] border-[#A98545] bg-[#E8DAC0]',
      borderColorClass: 'border-[#A98545]',
      shortEvocativeTagline: 'A carved stone bridge spanning the sea toward Lanka, evoking exile, devotion, and moral duty.',
      contextualIntroduction:
        'Revered as the Adi-kavya ("First Poem") of Sanskrit literature, Valmiki\'s Ramayana traces Prince Rama\'s banishment from Ayodhya on the eve of his coronation, the abduction of Sita by the ten-headed monarch Ravana of Lanka, and the perilous campaign across the ocean to recover her. Beneath its mythic grandeur lies a searching inquiry into the cost of upholding righteous order.',
      literaryLenses: ['Moral-Philosophical Criticism', 'Mythic-Archetypal Criticism'],
      analyticalThesis:
        'Evaluated through moral-philosophical and mythic-archetypal criticism, The Ramayana illuminates both the nobility and the tragic tension of dharma, showing how Rama\'s commitment as Maryada Purushottama, Hanuman\'s selfless bhakti, Ravana\'s hubristic desire, and Sita\'s unyielding moral dignity expose the painful friction between public rule and intimate justice.',
      analyticalSections: [
        {
          heading: 'Rama as Maryada Purushottama and the Ethics of the Fourteen-Year Exile',
          paragraphs: [
            'Rama is celebrated as Maryada Purushottama: the supreme upholder of moral boundaries and social order. When Queen Kaikeyi invokes King Dasharatha\'s ancient boons to demand Bharata\'s enthronement and Rama\'s fourteen-year forest exile, Rama accepts the decree with serene composure. For Rama, a father\'s and sovereign\'s spoken word (satya) is the foundational pillar of cosmic and civic stability.',
            'Yet a rigorous moral-philosophical reading reveals that Valmiki does not present dharma as effortless or painless. Rama\'s obedience leaves Dasharatha heartbroken unto death, plunges Ayodhya into grief, and thrusts Bharata into the agonizing position of ruling as a reluctant regent beside Rama\'s sandals at Nandigrama. Duty in the Ramayana is noble precisely because it demands immense personal renunciation.'
          ]
        },
        {
          heading: 'Ravana\'s Ego versus Hanuman\'s Bhakti: Two Polarities of Power',
          paragraphs: [
            'Mythic-archetypal criticism clarifies the contrast between Ravana and Hanuman. Ravana is no crude monster; he is a master of Vedic learning, music, and ascetic tapas whose fatal flaw is ahankara (egoistic pride) and kama (unbridled possessive desire). Believing himself invulnerable to gods and demons, he underestimates mortal human integrity and refuses the wise counsel of Vibhishana and Mandodari.',
            'Conversely, Hanuman embodies immense strength wholly consecrated through bhakti (selfless devotion). Crossing the ocean to Lanka, leaping over despair, and carrying the mountain of healing herbs, Hanuman possesses matchless prowess yet claims zero personal aggrandizement. In the epic\'s moral universe, power detached from humility destroys golden Lanka, whereas power anchored in service becomes redemptive.'
          ]
        },
        {
          heading: 'Sita\'s Resilience, Moral Autonomy, and the Tragic Weight of Public Duty',
          paragraphs: [
            'Throughout her captivity in the Ashoka grove, Sita demonstrates extraordinary psychological and moral fortitude. Placing a single blade of grass between herself and Ravana, she relies on the strength of her own fidelity (satya and pativrata) rather than fear. However, the aftermath of the war exposes the sharpest ethical tension in the epic.',
            'When Rama subjects Sita to the Agni Pariksha (trial by fire) after the fall of Lanka, and in the later tradition of the Uttara Kanda banishes her to withering public rumor despite knowing her innocence, the poem confronts an aching dilemma: the collision between the spotless public reputation required of an ideal monarch (raja-dharma) and the intimate justice owed to a blameless partner. Sita\'s final appeal to Mother Earth (Bhumi Devi) stands as an unforgettable assertion of uncompromised personal dignity.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Maryada Purushottama',
          originalScriptOrRoot: 'Sanskrit: मर्यादा पुरुषोत्तम',
          definition: 'The ideal human being who embodies and honors supreme ethical boundaries and institutional duty.',
          analyticalSignificance: 'Captures Rama\'s unwavering commitment to truth and royal obligation, while inviting reflection on the personal sacrifices demanded by perfection.'
        },
        {
          term: 'Bhakti (Devotional Service)',
          originalScriptOrRoot: 'Sanskrit: भक्ति',
          definition: 'Selfless love, loyalty, and consecrated service toward a higher ideal or beloved lord.',
          analyticalSignificance: 'Exemplified by Hanuman and Lakshmana, demonstrating how capability reaches its highest ethical expression when freed from ego.'
        },
        {
          term: 'Agni Pariksha & Moral Tension',
          originalScriptOrRoot: 'Sanskrit: अग्निपरीक्षा',
          definition: 'Sita\'s ordeal by fire to silence public doubt following her captivity in Lanka.',
          analyticalSignificance: 'Highlights the painful conflict between collective political appearances and personal ethical fairness.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"Truth alone is God in this world; righteousness rests always on truth. All things are rooted in truth; there is no higher state than truth."',
          citation: 'Valmiki Ramayana, Ayodhya Kanda (Book II, Chapter 109)',
          translationNote: 'Rama\'s reply to Jabali; translated from the Sanskrit critical edition tradition (Robert P. Goldman / Sheldon Pollock)'
        },
        {
          text: '"With a blade of grass placed between herself and Ravana, Sita spoke without fear, her mind fixed steadfastly upon righteousness."',
          citation: 'Valmiki Ramayana, Sundara Kanda (Book V)',
          translationNote: 'Paraphrased from the Sundara Kanda narrative of Sita\'s defiance in the Ashoka Grove',
          isParaphrase: true
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'mahabharata',
          targetWorkTitle: 'The Mahabharata',
          connectionInsight: 'While the Ramayana explores the high cost of upholding ideal dharma, the Mahabharata plunges into situations where every available duty appears compromised.'
        },
        {
          targetRealmId: 'odyssey',
          targetWorkTitle: 'The Odyssey',
          connectionInsight: 'Sita and Penelope both endure prolonged siege by arrogant suitors and captors through steadfastness, moral resolve, and intellectual dignity.'
        }
      ],
      contemporaryReflection:
        'The Ramayana challenges modern leaders and citizens to ask what happens when institutional reputation conflicts with compassion toward an individual. It honors self-discipline and keeping one\'s word while reminding us never to ignore the human voice bearing the cost of public expectations.',
      comparativeSummary: {
        culturalContext: 'Ancient India (Sanskrit Adi-kavya tradition attributed to Valmiki)',
        primaryLenses: 'Moral-Philosophical & Mythic-Archetypal Criticism',
        centralHumanConcern: 'Righteous duty (dharma), sacrifice, devotion (bhakti), and the cost of public perfection',
        enduringInsight: 'Upholding ethical order requires extraordinary self-restraint, yet rigid adherence to public convention can create profound tension with personal justice.'
      }
    },
  {
      id: 'mahabharata',
      romanNumeral: 'V',
      realmName: 'The Chariot of Kurukshetra',
      properTitle: 'The Mahabharata',
      attribution: 'Traditionally associated with Krishna Dvaipayana Vyasa',
      historicalContext: 'Ancient India; a monumental, layered Sanskrit composition developed across centuries (c. 400 BCE to 400 CE)',
      civilizationRegion: 'Ancient India',
      monumentName: 'The Bronze Chariot of Kurukshetra',
      monumentDescription:
        'An antique bronze miniature chariot with intricately carved wheels, reins, ornamental panels, and two sculpted horses positioned on a dusty battlefield surrounded by weathered standards.',
      materialsUsed: 'Antique bronze, dark walnut timber, muted crimson banners, and dusty earth',
      cartographicNote: 'Campus Kurukshetra • Between the two armies where Arjuna lowered his bow',
      bearingLabel: '135° SSE • 8 Leagues from Ithaca',
      compassAngleDeg: 135,
      coordinates: [5.5, 0.2, 4.8],
      celestialDesignation: 'Chart Sector V • 29° 58\' N, 76° 52\' E',
      accentHex: '#873B35',
      secondaryHex: '#A98545',
      badgeColorClass: 'text-[#F4ECD8] border-[#873B35] bg-[#873B35]',
      borderColorClass: 'border-[#873B35]',
      shortEvocativeTagline: 'A bronze chariot and carved wheel poised between two armies at the hour of moral crisis.',
      contextualIntroduction:
        'Spanning roughly one hundred thousand couplets, The Mahabharata chronicles the fratricidal succession crisis between two branches of the Kuru dynasty: the five Pandava brothers and their hundred Kaurava cousins. At the threshold of the eighteen-day war at Kurukshetra, time seems to pause as the archer Arjuna drops his bow Gandiva between the two armies, initiating the philosophical dialogue of the Bhagavad Gita.',
      literaryLenses: ['Deontological Ethics', 'Psychological Criticism'],
      analyticalThesis:
        'Examined through deontological ethics and psychological criticism, The Mahabharata confronts dharma-sankata (the agonizing collision of competing moral imperatives), demonstrating through Arjuna\'s crisis, Krishna\'s doctrine of Nishkama Karma, and Yudhishthira\'s final test of compassion that moral maturity requires acting without selfish attachment while remaining accountable to universal empathy.',
      analyticalSections: [
        {
          heading: 'Dharma-sankata and Arjuna\'s Psychological Paralysis at Kurukshetra',
          paragraphs: [
            'The dynastic conflict between the Pandavas and Kauravas is driven by a chain of compromised choices: Dhritarashtra\'s blind paternal indulgence, Duryodhana\'s envy, Yudhishthira\'s catastrophic wagering in the dice game, and the public humiliation of Draupadi in the Kuru assembly. By the time the armies assemble at Kurukshetra, simple moral binaries have already eroded.',
            'When Arjuna surveys the opposing ranks and sees his grandsire Bhishma, his revered teacher Drona, and his kinsmen, he suffers an acute psychological and ethical collapse (Bhagavad Gita, Chapter 1). His crisis is a classic dharma-sankata: his kshatriya-dharma (warrior duty to resist tyranny and restore just governance) directly clashes with kula-dharma (the sacred obligation to protect family and revere elders). Every path seems tainted by ruin.'
          ]
        },
        {
          heading: 'The Bhagavad Gita and the Deontology of Nishkama Karma',
          paragraphs: [
            'Serving as Arjuna\'s charioteer, Krishna addresses this paralysis in the Bhagavad Gita by redefining the relationship between action and bondage. From a deontological perspective, Krishna argues that true renunciation is not physical flight from responsibility (which in a crisis can mask fear or egoistic aversion), but internal detachment from personal gain.',
            'Through the principle of Nishkama Karma (desireless or non-attached action), Krishna instructs Arjuna that human beings hold the right and obligation to perform their rightful duty (svadharma), but never to claim ownership over the fruits of action (Bhagavad Gita 2.47). Action becomes ethically purified when performed with equanimity (samatva) in war and peace, freed from malice, greed, and ego.'
          ]
        },
        {
          heading: 'The Aftermath of War and Yudhishthira\'s Final Test of Compassion',
          paragraphs: [
            'Crucially, The Mahabharata refuses to glamorize the war that follows. To defeat Bhishma, Drona, Karna, and Duryodhana, the victorious Pandavas resort to painful stratagems that leave their victory soaked in grief, culminating in the haunting lamentations of the Stri Parva (Book of the Women).',
            'At the epic\'s close in the Mahaprasthanika Parva, King Yudhishthira walks alone to the threshold of heaven accompanied only by a stray dog. When Indra invites him to enter paradise on the condition that he abandon the ritually impure hound, Yudhishthira refuses to forsake a loyal creature seeking his protection. The dog reveals itself as Dharma incarnate: the final measure of righteousness is neither conquest nor ritual prestige, but unwavering compassion toward the vulnerable.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Dharma-sankata',
          originalScriptOrRoot: 'Sanskrit: धर्मसंकट',
          definition: 'A moral impasse in which two legitimate ethical obligations directly contradict each other.',
          analyticalSignificance: 'Defines the tragic complexity of the Mahabharata, where characters must choose between family loyalty, personal vows, and public justice.'
        },
        {
          term: 'Nishkama Karma',
          originalScriptOrRoot: 'Sanskrit: निष्काम कर्म',
          definition: 'Action performed steadfastly as duty without selfish attachment to personal reward or outcome.',
          analyticalSignificance: 'Krishna\'s central ethical teaching in the Bhagavad Gita, resolving Arjuna\'s paralysis through inner equanimity rather than escapism.'
        },
        {
          term: 'Dharma Sukshma (Subtle Ethics)',
          definition: 'The recognition that righteousness is subtle, context-sensitive, and ultimately grounded in non-cruelty (anrishamsya).',
          analyticalSignificance: 'Vindicated in Yudhishthira\'s final test with the stray dog at the gates of heaven.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"Thy right is to work only, but never to its fruits; let not the fruit of action be thy motive, nor let thy attachment be to inaction."',
          citation: 'The Mahabharata, Bhishma Parva (Bhagavad Gita 2.47)',
          translationNote: 'Translated from the Sanskrit by S. Radhakrishnan / public domain scholarly rendering'
        },
        {
          text: '"Never for the sake of even the sovereignty of the Gods will I abandon this creature that is devoted to me and seeks my protection."',
          citation: 'The Mahabharata, Mahaprasthanika Parva (Book 17, Section 3)',
          translationNote: 'Translated from the Sanskrit by Kisari Mohan Ganguli (1883-1896 public domain edition)'
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'iliad',
          targetWorkTitle: 'The Iliad',
          connectionInsight: 'Both epics depict monumental wars that expose the tragic cost of martial glory and conclude with a quiet triumph of empathy over wrath.'
        },
        {
          targetRealmId: 'ramayana',
          targetWorkTitle: 'The Ramayana',
          connectionInsight: 'Complements the Ramayana\'s portrait of steadfast duty by interrogating what happens when duties fracture against one another.'
        }
      ],
      contemporaryReflection:
        'Modern academic and professional life frequently confronts us with competing loyalties and burnout driven by obsession with external metrics. Nishkama Karma offers a resilient psychological discipline: commit wholly to the integrity of the work itself while detaching our self-worth from uncontrollable outcomes.',
      comparativeSummary: {
        culturalContext: 'Ancient India (Sanskrit Itihasa & Bhagavad Gita tradition)',
        primaryLenses: 'Deontological Ethics & Psychological Criticism',
        centralHumanConcern: 'Competing duties (dharma-sankata), moral paralysis, non-attached action, and universal compassion',
        enduringInsight: 'When duties collide, ethical integrity lies in acting without egoistic attachment while holding compassion (anrishamsya) as the highest law.'
      }
    },
  {
      id: 'iliad',
      romanNumeral: 'VI',
      realmName: 'The Citadel of Troy',
      properTitle: 'The Iliad',
      attribution: 'Homer (according to traditional attribution)',
      historicalContext: 'Archaic Greece, approximately the eighth century BCE, drawing upon centuries of oral Bronze Age heroic song',
      civilizationRegion: 'Archaic Greece',
      monumentName: 'The Walled Citadel of Troy',
      monumentDescription:
        'A walled miniature Trojan acropolis with layered limestone fortifications, watchtowers, narrow Scaean gates, and a weathered bronze Shield of Achilles mounted prominently near the entrance.',
      materialsUsed: 'Warm limestone, antique bronze, aged timber, and restrained crimson',
      cartographicNote: 'Ilium Troia • The wind-swept ramparts and Scaean Gate above the Scamander plain',
      bearingLabel: '225° SSW • 8 Leagues from Ithaca',
      compassAngleDeg: 225,
      coordinates: [-5.5, 0.2, 4.8],
      celestialDesignation: 'Chart Sector VI • 39° 57\' N, 26° 14\' E',
      accentHex: '#A98545',
      secondaryHex: '#873B35',
      badgeColorClass: 'text-[#3B261A] border-[#8E8575] bg-[#E2D9C5]',
      borderColorClass: 'border-[#8E8575]',
      shortEvocativeTagline: 'Layered limestone ramparts and a forged bronze shield where wrath yields to shared mortal tears.',
      contextualIntroduction:
        'Spanning only a few weeks in the tenth year of the Trojan War, Homer\'s Iliad does not celebrate a triumphalist conquest. Its first word is menis, the ruinous, godlike wrath of Achilles sparked by Agamemnon\'s seizure of his prize of honor, and its arc traces how the pursuit of immortal glory (kleos) devastates both Achaeans and Trojans until grief restores their shared humanity.',
      literaryLenses: ['Tragic-Heroic Criticism', 'Humanist Criticism'],
      analyticalThesis:
        'Through tragic-heroic and humanist criticism, The Iliad deconstructs the heroic code from within, revealing how the relentless pursuit of timê (public honor) and kleos (imperishable glory) fuels destructive menis, while domestic moments like Hector and Andromache\'s farewell and Priam\'s nocturnal supplication to Achilles in Book 24 establish shared mortal vulnerability as the poem\'s deepest truth.',
      analyticalSections: [
        {
          heading: 'Menis, Timê, and Kleos: The Tragic Contradiction of the Heroic Code',
          paragraphs: [
            'In the world of the Homeric warrior, mortality is inescapable; the only compensation for a brief life is timê (tangible status and esteem granted by peers) and kleos aphthiton (imperishable renown preserved in song). When Agamemnon strips Achilles of Briseis in Book 1, he shatters the social contract of the heroic code: why risk death at Troy if tangible honor is arbitrarily confiscated?',
            'Yet Achilles\' subsequent withdrawal and wrath (menis) initiate a tragic chain reaction. By praying for Achaean defeat to prove his worth, Achilles inadvertently causes the death of his beloved companion Patroclus at Hector\'s hands in Book 16. When Achilles returns to battle in Book 18, his rage transcends human bounds, choking the river Scamander with corpses and dragging Hector\'s body around Patroclus\' tomb, demonstrating that unchecked wrath consumes the very humanity of the hero.'
          ]
        },
        {
          heading: 'Hector and Andromache: The Domestic Cost of Martial Glory',
          paragraphs: [
            'Against the bronze clangor of the plain, Homer places the luminous tragedy of Troy\'s interior in Book 6. When Hector meets his wife Andromache and their infant son Astyanax at the Scaean Gates, Andromache pleads with him to fight defensively from the walls rather than make her a widow and their child an orphan.',
            'Hector\'s reply exposes the agonizing bind of the defender: though he foresees the fall of Ilium and grieves more for Andromache\'s future captivity than for his own brothers or parents, shame before the Trojan men and women compels him to return to the front ranks. Andromache\'s "smiling through her tears" (dakruoen gelasasa) when Hector removes his terrifying horsehair-crested helmet to embrace his frightened infant encapsulates everything war is about to extinguish.'
          ]
        },
        {
          heading: 'Priam and Achilles in Book 24: Recognition Through Shared Grief',
          paragraphs: [
            'The moral climax of The Iliad arrives not on the battlefield, but inside Achilles\' shelter at night in Book 24. Aged King Priam enters the enemy camp unseen and performs an unthinkable act of courage and humility: kneeling to kiss the "terrible, man-slaughtering hands" that killed so many of his sons.',
            'Invoking Achilles\' own aging father, Peleus, Priam awakens a profound recognition in the Greek hero. As Priam weeps for Hector at Achilles\' feet and Achilles weeps first for his father and then for Patroclus, their shared lamentation dissolves the boundary between Greek and Trojan, victor and vanquished. By returning Hector\'s body and granting a twelve-day truce for his funeral, Achilles recovers his humanity not through conquest, but through radical empathy for mortal suffering.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Menis (Godlike Wrath)',
          originalScriptOrRoot: 'Greek: μῆνις',
          definition: 'Cosmic, consuming rage normally reserved for the gods when a sacred order is violated.',
          analyticalSignificance: 'The very first word of the epic; tracks Achilles\' alienation from human community until his reconciliation with Priam in Book 24.'
        },
        {
          term: 'Timê & Kleos',
          originalScriptOrRoot: 'Greek: τιμή / κλέος',
          definition: 'Tangible public honor and esteem (timê) and imperishable glory sung after death (kleos).',
          analyticalSignificance: 'The twin engines of the heroic code that drive warriors toward greatness while exacting an unbearable human cost on families and cities.'
        },
        {
          term: 'The Shield of Achilles (Book 18)',
          definition: 'Hephaestus\' forged bronze shield depicting the cosmos, harvests, weddings, dances, law courts, and war.',
          analyticalSignificance: 'An ekphrastic microcosm placing the siege of Troy inside the much wider world of peaceful human civilization being sacrificed to war.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"Remember thy father, godlike Achilles, whose years are even as mine, on the grievous threshold of old age... I have endured what no other mortal on the face of earth hath yet endured, to reach forth my hand to the face of him that hath slain my sons."',
          citation: 'Homer, The Iliad, Book 24, lines 486-506',
          translationNote: 'Translated from the Greek by A. T. Murray (Loeb Classical Library, 1924 public domain edition)'
        },
        {
          text: '"So spake glorious Hector, and stretched out his arms to his boy; but the child shrank back to the bosom of his fair-girdled nurse, crying out, and affrighted at the aspect of his dear father, and seized with dread of the bronze and the crest of horse-hair..."',
          citation: 'Homer, The Iliad, Book 6, lines 466-470',
          translationNote: 'Translated from the Greek by A. T. Murray (Loeb Classical Library, 1924 public domain edition)'
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'odyssey',
          targetWorkTitle: 'The Odyssey',
          connectionInsight: 'Where The Iliad examines the tragic cost of dying young for kleos at Troy, The Odyssey explores the arduous wisdom required to survive and return home (nostos).'
        },
        {
          targetRealmId: 'roland',
          targetWorkTitle: 'The Song of Roland',
          connectionInsight: 'Achilles\' fierce preoccupation with honor anticipates Roland\'s refusal to blow the Oliphant lest his lineage and reputation be shamed.'
        }
      ],
      contemporaryReflection:
        'In a world polarized by tribal hostilities that dehumanize adversaries, Book 24 of The Iliad remains one of humanity\'s greatest moral touchstones. Seeing one\'s own parent or child in the grief of an opponent is the foundation of peace and ethical restraint.',
      comparativeSummary: {
        culturalContext: 'Archaic Greece (Homeric oral epic tradition, c. 8th century BCE)',
        primaryLenses: 'Tragic-Heroic & Humanist Criticism',
        centralHumanConcern: 'Wrath (menis), heroic honor (timê/kleos), domestic loss, and shared mortal vulnerability',
        enduringInsight: 'No quest for glory erases our shared mortality; true nobility emerges when enemies recognize each other\'s grief.'
      }
    },
  {
      id: 'roland',
      romanNumeral: 'VII',
      realmName: 'The Pass of Roncevaux',
      properTitle: 'The Song of Roland',
      attribution: 'Anonymous Anglo-Norman poet; associated with "Turoldus" named in the final line of the Oxford manuscript (Bodleian Library MS Digby 23)',
      historicalContext: 'Medieval France / Anglo-Norman realm, approximately late eleventh to early twelfth century (transforming the historical 778 CE Battle of Roncevaux Pass into crusading legend)',
      civilizationRegion: 'Medieval Europe',
      monumentName: 'The Pass of Roncevaux',
      monumentDescription:
        'A rugged Pyrenean mountain defile with steep rocky slopes, a narrow winding route, a carved stone watchtower, an ivory Oliphant horn displayed near the path, and the weathered sword Durendal.',
      materialsUsed: 'Weathered Pyrenean slate, carved ivory, aged steel, dark timber, and sealing-wax crimson',
      cartographicNote: 'Saltus Roncevallis • The narrow Pyrenean defile of the Oliphant and Durendal',
      bearingLabel: '270° W • 11 Leagues from Ithaca',
      compassAngleDeg: 270,
      coordinates: [-11.0, 0.2, 0.0],
      celestialDesignation: 'Chart Sector VII • 43° 01\' N, 01° 19\' W',
      accentHex: '#873B35',
      secondaryHex: '#8E8575',
      badgeColorClass: 'text-[#F4ECD8] border-[#873B35] bg-[#6E2B25]',
      borderColorClass: 'border-[#873B35]',
      shortEvocativeTagline: 'A solemn Pyrenean pass where an ivory horn and weathered blade mark the divide between valor and prudence.',
      contextualIntroduction:
        'The oldest surviving masterpiece of French epic poetry (chanson de geste), The Song of Roland mythologizes the ambush of Charlemagne\'s rearguard in the Pyrenean defile of Roncevaux. Written during the era of the First Crusade, the poem crystallizes the medieval feudal ethos while staging a devastating debate over where heroic valor ends and reckless pride begins.',
      literaryLenses: ['Historical-Cultural Criticism', 'Chivalric / Ethical Criticism'],
      analyticalThesis:
        'Analyzed through historical-cultural and chivalric criticism, The Song of Roland exposes the structural fragility of feudal honor: Ganelon\'s private vendetta corrupts public allegiance into treason, while the clash between Roland\'s fierce prouesse (prowess) and Oliver\'s lucid mesure (prudent moderation) demonstrates how pride untempered by collective responsibility turns noble courage into preventable catastrophe.',
      analyticalSections: [
        {
          heading: 'Feudal Loyalty and Ganelon\'s Treason: Private Grievance vs. Public Bond',
          paragraphs: [
            'In the eleventh-century feudal order, social stability depended on mutual vassalage: a lord owed protection and just counsel, while a vassal owed absolute fidelity on the battlefield. When Roland nominates his stepfather Ganelon for the perilous embassy to King Marsile of Saragossa, Ganelon interprets the nomination as a calculated death sentence aimed at seizing his lands and honor.',
            'Historically, Ganelon\'s defense at his final trial hinges on the claim that he issued a formal, public defiance (desfiance) to Roland and the Twelve Peers, framing his plot with Marsile as a legitimate private blood-feud rather than treason against Charlemagne. Through Thierry\'s victory over Pinabel in judicial combat, the poem marks a crucial historical transition: in service to the Christian sovereign, a private vendetta against the king\'s rearguard is condemned as high treason against the realm.'
          ]
        },
        {
          heading: 'Prouesse versus Mesure: "Roland Is Fierce and Oliver Is Wise"',
          paragraphs: [
            'At the heart of Roncevaux stands line 1093 of the poem: "Rollant est proz e Oliver est sage" ("Roland is fierce/valiant and Oliver is wise"). Both counts are exemplars of chivalric courage, yet they embody two distinct ethical poles. When Oliver climbs a pine-clad hill and sees the overwhelming Saracen host glinting in the pass, he three times urges Roland to blow his ivory horn, the Oliphant, so Charlemagne\'s main army can turn back to save the rearguard.',
            'Roland three times refuses. Consumed by fear that blowing the horn would bring shame upon his kinsmen ("malvaise essample") and tarnish sweet France\'s renown, Roland equates requesting aid with cowardice. Oliver\'s mesure recognizes that a commander\'s highest obligation is the preservation of his twenty thousand men and the king\'s strategic interest; Roland\'s untempered prouesse prioritizes personal reputation until the rearguard is decimated.'
          ]
        },
        {
          heading: 'The Blowing of the Oliphant and Penitent Martyrdom',
          paragraphs: [
            'When fewer than sixty Franks remain standing, Roland finally proposes blowing the Oliphant. Now it is Oliver who rebukes him in one of medieval literature\'s sharpest critiques: "Vassalage by sense is not folly; / Measure is worth more than recklessness. / Frenchmen are dead because of your lightness" (Laisse 131). Only Archbishop Turpin\'s intervention bridges their estrangement, reminding them that the horn cannot save their lives now, but will summon Charlemagne to avenge them and give their bodies Christian burial.',
            'Roland blows the Oliphant with such heroic agony that his temples burst and blood streams from his mouth. Turning his face toward Spain on a hill beneath a pine tree, attempting in vain to shatter his holy sword Durendal on dark stone lest it fall to an unworthy hand, and offering his right-hand glove to God as a feudal vassal to his heavenly Liege, Roland achieves penitent martyrdom, yet the poem never erases the tragic human cost of his earlier refusal of wise counsel.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Prouesse & Mesure',
          originalScriptOrRoot: 'Old French: Prouesse / Mesure',
          definition: 'Fierce martial valor (prouesse) balanced against prudent judgment, proportion, and self-restraint (mesure).',
          analyticalSignificance: 'Encapsulated in "Roland is fierce and Oliver is wise" (line 1093); shows that valor without prudence destroys those a leader is sworn to protect.'
        },
        {
          term: 'The Oliphant & Durendal',
          definition: 'Roland\'s carved ivory war-horn and his relic-filled, indestructible sword.',
          analyticalSignificance: 'Twin symbols of chivalric identity: the horn represents communal solidarity and communication with Charlemagne, while the sword represents individual martial prowess.'
        },
        {
          term: 'Feudal Vassalage & Desfiance',
          definition: 'The sacred bond of reciprocal loyalty between lord and vassal, contrasted with Ganelon\'s formal declaration of private feud.',
          analyticalSignificance: 'Illustrates the medieval shift from fractured clan vendettas toward centralized loyalty to the realm.'
        }
      ],
      verifiedQuotes: [
        {
          text: '"Roland is fierce and Oliver is wise, / And both of them are marvellous in vassalage..."',
          citation: 'The Song of Roland, Laisse 87, lines 1093-1094',
          translationNote: 'Translated from the Anglo-Norman Oxford manuscript (Rollant est proz e Oliver est sage; Dorothy L. Sayers / Charles Scott Moncrieff tradition)'
        },
        {
          text: '"Comrade Roland, sound your Oliphant: / Charles will hear it, who is passing at the ports; / I pledge you, the Franks will return at once."',
          citation: 'The Song of Roland, Laisse 83, lines 1051-1053',
          translationNote: 'Translated from the Oxford manuscript tradition by Charles Scott Moncrieff (1919 public domain edition)'
        }
      ],
      thematicConnections: [
        {
          targetRealmId: 'iliad',
          targetWorkTitle: 'The Iliad',
          connectionInsight: 'Roland\'s dread of shame before his peers directly echoes Hector\'s dilemma at the Scaean Gates and Achilles\' preoccupation with kleos.'
        },
        {
          targetRealmId: 'odyssey',
          targetWorkTitle: 'The Odyssey',
          connectionInsight: 'Oliver\'s call for mesure aligns with Odyssean metis, whereas Roland\'s refusal to blow the horn mirrors Odysseus\' rash boast to the Cyclops.'
        }
      ],
      contemporaryReflection:
        'In leadership, medicine, engineering, and teamwork, "Roland\'s pride" remains a dangerous failure mode: refusing to ask for help or escalate a problem early because of ego. Oliver\'s principle of mesure reminds us that true responsibility means placing the safety of the team above the appearance of self-sufficiency.',
      comparativeSummary: {
        culturalContext: 'Medieval Europe (Anglo-Norman Chanson de geste, c. 11th to 12th century)',
        primaryLenses: 'Historical-Cultural & Chivalric Criticism',
        centralHumanConcern: 'Feudal loyalty, treason, personal honor (prouesse) vs. prudent responsibility (mesure)',
        enduringInsight: 'Courage untempered by wise counsel (mesure) endangers the community; true honor serves collective responsibility rather than personal vanity.'
      }
    }
];

export const REALM_MAP: Record<RealmId, LiteraryRealm> = LITERARY_REALMS.reduce(
  (acc, realm) => {
    acc[realm.id] = realm;
    return acc;
  },
  {} as Record<RealmId, LiteraryRealm>
);

export const ODYSSEY_SPOTLIGHT_DATA = {
  title: 'The Odyssey',
  attribution: 'Homer (Archaic Greece, approximately the eighth century BCE)',
  monumentTitle: 'The Harbor of Ithaca: Heart of the Navigator\'s Chart',
  overview:
    'Composed in dactylic hexameter at the dawn of Archaic Greek literature, The Odyssey recounts the ten-year homeward voyage of Odysseus following the ten-year siege of Troy, interwoven with his son Telemachus\' coming-of-age search for his father and Penelope\'s twenty-year defense of their household on Ithaca. Unlike epics that conclude at the moment of military triumph, The Odyssey asks what happens after the citadel falls: how a human mind weathered by trauma, temptation, and displacement finds its way back to domestic peace, humility, and reciprocal love.',
  importantCharacters: [
    {
      name: 'Odysseus (Polytropos)',
      role: 'King of Ithaca & Voyager',
      insight: 'Renowned for metis (resourceful intelligence) and endurance; learns to subordinate heroic vanity to patient humility.'
    },
    {
      name: 'Penelope',
      role: 'Queen of Ithaca & Strategic Equal',
      insight: 'Defends the household for twenty years through craft (the shroud of Laertes) and verifies Odysseus through the test of the rooted olive-tree bed.'
    },
    {
      name: 'Telemachus',
      role: 'Prince of Ithaca',
      insight: 'Grows from an uncertain youth overshadowed by his father\'s legend into a discerning leader capable of standing beside Odysseus.'
    },
    {
      name: 'Eumaeus & Eurycleia',
      role: 'Loyal Stewards of the Household',
      insight: 'Embody everyday fidelity and sacred hospitality (xenia) when the palace elite have surrendered to arrogance.'
    }
  ],
  featuredBook20Quote: {
    greekTransliteration: 'Tetlathi dē, kradiē· kai kynteron allo pot\' etlēs...',
    text: '"Endure, my heart; a worse thing even than this didst thou once endure on that day when the Cyclops, unrestrained in daring, devoured my mighty comrades; yet thou didst endure until thy craft found a way for thee forth from the cave, where thou thoughtest to die."',
    citation: 'Homer, The Odyssey, Book 20, lines 18-21',
    editionNote: 'Translated by A. T. Murray, Loeb Classical Library (Harvard University Press, 1919 public domain edition).'
  },
  reasonsForChoosing: [
    {
      title: 'A Redefinition of Heroism for the Thinking Reader',
      body: 'Among all seven works on our chart table, The Odyssey stands at the center because it shifts the locus of heroism from battlefield domination to interior self-governance. Odysseus is flawed, curious, homesick, and mortal; his greatest victories occur when he restrains his own impulses.'
    },
    {
      title: 'The Refusal of Escapism in Favor of Mortal Meaning',
      body: 'On Calypso\'s island of Ogygia, Odysseus is offered what every ancient warrior supposedly craved: ageless immortality free from pain. By rejecting timeless stasis to return to a rocky island and a mortal wife who will grow old beside him, the poem affirms that life\'s value comes precisely from our finite, committed bonds.'
    },
    {
      title: 'Intellectual Symmetry Between Partners',
      body: 'In an ancient literary landscape often dominated by solitary male warriors, Homer crafts Penelope as Odysseus\' intellectual and strategic equal. Her test of the rooted olive-tree bed in Book 23 proves that true homecoming is a dialogue between two discerning minds.'
    }
  ],
  thematicExplorations: [
    {
      id: 'metis',
      title: 'Metis Over Brute Force',
      subtitle: 'Adaptive Intelligence, Foresight, and Emotional Regulation',
      analysis:
        'Throughout The Odyssey, raw physical force (biê) repeatedly proves inadequate against cosmic and psychological perils. In Polyphemus\' cave, killing the sleeping giant would trap the crew behind an immovable boulder; only metis (linguistic wordplay with "Nobody", patience, and engineering) opens the door. Later, tied to the mast before the Sirens or disguised in rags inside his own hall, Odysseus demonstrates that the highest form of metis is not trickery against others, but cognitive mastery over one\'s own appetites, anger, and vanity.',
      collegeAndLifeConnection:
        'In university academics and contemporary life, we constantly face complex challenges that cannot be solved by sheer brute-force cramming or impulsive reaction. Practicing metis means pausing to diagnose the root structure of a problem, setting deliberate boundaries against distractions (like binding oneself to the mast before the Sirens), and adapting our strategy when initial plans fail.'
    },
    {
      id: 'homophrosyne',
      title: 'Penelope and Equal Minds',
      subtitle: 'Homophrosyne as the Architecture of Trust',
      analysis:
        'When Odysseus blesses Nausicaa in Book 6, he names homophrosyne ("like-mindedness" or harmony of spirit) as the highest human good. Penelope embodies this quality across twenty years of political and emotional siege. Neither passive nor gullible, she matches Odysseus\' famous wiles with the shroud of Laertes and the test of the marriage bed built from a living olive tree. When Odysseus loses his composure at the thought that someone cut the trunk of their bed, Penelope outwits the master of stratagems, proving her equal sovereignty in their marriage.',
      collegeAndLifeConnection:
        'Studying Penelope and homophrosyne reshapes how we understand collaboration, friendship, and partnership in adulthood. Meaningful relationships are not built on uncritical compliance or superficial harmony, but on mutual respect for each other\'s intellect, shared standards of integrity, and symbols of trust rooted as deeply as the olive tree.'
    },
    {
      id: 'nostos',
      title: 'Nostos and Humility',
      subtitle: 'The Beggar\'s Cloak and the Wisdom of Starting Over',
      analysis:
        'When Odysseus finally reaches Ithaca, he cannot stride into his palace as the conquering sacker of cities. Transformed into a frail, destitute beggar, he must sit at the threshold of his own hall, depend on the kindness of the swineherd Eumaeus, and absorb the insults of those who look down on the vulnerable. Only by experiencing his kingdom from the bottom up, seeing who honors xenia (sacred hospitality) toward a stranger with nothing to offer, does Odysseus become worthy to rule again.',
      collegeAndLifeConnection:
        'As students transitioning between stages of education and career, we often wish we could skip straight to recognition. The beggar disguise teaches the transformative value of intellectual and personal humility: being willing to enter a new discipline as a beginner, listening to quiet mentors like Eumaeus, and judging our communities by how they treat people who hold no status.'
    }
  ]
};

export const CONSTELLATIONS_OF_UNDERSTANDING = {
  subtitle: 'Synthesizing the Cross-Cultural Discoveries Recorded Across the Voyage',
  pillars: [
    {
      id: 'cross-cultural-dialogue',
      roman: 'I',
      title: 'Dialogue Across the Near East, India, and the West',
      summary: 'One Humanity Asking Enduring Questions Across Distinct Civilizations',
      paragraphs: [
        'Charting a course across the Ancient Near East (The Book of Job), Ancient India (The Panchatantra, The Ramayana, The Mahabharata), Archaic Greece (The Iliad, The Odyssey), and Medieval Europe (The Song of Roland) reveals that no single civilization holds a monopoly on philosophical depth. Separated by oceans, languages, and centuries, these traditions repeatedly converge on the same urgent questions: Why do the innocent suffer? What do we owe our community when duty conflicts with conscience? How do we balance courage with restraint?',
        'Yet their dialogue is enriched by productive contrasts. Where the Homeric epics frame human limitation against tragic mortality and the hunger for kleos or nostos, the Sanskrit epics examine action within a cosmic web of dharma and karma, while the Hebrew poet of Job brings human protest directly before the Creator\'s whirlwind. Reading them side by side replaces cultural insularity with comparative wonder.'
      ]
    },
    {
      id: 'literary-lenses',
      roman: 'II',
      title: 'Literary Lenses as Navigational Instruments',
      summary: 'How Critical Frameworks Reveal Hidden Bearings Within a Text',
      paragraphs: [
        'Just as a navigator uses brass dividers, a compass rose, and a sounding lead to read an unfamiliar coastline, applying distinct literary lenses transforms our reading from passive plot summary into active discovery. Existential and archetypal criticism allow us to see Job\'s whirlwind not as an evasion, but as a radical decentering of human ego.',
        'Similarly, deontological and psychological criticism unlock Arjuna\'s paralysis on the field of Kurukshetra, while tragic-heroic, structuralist, and historical-cultural lenses illuminate why Achilles weeps with Priam, how Vishnu Sharma\'s nested fables dissect political manipulation, and why Roland\'s refusal to sound the Oliphant reflects medieval anxieties over feudal honor.'
      ]
    },
    {
      id: 'cultural-mirror',
      roman: 'III',
      title: 'Literature as a Living Mirror of Human Experience and Society',
      summary: 'Preserving the Ethical Architecture of Ancient Worlds',
      paragraphs: [
        'Great literature preserves not merely what ancient societies built, but how they felt, argued, and doubted. Through these seven works, we witness the living texture of ancient values: the sacred law of hospitality (xenia) and like-minded partnership (homophrosyne) in Greece; the intricate debates over raja-dharma, bhakti, and niti in India; the fierce code of vassalage in Carolingian memory; and the refusal of hollow orthodoxy in wisdom literature.',
        'Crucially, the greatest masterpieces do not merely repeat their culture\'s dominant ideology; they interrogate its fractures. Valmiki lets us feel the sorrow of Sita\'s exile; Vyasa lets us hear the mourning women after Kurukshetra; Homer gives the last books of The Iliad to Trojan grief.'
      ]
    },
    {
      id: 'critical-empathy',
      roman: 'IV',
      title: 'Growth in Critical Thinking, Interpretation, and Moral Empathy',
      summary: 'From Textual Analysis to Ethical Discernment in the Real World',
      paragraphs: [
        'Sustained engagement with complex literary texts trains two capacities rarely developed together: analytical rigor and moral empathy. Analyzing Karataka and Damanaka\'s rhetoric in The Panchatantra or Ganelon\'s defense in The Song of Roland sharpens our ability to detect manipulation, weigh competing arguments, and question simplistic narratives.',
        'At the same time, inhabiting the consciousness of Job in the ashes, Hector removing his helmet for his frightened son, or Yudhishthira refusing to abandon a stray dog expands our capacity to care for lives beyond our immediate circle.'
      ]
    }
  ]
};
