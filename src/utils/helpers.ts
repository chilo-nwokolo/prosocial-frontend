import { ApolloError } from "@apollo/client";

export const calculateMinDateOfBirth = () => {
  const theYear = new Date().getFullYear() - 15;
  return `${theYear}-01-01`;
};

export const generateQuestions = (section: any) => {
  const numberOfQuestions = section?.questions.length;
  const obj: { [x: string]: string } = {};
  for (let i = 1; i <= numberOfQuestions; i++) {
    obj[i.toString()] = "";
  }
  return obj;
};

type QuestionAnswer = {
  question_id: string;
  answer: string;
};

export function combineIntoFormattedArray(
  objArray: Record<number, string>[],
): QuestionAnswer[] {
  let result: QuestionAnswer[] = [];
  for (let obj of objArray) {
    for (let key in obj) {
      result.push({
        question_id: key,
        answer: obj[key],
      });
    }
  }
  return result;
}

export function decodeUrl(params: string, separator?: string) {
  return separator
    ? decodeURI(params).replaceAll(" ", separator)
    : decodeURI(params);
}

export const apolloErrorHandler = (error: ApolloError) => {
  return (
    (error.graphQLErrors.map(
      (e) => e.extensions.reason,
    ) as unknown as string) || "Something went wrong"
  );
};

export const calculateGrowthProgress = (qty: number, total: number) => {
  if (qty === 0) return `white 100%`;
  const breakdown = 100 / total;

  return `green ${breakdown * qty}%, #fdf5e9 0%`;
};
