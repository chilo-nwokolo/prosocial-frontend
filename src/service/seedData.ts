/**
 * Seed data derived from the prosocial_db SQL dump.
 * Provides initial data for localStorage when no server API is available.
 */

import type {
  LocalPersonalityBucketType,
  LocalQuestionCategory,
  LocalJournalCategory,
  LocalInterestTrait,
  LocalUniversity,
} from "./localStorage";

// ============== TYPES ==============

export interface SeedSocialPreference {
  id: string;
  title: string;
  description: string | null;
  note: string | null;
  option_type: string | null;
  options: {
    id: string;
    title: string;
    description: string | null;
    note: string | null;
    option_type: string | null;
  }[];
}

// ============== OPTION GENERATORS ==============

const agree5 = (s: number) => [
  { id: String(s), title: "Disagree strongly", value: "1" },
  { id: String(s + 1), title: "Disagree a little", value: "2" },
  { id: String(s + 2), title: "Neutral: no opinion", value: "3" },
  { id: String(s + 3), title: "Agree a little", value: "4" },
  { id: String(s + 4), title: "Agree strongly", value: "5" },
];

const narcScale = (s: number) => [
  { id: String(s), title: "Disagree strongly", value: "2" },
  { id: String(s + 1), title: "Disagree a little", value: "1" },
  { id: String(s + 2), title: "Neutral: no opinion", value: "0" },
  { id: String(s + 3), title: "Agree a little", value: "-2" },
  { id: String(s + 4), title: "Agree strongly", value: "-3" },
];

const narcWeighted = (s: number) => [
  { id: String(s), title: "Disagree strongly", value: "5" },
  { id: String(s + 1), title: "Disagree a little", value: "3" },
  { id: String(s + 2), title: "Neutral: no opinion", value: "0" },
  { id: String(s + 3), title: "Agree a little", value: "-3" },
  { id: String(s + 4), title: "Agree strongly", value: "-5" },
];

const belief7Agree = (s: number) => [
  { id: String(s), title: "(strongly disagree) 1", value: "3" },
  { id: String(s + 1), title: "2", value: "2" },
  { id: String(s + 2), title: "3", value: "1" },
  { id: String(s + 3), title: "(neither disagree nor agree) 4", value: "0" },
  { id: String(s + 4), title: "5", value: "-1" },
  { id: String(s + 5), title: "6", value: "-2" },
  { id: String(s + 6), title: "(strongly agree) 7", value: "-3" },
];

const belief7Disagree = (s: number) => [
  { id: String(s), title: "(strongly disagree) 1", value: "-3" },
  { id: String(s + 1), title: "2", value: "-2" },
  { id: String(s + 2), title: "3", value: "-1" },
  { id: String(s + 3), title: "(neither disagree nor agree) 4", value: "0" },
  { id: String(s + 4), title: "5", value: "1" },
  { id: String(s + 5), title: "6", value: "2" },
  { id: String(s + 6), title: "(strongly agree) 7", value: "3" },
];

const freqDisagree = (s: number) => [
  { id: String(s), title: "Never", value: "-3" },
  { id: String(s + 1), title: "Seldom", value: "-2" },
  { id: String(s + 2), title: "Sometimes", value: "-1" },
  { id: String(s + 3), title: "Often", value: "1" },
  { id: String(s + 4), title: "Mostly", value: "2" },
  { id: String(s + 5), title: "Continously", value: "3" },
];

const freqAgree = (s: number) => [
  { id: String(s), title: "Never", value: "3" },
  { id: String(s + 1), title: "Seldom", value: "2" },
  { id: String(s + 2), title: "Sometimes", value: "1" },
  { id: String(s + 3), title: "Often", value: "-1" },
  { id: String(s + 4), title: "Mostly", value: "-2" },
  { id: String(s + 5), title: "Continously", value: "-3" },
];

// ============== QUESTION TEXT DEFINITIONS ==============

// Onboard questions (category 2, IDs 1-10)
const onboardDefs: [string, string, string][] = [
  ["Tends to be quiet.", "Extroversion", "REVERSE"],
  ["Is compassionate, has a soft heart.", "Agreeableness", ""],
  ["Tends to be disorganized.", "Conscientiousness", "REVERSE"],
  ["Worries a lot.", "Neuroticism", ""],
  ["Is fascinated by art, music, or literature.", "Openness", ""],
  ["Is dominant, acts as a leader.", "Extroversion", ""],
  ["Is sometimes rude to others.", "Agreeableness", "REVERSE"],
  ["Has difficulty getting started on tasks.", "Conscientiousness", "REVERSE"],
  ["Tends to feel depressed, blue.", "Neuroticism", ""],
  ["Has little interest in abstract ideas.", "Openness", "REVERSE"],
];

