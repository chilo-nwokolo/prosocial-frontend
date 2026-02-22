/**
 * LocalStorage Service
 * Replaces all API calls with localStorage-based data persistence
 */

import {
  SEED_UNIVERSITIES,
  SEED_PERSONALITY_BUCKET_TYPES,
  SEED_QUESTION_CATEGORIES,
  SEED_JOURNAL_CATEGORIES,
  SEED_CHALLENGE_CATEGORIES,
  SEED_INTERESTS_BY_TRAIT,
  SEED_INTERESTS_BY_NON_TRAIT,
  SEED_SOCIAL_PREFERENCES,
} from "./seedData";

// Bump this version to force-refresh seed data in localStorage
const SEED_VERSION = "4";
const SEED_VERSION_KEY = "prosocial_seed_version";

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
  trait?: string;
  note?: string;
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

// Demo user credentials
export const DEMO_USER_EMAIL = "admin@mail.com";
export const DEMO_USER_PASSWORD = "password123";

// Create a complete demo user with all necessary data
const createDemoUser = (): LocalUser => {
  const userId = "demo_user_001";
  const profileId = "demo_profile_001";
  const uniqueId = "USR_DEMO001";

  // Create sample group with other demo members
  const demoGroup: LocalUserGroup = {
    id: "demo_group_001",
    name: "Demo Social Group",
    outing_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    note: "A friendly meetup at the local coffee shop",
    feedback_received: false,
    group_invite_status: true,
    created_at: new Date().toISOString(),
    users: [
      {
        id: userId,
        name: "Demo User",
        unique_id: uniqueId,
        profile: { avatar: "/profile_placeholder.jpeg" },
      },
      {
        id: "demo_member_002",
        name: "Sarah Johnson",
        unique_id: "USR_SARAH02",
        profile: { avatar: "/profile_placeholder.jpeg" },
      },
      {
        id: "demo_member_003",
        name: "Michael Chen",
        unique_id: "USR_MIKE03",
        profile: { avatar: "/profile_placeholder.jpeg" },
      },
    ],
    outing_feedbacks: [],
  };

  const personalityScore: LocalPersonalityScore = {
    id: "demo_personality_001",
    extroversion: "6.00",
    agreeableness: "6.00",
    conscientiousness: "10.00",
    neuroticism: "2.00",
    openness: "6.00",
    narcissism: "17.00",
    personalityBucketType: SEED_PERSONALITY_BUCKET_TYPES[2],
    last_computed: "2023-11-09T08:01:00.000Z",
  };

  // Create schedules for the week
  const schedules: LocalSchedule[] = [
    {
      id: "sched_1",
      day_name: "Monday",
      status: true,
      time_range: ["EVENING"],
    },
    {
      id: "sched_2",
      day_name: "Tuesday",
      status: true,
      time_range: ["AFTERNOON", "EVENING"],
    },
    {
      id: "sched_3",
      day_name: "Wednesday",
      status: false,
      time_range: [],
    },
    {
      id: "sched_4",
      day_name: "Thursday",
      status: true,
      time_range: ["EVENING"],
    },
    {
      id: "sched_5",
      day_name: "Friday",
      status: true,
      time_range: ["EVENING"],
    },
    {
      id: "sched_6",
      day_name: "Saturday",
      status: true,
      time_range: ["MORNING", "AFTERNOON", "EVENING"],
    },
    {
      id: "sched_7",
      day_name: "Sunday",
      status: true,
      time_range: ["AFTERNOON"],
    },
  ];

  const interests: LocalInterest[] = [
    {
      id: "2",
      title: "I like to build things.",
      image_url:
        "https://res.cloudinary.com/doz0qlqcu/image/upload/v1701257055/interest-images/07_-_Build_duq7bm.jpg",
      is_organized_by_trait: true,
      pivot: { is_top_interest: false },
    },
  ];

  const questionResponses: LocalQuestionResponse[] = [
    { id: "qr1", question: { id: "1" }, answer: { id: "1", value: "1" } },
    { id: "qr2", question: { id: "2" }, answer: { id: "6", value: "1" } },
    { id: "qr3", question: { id: "3" }, answer: { id: "11", value: "1" } },
    { id: "qr4", question: { id: "4" }, answer: { id: "16", value: "1" } },
    { id: "qr5", question: { id: "5" }, answer: { id: "21", value: "1" } },
    { id: "qr6", question: { id: "6" }, answer: { id: "26", value: "1" } },
    { id: "qr7", question: { id: "7" }, answer: { id: "31", value: "1" } },
    { id: "qr8", question: { id: "8" }, answer: { id: "36", value: "1" } },
    { id: "qr9", question: { id: "9" }, answer: { id: "41", value: "1" } },
    { id: "qr10", question: { id: "10" }, answer: { id: "46", value: "1" } },
  ];

  const socialPreferenceAnswers: LocalSocialPreferenceAnswer[] = [
    {
      id: "spa1",
      answer: "Friend",
      social_preference_option: {
        id: "7",
        title: "H3 Parent Friend",
        social_preference: {
          id: "1",
          title: "H2 Prosocial friend types",
        },
      },
      meta: [
        { key: "someKeys", value: "some Vaules" },
        { key: "another_key", value: "checking" },
      ],
    },
  ];

  // Create user settings with all onboarding completed
  const settings: LocalUserSettings = {
    preference_settings: [
      { key: "user_has_seen_personality_score", value: "true" },
      { key: "user_visited_intro_page", value: "true" },
      { key: "user_completed_interests_1", value: "true" },
      { key: "user_completed_interests_2", value: "true" },
      { key: "user_challenges_story", value: "true" },
      { key: "user_journal_story", value: "true" },
      { key: "user_has_uploaded_profile_picture", value: "true" },
      { key: "user_accepted_terms_and_conditions", value: "true" },
      { key: "user_has_filled_social_preferences", value: "true" },
    ],
  };

  const journals: LocalJournal[] = [
    {
      id: "journal_1",
      input:
        "Today I am grateful for the opportunity to connect with new people.",
      category: { id: "1", title: "Happiest ChildhoodMemory", type: "journal" },
    },
  ];

  // Create the demo user
  const demoUser: LocalUser = {
    id: userId,
    unique_id: uniqueId,
    name: "Demo User",
    email: DEMO_USER_EMAIL,
    phone: "+1234567890",
    dob: "1990-05-15",
    password: DEMO_USER_PASSWORD,
    user_type: "user",
    created_at: new Date().toISOString(),
    email_verified_at: new Date().toISOString(),
    university_id: "1",
    profile: {
      id: profileId,
      avatar: "/profile_placeholder.jpeg",
      gender: "Male",
      race: null,
      relationship_status: "single",
      level_of_education: "Bachelor's Degree",
      zip_code: "60601",
      political_orientation: null,
      health_rating: "Good",
      has_children: false,
      occupation: "Software Developer",
      family_size_in_numbers: "2",
      type_of_city_grown: "Urban",
      socialization: "Moderate",
      to_socialization: "High",
      religiosity_range: null,
    },
    groups: [demoGroup],
    interests: interests,
    journals: journals,
    challenges: [],
    schedules: schedules,
    question_responses: questionResponses,
    personalityScore: personalityScore,
    social_preference_answers: socialPreferenceAnswers,
    settings: settings,
  };

  return demoUser;
};

