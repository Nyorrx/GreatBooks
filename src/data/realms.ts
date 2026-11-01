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
        'A small Greek ship with a cedar hull, ivory oars, and a worn sail pulling into a quiet harbor surrounded by rocky cliffs, olive trees, a shore path, and a brass compass rose.',
      materialsUsed: 'Aged cedar, carved ivory, antique brass, slate blue, and olive green',
      cartographicNote: 'Portus Ithacae • Odysseus\' home harbor and the rooted olive tree',
      bearingLabel: '000° Origin • Center of the Chart Table',
      compassAngleDeg: 0,
      coordinates: [0, 0.25, 0],
      celestialDesignation: 'Chart Origin • Sector I • 38° 22\' N, 20° 43\' E [ITHACA]',
      isFavoriteMasterpiece: true,
      accentHex: '#873B35',
      secondaryHex: '#A98545',
      badgeColorClass: 'text-[#F4ECD8] border-[#873B35] bg-[#873B35]',
      borderColorClass: 'border-[#873B35]',
      shortEvocativeTagline: 'A cedar ship sailing back into the quiet cliffs and olive trees of home.',
      contextualIntroduction:
        'Sitting right at the center of the map, Homer\'s Odyssey follows Odysseus on his ten-year trip home after the fall of Troy. Even though the story is famous for monsters and sea storms, it is really about a tired man trying to hold on to his identity, control his pride, and rebuild his home and marriage alongside a wife who is every bit as sharp as he is.',
      literaryLenses: ['Archetypal Criticism', 'Psychological Criticism'],
      analyticalThesis:
        'Looking at The Odyssey through archetypal and psychological criticism shows a different kind of hero than the warriors in The Iliad. Instead of winning through brute strength, Odysseus survives through metis, or practical intelligence. Truly coming home (nostos) means turning down easy escapes, accepting the humbling disguise of a beggar, and rebuilding an equal partnership (homophrosyne) with Penelope.',
      analyticalSections: [
        {
          heading: 'Metis and the Mental Tests at Sea (Lotus-Eaters, Circe, Sirens, Calypso)',
          paragraphs: [
            'As Odysseus tries to get across the Mediterranean, each stop tests a different weakness in human nature. The Lotus-Eaters offer a pleasant way to forget home and give up. Circe\'s drugs turn men who cannot control their appetites into pigs. The Sirens use the past as a trap, singing about the glory of Troy to pull sailors onto the rocks.',
            'Calypso\'s island is the hardest test of all because she offers Odysseus eternal youth if he stays with her. Still, in Book 5, we see him sitting on the shore crying because he wants to go back to rocky Ithaca and grow old with his mortal wife. Getting past these islands takes metis, which means thinking ahead and keeping his emotions in check, something Odysseus has to learn the hard way after foolishly shouting his real name to the Cyclops.'
          ]
        },
        {
          heading: 'Nostos, the Beggar Disguise, and Learning Patience (Book 20)',
          paragraphs: [
            'Landing on Ithaca in Book 13 is only halfway through the story. The hardest test happens inside Odysseus\' own house. Athena disguises him as an old beggar, and the famous war hero has to stand there while arrogant suitors eat his food, insult him, and throw footstools at his head. If he loses his temper too early, he will be killed.',
            'In Book 20, while lying awake in the entryway, Odysseus is so angry at the corruption in his house that his heart barks inside him like a dog protecting her puppies. He hits his chest and tells himself, "Endure, my heart; a worse thing even than this didst thou once endure..." Here, being a hero is not about lashing out in anger. It is about staying patient and waiting for the right moment to act.'
          ]
        },
        {
          heading: 'Penelope, the Olive-Tree Bed, and Equal Minds (Homophrosyne)',
          paragraphs: [
            'The emotional core of The Odyssey is homophrosyne, a Greek word for two people who truly think alike. Odysseus talks about this kind of marriage to Nausicaa in Book 6, and we see it in action with Penelope in Book 23. For twenty years, Penelope has been fighting her own battle at home using her wits, weaving and unweaving Laertes\' burial shroud at night and setting up the test of the bow.',
            'Even after the suitors are dead and Eurycleia tells her Odysseus is back, Penelope refuses to just take someone\'s word for it. She calmly tells the nurse to move their marriage bed into the hall. That one comment tests a secret only the real Odysseus would know: the bed cannot be moved because he carved it straight out of a living olive tree still rooted in the ground. When Odysseus flares up about his bed being cut, Penelope knows for sure it is him. She actually outsmarts the master of tricks, proving they are true equals.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Metis (Adaptive Intelligence)',
          originalScriptOrRoot: 'Greek: μῆτις',
          definition: 'Practical street smarts, planning ahead, self-control, and knowing how to adapt when things go wrong.',
          analyticalSignificance: 'A trait shared by Athena, Odysseus, and Penelope that helps ordinary people survive situations where raw strength (biê) is useless.'
        },
        {
          term: 'Nostos (Homecoming)',
          originalScriptOrRoot: 'Greek: νόστος',
          definition: 'Returning to your home, family, and sense of self. It is also the Greek root for our word "nostalgia."',
          analyticalSignificance: 'Coming home is not just about traveling across the map; it means choosing a real, imperfect life over the forgetfulness of the Lotus-Eaters or the easy immortality of Calypso.'
        },
        {
          term: 'Homophrosyne (Like-Mindedness)',
          originalScriptOrRoot: 'Greek: ὁμοφροσύνη',
          definition: 'A deep mental and emotional match between two partners who respect and understand each other.',
          analyticalSignificance: 'Shown most clearly when Penelope tests Odysseus with the olive-tree bed in Book 23, proving that his homecoming is only complete when they reconnect as equals.'
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
          connectionInsight: 'While The Iliad focuses on dying young for battlefield glory, The Odyssey asks what it takes to survive a war and rebuild a normal life at home.'
        },
        {
          targetRealmId: 'panchatantra',
          targetWorkTitle: 'The Panchatantra',
          connectionInsight: 'Both books value patience, careful speech, and clever problem-solving over rushing in with force.'
        },
        {
          targetRealmId: 'ramayana',
          targetWorkTitle: 'The Ramayana',
          connectionInsight: 'Penelope and Sita both hold their ground with intelligence and quiet strength while separated from their husbands for years.'
        }
      ],
      contemporaryReflection:
        'In college and everyday life, we deal with our own versions of the Lotus-Eaters, like endless scrolling and procrastination, and the Sirens, like ego and unhealthy comparison. The Odyssey is a good reminder that growing up means learning to control your impulses, staying humble enough to start over, and remembering the people who keep you grounded.',
      comparativeSummary: {
        culturalContext: 'Archaic Greece (Homeric oral epic tradition, c. 8th century BCE)',
        primaryLenses: 'Archetypal & Psychological Criticism',
        centralHumanConcern: 'Practical intelligence (metis), coming home (nostos), humility, and equal partnership (homophrosyne)',
        enduringInsight: 'Real strength is not about conquering cities, but about mastering your own temper, avoiding easy escapes, and coming home to the people you love.'
      }
    },
  {
      id: 'job',
      romanNumeral: 'II',
      realmName: 'The Whirlwind',
      properTitle: 'The Book of Job',
      attribution: 'Anonymous Hebrew poet',
      historicalContext: 'Ancient Near East, roughly sixth to fourth century BCE (exact dates are still debated by scholars)',
      civilizationRegion: 'Ancient Near East',
      monumentName: 'The Whirlwind of Uz',
      monumentDescription:
        'A tall pillar of swirling desert sand rising above sandstone rocks and a small stone altar, with carved wooden wind ribbons spiraling into the air.',
      materialsUsed: 'Ochre sandstone, weathered walnut, muted gold, and sepia ink',
      cartographicNote: 'Hic furit turbo super terram Uz • Where honest grief meets the desert storm',
      bearingLabel: '315° NNW • 8 Leagues from Ithaca',
      compassAngleDeg: 315,
      coordinates: [-5.5, 0.2, -4.8],
      celestialDesignation: 'Chart Sector II • 31° 18\' N, 37° 40\' E',
      accentHex: '#A98545',
      secondaryHex: '#D8B978',
      badgeColorClass: 'text-[#3B261A] border-[#A98545] bg-[#E6D6B5]',
      borderColorClass: 'border-[#A98545]',
      shortEvocativeTagline: 'A desert whirlwind over ancient Uz where honest grief questions why good people suffer.',
      contextualIntroduction:
        'Set in the desert land of Uz, The Book of Job pushes back against a comforting belief that was common in the ancient world and still shows up today: the idea that good people are always rewarded with an easy life and that suffering is always a punishment for sin. After losing his children, his wealth, and his health, Job refuses to go along with his three friends\' neat explanations and demands an honest answer from God.',
      literaryLenses: ['Existential Criticism', 'Archetypal Criticism'],
      analyticalThesis:
        'Read through existential and archetypal lenses, The Book of Job takes apart the idea that life works like a simple moral vending machine. It shows that real faith and honesty mean facing suffering directly instead of pretending the universe revolves around human scorekeeping.',
      analyticalSections: [
        {
          heading: 'Why Job\'s Friends Are Wrong and Why Job Refuses to Lie',
          paragraphs: [
            'Throughout the long debates in Chapters 3 to 31, Job\'s friends (Eliphaz, Bildad, and Zophar) stick to a simple formula: God is fair, so if Job is suffering, he must have done something wrong in secret. From an existential point of view, his friends care more about protecting their neat worldview than actually comforting a grieving friend. They would rather blame an innocent person than admit that life can be unpredictable and unfair.',
            'What makes Job stand out is that he refuses to fake a confession just to make his friends happy or try to strike a deal with God ("Till I die I will not put away mine integrity from me," Job 27:5, KJV). His anger and grief are not signs of weak faith. In the end, God actually says Job spoke truthfully while his friends did not, showing that bringing raw, honest pain to God is better than repeating polite clichés.'
          ]
        },
        {
          heading: 'God\'s Answer from the Whirlwind (Chapters 38 to 41)',
          paragraphs: [
            'When God finally answers Job out of the storm in Chapters 38 to 41, the response is surprising. God never mentions the bet with the Accuser from the opening chapters, and He never gives Job a list of reasons for his suffering. Instead, God takes Job on a tour of the universe: the foundations of the earth, the storehouses of snow and hail, mountain goats giving birth, and wild donkeys running free.',
            'By zooming out from Job\'s personal courtroom argument to the whole universe, the poem challenges the idea that creation only exists for human beings. The world is not a simple reward-and-punishment stage built around us; it is a huge, wild place where God sends rain even on empty desert land "wherein there is no man" (Job 38:26, KJV).'
          ]
        },
        {
          heading: 'Behemoth, Leviathan, and Living with Mystery',
          paragraphs: [
            'God\'s speech ends by describing Behemoth and Leviathan (Chapters 40 to 41), two massive creatures of the land and sea that no human can tame or put on a leash. As archetypes, these beasts represent the wild, untamed parts of nature. They are not mistakes in God\'s creation; God actually speaks of Leviathan with pride as "a king over all the children of pride" (Job 41:34, KJV).',
            'When Job replies in Chapter 42, he is not just being bullied into silence. He says that before, he only knew God through secondhand rumors, "by the hearing of the ear," but now he has seen for himself. The book never hands us an easy answer for why bad things happen to good people, but it teaches the humility we need to keep living when life does not make sense.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Retributive Theology',
          definition: 'The belief that wealth and health are automatic rewards for being good, and that suffering is always direct payback for sin.',
          analyticalSignificance: 'Job\'s innocent suffering proves this belief wrong, and God openly rejects the friends\' arguments in Job 42:7.'
        },
        {
          term: 'Theophany in the Whirlwind',
          originalScriptOrRoot: 'Se\'arah (Hebrew: סְעָרָה)',
          definition: 'God speaking directly out of a desert storm in Chapters 38 to 41.',
          analyticalSignificance: 'Shifts the conversation from a narrow debate about rules to a much wider view of how vast and untamed the universe really is.'
        },
        {
          term: 'Behemoth & Leviathan',
          definition: 'Two giant, untamable creatures described at the end of God\'s speeches.',
          analyticalSignificance: 'They show that the world contains wild forces that do not exist to serve human beings, reminding Job that creation is bigger than human control.'
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
          connectionInsight: 'Both books look at painful moments where simple moral rules break down and characters have to face a much bigger reality.'
        },
        {
          targetRealmId: 'iliad',
          targetWorkTitle: 'The Iliad',
          connectionInsight: 'Like Priam and Achilles crying together in Book 24, Job faces human grief honestly without hiding behind fake comfort.'
        }
      ],
      contemporaryReflection:
        'People still have a habit of blaming victims for their bad luck or offering shallow "everything happens for a reason" advice when someone is hurting. The Book of Job shows that it is okay to ask hard questions when life falls apart, and that simply sitting with a friend in pain is much better than lecturing them.',
      comparativeSummary: {
        culturalContext: 'Ancient Near East (Hebrew Wisdom Literature, c. 6th to 4th century BCE)',
        primaryLenses: 'Existential & Archetypal Criticism',
        centralHumanConcern: 'Why innocent people suffer, the limits of neat moral formulas, and humility',
        enduringInsight: 'Honest doubt is more faithful than fake certainty, and the universe is much bigger than our human scorecards.'
      }
    },
  {
      id: 'panchatantra',
      romanNumeral: 'III',
      realmName: 'The Emerald Court',
      properTitle: 'The Panchatantra',
      attribution: 'Traditionally linked to Vishnu Sharma; later spread across Persia, the Arab world, and Europe as Kalila wa-Dimna (Bidpai)',
      historicalContext: 'Ancient India; oral stories and Sanskrit versions developed roughly between 300 BCE and 300 CE',
      civilizationRegion: 'Ancient India',
      monumentName: 'The Emerald Banyan Court',
      monumentDescription:
        'A five-level banyan tree court with carved wooden platforms, hanging roots, green branches, and small animal figures built into the tree.',
      materialsUsed: 'Carved walnut wood, moss green foliage, and aged brass',
      cartographicNote: 'Silva Niti • Five banyan platforms of politics, animal advice, and teamwork',
      bearingLabel: '045° NNE • 8 Leagues from Ithaca',
      compassAngleDeg: 45,
      coordinates: [5.5, 0.2, -4.8],
      celestialDesignation: 'Chart Sector III • 24° 45\' N, 78° 12\' E',
      accentHex: '#68704A',
      secondaryHex: '#A98545',
      badgeColorClass: 'text-[#2C1E12] border-[#68704A] bg-[#DDE0CE]',
      borderColorClass: 'border-[#68704A]',
      shortEvocativeTagline: 'A five-tiered banyan tree where animal fables teach practical lessons on trust, politics, and teamwork.',
      contextualIntroduction:
        'The Panchatantra ("Five Treatises") starts with a clever setup: a teacher named Vishnu Sharma promises to teach three lazy princes how to rule wisely in just six months. Instead of making them memorize dry textbooks, he tells them animal stories. Underneath the talking lions and jackals, the book is a realistic guide to Niti-shastra, meaning practical wisdom, politics, and knowing who to trust.',
      literaryLenses: ['Structuralist / Narrative Criticism', 'Political-Pragmatic (Niti-shastra) Criticism'],
      analyticalThesis:
        'Using stories nested inside other stories and animals acting like royal advisors, The Panchatantra takes a realistic look at how power works. It shows that surviving in politics and everyday life requires two things: spotting manipulative people before they ruin your friendships (Mitra-bheda) and building loyal teams with people you can actually trust (Mitra-samprapti).',
      analyticalSections: [
        {
          heading: 'Stories Inside Stories: How the Frame Structure Works',
          paragraphs: [
            'One of the coolest things about The Panchatantra is its "kathagarbha" or Russian-doll structure, where characters inside one story stop to tell another story to prove a point, warn a friend, or trick a rival. This setup matches how people argue in real life: everyone uses past examples and stories to justify what they want to do next.',
            'Using animals like lions, jackals, bulls, crows, and doves also helps the reader step back and see human behavior clearly. Because they are animals in a forest court, it is easy to spot how flattery, ambition, fear, and gossip work without getting distracted by human excuses.'
          ]
        },
        {
          heading: 'Mitra-bheda: How Damanaka Destroys a Friendship with Words',
          paragraphs: [
            'The first and longest book, Mitra-bheda ("The Loss of Friends"), focuses on Pingalaka the lion king and his close friendship with Sanjivaka, a peaceful bull. Watching from the sidelines are two jackal ministers, Karataka and Damanaka, who feel ignored now that the king listens to the bull.',
            'While Karataka advises staying out of trouble, the ambitious Damanaka decides to break up the friendship using only words. He goes back and forth between the lion and the bull, telling each one half-truths and fables until both friends are convinced the other is plotting to kill him. Damanaka never lifts a claw, yet he gets the lion to kill his best friend. It is a sharp warning about how easily a manipulator can ruin trust when leaders listen to gossip instead of checking the facts.'
          ]
        },
        {
          heading: 'Mitra-samprapti: Why Teamwork Beats Strength',
          paragraphs: [
            'After the dark ending of Book I, the second book, Mitra-samprapti ("The Winning of Friends"), shows the flip side: how weak characters can survive when they work together. When a flock of doves led by Chitragriva gets caught in a hunter\'s net, they do not panic. They all flap their wings at the exact same time, lift the whole net into the air, and fly to their friend Hiranyaka the mouse, who chews through the ropes.',
            'As the mouse, the crow, the tortoise, and the deer team up in the rest of Book II, their friendship proves that safety does not come from being the biggest animal in the jungle. It comes from having smart, reliable friends who look out for each other\'s weaknesses.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Niti-shastra',
          originalScriptOrRoot: 'Nītiśāstra (Sanskrit: नीतिशास्त्र)',
          definition: 'Practical wisdom for everyday life, leadership, and dealing with people.',
          analyticalSignificance: 'Shows that The Panchatantra is not just a bedtime storybook for kids; it was written to teach future leaders how to read people\'s motives and make smart decisions.'
        },
        {
          term: 'Mitra-bheda & Mitra-samprapti',
          originalScriptOrRoot: 'Sanskrit: मित्रभेद / मित्रसंप्राप्ति',
          definition: 'Book I ("The Loss of Friends") and Book II ("The Winning of Friends").',
          analyticalSignificance: 'Placed side by side to contrast how relationships are torn apart by lies (Damanaka) and how they are built through real teamwork.'
        },
        {
          term: 'Kathagarbha (Nested Stories)',
          definition: 'A storytelling style where characters inside the main plot tell smaller stories inside it.',
          analyticalSignificance: 'Shows that stories are tools of persuasion that can either teach good judgment or trick someone into making a huge mistake.'
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
          connectionInsight: 'Both books show that clever thinking (niti and metis) and self-control can beat opponents who are much stronger physically.'
        },
        {
          targetRealmId: 'roland',
          targetWorkTitle: 'The Song of Roland',
          connectionInsight: 'Damanaka\'s scheming in Book I works a lot like Ganelon\'s manipulation when he plots with King Marsile to trap Roland.'
        }
      ],
      contemporaryReflection:
        'With social media rumors and clickbait everywhere today, Karataka and Damanaka feel very familiar. The Panchatantra is a great reminder to always ask what someone has to gain before we believe their side of a story or turn against a friend.',
      comparativeSummary: {
        culturalContext: 'Ancient India (Sanskrit Niti-shastra & global Bidpai tradition)',
        primaryLenses: 'Structuralist Narrative & Political-Pragmatic Criticism',
        centralHumanConcern: 'Practical judgment, reading people\'s motives, trust, and teamwork',
        enduringInsight: 'Good judgment means spotting how manipulative stories divide people while building honest friendships that can handle pressure.'
      }
    },
  {
      id: 'ramayana',
      romanNumeral: 'IV',
      realmName: 'The Bridge to Lanka',
      properTitle: 'The Ramayana',
      attribution: 'Traditionally attributed to the poet Valmiki (Adi Kavi)',
      historicalContext: 'Ancient India; oral epic traditions and Sanskrit versions developed over several centuries BCE to CE',
      civilizationRegion: 'Ancient India',
      monumentName: 'The Sculpted Bridge to Lanka',
      monumentDescription:
        'A carved stone bridge crossing a narrow sea channel with stone arches, small trees on the shore, and the walled city of Lanka in the distance.',
      materialsUsed: 'Warm sandstone, aged ivory, muted gold, and moss green',
      cartographicNote: 'Pons ad Lankam • The stone bridge built across the southern sea',
      bearingLabel: '090° E • 11 Leagues from Ithaca',
      compassAngleDeg: 90,
      coordinates: [11.0, 0.2, 0.0],
      celestialDesignation: 'Chart Sector IV • 09° 17\' N, 79° 18\' E',
      accentHex: '#A98545',
      secondaryHex: '#68704A',
      badgeColorClass: 'text-[#3B261A] border-[#A98545] bg-[#E8DAC0]',
      borderColorClass: 'border-[#A98545]',
      shortEvocativeTagline: 'A stone bridge across the sea toward Lanka, built through loyalty, exile, and hard duty.',
      contextualIntroduction:
        'Known in Sanskrit tradition as the Adi-kavya ("First Poem"), Valmiki\'s Ramayana tells the story of Prince Rama, who is sent into forest exile for fourteen years right before he is supposed to be crowned king. When his wife Sita is kidnapped by Ravana, the ten-headed king of Lanka, Rama teams up with Hanuman and the Vanara army to build a bridge across the sea and rescue her. At its heart, the epic asks what it really costs a person to follow their duty.',
      literaryLenses: ['Moral-Philosophical Criticism', 'Mythic-Archetypal Criticism'],
      analyticalThesis:
        'Read through moral-philosophical and mythic-archetypal lenses, The Ramayana shows both the beauty and the heartbreak of dharma. Through Rama\'s strict sense of duty, Hanuman\'s unselfish loyalty, Ravana\'s destructive pride, and Sita\'s quiet dignity, the poem explores what happens when a leader\'s public rules clash with fairness to the person he loves.',
      analyticalSections: [
        {
          heading: 'Rama\'s Fourteen-Year Exile and the Personal Cost of Dharma',
          paragraphs: [
            'In Indian tradition, Rama is known as Maryada Purushottama, the ideal man who respects moral rules and keeps his promises no matter what. When Queen Kaikeyi cashes in two old promises from King Dasharatha to put her own son Bharata on the throne and send Rama into the forest for fourteen years, Rama accepts it calmly. To him, keeping his father\'s word is what holds family and society together.',
            'Still, Valmiki does not pretend that following dharma is easy or painless. Rama\'s departure breaks his father\'s heart so badly that Dasharatha dies of grief, the whole city of Ayodhya mourns, and Bharata refuses to sit on the throne, placing Rama\'s sandals there instead. The story makes it clear that doing your duty often comes with a heavy personal price.'
          ]
        },
        {
          heading: 'Ravana\'s Pride vs. Hanuman\'s Devotion: Two Ways of Using Power',
          paragraphs: [
            'Looking at the characters as archetypes highlights the sharp contrast between Ravana and Hanuman. Ravana is not a mindless monster; he is a brilliant scholar and powerful king whose downfall is his own ego (ahankara) and selfish desire (kama). Because he thinks no god or demon can beat him, he ignores the warnings of his brother Vibhishana and his wife Mandodari and brings ruin to his own city.',
            'Hanuman is the exact opposite. He has incredible strength, able to leap across the ocean to Lanka and carry an entire mountain of healing herbs, yet he never brags or uses his power for himself. Everything he does is out of bhakti, or loyal service to Rama and Sita. Through the two of them, the epic shows that power driven by ego destroys everything around it, while strength used to help others saves lives.'
          ]
        },
        {
          heading: 'Sita\'s Strength and the Painful Clash Between Public Duty and Fairness',
          paragraphs: [
            'While held prisoner in the Ashoka grove in Lanka, Sita shows incredible mental toughness. She places a single blade of grass between herself and Ravana as a boundary and refuses to give in to his threats or bribes. However, the hardest ethical question in the book comes after the war is won.',
            'When Rama makes Sita walk through fire (Agni Pariksha) to prove her purity to the watching crowd, and in the later Uttara Kanda sends her into exile because of public gossip even though he knows she is innocent, the story hits a painful conflict. Rama\'s strict duty as a public role model (raja-dharma) collides with the basic fairness he owes his loyal wife. Sita\'s final choice to return to Mother Earth is a powerful stand for her own self-respect.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Maryada Purushottama',
          originalScriptOrRoot: 'Sanskrit: मर्यादा पुरुषोत्तम',
          definition: 'The ideal person who lives by strict moral rules, honor, and public duty.',
          analyticalSignificance: 'Explains why Rama keeps his promises at all costs, while also making the reader think about the personal heartbreak that kind of perfection demands.'
        },
        {
          term: 'Bhakti (Devotional Service)',
          originalScriptOrRoot: 'Sanskrit: भक्ति',
          definition: 'Deep loyalty, love, and unselfish service to someone or something higher than yourself.',
          analyticalSignificance: 'Best seen in Hanuman and Lakshmana, showing how great ability is at its best when it is not driven by ego.'
        },
        {
          term: 'Agni Pariksha (Trial by Fire)',
          originalScriptOrRoot: 'Sanskrit: अग्निपरीक्षा',
          definition: 'Sita walking through fire after the battle of Lanka to silence public doubts about her faithfulness.',
          analyticalSignificance: 'Brings out the hardest question in the epic: what happens when protecting a leader\'s public image hurts an innocent person?'
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
          connectionInsight: 'While The Ramayana shows the cost of following ideal dharma, The Mahabharata looks at messy situations where every choice seems to break a rule.'
        },
        {
          targetRealmId: 'odyssey',
          targetWorkTitle: 'The Odyssey',
          connectionInsight: 'Both Sita and Penelope stay strong and outsmart the people pressuring them during long years of separation.'
        }
      ],
      contemporaryReflection:
        'The Ramayana makes us think about what happens when public expectations or institutional rules clash with treating an individual fairly. It respects self-control and keeping your word, but Sita\'s story also reminds us not to ignore the human cost when someone is judged by unfair public rumors.',
      comparativeSummary: {
        culturalContext: 'Ancient India (Sanskrit Adi-kavya tradition attributed to Valmiki)',
        primaryLenses: 'Moral-Philosophical & Mythic-Archetypal Criticism',
        centralHumanConcern: 'Moral duty (dharma), keeping promises, unselfish loyalty (bhakti), and the cost of public image',
        enduringInsight: 'Living by strong principles takes real discipline, but putting public appearances above a person\'s dignity creates a painful moral tension.'
      }
    },
  {
      id: 'mahabharata',
      romanNumeral: 'V',
      realmName: 'The Chariot of Kurukshetra',
      properTitle: 'The Mahabharata',
      attribution: 'Traditionally attributed to Krishna Dvaipayana Vyasa',
      historicalContext: 'Ancient India; a massive Sanskrit epic built up over centuries (roughly 400 BCE to 400 CE)',
      civilizationRegion: 'Ancient India',
      monumentName: 'The Bronze Chariot of Kurukshetra',
      monumentDescription:
        'A small bronze war chariot with spoked wheels, reins, carved side panels, and two horses standing on a dusty battlefield.',
      materialsUsed: 'Antique bronze, dark walnut wood, crimson banners, and dusty earth',
      cartographicNote: 'Campus Kurukshetra • Between the two armies where Arjuna put down his bow',
      bearingLabel: '135° SSE • 8 Leagues from Ithaca',
      compassAngleDeg: 135,
      coordinates: [5.5, 0.2, 4.8],
      celestialDesignation: 'Chart Sector V • 29° 58\' N, 76° 52\' E',
      accentHex: '#873B35',
      secondaryHex: '#A98545',
      badgeColorClass: 'text-[#F4ECD8] border-[#873B35] bg-[#873B35]',
      borderColorClass: 'border-[#873B35]',
      shortEvocativeTagline: 'A bronze chariot stopped between two armies at a moment of impossible moral choice.',
      contextualIntroduction:
        'At around one hundred thousand verses, The Mahabharata tells the story of a bitter family feud over the throne between two sets of cousins: the five Pandava brothers and the hundred Kauravas. Right before the eighteen-day war begins at Kurukshetra, the great archer Arjuna looks across the field at his own relatives and teachers, drops his bow Gandiva, and asks his charioteer Krishna how fighting his own family could ever be right.',
      literaryLenses: ['Deontological Ethics', 'Psychological Criticism'],
      analyticalThesis:
        'Read through deontological ethics and psychological criticism, The Mahabharata looks at dharma-sankata, the painful trap where two moral duties directly clash. Through Arjuna\'s breakdown before the battle, Krishna\'s teaching on Nishkama Karma, and Yudhishthira\'s final test with a stray dog, the epic argues that real morality means doing your duty without selfish attachment while keeping compassion at the center.',
      analyticalSections: [
        {
          heading: 'Dharma-sankata: Why Arjuna Freezes Up at Kurukshetra',
          paragraphs: [
            'The war between the Pandavas and Kauravas does not come out of nowhere. It builds up through years of bad choices: King Dhritarashtra letting his son Duryodhana get away with everything, Yudhishthira gambling away his kingdom in a rigged dice game, and Draupadi being humiliated in front of the royal court. By the time both armies line up at Kurukshetra, there are no easy answers left.',
            'When Arjuna rides out between the two armies and sees his grandfather Bhishma, his teacher Drona, and his cousins on the other side, he panics and sits down in his chariot (Bhagavad Gita, Chapter 1). He is caught in a dharma-sankata, a situation where two duties cancel each other out. His duty as a warrior (kshatriya-dharma) tells him to fight for justice, while his duty to his family (kula-dharma) tells him never to kill his own relatives. Either way he turns, he feels like he is doing something wrong.'
          ]
        },
        {
          heading: 'The Bhagavad Gita and Doing Your Duty Without Selfishness (Nishkama Karma)',
          paragraphs: [
            'Krishna, who is serving as Arjuna\'s charioteer, answers his breakdown in the Bhagavad Gita by changing how we think about action. From an ethical standpoint, Krishna points out that simply running away from a hard responsibility does not make someone pure, especially when walking away lets injustice win.',
            'Instead, Krishna teaches Nishkama Karma, which means doing your duty without obsessing over personal reward. In Bhagavad Gita 2.47, he tells Arjuna that we have a responsibility to do our work, but we do not own the results. When you act without greed, anger, or ego, you can face tough situations with a steady mind instead of freezing up.'
          ]
        },
        {
          heading: 'The Grief After the War and Yudhishthira\'s Stray Dog',
          paragraphs: [
            'One thing I really respect about The Mahabharata is that it never makes war look glamorous. To beat Bhishma, Drona, Karna, and Duryodhana, the Pandavas end up bending the rules of fair combat, and their victory leaves almost everyone dead. In the Stri Parva (Book of the Women), the mothers and widows walk across the battlefield crying over the bodies, making the human cost impossible to ignore.',
            'At the very end of the epic, King Yudhishthira walks up the mountains toward heaven with only a stray dog following him. When the god Indra tells him he can enter heaven only if he leaves the dog behind, Yudhishthira refuses to abandon a loyal animal that trusted him. The dog turns out to be Dharma in disguise. After thousands of pages of war and debate, the final test of goodness is simple kindness toward someone weak.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Dharma-sankata',
          originalScriptOrRoot: 'Sanskrit: धर्मसंकट',
          definition: 'A moral dilemma where two real duties clash directly, so following one means breaking the other.',
          analyticalSignificance: 'Drives the main conflicts in The Mahabharata, where characters constantly have to choose between family loyalty, personal promises, and public justice.'
        },
        {
          term: 'Nishkama Karma',
          originalScriptOrRoot: 'Sanskrit: निष्काम कर्म',
          definition: 'Doing what needs to be done out of duty, without worrying about personal gain, fame, or payback.',
          analyticalSignificance: 'Krishna\'s main advice in the Bhagavad Gita, helping Arjuna overcome his panic by focusing on honest effort rather than outcomes.'
        },
        {
          term: 'Dharma Sukshma (Subtle Ethics)',
          definition: 'The idea that right and wrong are often complicated in real life, and that non-cruelty (anrishamsya) matters most.',
          analyticalSignificance: 'Proven at the gates of heaven when Yudhishthira refuses to trade a stray dog\'s loyalty for his own spot in paradise.'
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
          connectionInsight: 'Both epics show how a huge war ruins the winners almost as much as the losers, and both end with a quiet moment of compassion.'
        },
        {
          targetRealmId: 'ramayana',
          targetWorkTitle: 'The Ramayana',
          connectionInsight: 'Where The Ramayana focuses on following an ideal code of duty, The Mahabharata asks what happens when your duties pull you in opposite directions.'
        }
      ],
      contemporaryReflection:
        'As students, it is easy to burn out when we tie all our self-worth to grades, rankings, or job offers. Krishna\'s idea of Nishkama Karma is a genuinely helpful mindset: put your best effort into the work right in front of you, and let go of the outcomes you cannot control.',
      comparativeSummary: {
        culturalContext: 'Ancient India (Sanskrit Itihasa & Bhagavad Gita tradition)',
        primaryLenses: 'Deontological Ethics & Psychological Criticism',
        centralHumanConcern: 'Clashing duties (dharma-sankata), freezing under pressure, working without ego, and basic compassion',
        enduringInsight: 'When duties clash, the right path is to act without selfish motives and never lose your compassion for the vulnerable.'
      }
    },
  {
      id: 'iliad',
      romanNumeral: 'VI',
      realmName: 'The Citadel of Troy',
      properTitle: 'The Iliad',
      attribution: 'Homer (according to traditional attribution)',
      historicalContext: 'Archaic Greece, around the eighth century BCE, passed down from older Bronze Age oral songs',
      civilizationRegion: 'Archaic Greece',
      monumentName: 'The Walled Citadel of Troy',
      monumentDescription:
        'A small walled city of Troy with limestone walls, watchtowers, the Scaean Gates, and a bronze Shield of Achilles resting near the entrance.',
      materialsUsed: 'Warm limestone, antique bronze, aged wood, and muted crimson',
      cartographicNote: 'Ilium Troia • The windy walls and Scaean Gate above the Trojan plain',
      bearingLabel: '225° SSW • 8 Leagues from Ithaca',
      compassAngleDeg: 225,
      coordinates: [-5.5, 0.2, 4.8],
      celestialDesignation: 'Chart Sector VI • 39° 57\' N, 26° 14\' E',
      accentHex: '#A98545',
      secondaryHex: '#873B35',
      badgeColorClass: 'text-[#3B261A] border-[#8E8575] bg-[#E2D9C5]',
      borderColorClass: 'border-[#8E8575]',
      shortEvocativeTagline: 'Stone city walls and a bronze shield where a warrior\'s rage finally gives way to shared grief.',
      contextualIntroduction:
        'Covering just a few weeks in the tenth year of the Trojan War, Homer\'s Iliad is not a cheerful victory story. Its very first word is menis, the destructive rage of Achilles after King Agamemnon takes away his war prize. From there, the poem shows how chasing battlefield fame (kleos) wrecks both the Greeks and the Trojans, until two grieving men finally sit down and cry together.',
      literaryLenses: ['Tragic-Heroic Criticism', 'Humanist Criticism'],
      analyticalThesis:
        'Looking at The Iliad through tragic-heroic and humanist criticism shows how the warrior code ends up destroying the very people who live by it. Chasing public status (timê) and lasting fame (kleos) feeds Achilles\' uncontrollable rage, while scenes like Hector saying goodbye to his wife and child and King Priam begging Achilles for his son\'s body show that shared human grief matters more than glory.',
      analyticalSections: [
        {
          heading: 'Menis, Timê, and Kleos: The Trap of the Warrior Code',
          paragraphs: [
            'For the warriors in Homer\'s world, human life is short, and the only thing that lasts after death is timê (the public respect and prizes you win from other fighters) and kleos (the fame that lives on in songs). When Agamemnon takes Briseis away from Achilles in Book 1, it breaks the basic bargain of their world: why should Achilles die young at Troy if his honor can be taken away on a whim?',
            'Still, Achilles\' reaction makes everything worse. By pulling out of the war and praying for his own Greek teammates to get slaughtered so they will beg him to come back, Achilles ends up causing the death of his best friend Patroclus in Book 16. When he returns to fight in Book 18, his anger is so out of control that he clogs the river with dead bodies and drags Hector\'s corpse behind his chariot for days. His rage costs him his own humanity.'
          ]
        },
        {
          heading: 'Hector and Andromache: What War Costs a Family (Book 6)',
          paragraphs: [
            'Away from the fighting on the plain, Book 6 takes us inside the walls of Troy to show what is actually at stake. When Hector meets his wife Andromache and their baby son Astyanax by the Scaean Gates, Andromache begs him to stay inside the walls and guard the city instead of getting himself killed and leaving them alone.',
            'Hector\'s answer shows how trapped he feels. He already knows Troy is going to fall, and he says the thought of Andromache being dragged off into slavery hurts him more than anything else, yet he still goes back out because he is ashamed of looking like a coward in front of the other Trojans. The moment where baby Astyanax starts crying because he is scared of his father\'s giant bronze helmet, and Hector takes the helmet off and laughs with Andromache through their tears, makes the coming destruction of their family heartbreaking.'
          ]
        },
        {
          heading: 'Priam and Achilles in Book 24: Seeing Yourself in an Enemy',
          paragraphs: [
            'The real turning point of The Iliad does not happen on the battlefield. It happens late at night inside Achilles\' tent in Book 24. Old King Priam sneaks into the Greek camp alone, kneels down in front of Achilles, and kisses the hands of the man who killed his sons.',
            'Priam asks Achilles to think of his own aging father, Peleus, waiting back home. That comparison breaks through Achilles\' anger. Priam cries for Hector at Achilles\' feet, and Achilles cries for his own father and for Patroclus. For a moment, they are no longer Greek and Trojan or winner and loser; they are just two grieving men who know everyone dies. By giving Hector\'s body back and calling a twelve-day truce for the funeral, Achilles finally finds his humanity again.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Menis (Destructive Wrath)',
          originalScriptOrRoot: 'Greek: μῆνις',
          definition: 'An overwhelming, godlike rage that burns out of control when someone\'s honor is insulted.',
          analyticalSignificance: 'The opening word of The Iliad; it follows Achilles as he cuts himself off from everyone else until he finally lets his anger go with Priam in Book 24.'
        },
        {
          term: 'Timê & Kleos',
          originalScriptOrRoot: 'Greek: τιμή / κλέος',
          definition: 'Public respect and war prizes (timê), and the famous name that lives on in song after a warrior dies (kleos).',
          analyticalSignificance: 'These two goals push warriors to fight bravely, but they also trap men like Achilles and Hector into choosing pride over the people they love.'
        },
        {
          term: 'The Shield of Achilles (Book 18)',
          definition: 'The bronze shield made by the god Hephaestus, decorated with scenes of stars, farming, weddings, dancing, law courts, and war.',
          analyticalSignificance: 'Shows the whole wide world of normal, peaceful life right on the shield Achilles carries into battle, reminding us of everything war destroys.'
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
          connectionInsight: 'While The Iliad shows the tragedy of dying young for fame at Troy, The Odyssey focuses on the patience needed to survive and make it back home.'
        },
        {
          targetRealmId: 'roland',
          targetWorkTitle: 'The Song of Roland',
          connectionInsight: 'Achilles\' obsession with his personal honor and Hector\'s fear of public shame look a lot like Roland refusing to blow his horn to call for help.'
        }
      ],
      contemporaryReflection:
        'When people get divided into angry camps and stop seeing the other side as human, Book 24 of The Iliad still hits hard. Being able to look at an opponent and see someone\'s parent or someone\'s child is where real empathy starts.',
      comparativeSummary: {
        culturalContext: 'Archaic Greece (Homeric oral epic tradition, c. 8th century BCE)',
        primaryLenses: 'Tragic-Heroic & Humanist Criticism',
        centralHumanConcern: 'Rage (menis), warrior pride (timê and kleos), family loss, and shared human grief',
        enduringInsight: 'No amount of fame can erase death; our best moments come when we recognize our own grief in our enemies.'
      }
    },
  {
      id: 'roland',
      romanNumeral: 'VII',
      realmName: 'The Pass of Roncevaux',
      properTitle: 'The Song of Roland',
      attribution: 'Anonymous Anglo-Norman poet; linked to "Turoldus" named at the end of the Oxford manuscript (Bodleian Library MS Digby 23)',
      historicalContext: 'Medieval France and England, late eleventh to early twelfth century (turning the 778 CE Battle of Roncevaux Pass into a First Crusade legend)',
      civilizationRegion: 'Medieval Europe',
      monumentName: 'The Pass of Roncevaux',
      monumentDescription:
        'A steep mountain pass in the Pyrenees with rocky cliffs, a narrow winding trail, a stone watchtower, an ivory Oliphant horn, and the sword Durendal.',
      materialsUsed: 'Pyrenean slate, carved ivory, aged steel, dark wood, and sealing-wax crimson',
      cartographicNote: 'Saltus Roncevallis • The narrow mountain pass of the Oliphant horn and Durendal',
      bearingLabel: '270° W • 11 Leagues from Ithaca',
      compassAngleDeg: 270,
      coordinates: [-11.0, 0.2, 0.0],
      celestialDesignation: 'Chart Sector VII • 43° 01\' N, 01° 19\' W',
      accentHex: '#873B35',
      secondaryHex: '#8E8575',
      badgeColorClass: 'text-[#F4ECD8] border-[#873B35] bg-[#6E2B25]',
      borderColorClass: 'border-[#873B35]',
      shortEvocativeTagline: 'A narrow mountain pass where an ivory horn and a knight\'s sword show the line between bravery and reckless pride.',
      contextualIntroduction:
        'The oldest surviving major work of French literature, The Song of Roland tells the story of how Charlemagne\'s rearguard gets ambushed in the mountain pass of Roncevaux. Written around the time of the First Crusade, the poem celebrates medieval knighthood, but it also asks a tough question: where is the line between brave leadership and foolish pride?',
      literaryLenses: ['Historical-Cultural Criticism', 'Chivalric / Ethical Criticism'],
      analyticalThesis:
        'Read through historical-cultural and chivalric criticism, The Song of Roland shows the weak spots in the medieval code of honor. Ganelon lets a personal grudge turn into treason against his king, while the argument between the reckless Roland (prouesse) and the sensible Oliver (mesure) shows how a leader\'s ego can get his whole team killed.',
      analyticalSections: [
        {
          heading: 'Feudal Loyalty and Ganelon\'s Betrayal: Personal Grudge vs. Public Duty',
          paragraphs: [
            'In eleventh-century feudal society, everything depended on loyalty between a lord and his knights. When Roland volunteers his stepfather Ganelon for a dangerous mission to King Marsile in Saragossa, Ganelon is furious and convinces himself that Roland is trying to get him killed so he can take his lands.',
            'At his trial at the end of the poem, Ganelon argues that he did not commit treason against Charlemagne because he openly challenged Roland and his men first, making it a legal private feud. When Charlemagne\'s champion Thierry defeats Ganelon\'s relative Pinabel in trial by combat, the poem makes a clear historical point: a personal grudge cannot be used as an excuse to betray your country\'s army.'
          ]
        },
        {
          heading: 'Prouesse vs. Mesure: "Roland Is Fierce and Oliver Is Wise"',
          paragraphs: [
            'The most famous line in the poem is line 1093: "Rollant est proz e Oliver est sage" ("Roland is fierce and Oliver is wise"). Both men are brave knights, but they think about leadership in completely different ways. When Oliver climbs a hill and sees a massive enemy army waiting to ambush them in the pass, he asks Roland three times to blow his ivory horn, the Oliphant, so Charlemagne can turn the main army around and save them.',
            'Three times, Roland says no. He is so worried that calling for help will embarrass his family name and make people think he is a coward that he refuses to sound the horn. Oliver has mesure, meaning common sense and a focus on keeping their twenty thousand men alive. Roland has prouesse, raw bravery, but because he cares more about his personal reputation than his men\'s lives, the rearguard walks straight into a slaughter.'
          ]
        },
        {
          heading: 'Blowing the Oliphant Too Late and Roland\'s Last Stand',
          paragraphs: [
            'When only sixty Franks are left alive, Roland finally says he will blow the Oliphant. At that point, Oliver snaps at him in one of the sharpest lines in the book: "Courage with sense is not foolishness; moderation is worth more than recklessness. Frenchmen are dead because of your carelessness" (Laisse 131). Archbishop Turpin has to step in and remind them that while the horn cannot save their lives anymore, blowing it will bring Charlemagne back to bury their bodies and avenge them.',
            'Roland blows the horn so hard that his temples burst. Before dying under a pine tree facing Spain, he tries to break his sword Durendal on a rock so the enemy cannot take it, and holds up his glove to God like a loyal knight. He dies as a martyr, yet the poem never hides the fact that twenty thousand men died because he was too proud to listen to his best friend earlier.'
          ]
        }
      ],
      highlightedConcepts: [
        {
          term: 'Prouesse & Mesure',
          originalScriptOrRoot: 'Old French: Prouesse / Mesure',
          definition: 'Fierce battlefield bravery (prouesse) balanced against common sense, self-control, and good judgment (mesure).',
          analyticalSignificance: 'Summed up in "Roland is fierce and Oliver is wise" (line 1093), showing that bravery without common sense gets the people you lead hurt.'
        },
        {
          term: 'The Oliphant & Durendal',
          definition: 'Roland\'s carved ivory war horn and his unbreakable sword filled with holy relics.',
          analyticalSignificance: 'The horn stands for teamwork and calling on Charlemagne for help, while the sword stands for Roland\'s individual fighting skill.'
        },
        {
          term: 'Feudal Vassalage & Desfiance',
          definition: 'The sworn bond of loyalty between a king and his knights, contrasted with Ganelon\'s claim of a private feud.',
          analyticalSignificance: 'Reflects how medieval Europe was moving away from private family blood-feuds toward loyalty to a single king and country.'
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
          connectionInsight: 'Roland\'s fear of looking weak in front of his peers is just like Hector at the Scaean Gates and Achilles obsessing over his honor.'
        },
        {
          targetRealmId: 'odyssey',
          targetWorkTitle: 'The Odyssey',
          connectionInsight: 'Oliver\'s practical common sense (mesure) matches Odysseus\' smarts (metis), while Roland\'s stubborn pride is like Odysseus bragging to the Cyclops.'
        }
      ],
      contemporaryReflection:
        'In school projects, software engineering, and leadership, "Roland\'s pride" is still a common problem: refusing to ask for help or admit a mistake early because of ego. Oliver\'s idea of mesure is a practical reminder that a good leader cares more about protecting the team than looking tough.',
      comparativeSummary: {
        culturalContext: 'Medieval Europe (Anglo-Norman Chanson de geste, c. 11th to 12th century)',
        primaryLenses: 'Historical-Cultural & Chivalric Criticism',
        centralHumanConcern: 'Loyalty, betrayal, personal pride (prouesse) vs. practical common sense (mesure)',
        enduringInsight: 'Bravery without good judgment puts everyone around you in danger; real honor means putting the team ahead of your ego.'
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
  attribution: 'Homer (Archaic Greece, around the eighth century BCE)',
  monumentTitle: 'The Harbor of Ithaca: Center of the Navigator\'s Chart',
  overview:
    'Homer\'s Odyssey tells the story of Odysseus\' ten-year struggle to get home after the Trojan War, while his son Telemachus searches for him and his wife Penelope holds their home together on Ithaca. Unlike stories that end right after the big battle is won, The Odyssey asks what happens afterward: how a person worn down by war, mistakes, and long years away finds his way back to normal life, humility, and family.',
  importantCharacters: [
    {
      name: 'Odysseus (Polytropos)',
      role: 'King of Ithaca & Traveler',
      insight: 'Known for his quick thinking (metis) and grit; over the course of the trip, he has to learn to keep his pride in check and be patient.'
    },
    {
      name: 'Penelope',
      role: 'Queen of Ithaca & Equal Partner',
      insight: 'Holds off more than a hundred suitors for twenty years through cleverness (weaving Laertes\' shroud) and tests Odysseus with the secret of their olive-tree bed.'
    },
    {
      name: 'Telemachus',
      role: 'Prince of Ithaca',
      insight: 'Grows from an unsure kid living in his famous father\'s shadow into a confident young man who can stand alongside Odysseus.'
    },
    {
      name: 'Eumaeus & Eurycleia',
      role: 'Loyal Caretakers of the Home',
      insight: 'Show real loyalty and kindness to strangers (xenia) even when the rich suitors in the palace have forgotten basic decency.'
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
      title: 'A More Realistic Kind of Heroism',
      body: 'Out of all seven books we read, The Odyssey is my favorite because it defines heroism through self-control and problem-solving instead of just battlefield strength. Odysseus gets homesick, makes mistakes, and has to think his way out of trouble.'
    },
    {
      title: 'Choosing Real Life Over Easy Escapes',
      body: 'On Calypso\'s island, Odysseus is offered eternal youth and a pain-free life if he just stays with her. By turning down immortality to go back to a rocky island and grow old with his wife, he shows that life matters because of the real people we commit to.'
    },
    {
      title: 'A True Partnership of Equals',
      body: 'In a lot of ancient stories, women are pushed to the background, but Homer writes Penelope as Odysseus\' intellectual match. Her test with the olive-tree bed in Book 23 shows that their marriage works because they respect each other\'s minds.'
    }
  ],
  thematicExplorations: [
    {
      id: 'metis',
      title: 'Metis Over Brute Force',
      subtitle: 'Thinking Ahead, Adaptability, and Self-Control',
      analysis:
        'All through The Odyssey, raw muscle (biê) is not enough to get Odysseus out of trouble. In the Cyclops\' cave, killing the sleeping giant would have left the crew trapped behind a huge boulder; only metis (calling himself "Nobody," staying patient, and planning ahead) gets them out alive. Later, whether he is tied to the mast to get past the Sirens or dressed as a beggar in his own hall, Odysseus shows that the hardest part of metis is controlling your own temper and ego.',
      collegeAndLifeConnection:
        'In college and in Computer Science, you run into plenty of problems you cannot solve just by pulling an all-nighter or forcing things. Practicing metis means stepping back to understand the actual problem, setting boundaries against distractions (like tying yourself to the mast), and adjusting your plan when your first attempt fails.'
    },
    {
      id: 'homophrosyne',
      title: 'Penelope and Equal Minds',
      subtitle: 'Homophrosyne as the Foundation of Trust',
      analysis:
        'When Odysseus talks to Nausicaa in Book 6, he says the best thing in life is homophrosyne, when a husband and wife truly see eye to eye. Penelope proves she is his match across twenty years of pressure. She is neither helpless nor gullible, using Laertes\' shroud to stall the suitors and testing Odysseus with their bed built around a living olive tree. When Odysseus loses his cool at the thought that someone sawed the tree trunk, Penelope outsmarts the great trickster himself.',
      collegeAndLifeConnection:
        'Reading about Penelope and homophrosyne changed how I think about friendships and relationships. Good partnerships are not about one person just agreeing with everything the other says; they are built on mutual respect, honesty, and trust that stays rooted when things get hard.'
    },
    {
      id: 'nostos',
      title: 'Nostos and Humility',
      subtitle: 'The Beggar\'s Disguise and Starting from the Bottom',
      analysis:
        'When Odysseus finally steps foot on Ithaca, he cannot just march into his palace like a conquering general. Disguised as a poor beggar, he has to sit by the doorway of his own home, rely on the kindness of the swineherd Eumaeus, and take insults from people who look down on the poor. Seeing his own kingdom from the bottom up and noticing who still treats a stranger with respect (xenia) is what makes him ready to be a good king again.',
      collegeAndLifeConnection:
        'As college students getting ready to graduate and start our careers, it is tempting to want instant status right away. Odysseus\' beggar disguise is a great reminder to stay humble: be willing to start as a beginner, learn from quiet mentors like Eumaeus, and pay attention to how people treat those who have no status.'
    }
  ]
};

export const CONSTELLATIONS_OF_UNDERSTANDING = {
  subtitle: 'What I Learned by Comparing All Seven Books Across Different Cultures',
  pillars: [
    {
      id: 'cross-cultural-dialogue',
      roman: 'I',
      title: 'Different Cultures Asking the Same Big Questions',
      summary: 'Comparing the Near East, India, Greece, and Medieval Europe',
      paragraphs: [
        'Reading books from the Ancient Near East (The Book of Job), Ancient India (The Panchatantra, The Ramayana, The Mahabharata), Archaic Greece (The Iliad, The Odyssey), and Medieval Europe (The Song of Roland) showed me that no single culture owns wisdom. Even though these writers lived thousands of miles and centuries apart, they kept coming back to the same hard questions: Why do good people suffer? What do we do when two duties clash? Where is the line between bravery and foolish pride?',
        'At the same time, their differences make them even more interesting to read together. Homer\'s heroes wrestle with a short mortal life and the desire for fame or home, the Sanskrit epics look at how our choices fit into dharma and karma, and Job brings his grief straight to God in the storm. Reading them side by side gave me a much wider view of how people make sense of the world.'
      ]
    },
    {
      id: 'literary-lenses',
      roman: 'II',
      title: 'Using Literary Lenses as Practical Tools',
      summary: 'How Different Angles Help You See More in a Story',
      paragraphs: [
        'Just like a sailor uses a compass and dividers to read a map, using literary lenses helped me get past simple plot summaries and actually understand why these stories work. For example, reading The Book of Job through an existential lens helped me see that God\'s speech from the whirlwind is not dodging Job\'s question, but showing him that the universe does not revolve around human scorekeeping.',
        'In the same way, ethical and psychological criticism helped me understand why Arjuna freezes up at Kurukshetra, why Achilles cries with Priam in Book 24, how Vishnu Sharma uses nested animal fables to show how political manipulation works, and why Roland\'s fear of shame costs twenty thousand men their lives.'
      ]
    },
    {
      id: 'cultural-mirror',
      roman: 'III',
      title: 'Literature as an Honest Mirror of Society',
      summary: 'Seeing Both the Ideals and the Flaws of Ancient Worlds',
      paragraphs: [
        'Great books do more than tell us what ancient societies built; they show us what people cared about, argued over, and feared. Across these seven works, we see what held each community together: hospitality to strangers (xenia) and equal partnership (homophrosyne) in Greece, debates over duty (dharma), devotion (bhakti), and practical wisdom (niti) in India, feudal loyalty in medieval France, and honest faith in Hebrew poetry.',
        'What stood out to me most is that the best writers do not just repeat their culture\'s rules; they also show where those rules hurt people. Valmiki lets us feel the unfairness of Sita\'s exile, Vyasa makes us listen to the grieving widows after the war at Kurukshetra, and Homer gives the final lines of The Iliad to the Trojans mourning Hector.'
      ]
    },
    {
      id: 'critical-empathy',
      roman: 'IV',
      title: 'Building Sharper Judgment and Real Empathy',
      summary: 'How Reading Old Stories Helps in Everyday Life',
      paragraphs: [
        'Spending a full semester with these books trained two habits that do not always go together: thinking critically and caring about other people. Watching how Damanaka manipulates the lion and the bull in The Panchatantra or how Ganelon talks his way into treason in The Song of Roland teaches you to question people\'s motives and not fall for easy stories.',
        'At the same time, putting yourself in the shoes of Job sitting in the ashes, Hector taking off his terrifying helmet so he can hug his baby son, or Yudhishthira refusing to leave a stray dog outside heaven makes you more understanding of what other people are going through.'
      ]
    }
  ]
};