// Personality questions reused across categories 2 (IDs 11-40), 4 (59-88), 5 (89-118), 6 (119-148)
// Grouped in sets of 10: Personality 1, Personality 2, Personality 3
const personalityDefs: [string, string, string][] = [
  // Personality 1
  ["Is full of energy.", "Extroversion", ""],
  ["Assumes the best about people.", "Agreeableness", ""],
  ["Is reliable, can always be counted on.", "Conscientiousness", ""],
  ["Is temperamental, gets emotional easily.", "Neuroticism", ""],
  ["Is original, comes up with new ideas.", "Openness", ""],
  ["Is outgoing, sociable.", "Extroversion", ""],
  ["Is helpful and unselfish with others.", "Agreeableness", ""],
  ["Is systematic, likes to keep things in order.", "Conscientiousness", ""],
  ["Is relaxed, handles stress well.", "Neuroticism", "REVERSE"],
  ["Is complex, a deep thinker.", "Openness", ""],
  // Personality 2
  ["Has an assertive personality.", "Extroversion", ""],
  ["Is respectful, treats others with respect", "Agreeableness", ""],
  ["Is persistent, works until the task is finished", "Conscientiousness", ""],
  ["Stays optimistic after experiencing a setback", "Neuroticism", "REVERSE"],
  ["Thinks poetry and plays are boring", "Openness", "REVERSE"],
  ["Rarely feels excited or eager.", "Extroversion", "REVERSE"],
  ["Is suspicious of others\u2019 intentions.", "Agreeableness", "REVERSE"],
  ["Sometimes behaves irresponsibly. ", "Conscientiousness", "REVERSE"],
  ["Keeps their emotions under control.", "Neuroticism", "REVERSE"],
  ["Has difficulty imagining things.", "Openness", "REVERSE"],
  // Personality 3
  ["Prefers to have others take charge.", "Extroversion", "REVERSE"],
  ["Can be cold and uncaring.", "Agreeableness", "REVERSE"],
  [" Is efficient, gets things done.", "Conscientiousness", ""],
  ["Feels secure, comfortable with self.", "Neuroticism", "REVERSE"],
  [" Avoids intellectual, philosophical discussions.", "Openness", "REVERSE"],
  ["Is less active than other people.", "Extroversion", "REVERSE"],
  ["Starts arguments with others.", "Agreeableness", "REVERSE"],
  ["Can be somewhat careless.", "Conscientiousness", "REVERSE"],
  ["Is emotionally stable, not easily upset.", "Neuroticism", "REVERSE"],
  ["Is inventive, finds clever ways to do things.", "Openness", ""],
];

// Build personality questions with the standard 5-point scale
const buildPersonalityQs = (
  startQId: number,
  startOptId: number,
  subCatOverride?: string,
) =>
  personalityDefs.map((d, i) => ({
    id: String(startQId + i),
    text: d[0],
    type: "RATING_SCALE" as const,
    sub_category:
      subCatOverride ||
      ["Personality 1", "Personality 2", "Personality 3"][Math.floor(i / 10)],
    trait: d[1],
    note: d[2],
    options: agree5(startOptId + i * 5),
  }));

// ============== SEED DATA EXPORTS ==============

// --- Universities ---
export const SEED_UNIVERSITIES: LocalUniversity[] = [
  { id: "1", name: "Chicago State University" },
];