// Create demo group members (users that appear in the demo group)
const createDemoGroupMembers = (): LocalUser[] => {
  const baseSettings: LocalUserSettings = {
    preference_settings: [
      { key: "user_has_seen_personality_score", value: "true" },
    ],
  };

  const member1: LocalUser = {
    id: "demo_member_002",
    unique_id: "USR_SARAH02",
    name: "Sarah Johnson",
    email: "sarah@demo.com",
    phone: "+1234567891",
    dob: "1992-03-20",
    password: "demo123",
    user_type: "user",
    created_at: new Date().toISOString(),
    email_verified_at: new Date().toISOString(),
    university_id: "1",
    profile: {
      id: "profile_sarah",
      avatar: "/profile_placeholder.jpeg",
      gender: "Female",
      race: null,
      relationship_status: "relationship",
      level_of_education: "Master's Degree",
      zip_code: "60602",
      political_orientation: null,
      health_rating: "Excellent",
      has_children: false,
      occupation: "Marketing Manager",
      family_size_in_numbers: "1",
      type_of_city_grown: "Suburban",
      socialization: "High",
      to_socialization: "High",
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
    settings: baseSettings,
  };

  const member2: LocalUser = {
    id: "demo_member_003",
    unique_id: "USR_MIKE03",
    name: "Michael Chen",
    email: "michael@demo.com",
    phone: "+1234567892",
    dob: "1988-11-08",
    password: "demo123",
    user_type: "user",
    created_at: new Date().toISOString(),
    email_verified_at: new Date().toISOString(),
    university_id: "1",
    profile: {
      id: "profile_mike",
      avatar: "/profile_placeholder.jpeg",
      gender: "Male",
      race: null,
      relationship_status: "married",
      level_of_education: "PhD",
      zip_code: "60603",
      political_orientation: null,
      health_rating: "Good",
      has_children: true,
      occupation: "Research Scientist",
      family_size_in_numbers: "4",
      type_of_city_grown: "Urban",
      socialization: "Moderate",
      to_socialization: "Moderate",
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
    settings: baseSettings,
  };

  return [member1, member2];
};

// Initialize default data
const initializeDefaultData = () => {
  // Clear stale seed data when the seed version changes
  const storedVersion = localStorage.getItem(SEED_VERSION_KEY);
  if (storedVersion !== SEED_VERSION) {
    const seedKeys = [
      STORAGE_KEYS.UNIVERSITIES,
      STORAGE_KEYS.PERSONALITY_BUCKET_TYPES,
      STORAGE_KEYS.QUESTION_CATEGORIES,
      STORAGE_KEYS.INTERESTS_BY_TRAIT,
      STORAGE_KEYS.INTERESTS_BY_NON_TRAIT,
      STORAGE_KEYS.JOURNAL_CATEGORIES,
      STORAGE_KEYS.CHALLENGE_CATEGORIES,
      STORAGE_KEYS.SOCIAL_PREFERENCES,
      "prosocial_questions",
    ];
    seedKeys.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
  }

  if (!localStorage.getItem(STORAGE_KEYS.UNIVERSITIES)) {
    setToStorage(STORAGE_KEYS.UNIVERSITIES, SEED_UNIVERSITIES);
  }

  if (!localStorage.getItem(STORAGE_KEYS.PERSONALITY_BUCKET_TYPES)) {
    setToStorage(
      STORAGE_KEYS.PERSONALITY_BUCKET_TYPES,
      SEED_PERSONALITY_BUCKET_TYPES,
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.QUESTION_CATEGORIES)) {
    setToStorage(STORAGE_KEYS.QUESTION_CATEGORIES, SEED_QUESTION_CATEGORIES);
  }

  if (!localStorage.getItem(STORAGE_KEYS.INTERESTS_BY_TRAIT)) {
    setToStorage(STORAGE_KEYS.INTERESTS_BY_TRAIT, SEED_INTERESTS_BY_TRAIT);
  }

  if (!localStorage.getItem(STORAGE_KEYS.INTERESTS_BY_NON_TRAIT)) {
    setToStorage(
      STORAGE_KEYS.INTERESTS_BY_NON_TRAIT,
      SEED_INTERESTS_BY_NON_TRAIT,
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.JOURNAL_CATEGORIES)) {
    setToStorage(STORAGE_KEYS.JOURNAL_CATEGORIES, SEED_JOURNAL_CATEGORIES);
  }

  if (!localStorage.getItem(STORAGE_KEYS.CHALLENGE_CATEGORIES)) {
    setToStorage(STORAGE_KEYS.CHALLENGE_CATEGORIES, SEED_CHALLENGE_CATEGORIES);
  }

  if (!localStorage.getItem(STORAGE_KEYS.SOCIAL_PREFERENCES)) {
    setToStorage(STORAGE_KEYS.SOCIAL_PREFERENCES, SEED_SOCIAL_PREFERENCES);
  }

  // Initialize users array with demo user
  const existingUsers = getFromStorage<LocalUser[]>(STORAGE_KEYS.USERS, []);
  const demoUserExists = existingUsers.some(
    (u) => u.email.toLowerCase() === DEMO_USER_EMAIL.toLowerCase(),
  );

  if (!demoUserExists) {
    const demoUser = createDemoUser();
    const demoMembers = createDemoGroupMembers();
    const allUsers = [...existingUsers, demoUser, ...demoMembers];
    setToStorage(STORAGE_KEYS.USERS, allUsers);

    const existingGroups = getFromStorage<LocalUserGroup[]>(
      STORAGE_KEYS.GROUPS,
      [],
    );
    if (!existingGroups.some((g) => g.id === "demo_group_001")) {
      existingGroups.push(demoUser.groups[0]);
      setToStorage(STORAGE_KEYS.GROUPS, existingGroups);
    }
  }

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
