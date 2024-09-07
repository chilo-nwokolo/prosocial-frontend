export const ImageLinks = {
  logoWithText: "/logo-text.png",
  logo: "/logo.png",
  dpPlaceholder: "/profile_placeholder.jpeg",
};

export const appRouteLinks = {
  // auth routes
  login: "/auth/login",
  register: "/auth/register",
  confirmEmail: "/auth/register/confirm-email",
  verifyEmail: "/auth/register/verify-email",
  onbording: "/auth/onboarding",
  changePassword: "/auth/change-password",
  resetPassword: "/auth/reset-password",
  // getting started
  gettingStarted: "/getting-started",
  welcome: "/getting-started/welcome",
  termsConditions: "/getting-started/terms-conditions",
  serviceTerms: "/getting-started/service-terms",
  // authenticated routes
  intro: "/pro/intro",
  result: "/pro/intro/result",
  introInterests: "/pro/intro/interests",
  introSocialPreferences: "/pro/intro/social-preferences",
  resultSuccess: "/pro/intro/result/success",
  // dashboard routes
  home: "/pro/home",
  about: "/pro/about",
  contact: "/pro/contact",
  growth: "/pro/home/growth",
  growthPersonality: "/pro/home/growth/personality-quizzes",
  growthChallenges: "/pro/home/growth/challenges",
  growthInterests: "/pro/home/growth/interests",
  growthJournal: "/pro/home/growth/journal",
  profile: "/pro/profile",
  profilePersonalityResult: "/pro/profile/personality-result",
  socialPreference: "/pro/profile/social-preference",
  socialScheduleSuccess: "/pro/profile/social-preference/success",
  interestsPair: "/pro/home/growth/interests/pair",
  interestsExpanded: "/pro/home/growth/interests/expanded",
  interestsExpandedMore: "/pro/home/growth/interests/expanded/more-interests",
  logout: "/pro/logout",
  // outing feedback routes
  outingMembers: "/pro/group-members",
  outingFeedback: "/pro/group-feedback",
  outingFeedbackCards: "/pro/group-feedback/feedback-cards",
  outingFeedbackQuestions: "/pro/group-feedback/feedback-questions",
  outingFeedbackSuccess: "/pro/group-feedback/feedback-questions/success",
  outingFeedbackToGroup: "/pro/group-feedback/feedback-to-group",
  outingFeedbackHowDidTheOutingGo: "/pro/group-feedback/how-did-the-outing-go",
  outingFeedbackSecondOuting: "/pro/group-feedback/second-outing",
};

export const adminRoutes = {
  login: "/pro-admin/login",
  dashboard: "/pro-admin/dashboard",
  users: "/pro-admin/dashboard/users",
  groups: "/pro-admin/dashboard/groups",
  demoLocations: "/pro-admin/dashboard/demo-locations",
};

export const formFeedback = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email",
  minPassword: "Password must exceed 8 characters",
  passwordRequirement:
    "Password must contain at least 8 characters and a combination of uppercase letters, lowercase letters, numbers, and symbols.",
  chooseValidOutingDate: "Please, choose a valid outing date",
};

export const AnswerType = {
  RATING_SCALE_LABEL: "RATING_SCALE_LABEL",
  RATING_SCALE: "RATING_SCALE",
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  TEXT: "TEXT",
};

export const configExtras = {
  user_has_seen_personality_score: "user_has_seen_personality_score",
  user_visited_intro_page: "user_visited_intro_page",
  user_completed_interests_1: "user_completed_interests_1",
  user_completed_interests_2: "user_completed_interests_2",
  user_challenges_story: "user_challenges_story",
  user_journal_story: "user_journal_story",
  user_has_uploaded_profile_picture: "user_has_uploaded_profile_picture",
  user_quiz_personality_1: "user_quiz_personality-1",
  user_quiz_personality_2: "user_quiz_personality-2",
  user_quiz_personality_3: "user_quiz_personality-3",
  user_has_seen_retyped_result_1: "user_has_seen_retyped_result_1",
  user_accepted_terms_and_conditions: "user_accepted_terms_and_conditions",
  user_has_filled_social_preferences: "user_has_filled_social_preferences",
};

export const externalLinks = {
  email: "support@prosocialnetworks.com",
  website: "https://www.prosocialnetworks.com/",
};

export const AccessToken = "accessToken";
export const userType = "userType";

export const youtubeLinks = {
  welcomePageDesktop: "nt4VRSr0JNs?rel=0",
  welcomePageMobile: "DmwvnBVP0zw?rel=0",
};

export const storeKeys = {
  QUESTIONS_STORE: "prosocial_questions",
  GLOBAL_STORE: "prosocial_global",
  CONFIG_STORE: "prosocial_config",
  USER_STORE: "prosocial_user",
};