// --- Personality Bucket Types ---
export const SEED_PERSONALITY_BUCKET_TYPES: LocalPersonalityBucketType[] = [
  {
    id: "1",
    name: "Explorer",
    sub_title: "Menelaus Blue",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493240/Explorer_web_ul3j37.png",
    description:
      "In Greek mythology, Menelaus was a king of Mycenaean, Sparta. Like the butterfly that bears his name, you are a beautiful explorer of the world and someone who people trust.",
    bucketQuestions: [
      {
        id: "1",
        title: "Explorative",
        text: "You are the type of person who likes to try new things! Whereas other people might feel reluctant or uncomfortable when presented with a new opportunity, you are willing to take chances and explore, which helps you grow.",
      },
      {
        id: "2",
        title: "Widespread",
        text: "Because you are so willing to try new things, you also have a tendency to change your mind. One problem you might have is overcommitting yourself or feeling pulled in a lot of di!erent directions. Helping you focus on what matters most to you is going to be one of our top priorities!",
      },
      {
        id: "3",
        title: "Kind",
        text: "You are outgoing and incredibly nice. People love being around you because you make the room come to life. You have the ability to make people feel seen and even loved by your presence. You will also go out of your way to help the people who you really care for.",
      },
    ],
  },
  {
    id: "2",
    name: "Protector",
    sub_title: "Batesia Hypoclora",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493239/Protector_web_rykday.png",
    description:
      "The term Batesia refers to the protective ability to imitate the structure and coloration of another species. Like the butterfly that bears its name, you are someone who is protective of your world, but beautiful to those who know you.",
    bucketQuestions: [
      {
        id: "4",
        title: "Thoughtful",
        text: "You are reflective and take your time to think before you act. Your prudent nature means you like to get to know people before trusting them. As a result, before you open up to a new person, you can seem mysterious and intriguing.",
      },
      {
        id: "5",
        title: "Reserved",
        text: "Because you take your time to process, you are a person who can struggle to find your groove when engaging in new experiences. When presented with unfamiliar opportunities, you might be likely to turn them down. Helping you encounter new situations is going to be one of our top priorities!",
      },
      {
        id: "6",
        title: "Deliberate",
        text: "he flip side of being reserved is that you know what you like and you don't often deviate from what you know. You are deliberate in the way you live. Being consistent in your behaviors, the people in your life know what to expect from you.",
      },
    ],
  },
  {
    id: "3",
    name: "Listener",
    sub_title: "Swallowtail Maackii",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493240/Listener_web_zlnash.png",
    description:
      "Maackii is a form of honeysuckle. Like the butterfly that bears its name, you are a sweet person with whom people love to spend time.",
    bucketQuestions: [
      {
        id: "7",
        title: "Pleasant",
        text: "You are a pleasure to be around. People enjoy your company as you are very agreeable and easy to get along with in social situations. More often than not, you are someone people look to when they need a good listener.",
      },
      {
        id: "8",
        title: "Quiet",
        text: "Your willingness to listen comes from the fact that you don't like being the center of attention. Unless you know someone extremely well, you will often defer to others so that you can avoid the spotlight. Unfortunately, this can be read by others as a lack of confidence. One of our goals will be to help you take chances to express yourself more.",
      },
      {
        id: "9",
        title: "Thoughtful",
        text: "One of the most important reasons why you should learn to take chances is because underneath your quiet demeanor is someone who is very thoughtful. The fact that you spend a lot of time reflecting and processing gives you a rich inner life. Although you may not speak often, when you do, you say something worth hearing.",
      },
    ],
  },
  {
    id: "4",
    name: "Dependable",
    sub_title: "Papilio Ulysses",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493239/Dependable_web_nf5fxo.png",
    description:
      "Named for the Greek king of Ithaca, Ulysses never shied away from a journey. Like the butterfly that bears its name, your presence is steady and reassuring to those around you.",
    bucketQuestions: [
      {
        id: "10",
        title: "Outgoing",
        text: "You enjoy being social and are willing to engage in new experiences! While other people might shy away from unique opportunities, you are willing to take chances and explore. Moreover, you don't mind being the center of attention. ",
      },
      {
        id: "11",
        title: "Assertive",
        text: "Your openness to being the center of attention also means that you also tend to be very sure of yourself. You know what you believe and you're not shy about expressing your opinion. In certain social situations, your confidence can feel overpowering. One of our goals will be to help you know when to express yourself and when to let others take the driver's seat.",
      },
      {
        id: "12",
        title: "Steadfast",
        text: "Perhaps one of the most important aspects of your personality is your reliability. Your presence is something that people can count on through thick and thin. Whereas other people can be flakey, you are a person who holds to your word. You are always there for your friends!",
      },
    ],
  },
  {
    id: "5",
    name: "Acceptor",
    sub_title: "Algais Io",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493239/Acceptor_web_caaswo.png",
    description:
      "As a moon of Jupiter, Io is a consistent presence in the night sky. Like the butterfly that bears its name, you are dependable and your presence enhances the lives of those who know you",
    bucketQuestions: [
      {
        id: "13",
        title: "Calm",
        text: "Not much bothers you! In situations where other people get upset, you have the ability to brush things o!. As a result, you are very accepting of others and non-judgmental, which makes you an excellent friend.",
      },
      {
        id: "14",
        title: "Habitual",
        text: "You like to have a set schedule where you know what to expect. On the one hand, this is a great trait because you are very reliable. On the other hand, you can sometimes struggle to be spontaneous or to try new things. Helping you embrace new situations is going to be one of our top priorities!",
      },
      {
        id: "15",
        title: "Conscientious",
        text: "You are very on top of your responsibilities. You are also someone who cares about being kind to the people around you. This combination means that people often place a lot of trust in you. Whenever your friends and family need someone dependable, you will be their go-to person.",
      },
    ],
  },
  {
    id: "6",
    name: "Sage",
    sub_title: "Callicore Excelsior",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493244/Sage_web_awtrhh.png",
    description:
      "The term Excelsior indicates superior quality. Like the butterfly that bears its name, your presence enhances the lives of the people who you encounter.",
    bucketQuestions: [
      {
        id: "16",
        title: "Perceptive",
        text: "When you speak, you come across as confident in your knowledge and opinions. Even if you don't always feel internally composed, to the outside world you are seen as someone who carries authority. Your insights can be important contributions when forming friendships.",
      },
      {
        id: "17",
        title: "Analytical",
        text: "The flipside to being perceptive is that you tend to analyze all aspects of your life. In fact, you may tend to overanalyze, which can sometimes lead to feelings of anxiety. One of our goals will be to help you identify when those feelings are normal and when they are preventing you from being your best self.",
      },
      {
        id: "18",
        title: "Explorative",
        text: "You are the type of person who likes to try new things! Whereas other people might feel reluctant or uncomfortable when presented with a new opportunity, you are willing to take chances and explore, which helps you grow.",
      },
    ],
  },
  {
    id: "7",
    name: "Companion",
    sub_title: "Red Admiral Atalanta",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493239/Companion_web_vw8ztg.png",
    description:
      "The Red Admiral Atalanta is named for the Greek Goddess of Running. Like the butterfly that bears its name, you are constantly on the move, making the world better by your presence",
    bucketQuestions: [
      {
        id: "19",
        title: "Gregarious",
        text: "You enjoy being social and are willing to engage in new experiences! You enjoy being around people and, in turn, people enjoy being around you. You bring a lot of energy to social situations, which encourages everyone else to enjoy themselves.",
      },
      {
        id: "20",
        title: "Engrossing",
        text: "As much as you are comfortable being the center of attention, making space for quieter, more reserved people to express themselves is a way of making deeper connections. One of our goals will be to help you learn how to bring out the best in others.",
      },
      {
        id: "21",
        title: "Kind Hearted",
        text: "You are incredibly nice and sincerely want the best for people. You have the ability to make people feel seen and even loved by your presence. You will also go out of your way to help the people who you really care for, which makes you a great friend.",
      },
    ],
  },
  {
    id: "8",
    name: "Dutiful",
    sub_title: "Danaus Plexippus",
    image:
      "https://res.cloudinary.com/doz0qlqcu/image/upload/v1700493239/Dutiful_web_ccwtnw.png",
    description:
      "Danaus Plexippus is better known as the monarch butterfly. Often when people think of butterflies, they picture a monarch. Similarly, you are the kind of reliable friend people envision when they are looking for new connections in their lives",
    bucketQuestions: [
      {
        id: "22",
        title: "Genial",
        text: "You enjoy speaking and engaging with other people. Part of what makes you an interesting person is your ability to capture people's attention with conversation. Especially for people who know you well, your reflections and input matters to the direction of their lives. ",
      },
      {
        id: "23",
        title: "Reserved",
        text: 'ou have strongly developed preferences of what you like and what you don\'t like to do. This means that when presented with the opportunity to engage in new experiences, you will frequently be reluctant. Our goal is to help you say, "Yes!" more often to new opportunities for growth.',
      },
      {
        id: "24",
        title: "Dependable",
        text: "You are the type of person who people know will show up. Your word matters and you will do whatever it takes to be there for people when they need you. Your reliability is what makes you a great friend.",
      },
    ],
  },
  {
    id: "9",
    name: "Unknown",
    sub_title: "--",
    image: "",
    description: "We Could not ascertain Your personality!",
    bucketQuestions: [],
  },
];

