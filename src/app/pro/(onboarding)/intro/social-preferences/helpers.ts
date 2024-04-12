import { Query_User_Social_PreferenceQuery } from "@/__generated__/graphql";

// list of preferences with options like question 3,4,5,6,7
const preferenceWithOptions = ["4", "5", "6", "7", "18"];

const questionsWithOptions = [
  "How often do you go out to socialize?",
  "How often would you like to go out to socialize?",
  "When you do your outing with Fitness19 members, would you like",
  "Are you already a member of Fitness19 or a friend of a member?",
];

export const socializationOptions = [
  { id: "16", title: "Almost never", value: "Almost never" },
  { id: "17", title: "1/x a week", value: "1/x a week" },
  { id: "18", title: "2/x a week", value: "2/x a week" },
  { id: "19", title: "Most days", value: "Most days" },
  { id: "20", title: "Every day", value: "Every day" },
];

export const toSocializeOptions = [
  { id: "21", title: "Almost never", value: "Almost never" },
  { id: "22", title: "1/x a week", value: "1/x a week" },
  { id: "23", title: "2/x a week", value: "2/x a week" },
  { id: "24", title: "Most days", value: "Most days" },
  { id: "25", title: "Every day", value: "Every day" },
];

export const outingDynamics = [
  {
    id: "26",
    title: "A mix of men and women",
    value: "A mix of men and women",
  },
  {
    id: "27",
    title: "A group of only my gender (All male, All female)",
    value: "A group of only my gender (All male, All female)",
  },
  { id: "28", title: "No preference", value: "No preference" },
];

export const fitness19Member = [
  { id: "29", title: "Fitness 19 Member", value: "Fitness 19 Member" },
  { id: "30", title: "Friend", value: "Friend" },
];

export const yesNo = [
  { id: "31", title: "Yes", value: "Yes" },
  { id: "32", title: "No", value: "No" },
];

export const socialPreferenceOptionIDMap = {
  8: "2",
  9: "2",
  10: "2",
  11: "2",
  12: "3",
  13: "3",
  14: "3",
  15: "3",
  16: "4",
  17: "4",
  18: "4",
  19: "4",
  20: "4",
  21: "5",
  22: "5",
  23: "5",
  24: "5",
  25: "5",
  26: "6",
  27: "6",
  28: "6",
  29: "7",
  30: "7",
  31: "8",
  32: "8",
};

const socialPreferenceIdValueMap = {
  16: "Almost never",
  17: "1/x a week",
  18: "2/x a week",
  19: "Most days",
  20: "Every day",
  21: "Almost never",
  22: "1/x a week",
  23: "2/x a week",
  24: "Most days",
  25: "Every day",
  26: "A mix of men and women",
  27: "A group of only my gender (All male, All female)",
  28: "No preference",
  29: "Fitness 19 Member",
  30: "Friend",
  31: "Yes",
  32: "No",
};

export function convertSocialPreferenceObjectToArray(
  objArray: Record<number, string>,
) {
  let result = [];
  for (let obj in objArray) {
    const value = objArray[obj];

    if (!value) continue;

    if (preferenceWithOptions.includes(obj)) {
      result.push({
        social_preference_option_id: value,
        // @ts-ignore
        answer: socialPreferenceIdValueMap[value],
        // @ts-ignore
        social_preference_id: socialPreferenceOptionIDMap[value],
      });
    } else {
      result.push({
        social_preference_option_id: obj,
        answer: value,
        // @ts-ignore
        social_preference_id: socialPreferenceOptionIDMap[obj],
      });
    }
  }
  return result;
}

export function convertSocialPrefResponseToInitialValues(
  response: Query_User_Social_PreferenceQuery,
) {
  let result: Record<string | number, string> = {};

  let referrals: Record<string, string> = {};

  console.log(response);

  const answers = response.user?.social_preference_answers;

  if (answers?.length) {
    answers.forEach((answer) => {
      if (
        !questionsWithOptions.includes(
          answer.social_preference_option?.social_preference?.title || "",
        )
      ) {
        if (answer.social_preference_option?.id) {
          const id = answer.social_preference_option?.id as string;

          if (
            answer.social_preference_option?.social_preference?.title ===
            "Will you be referring a friend to Fitness 19 who is currently not a member to be part of the ProSocial partnership?"
          ) {
            result[18] = answer.social_preference_option.id;

            if (
              answer.social_preference_option.id === "31" &&
              answer.meta?.length
            ) {
              answer.meta?.forEach((option) => {
                const [firstname, lastname] = option.value!.split(" ");
                referrals[
                  `ref-firstName-friend-${option.key?.charAt(option.key.length - 1)}`
                ] = firstname;
                referrals[
                  `ref-lastName-friend-${option.key?.charAt(option.key.length - 1)}`
                ] = lastname;
              });
            }
          } else {
            // @ts-ignore
            result[id] = answer.answer;
          }
        }
      } else {
        if (answer.social_preference_option?.id) {
          // @ts-ignore
          const id = answer.social_preference_option?.social_preference
            .id as string;
          // @ts-ignore
          result[id] = answer.social_preference_option.id;
        }
      }
    });
  }

  return { result, referrals };
}
