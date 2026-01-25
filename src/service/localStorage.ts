/**
 * LocalStorage Service
 * Replaces all API calls with localStorage-based data persistence
 */

// Storage keys
export const STORAGE_KEYS = {
  USERS: "prosocial_users",
  CURRENT_USER: "prosocial_current_user",
  UNIVERSITIES: "prosocial_universities",
  QUESTIONS: "prosocial_questions_data",
  QUESTION_CATEGORIES: "prosocial_question_categories",
  INTERESTS: "prosocial_interests",
  INTERESTS_BY_TRAIT: "prosocial_interests_by_trait",
  INTERESTS_BY_NON_TRAIT: "prosocial_interests_by_non_trait",
  JOURNALS: "prosocial_journals",
  JOURNAL_CATEGORIES: "prosocial_journal_categories",
  CHALLENGE_CATEGORIES: "prosocial_challenge_categories",
  GROUPS: "prosocial_groups",
  PERSONALITY_BUCKET_TYPES: "prosocial_personality_bucket_types",
  SOCIAL_PREFERENCES: "prosocial_social_preferences",
  USER_SETTINGS: "prosocial_user_settings",
  OUTING_FEEDBACKS: "prosocial_outing_feedbacks",
};

// Helper functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Generate unique user ID
const generateUniqueUserId = (): string => {
  return "USR_" + generateId().toUpperCase();
};

// Types
export interface LocalUser {
  id: string;
  unique_id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  user_type: "user" | "admin";
  created_at: string;
  email_verified_at: string | null;
  university_id: string;
  profile: LocalUserProfile;
  groups: LocalUserGroup[];
  interests: LocalInterest[];
  journals: LocalJournal[];
  challenges: LocalJournal[];
  schedules: LocalSchedule[];
  question_responses: LocalQuestionResponse[];
  personalityScore: LocalPersonalityScore | null;
  social_preference_answers: LocalSocialPreferenceAnswer[];
  settings: LocalUserSettings;
}

export interface LocalUserProfile {
  id: string;
  avatar: string | null;
  gender: string | null;
  race: string | null;
  relationship_status: string | null;
  level_of_education: string | null;
  zip_code: string | null;
  political_orientation: string | null;
  health_rating: string | null;
  has_children: boolean | null;
  occupation: string | null;
  family_size_in_numbers: string | null;
  type_of_city_grown: string | null;
  socialization: string | null;
  to_socialization: string | null;
  religiosity_range: string | null;
}

export interface LocalUserGroup {
  id: string;
  name: string;
  outing_date: string | null;
  note: string | null;
  feedback_received: boolean;
  group_invite_status: boolean;
  created_at: string;
  users: {
    id: string;
    name: string;
    unique_id: string;
    profile?: { avatar?: string | null };
  }[];
  outing_feedbacks: LocalOutingFeedback[];
}

export interface LocalSchedule {
  id: string;
  day_name: string;
  status: boolean;
  time_range: string[];
}

export interface LocalInterest {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  is_organized_by_trait: boolean;
  pivot?: { is_top_interest: boolean };
}

export interface LocalJournal {
  id: string;
  input: string;
  category: { id: string; title?: string; type?: string };
}

export interface LocalQuestionResponse {
  id: string;
  question: { id: string };
  answer: { id: string; value: string };
}

export interface LocalPersonalityScore {
  id: string;
  extroversion: string;
  agreeableness: string;
  conscientiousness: string;
  neuroticism: string;
  openness: string;
  narcissism: string;
  personalityBucketType: LocalPersonalityBucketType | null;
  last_computed: string;
}

export interface LocalPersonalityBucketType {
  id: string;
  name: string;
  sub_title: string;
  image: string;
  description: string;
  bucketQuestions: { id: string; title: string; text: string }[];
}

export interface LocalSocialPreferenceAnswer {
  id: string;
  answer: string;
  social_preference_option: {
    id: string;
    title: string;
    social_preference: { id: string; title: string };
  };
  meta: { key: string; value: string }[];
}

export interface LocalUserSettings {
  preference_settings: { key: string; value: string }[];
}

export interface LocalUniversity {
  id: string;
  name: string;
}

export interface LocalQuestionCategory {
  id: string;
  name: string;
  questions: LocalQuestion[];
}