// --- Question Categories ---
// Note: Category "1" ("The basics") is omitted because those profile questions
// are provided by personalQuestionsData in src/features/intro/questions.ts

// Narcissism questions (category 2, IDs 41-47)
const narcissismQs = [
  {
    id: "41",
    text: "reacts annoyed if another person steals the show from me.",
    note: "",
    opts: narcScale(201),
  },
  {
    id: "42",
    text: "wants my rivals to fail.",
    note: "",
    opts: narcScale(206),
  },
  {
    id: "43",
    text: "deserves to be seen as a great personality.",
    note: "",
    opts: narcScale(211),
  },
  {
    id: "44",
    text: "tends to be unconcerned with the morality of my actions.",
    note: "",
    opts: narcScale(216),
  },
  {
    id: "45",
    text: "has used deceit or lied to get my way.",
    note: "",
    opts: narcScale(221),
  },
  {
    id: "46",
    text: "is a narcissist.",
    note: "Weighted",
    opts: narcWeighted(226),
  },
  {
    id: "47",
    text: "tends to want others to pay attention to me.",
    note: "",
    opts: narcScale(231),
  },
].map((q) => ({
  id: q.id,
  text: q.text,
  type: "RATING_SCALE",
  sub_category: "Narcissism",
  trait: "Narcissism",
  note: q.note,
  options: q.opts,
}));

// Belief questions (category 3, IDs 48-53)
const beliefQs = [
  {
    id: "48",
    text: "It helps to turn to people in times of need.",
    note: "Agreement = lower points",
    opts: belief7Agree(236),
  },
  {
    id: "49",
    text: "I usually discuss my problems and concerns with others.",
    note: "Agreement = lower points",
    opts: belief7Agree(243),
  },
  {
    id: "50",
    text: "I don't feel comfortable opening up to others.",
    note: "Agreement = lower points",
    opts: belief7Agree(250),
  },
  {
    id: "51",
    text: "I often worry that other people do not really care for me.",
    note: "Disagreement = lower points",
    opts: belief7Disagree(257),
  },
  {
    id: "52",
    text: "I'm afraid that other people may abandon me.",
    note: "Disagreement = lower points",
    opts: belief7Disagree(264),
  },
  {
    id: "53",
    text: "I worry that others won't care about me as much as I care about them.",
    note: "Disagreement = lower points",
    opts: belief7Disagree(271),
  },
].map((q) => ({
  id: q.id,
  text: q.text,
  type: "RATING_SCALE",
  sub_category: "Beliefs",
  trait: undefined as string | undefined,
  note: q.note,
  options: q.opts,
}));

// Behavior questions (category 3, IDs 54-58)
const behaviorQs = [
  {
    id: "54",
    text: "I felt very anxious.",
    note: "Disagreement = lower points",
    opts: freqDisagree(278),
  },
  {
    id: "55",
    text: "I felt so down that nothing could cheer me up.",
    note: "Disagreement = lower points",
    opts: freqDisagree(284),
  },
  {
    id: "56",
    text: "I felt calm and peaceful.",
    note: "Agreement = lower points",
    opts: freqAgree(290),
  },
  {
    id: "57",
    text: "I felt depressed and gloomy.",
    note: "Disagreement = lower points",
    opts: freqDisagree(296),
  },
  {
    id: "58",
    text: "I felt happy.",
    note: "Agreement = lower points",
    opts: freqAgree(302),
  },
].map((q) => ({
  id: q.id,
  text: q.text,
  type: "SINGLE_CHOICE",
  sub_category: "behavior",
  trait: undefined as string | undefined,
  note: q.note,
  options: q.opts,
}));

