import { FilterProperties } from "@/app/pro-admin/dashboard/users/hooks/useFilterContext";
import { InteractionFeedbackType } from "@/store";

export interface DynamicQueryObject {
  [key: string]: Record<string, any>;
}

export const FILTER_CATEGORY_KEYS = {
  age: "age",
  education: "education",
  politicalOrientation: "politicalOrientation",
  gender: "gender",
  race: "race",
  relationshipStatus: "relationshipStatus",
  healthStatus: "health",
  bigFiveType: "bigFiveType",
  questionsAnswered: "questionsAnswered",
  individualTraits: "individualTraits",
  extroversionScore: "extroversionScore",
  agreeablenessScore: "agreeablenessScore",
  conscientiousnessScore: "conscientiousnessScore",
  neuroticismScore: "neuroticismScore",
  opennessScore: "opennessScore",
  narcissismScore: "narcissismScore",
  socialBeliefsScore: "socialBeliefsScore",
  behavioralHealthScore: "behavioralHealthScore",
  groupId: "groupId",
};

export const FILTER_QUERY_KEYS = {
  age: "age",
  education: "education",
  politicalOrientation: "political_orientation",
  gender: "gender",
  race: "race",
  butterflyType: "butterfly_type",
  questionsAnsweredMin: "questions_answered_min",
  questionsAnsweredMax: "questions_answered_max",
  ageRangeMin: "age_range_min",
  ageRangeMax: "age_range_max",
  extroversionScoreMin: "extroversion_score_min",
  extroversionScoreMax: "extroversion_score_max",
  agreeablenessScoreMin: "agreeableness_score_min",
  agreeablenessScoreMax: "agreeableness_score_max",
  conscientiousnessScoreMin: "conscientiousness_score_min",
  conscientiousnessScoreMax: "conscientiousness_score_max",
  neuroticismScoreMin: "neuroticism_score_min",
  neuroticismScoreMax: "neuroticism_score_max",
  opennessScoreMin: "openness_score_min",
  opennessScoreMax: "openness_score_max",
  narcissismScoreMin: "narcissism_min",
  narcissismScoreMax: "narcissism_max",
  socialBeliefsScoreMin: "social_beliefs_min",
  socialBeliefsScoreMax: "social_beliefs_max",
  behavioralHealthMin: "behavioral_health_min",
  behavioralHealthMax: "behavioral_health_max",
  groupId: "group_id",
};

// Filters without children
const loneFilters = [FILTER_QUERY_KEYS.groupId];

export const FILTER_PARENT_NAMES = {
  affinities: "affinities",
  groupDistribution: "group_distribution",
  bigFivePersonality: "big_five_personality",
  narcissismSocialBehavioral: "narcissism_social_behavioral",
  groupId: "group_id",
};

export const activeFilterHandler = (name: string, activeFilters: string[]) => {
  const foundId = activeFilters.indexOf(name);
  const newFilters = [...activeFilters];

  if (foundId >= 0) {
    newFilters.splice(foundId, 1);
    return newFilters;
  }
  newFilters.push(name);
  return newFilters;
};

export const updateFilterPropHandler = (
  property: FilterProperties,
  filterProp: FilterProperties[],
) => {
  const foundId = filterProp.findIndex(
    (prop) => prop.filterProp === property.filterProp,
  );

  const newFilters = [...filterProp];

  if (foundId >= 0) {
    newFilters.splice(foundId, 1);
    newFilters.push(property);
    return newFilters;
  }
  newFilters.push(property);
  return newFilters;
};

export const findFilterProp = (
  name: string,
  filterProp: FilterProperties[],
) => {
  const found = filterProp.find((prop) => prop.filterProp === name);
  return found?.value;
};

export const adminQueryBuilder = (
  filterProperties: FilterProperties[],
  activeFilters: string[],
) => {
  if (!activeFilters) return {};
  const finalQuery: DynamicQueryObject | Record<string, any> = {};

  for (const filter of filterProperties) {
    const { parentName, category, filterProp, value } = filter;
    if (!activeFilters.includes(category)) continue;
    if (!finalQuery[parentName]) {
      if (loneFilters.includes(parentName)) {
        finalQuery[parentName] = value;
      } else {
        finalQuery[parentName] = { [filterProp]: value };
      }
    } else {
      const initialData = finalQuery[parentName];
      const finished = { ...initialData, [filterProp]: value };
      finalQuery[parentName] = finished;
    }
  }
  return finalQuery;
};

export const updateInteractionArray = (
  singleFeedback: InteractionFeedbackType,
  feedback: InteractionFeedbackType[],
) => {
  const foundId = feedback.findIndex(
    (feed) => feed.userId === singleFeedback.userId,
  );

  const newFeedback = [...feedback];

  if (foundId > -1) {
    newFeedback.splice(foundId, 1);
    newFeedback.push(singleFeedback);
    return newFeedback;
  }
  newFeedback.push(singleFeedback);
  return newFeedback;
};

export function calculateAge(dobString: Date | string) {
  // Parse the input date string into a Date object
  const dob = new Date(dobString);

  // Get the current date
  const now = new Date();

  // Calculate the year difference
  let age = now.getFullYear() - dob.getFullYear();

  // Adjust if the current date is before the birth date in the current year
  const monthDifference = now.getMonth() - dob.getMonth();
  const dayDifference = now.getDate() - dob.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