export interface LocalQuestion {
  id: string;
  text: string;
  type: string;
  sub_category?: string;
  optional?: boolean;
  options: { id: string; title: string; value: string }[];
}

export interface LocalInterestTrait {
  id: string;
  title: string;
  interests: LocalInterest[];
}

export interface LocalJournalCategory {
  id: string;
  title: string;
  type: string;
  video_url?: string;
  transcript?: string;
  journals: { id: string; input: string }[];
}

export interface LocalOutingFeedback {
  id: string;
  user: { id: string; name: string; unique_id: string };
  feedback_responses: {
    id: string;
    note: string;
    connection: string;
    receiving_user: { id: string; name: string; unique_id: string };
  }[];
}

// Initialize default data
const initializeDefaultData = () => {
  // Universities
  if (!localStorage.getItem(STORAGE_KEYS.UNIVERSITIES)) {
    const universities: LocalUniversity[] = [
      { id: "1", name: "University of Illinois" },
      { id: "2", name: "Northwestern University" },
      { id: "3", name: "University of Chicago" },
      { id: "4", name: "DePaul University" },
      { id: "5", name: "Loyola University" },
    ];
    setToStorage(STORAGE_KEYS.UNIVERSITIES, universities);
  }

  // Personality Bucket Types
  if (!localStorage.getItem(STORAGE_KEYS.PERSONALITY_BUCKET_TYPES)) {
    const bucketTypes: LocalPersonalityBucketType[] = [
      {
        id: "1",
        name: "The Social Butterfly",
        sub_title: "Outgoing and energetic",
        image: "/personality/butterfly.png",
        description:
          "You thrive in social situations and love meeting new people.",
        bucketQuestions: [
          {
            id: "bq1",
            title: "Social Energy",
            text: "Do you feel energized after social gatherings?",
          },
          {
            id: "bq2",
            title: "New Connections",
            text: "Do you enjoy making new friends?",
          },
        ],
      },
      {
        id: "2",
        name: "The Thoughtful Observer",
        sub_title: "Reflective and insightful",
        image: "/personality/observer.png",
        description:
          "You prefer deep conversations and meaningful connections.",
        bucketQuestions: [
          {
            id: "bq3",
            title: "Deep Talks",
            text: "Do you prefer deep conversations over small talk?",
          },
          {
            id: "bq4",
            title: "Observation",
            text: "Do you often observe before participating?",
          },
        ],
      },
    ];
    setToStorage(STORAGE_KEYS.PERSONALITY_BUCKET_TYPES, bucketTypes);
  }

  // Question Categories for onboarding
  if (!localStorage.getItem(STORAGE_KEYS.QUESTION_CATEGORIES)) {
    const categories: LocalQuestionCategory[] = [
      {
        id: "1",
        name: "The-basics",
        questions: [
          {
            id: "q1",
            text: "What is your gender?",
            type: "SINGLE_CHOICE",
            options: [
              { id: "o1", title: "Male", value: "MALE" },
              { id: "o2", title: "Female", value: "FEMALE" },
              { id: "o3", title: "Non-binary", value: "NONCONFORMING" },
              {
                id: "o4",
                title: "Prefer not to say",
                value: "PREFERNOTOANSWER",
              },
            ],
          },
          {
            id: "q2",
            text: "What is your relationship status?",
            type: "SINGLE_CHOICE",
            options: [
              { id: "o5", title: "Single", value: "single" },
              { id: "o6", title: "In a relationship", value: "relationship" },
              { id: "o7", title: "Married", value: "married" },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Personality",
        questions: [
          {
            id: "pq1",
            text: "I enjoy being the center of attention",
            type: "RATING_SCALE",
            sub_category: "Personality 1",
            options: [
              { id: "po1", title: "Strongly Disagree", value: "1" },
              { id: "po2", title: "Disagree", value: "2" },
              { id: "po3", title: "Neutral", value: "3" },
              { id: "po4", title: "Agree", value: "4" },
              { id: "po5", title: "Strongly Agree", value: "5" },
            ],
          },
          {
            id: "pq2",
            text: "I feel comfortable in large groups",
            type: "RATING_SCALE",
            sub_category: "Personality 1",
            options: [
              { id: "po1", title: "Strongly Disagree", value: "1" },
              { id: "po2", title: "Disagree", value: "2" },
              { id: "po3", title: "Neutral", value: "3" },
              { id: "po4", title: "Agree", value: "4" },
              { id: "po5", title: "Strongly Agree", value: "5" },
            ],
          },
        ],
      },
    ];
    setToStorage(STORAGE_KEYS.QUESTION_CATEGORIES, categories);
  }

  // Interests by trait
  if (!localStorage.getItem(STORAGE_KEYS.INTERESTS_BY_TRAIT)) {
    const interestsByTrait: LocalInterestTrait[] = [
      {
        id: "trait1",
        title: "Social Activities",
        interests: [
          {
            id: "i1",
            title: "Board Games",
            image_url: "/interests/board-games.jpg",
            is_organized_by_trait: true,
          },
          {
            id: "i2",
            title: "Dining Out",
            image_url: "/interests/dining.jpg",
            is_organized_by_trait: true,
          },
          {
            id: "i3",
            title: "Movie Nights",
            image_url: "/interests/movies.jpg",
            is_organized_by_trait: true,
          },
        ],
      },
      {
        id: "trait2",
        title: "Outdoor Activities",
        interests: [
          {
            id: "i4",
            title: "Hiking",
            image_url: "/interests/hiking.jpg",
            is_organized_by_trait: true,
          },
          {
            id: "i5",
            title: "Cycling",
            image_url: "/interests/cycling.jpg",
            is_organized_by_trait: true,
          },
          {
            id: "i6",
            title: "Camping",
            image_url: "/interests/camping.jpg",
            is_organized_by_trait: true,
          },
        ],
      },
    ];
    setToStorage(STORAGE_KEYS.INTERESTS_BY_TRAIT, interestsByTrait);
  }

  // Interests by non-trait
  if (!localStorage.getItem(STORAGE_KEYS.INTERESTS_BY_NON_TRAIT)) {
    const interestsByNonTrait: LocalInterestTrait[] = [
      {
        id: "nt1",
        title: "Arts & Crafts",
        interests: [
          {
            id: "ni1",
            title: "Painting",
            image_url: "/interests/painting.jpg",
            is_organized_by_trait: false,
          },
          {
            id: "ni2",
            title: "Photography",
            image_url: "/interests/photography.jpg",
            is_organized_by_trait: false,
          },
        ],
      },
    ];
    setToStorage(STORAGE_KEYS.INTERESTS_BY_NON_TRAIT, interestsByNonTrait);
  }

  // Journal Categories
  if (!localStorage.getItem(STORAGE_KEYS.JOURNAL_CATEGORIES)) {
    const journalCategories: LocalJournalCategory[] = [
      { id: "jc1", title: "Gratitude", type: "journal", journals: [] },
      { id: "jc2", title: "Reflection", type: "journal", journals: [] },
      { id: "jc3", title: "Goals", type: "journal", journals: [] },
    ];
    setToStorage(STORAGE_KEYS.JOURNAL_CATEGORIES, journalCategories);
  }

  // Challenge Categories
  if (!localStorage.getItem(STORAGE_KEYS.CHALLENGE_CATEGORIES)) {
    const challengeCategories: LocalJournalCategory[] = [
      {
        id: "cc1",
        title: "Social Challenge",
        type: "challenge",
        video_url: "",
        transcript: "",
        journals: [],
      },
      {
        id: "cc2",
        title: "Mindfulness Challenge",
        type: "challenge",
        video_url: "",
        transcript: "",
        journals: [],
      },
    ];
    setToStorage(STORAGE_KEYS.CHALLENGE_CATEGORIES, challengeCategories);
  }

  // Initialize empty users array
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setToStorage(STORAGE_KEYS.USERS, []);
  }

  // Initialize empty groups array
  if (!localStorage.getItem(STORAGE_KEYS.GROUPS)) {
    setToStorage(STORAGE_KEYS.GROUPS, []);
  }
};

// Initialize data on module load (client-side only)
if (typeof window !== "undefined") {
  initializeDefaultData();
}

// ============== USER OPERATIONS ==============

export const localStorageService = {
  // Authentication
  register: (input: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    password: string;
    university_id: string;
  }): { token: string; user: Omit<LocalUser, "password"> } => {
    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);

    // Check if email already exists
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === input.email.toLowerCase(),
    );
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const userId = generateId();
    const profileId = generateId();

    const newUser: LocalUser = {
      id: userId,
      unique_id: generateUniqueUserId(),
      name: input.name,
      email: input.email,
      phone: input.phone,
      dob: input.dob,
      password: input.password,
      user_type: "user",
      created_at: new Date().toISOString(),
      email_verified_at: new Date().toISOString(), // Auto-verified (skipping email verification)
      university_id: input.university_id,
      profile: {
        id: profileId,
        avatar: null,
        gender: null,
        race: null,
        relationship_status: null,
        level_of_education: null,
        zip_code: null,
        political_orientation: null,
        health_rating: null,
        has_children: null,
        occupation: null,
        family_size_in_numbers: null,
        type_of_city_grown: null,
        socialization: null,
        to_socialization: null,
        religiosity_range: null,
      },
      groups: [],
      interests: [],
      journals: [],
      challenges: [],
      schedules: [],
      question_responses: [],
      personalityScore: null,
      social_preference_answers: [],
      settings: { preference_settings: [] },
    };

    users.push(newUser);
    setToStorage(STORAGE_KEYS.USERS, users);
    setToStorage(STORAGE_KEYS.CURRENT_USER, userId);

    const token = `local_token_${userId}_${Date.now()}`;
    // eslint-disable-next-line no-unused-vars
    const { password: _pwd0, ...userWithoutPassword } = newUser;

    return { token, user: userWithoutPassword };
  },

  login: (
    email: string,
    password: string,
  ): { token: string; user: Omit<LocalUser, "password"> } => {
    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    setToStorage(STORAGE_KEYS.CURRENT_USER, user.id);
    const token = `local_token_${user.id}_${Date.now()}`;
    // eslint-disable-next-line no-unused-vars
    const { password: _pwd, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): Omit<LocalUser, "password"> | null => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return null;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const user = users.find((u) => u.id === currentUserId);
    if (!user) return null;

    // eslint-disable-next-line no-unused-vars
    const { password: _pwd2, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Universities
  getUniversities: (): LocalUniversity[] => {
    return getFromStorage<LocalUniversity[]>(STORAGE_KEYS.UNIVERSITIES, []);
  },

  // User Profile
  updateUser: (
    input: Partial<{
      name: string;
      email: string;
      phone: string;
      password: string;
      profile: Partial<LocalUserProfile>;
    }>,
  ): Omit<LocalUser, "password"> | null => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return null;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return null;

    const user = users[userIndex];

    if (input.name) user.name = input.name;
    if (input.email) user.email = input.email;
    if (input.phone) user.phone = input.phone;
    if (input.password) user.password = input.password;
    if (input.profile) {
      user.profile = { ...user.profile, ...input.profile };
    }

    users[userIndex] = user;
    setToStorage(STORAGE_KEYS.USERS, users);

    // eslint-disable-next-line no-unused-vars
    const { password: _pwd3, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  updateProfilePicture: (avatarDataUrl: string): void => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return;

    users[userIndex].profile.avatar = avatarDataUrl;
    setToStorage(STORAGE_KEYS.USERS, users);
  },

  // Schedules
  updateSchedules: (
    schedules: { day_name: string; time_range: string[]; status: boolean }[],
  ): void => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return;

    users[userIndex].schedules = schedules.map((s) => ({
      id: generateId(),
      day_name: s.day_name,
      time_range: s.time_range,
      status: s.status,
    }));
    setToStorage(STORAGE_KEYS.USERS, users);
  },

  getSchedules: (): LocalSchedule[] => {
    const user = localStorageService.getCurrentUser();
    return user?.schedules || [];
  },

  // Questions & Responses
  getOnboardCategoriesWithQuestions: (): LocalQuestionCategory[] => {
    return getFromStorage<LocalQuestionCategory[]>(
      STORAGE_KEYS.QUESTION_CATEGORIES,
      [],
    );
  },

  getQuestionCategories: (): LocalQuestionCategory[] => {
    return getFromStorage<LocalQuestionCategory[]>(
      STORAGE_KEYS.QUESTION_CATEGORIES,
      [],
    );
  },

  submitQuestionResponses: (
    answers: { question_id: string; answer_id: string }[],
  ): void => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return;

    const existingResponses = users[userIndex].question_responses;

    answers.forEach((answer) => {
      const existingIndex = existingResponses.findIndex(
        (r) => r.question.id === answer.question_id,
      );
      const newResponse = {
        id: generateId(),
        question: { id: answer.question_id },
        answer: { id: answer.answer_id, value: answer.answer_id },
      };

      if (existingIndex >= 0) {
        existingResponses[existingIndex] = newResponse;
      } else {
        existingResponses.push(newResponse);
      }
    });

    users[userIndex].question_responses = existingResponses;
    setToStorage(STORAGE_KEYS.USERS, users);
  },

  getQuestionResponses: (): LocalQuestionResponse[] => {
    const user = localStorageService.getCurrentUser();
    return user?.question_responses || [];
  },

  // Personality Score
  calculatePersonalityScore: (): LocalPersonalityScore => {
    const bucketTypes = getFromStorage<LocalPersonalityBucketType[]>(
      STORAGE_KEYS.PERSONALITY_BUCKET_TYPES,
      [],
    );
    const bucketType =
      bucketTypes[Math.floor(Math.random() * bucketTypes.length)] ||
      bucketTypes[0];

    const score: LocalPersonalityScore = {
      id: generateId(),
      extroversion: (Math.random() * 100).toFixed(1),
      agreeableness: (Math.random() * 100).toFixed(1),
      conscientiousness: (Math.random() * 100).toFixed(1),
      neuroticism: (Math.random() * 100).toFixed(1),
      openness: (Math.random() * 100).toFixed(1),
      narcissism: (Math.random() * 100).toFixed(1),
      personalityBucketType: bucketType,
      last_computed: new Date().toISOString(),
    };

    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (currentUserId) {
      const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
      const userIndex = users.findIndex((u) => u.id === currentUserId);
      if (userIndex !== -1) {
        users[userIndex].personalityScore = score;
        setToStorage(STORAGE_KEYS.USERS, users);
      }
    }

    return score;
  },

  getPersonalityScore: (): LocalPersonalityScore | null => {
    const user = localStorageService.getCurrentUser();
    if (!user?.personalityScore) {
      return localStorageService.calculatePersonalityScore();
    }
    return user.personalityScore;
  },

  submitPersonalityBucketQuestions: (
    input: {
      bucket_id: string;
      response: string;
      butterfly_info?: { note: string };
    }[],
  ): void => {
    // This just confirms submission - personality score already calculated
    console.log("Personality bucket questions submitted:", input);
  },

  confirmUserSubmission: (): void => {
    console.log("User submission confirmed");
  },

  // Interests
  getInterestsByTrait: (): LocalInterestTrait[] => {
    return getFromStorage<LocalInterestTrait[]>(
      STORAGE_KEYS.INTERESTS_BY_TRAIT,
      [],
    );
  },

  getInterestsByNonTrait: (): LocalInterestTrait[] => {
    return getFromStorage<LocalInterestTrait[]>(
      STORAGE_KEYS.INTERESTS_BY_NON_TRAIT,
      [],
    );
  },

  getUserInterests: (): LocalInterest[] => {
    const user = localStorageService.getCurrentUser();
    return user?.interests || [];
  },

  submitUserInterests: (
    interests: { interest_id: string; is_top_interest: boolean }[],
  ): void => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return;

    const allInterests = [
      ...getFromStorage<LocalInterestTrait[]>(
        STORAGE_KEYS.INTERESTS_BY_TRAIT,
        [],
      ).flatMap((t) => t.interests),
      ...getFromStorage<LocalInterestTrait[]>(
        STORAGE_KEYS.INTERESTS_BY_NON_TRAIT,
        [],
      ).flatMap((t) => t.interests),
    ];

    users[userIndex].interests = interests.map((i) => {
      const interest = allInterests.find((int) => int.id === i.interest_id);
      return {
        id: i.interest_id,
        title: interest?.title || "Unknown Interest",
        image_url: interest?.image_url,
        is_organized_by_trait: interest?.is_organized_by_trait || false,
        pivot: { is_top_interest: i.is_top_interest },
      };
    });

    setToStorage(STORAGE_KEYS.USERS, users);
  },

  createInterest: (input: {
    title: string;
    image_url?: string;
  }): LocalInterest => {
    const newInterest: LocalInterest = {
      id: generateId(),
      title: input.title,
      image_url: input.image_url,
      is_organized_by_trait: false,
    };

    const interests = getFromStorage<LocalInterestTrait[]>(
      STORAGE_KEYS.INTERESTS_BY_NON_TRAIT,
      [],
    );
    if (interests.length > 0) {
      interests[0].interests.push(newInterest);
      setToStorage(STORAGE_KEYS.INTERESTS_BY_NON_TRAIT, interests);
    }

    return newInterest;
  },

  // Journals & Challenges
  getJournalCategories: (): LocalJournalCategory[] => {
    const categories = getFromStorage<LocalJournalCategory[]>(
      STORAGE_KEYS.JOURNAL_CATEGORIES,
      [],
    );
    const user = localStorageService.getCurrentUser();

    return categories.map((cat) => ({
      ...cat,
      journals:
        user?.journals
          .filter((j) => j.category.id === cat.id)
          .map((j) => ({ id: j.id, input: j.input })) || [],
    }));
  },

  getChallengeCategories: (): LocalJournalCategory[] => {
    return getFromStorage<LocalJournalCategory[]>(
      STORAGE_KEYS.CHALLENGE_CATEGORIES,
      [],
    );
  },

  getUserJournals: (): LocalJournal[] => {
    const user = localStorageService.getCurrentUser();
    return user?.journals || [];
  },

  getUserChallenges: (): LocalJournal[] => {
    const user = localStorageService.getCurrentUser();
    return user?.challenges || [];
  },

  createJournalEntry: (
    input: string,
    journal_category_id: string,
    type: "journal" | "challenge" = "journal",
  ): LocalJournal => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) throw new Error("Not logged in");

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) throw new Error("User not found");

    const categories =
      type === "journal"
        ? getFromStorage<LocalJournalCategory[]>(
            STORAGE_KEYS.JOURNAL_CATEGORIES,
            [],
          )
        : getFromStorage<LocalJournalCategory[]>(
            STORAGE_KEYS.CHALLENGE_CATEGORIES,
            [],
          );

    const category = categories.find((c) => c.id === journal_category_id);

    const newEntry: LocalJournal = {
      id: generateId(),
      input,
      category: {
        id: journal_category_id,
        title: category?.title,
        type: category?.type,
      },
    };

    if (type === "journal") {
      users[userIndex].journals.push(newEntry);
    } else {
      users[userIndex].challenges.push(newEntry);
    }

    setToStorage(STORAGE_KEYS.USERS, users);
    return newEntry;
  },

  // Social Preferences
  submitSocialPreferences: (
    input: {
      social_preference_id: string;
      answer: string;
      social_preference_option_id: string;
      meta?: { key: string; value: string }[];
    }[],
  ): void => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return;

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return;

    users[userIndex].social_preference_answers = input.map((i) => ({
      id: generateId(),
      answer: i.answer,
      social_preference_option: {
        id: i.social_preference_option_id,
        title: i.answer,
        social_preference: { id: i.social_preference_id, title: "" },
      },
      meta: i.meta || [],
    }));

    setToStorage(STORAGE_KEYS.USERS, users);
  },

  getUserSocialPreferences: (): LocalSocialPreferenceAnswer[] => {
    const user = localStorageService.getCurrentUser();
    return user?.social_preference_answers || [];
  },

  // User Settings
  getUserSettings: (): LocalUserSettings => {
    const user = localStorageService.getCurrentUser();
    return user?.settings || { preference_settings: [] };
  },

  updateUserSettings: (
    preferenceSettings: { key: string; value: string }[],
  ): LocalUserSettings => {
    const currentUserId = getFromStorage<string | null>(
      STORAGE_KEYS.CURRENT_USER,
      null,
    );
    if (!currentUserId) return { preference_settings: [] };

    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return { preference_settings: [] };

    const existingSettings = users[userIndex].settings.preference_settings;

    preferenceSettings.forEach((newSetting) => {
      const existingIndex = existingSettings.findIndex(
        (s) => s.key === newSetting.key,
      );
      if (existingIndex >= 0) {
        existingSettings[existingIndex] = newSetting;
      } else {
        existingSettings.push(newSetting);
      }
    });

    users[userIndex].settings.preference_settings = existingSettings;
    setToStorage(STORAGE_KEYS.USERS, users);

    return users[userIndex].settings;
  },

  // Groups
  getGroups: (): LocalUserGroup[] => {
    return getFromStorage<LocalUserGroup[]>(STORAGE_KEYS.GROUPS, []);
  },

  getUserGroups: (): LocalUserGroup[] => {
    const user = localStorageService.getCurrentUser();
    return user?.groups || [];
  },

  getGroup: (id: string): LocalUserGroup | null => {
    const groups = getFromStorage<LocalUserGroup[]>(STORAGE_KEYS.GROUPS, []);
    return groups.find((g) => g.id === id) || null;
  },

  createGroup: (input: {
    name: string;
    user_ids: string[];
    outing_date?: string;
    note?: string;
  }): LocalUserGroup => {
    const groups = getFromStorage<LocalUserGroup[]>(STORAGE_KEYS.GROUPS, []);
    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);

    const groupUsers = users
      .filter((u) => input.user_ids.includes(u.id))
      .map((u) => ({
        id: u.id,
        name: u.name,
        unique_id: u.unique_id,
        profile: { avatar: u.profile.avatar },
      }));

    const newGroup: LocalUserGroup = {
      id: generateId(),
      name: input.name,
      outing_date: input.outing_date || null,
      note: input.note || null,
      feedback_received: false,
      group_invite_status: false,
      created_at: new Date().toISOString(),
      users: groupUsers,
      outing_feedbacks: [],
    };

    groups.push(newGroup);
    setToStorage(STORAGE_KEYS.GROUPS, groups);

    // Add group to each user's groups
    input.user_ids.forEach((userId) => {
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex].groups.push(newGroup);
      }
    });
    setToStorage(STORAGE_KEYS.USERS, users);

    return newGroup;
  },

  sendGroupInvitation: (group_id: string): void => {
    const groups = getFromStorage<LocalUserGroup[]>(STORAGE_KEYS.GROUPS, []);
    const groupIndex = groups.findIndex((g) => g.id === group_id);
    if (groupIndex !== -1) {
      groups[groupIndex].group_invite_status = true;
      setToStorage(STORAGE_KEYS.GROUPS, groups);
    }
  },

  // Outing Feedback
  pullUserGroupParticipants: (
    user_unique_id: string,
    group_id: string,
  ): LocalUserGroup | null => {
    const groups = getFromStorage<LocalUserGroup[]>(STORAGE_KEYS.GROUPS, []);
    return groups.find((g) => g.id === group_id) || null;
  },

  submitFeedback: (input: {
    group_id: string;
    unique_user_id: string;
    feedbackResponses: {
      receiving_user_id: string;
      connection: string;
      note?: string;
    }[];
    meta?: { key: string; value: string }[];
    user_excluded_matches?: string[];
    outing_feedback_note?: string;
  }): void => {
    const groups = getFromStorage<LocalUserGroup[]>(STORAGE_KEYS.GROUPS, []);
    const users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);

    const groupIndex = groups.findIndex((g) => g.id === input.group_id);
    if (groupIndex === -1) return;

    const submittingUser = users.find(
      (u) => u.unique_id === input.unique_user_id,
    );
    if (!submittingUser) return;

    const feedbackResponses = input.feedbackResponses.map((fr) => {
      const receivingUser = users.find((u) => u.id === fr.receiving_user_id);
      return {
        id: generateId(),
        note: fr.note || "",
        connection: fr.connection,
        receiving_user: {
          id: fr.receiving_user_id,
          name: receivingUser?.name || "",
          unique_id: receivingUser?.unique_id || "",
        },
      };
    });

    const feedback: LocalOutingFeedback = {
      id: generateId(),
      user: {
        id: submittingUser.id,
        name: submittingUser.name,
        unique_id: submittingUser.unique_id,
      },
      feedback_responses: feedbackResponses,
    };

    groups[groupIndex].outing_feedbacks.push(feedback);
    groups[groupIndex].feedback_received = true;
    setToStorage(STORAGE_KEYS.GROUPS, groups);
  },

  // Admin Operations
  adminQueryUsers: (input?: {
    search?: string;
    groupId?: string;
  }): Omit<LocalUser, "password">[] => {
    let users = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);

    if (input?.search) {
      const search = input.search.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search),
      );
    }

    if (input?.groupId) {
      users = users.filter((u) => u.groups.some((g) => g.id === input.groupId));
    }

    // eslint-disable-next-line no-unused-vars
    return users.map(({ password: _pwd, ...user }) => user);
  },
};

export default localStorageService;