export const SEED_QUESTION_CATEGORIES: LocalQuestionCategory[] = [
  {
    id: "2",
    name: "Your personality",
    questions: [
      // Onboard questions (IDs 1-10, option IDs 1-50)
      ...onboardDefs.map((d, i) => ({
        id: String(i + 1),
        text: d[0],
        type: "RATING_SCALE",
        sub_category: "Onboard",
        trait: d[1],
        note: d[2],
        options: agree5(i * 5 + 1),
      })),
      // Personality 1/2/3 questions (IDs 11-40, option IDs 51-200)
      ...buildPersonalityQs(11, 51),
      // Narcissism questions (IDs 41-47)
      ...narcissismQs,
    ],
  },
  {
    id: "3",
    name: "Behaviors & beliefs",
    questions: [...beliefQs, ...behaviorQs],
  },
  {
    id: "4",
    name: "How you approach life",
    questions: buildPersonalityQs(59, 308),
  },
  {
    id: "5",
    name: "How you approach life",
    questions: buildPersonalityQs(89, 458, "How you approach life"),
  },
  {
    id: "6",
    name: "How you approach life",
    questions: buildPersonalityQs(119, 608, "How you approach life"),
  },
];

// --- Journal Categories ---

export const SEED_JOURNAL_CATEGORIES: LocalJournalCategory[] = [
  { id: "1", title: "Happiest ChildhoodMemory", type: "journal", journals: [] },
  {
    id: "2",
    title: "Greatest Personal Achievement",
    type: "journal",
    journals: [],
  },
  {
    id: "3",
    title: "Hardest Learned Life Lesson",
    type: "journal",
    journals: [],
  },
  { id: "4", title: "Most Valued Relationship", type: "journal", journals: [] },
];

export const SEED_CHALLENGE_CATEGORIES: LocalJournalCategory[] = [
  {
    id: "5",
    title: " Interesting or Funny Story",
    type: "challenge",
    video_url: "https://youtu.be/lE4Rog9BUss",
    transcript:
      "Hi there! Your challenge for today is to write down one interesting or funny story that happened to you during the day. You can be as detailed as you like when you write the story, but the goal is to focus on something positive that happened to you today. If you're wondering how this exercise is helpful, studies have shown that a person's happiness partially depends on the emotional experiences given priority in their lives. If you dwell on negative emotional experiences, then those thoughts will often result in feelings of unhappiness. But when you train your brain to focus on positive emotional experiences, you are more likely to experience greater levels of overall happiness in your life. If you're watching this at the end of your day, feel free to write down your story in the Journaling App below. If you've just begun your day or are in the middle of it, we look forward to hearing your story. Keep up the good work!",
    journals: [],
  },
  {
    id: "6",
    title: "Commitments",
    type: "challenge",
    video_url: "https://youtube.com/shorts/JlYS8dliPKY",
    transcript:
      "Hi there! Your challenge today is to make a promise or commitment to yourself and write that promise or commitment down in a note on your phone or calendar. Sometimes we say we're going to do something and then fail to follow through. Depending on what we've promised or committed to, the lack of follow through can create breaches in trust with our friends, family and colleagues. By writing down our commitments, we are much more likely to follow through with our promises! It is well established that by showing commitment to yourself and others, you will not only improve your relationships, but you will also improve yourself. After you write down your commitment, spend some time in the Journaling App writing down how it made you feel. Later, let us know if you followed through with your commitment. We believe in you! Keep up the good work!",
    journals: [],
  },
  {
    id: "7",
    title: "Curiosity",
    type: "challenge",
    video_url: "https://youtu.be/lzsFiygyosw",
    transcript:
      'Hi there! Your challenge today is to write down a question about something in your daily life that you don\'t already know the answer to. For example, "What is plastic made of?" or "Why do humans dream?" Then, once you write down the question, we want you to take a moment in your day to discover the answer. You might be asking, "Why does this challenge matter?" Because curiosity is an underappreciated aspect of a purposeful life. When you\'re curious about the world, not only do you learn new things that you didn\'t know before, but it also helps cultivate a sense of excitement that expands our horizons. These little tidbits of knowledge can also be interesting conversation starters when you go on a social outing. If you have the time, please tell us the question you wrote down and the answer you discovered in the Journaling App. We look forward to seeing where your curiosity takes you! Keep up the good work!',
    journals: [],
  },
  {
    id: "8",
    title: "Something nice someone did for you",
    type: "challenge",
    video_url: "https://youtu.be/BkiXjgVmw4k",
    transcript:
      "Hi there! Your challenge is to write down a nice thing someone else did for you today. For example, perhaps someone held the door for you when you were walking into a store, or someone complimented your outfit, or maybe someone smiled at you when you were ordering food. When we take the time to reflect on how other people went out of their way to do something nice for us, it enhances our sense of belonging when we might otherwise have felt isolated or lonely. More importantly, reflecting on how others have treated us with kindness encourages us to want to do nice things in return. This positive feedback loop is an important component of developing a strong sense of community. When you think of something kind that someone did for you, please make an effort to share that kindness with us in the Journaling App. Tell us how it made you feel and how you might be able to pay that kindness forward. Keep up the good work!",
    journals: [],
  },
  {
    id: "9",
    title: "List of people counting on you",
    type: "challenge",
    video_url: "https://youtube.com/shorts/RcaslBI3N10",
    transcript:
      "Hi there! Your challenge is to write down a list of people who are counting on you. Perhaps someone expects you to attend an event or contribute to an assignment or run an errand for them. Sometimes these obligations can feel overwhelming, but there's a positive side to these responsibilities. When someone looks to you for help, that means they trust you. It means they believe you will come through for them. This type of trust is the glue that holds our relationships together. When we know that people depend on us, that feeling can also motivate us to get moving, connect with others, and make positive contributions to our community. Although you don't have to share your list with us, we would love if you would take time in the Journaling App to let us know how it makes you feel that people count on you. Keep up the good work! We look forward to hearing from you!",
    journals: [],
  },
  {
    id: "10",
    title: "Questions for someone you don't know",
    type: "challenge",
    video_url: "https://youtu.be/3tZYxq3Uco8",
    transcript:
      "Hi there! Your challenge is to write down a list of questions to ask someone you don't know. This might seem like a strange exercise, but for many people, starting conversations can be challenging. When you ask people questions about themselves, you are demonstrating that you care about their lives. We know that humans are naturally inclined to socialize with each other, even strangers. When you have these questions in the back of your mind, what you'll find is that they allow you to tap into our natural disposition to socialize. Even though it might feel awkward, when you take an interest in another person by asking them questions, you are bridging the \"empathy gap\", which often results in people wanting to interact and talk with you! Take some time to write down these questions in the Journaling App. If you're struggling, think about questions you would want other people to ask you and go from there. Keep up the good work!",
    journals: [],
  },
  {
    id: "11",
    title: "Five minutes meditating",
    type: "challenge",
    video_url: "https://youtube.com/shorts/OrOywEIncho",
    transcript:
      "Hi there! Your challenge is to spend at least five minutes meditating before you start your day. There are many different ways to meditate, but usually a person will try to clear their mind and focus on their breathing. If it helps, you can also adopt a mantra on which you can focus during your meditation. If possible, you'll want to do this right after you wake up. Studies demonstrate how meditation helps center people in their experiences, confront negative emotions, and gain new perspectives. Most importantly, centering ourselves allows us to better tackle the day ahead of us and start off on the right foot. Later today, after you've spent time meditating, come back to the Journaling App and tell us about the experience of meditating and how it impacted your day. Keep up the good work!",
    journals: [],
  },
  {
    id: "12",
    title: "I choose to be happy!",
    type: "challenge",
    video_url: "https://youtu.be/P-JtzpXD6LU",
    transcript:
      'Hi there! Your challenge tomorrow, when you wake up, is to say aloud to yourself, "I choose to be happy today." Although it might seem like a small thing, psychologists have discovered that rumination early in the morning is associated with more negative thoughts throughout the day. Sometimes, particularly when we are dealing with a lot of challenges in our lives, our minds can ruminate on the negative parts of our lives from the moment we get up. By stating out loud that you "choose to be happy today", you are making a choice to be more attentive to your emotions. Hopefully, this practice will help to stop those negative emotions in their tracks. Being attentive to positive experiences from the moment you wake up helps cultivate an optimistic attitude, which is a major contributor to happiness. Later today, spend some time in the Journaling App and let us know if you felt like it made a difference and how it impacted your day. Keep up the good work!',
    journals: [],
  },
];

// --- Interests by Trait ---

export const SEED_INTERESTS_BY_TRAIT: LocalInterestTrait[] = [
  {
    id: "1",
    title: "Realistic (Doers)",
    interests: [
      {
        id: "2",
        title: "I like to build things.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257055/interest-images/07_-_Build_duq7bm.jpg",
        is_organized_by_trait: true,
      },
      {
        id: "3",
        title: "I like working outdoors.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257043/interest-images/37_-_Outdoors_wjl7wp.jpg",
        is_organized_by_trait: true,
      },
    ],
  },
  {
    id: "4",
    title: "Investigative (Thinkers)",
    interests: [
      {
        id: "5",
        title: "I like to do puzzles.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257053/interest-images/02_-_Puzzles_iwlen2.jpg",
        is_organized_by_trait: true,
      },
      {
        id: "6",
        title: "I enjoy science.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257050/interest-images/18_-_Science_b1phsy.jpg",
        is_organized_by_trait: true,
      },
    ],
  },
  {
    id: "7",
    title: "Artistic (Creators)",
    interests: [
      {
        id: "8",
        title: "I like to read about art and music.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257041/interest-images/08_-_Art_Music_ivgzht.jpg",
        is_organized_by_trait: true,
      },
      {
        id: "9",
        title: "I am a creative person.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257045/interest-images/23_-_Creative_vkkvvy.jpg",
        is_organized_by_trait: true,
      },
    ],
  },
  {
    id: "10",
    title: "Social (Helpers)",
    interests: [
      {
        id: "11",
        title: "I like to work in teams.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257054/interest-images/04_-_Teams_wod1dn.jpg",
        is_organized_by_trait: true,
      },
      {
        id: "12",
        title: "I like to get into discussions about issues.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257040/interest-images/34_-_Discussions_mqkt2w.jpg",
        is_organized_by_trait: true,
      },
    ],
  },
  {
    id: "13",
    title: "Enterprising (Persuaders)",
    interests: [
      {
        id: "14",
        title: "I like to try to influence or persuade people.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257042/interest-images/10_-_Influence_j5xrji.jpg",
        is_organized_by_trait: true,
      },
      {
        id: "15",
        title: "I like to give speeches.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257044/interest-images/42_-_Speeches_jnz9ef.jpg",
        is_organized_by_trait: true,
      },
    ],
  },
  {
    id: "16",
    title: "Conventional (Organizers)",
    interests: [
      {
        id: "17",
        title: "I like to have clear instructions to follow.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257040/interest-images/09_-_Instructions_aovpme.jpg",
        is_organized_by_trait: true,
      },
      {
        id: "18",
        title: "I pay attention to details.",
        image_url:
          "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257049/interest-images/24_-_Details_sdz6jt.jpg",
        is_organized_by_trait: true,
      },
    ],
  },
];

// --- Interests by Non-Trait ---

const nt = (id: string, title: string) => ({
  id,
  title,
  is_organized_by_trait: false as const,
});

export const SEED_INTERESTS_BY_NON_TRAIT: LocalInterestTrait[] = [
  {
    id: "19",
    title: "Creative hobbies and projects",
    interests: [
      nt("20", "Crafting and/or Craftsmanship"),
      nt("21", "Writing"),
      nt("22", "Visual Art"),
      nt("23", "Making Videos"),
      nt("24", "Cooking"),
      nt("25", "Tinkering and Handiwork"),
      nt("26", "Playing an instrument"),
    ],
  },
  {
    id: "27",
    title: "Reading",
    interests: [
      nt("28", "Biography/Autobiography"),
      nt("29", "Fantasy"),
      nt("30", "Science Fiction"),
      nt("31", "Traditional Literature"),
      nt("32", "Historical Fiction"),
      nt("33", "Mystery/Thriller"),
      nt("34", "Reference/Informational"),
      nt("35", "Magazines"),
      nt("36", "Blogs"),
      nt("37", "Poetry"),
    ],
  },
  {
    id: "38",
    title: "Games",
    interests: [
      nt("39", "Card games"),
      nt("40", "Board games"),
      nt("41", "Puzzles"),
      nt("42", "Trivia"),
      nt("43", "Billiards/Ping Pong/Foosball"),
    ],
  },
  {
    id: "44",
    title: "Sports (in which you participate)",
    interests: [
      nt("45", "Soccer"),
      nt("46", "Baseball"),
      nt("47", "Basketball"),
      nt("48", "Football"),
      nt("49", "Tennis/Pickle-ball"),
      nt("50", "Golf/Mini-golf"),
      nt("51", "Volleyball"),
      nt("52", "Track and Field"),
      nt("53", "Swimming"),
      nt("54", "Diving"),
      nt("55", "Boxing"),
      nt("56", "Rugby"),
      nt("57", "Lacrosse"),
      nt("58", "Water Polo"),
      nt("59", "Badminton"),
      nt("60", "Handball"),
      nt("61", "Cricket"),
    ],
  },
  {
    id: "62",
    title: "Social activities",
    interests: [
      nt("63", "Eating out"),
      nt("64", "Meeting for drinks"),
      nt("65", "Shopping"),
      nt("66", "Parties"),
      nt("67", "Dancing/Clubs"),
      nt("68", "Live music"),
      nt("69", "Playing in a band"),
    ],
  },
  {
    id: "70",
    title: "Traveling",
    interests: [
      nt("71", "Day trips"),
      nt("72", "Road trips"),
      nt("73", "International travel"),
    ],
  },
  {
    id: "74",
    title: "Volunteering",
    interests: [
      nt("75", "Animal Shelter"),
      nt("76", "Sports teams"),
      nt("77", "Education/Tutoring"),
      nt("78", "House Repair"),
      nt("79", "Social Justice"),
      nt("80", "Mentoring"),
      nt("81", "Food Insecurity"),
      nt("82", "Homelessness"),
      nt("83", "Hospitals"),
      nt("84", "Environmental"),
      nt("85", "Library"),
      nt("86", "Community arts"),
      nt("87", "Politics"),
    ],
  },
  {
    id: "88",
    title: "Entertainment",
    interests: [
      nt("89", "Podcasts"),
      nt("90", "TV/streaming"),
      nt("91", "Watching sports"),
      nt("92", "Watching movies"),
      nt("93", "Listening to music at home/work"),
      nt("94", "Social media"),
    ],
  },
  {
    id: "95",
    title: "Exercise",
    interests: [
      nt("96", "Walking"),
      nt("97", "Running"),
      nt("98", "Yoga"),
      nt("99", "Lifting weights"),
      nt("100", "Crossfit"),
      nt("101", "Cycling"),
      nt("102", "Dancing"),
      nt("103", "Martial Arts"),
      nt("104", "Skiing & Snowboarding"),
      nt("105", "Rollerblading/Roller skating"),
      nt("106", "Skateboarding"),
      nt("107", "Swimming"),
      nt("108", "Diving"),
    ],
  },
  {
    id: "109",
    title: "Outdoor activities",
    interests: [
      nt("110", "Gardening/Yard Work"),
      nt("111", "Fishing/Hunting"),
      nt("112", "Hiking"),
      nt("113", "Camping"),
    ],
  },
];

// --- Social Preferences ---

export const SEED_SOCIAL_PREFERENCES: SeedSocialPreference[] = [
  {
    id: "1",
    title: "H2 Prosocial friend types",
    description: null,
    note: "",
    option_type: "list",
    options: [
      {
        id: "1",
        title: "H3 Close Friend",
        description: null,
        note: "Someone who gets you on a deep level. They understand the kind of person you are and appreciates what makes you tick.",
        option_type: null,
      },
      {
        id: "2",
        title: "H3 Fun Friend",
        description: null,
        note: "Someone who will join you for a drink, watch a movie, go to a music concert, or enjoy a ball game.",
        option_type: null,
      },
      {
        id: "3",
        title: "H3 Adventure Friend",
        description: null,
        note: "Someone who likes to try new and di!erent things. They like to go on trips, meet new people and are not scared of the unknown.",
        option_type: null,
      },
      {
        id: "4",
        title: "H3 Athletic Friend",
        description: null,
        note: "Someone who enjoys playing sports, working out, going for a run or going for a hike",
        option_type: null,
      },
      {
        id: "5",
        title: "H3 Supportive Friend",
        description: null,
        note: "Someone who is there for you, is present, and emotionally available.",
        option_type: null,
      },
      {
        id: "6",
        title: "H3 Intelligent Friend",
        description: null,
        note: "Someone with whom you can have interesting conversations.",
        option_type: null,
      },
      {
        id: "7",
        title: "H3 Parent Friend",
        description: null,
        note: 'A parent with children of a similar age who is interested in spending time together (with children or without) to commiserate about the joys and di"culties of parenthood.',
        option_type: null,
      },
    ],
  },
  {
    id: "2",
    title: "What types of friends are you looking for?",
    description: null,
    note: "Select your top 3 types",
    option_type: "combo_box",
    options: [
      {
        id: "8",
        title: "First choice",
        description: null,
        note: null,
        option_type: "combo_box",
      },
      {
        id: "9",
        title: "Second choice",
        description: null,
        note: null,
        option_type: "combo_box",
      },
      {
        id: "10",
        title: "Third choice",
        description: null,
        note: null,
        option_type: "combo_box",
      },
      {
        id: "11",
        title:
          "Optional: Do you want to provide any other detail about the type of friend(s) you\u2019re looking for?",
        description: null,
        note: null,
        option_type: "text",
      },
    ],
  },
  {
    id: "3",
    title: "What types of friend do you think you are?",
    description: null,
    note: "Select your top 3 types",
    option_type: "combo_box",
    options: [
      {
        id: "12",
        title: "First choice",
        description: null,
        note: null,
        option_type: "combo_box",
      },
      {
        id: "13",
        title: "Second choice",
        description: null,
        note: null,
        option_type: "combo_box",
      },
      {
        id: "14",
        title: "Third choice",
        description: null,
        note: null,
        option_type: "combo_box",
      },
      {
        id: "15",
        title:
          "Optional: Do you want to provide any other detail about the type of friend(s) you think you are?",
        description: null,
        note: null,
        option_type: "text",
      },
    ],
  },
  {
    id: "4",
    title: "How often do you go out to socialize?",
    description: null,
    note: null,
    option_type: "rating_scale",
    options: [
      {
        id: "16",
        title: "Almost never",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "17",
        title: "1/x a week",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "18",
        title: "2/x a week",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "19",
        title: "Most days",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "20",
        title: "Every day",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
    ],
  },
  {
    id: "5",
    title: "How often would you like to go out to socialize?",
    description: null,
    note: null,
    option_type: "rating_scale",
    options: [
      {
        id: "21",
        title: "Almost never",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "22",
        title: "1/x a week",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "23",
        title: "2/x a week",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "24",
        title: "Most days",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
      {
        id: "25",
        title: "Every day",
        description: null,
        note: null,
        option_type: "rating_scale",
      },
    ],
  },
  {
    id: "6",
    title: "When you do your outing with Fitness19 members, would you like",
    description: null,
    note: null,
    option_type: "radio",
    options: [
      {
        id: "26",
        title: "A mix of men and women",
        description: null,
        note: null,
        option_type: "radio",
      },
      {
        id: "27",
        title: "A group of only my gender (All male, All female)",
        description: null,
        note: null,
        option_type: "radio",
      },
      {
        id: "28",
        title: "No preference",
        description: null,
        note: null,
        option_type: "radio",
      },
    ],
  },
  {
    id: "7",
    title: "Are you already a member of Fitness19 or a friend of a member?",
    description: null,
    note: null,
    option_type: "rating_scale",
    options: [
      {
        id: "29",
        title: "Fitness19 member",
        description: null,
        note: null,
        option_type: null,
      },
      {
        id: "30",
        title: "Friend",
        description: null,
        note: null,
        option_type: null,
      },
    ],
  },
  {
    id: "8",
    title:
      "Will you be referring a friend to Fitness 19 who is currently not a member to be part of the ProSocial partnership?",
    description: null,
    note: null,
    option_type: "rating_scale",
    options: [
      {
        id: "31",
        title: "Yes",
        description: null,
        note: null,
        option_type: null,
      },
      {
        id: "32",
        title: "No",
        description: null,
        note: null,
        option_type: null,
      },
    ],
  },
];
