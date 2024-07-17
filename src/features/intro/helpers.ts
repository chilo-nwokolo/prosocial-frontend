import { OnBoardCategoriesWithQuestionsQuery } from "@/__generated__/graphql";
import { personalQuestionsData } from "@/features/intro/questions";

export const transformQuestions = (
  questions: OnBoardCategoriesWithQuestionsQuery,
) => {
  const personalQuestions = {
    id: personalQuestionsData[0].id,
    category: personalQuestionsData[0].section,
    meta: personalQuestionsData[0]?.meta,
    description: personalQuestionsData[0]?.description,
    totalQuestions: personalQuestionsData[0].questions?.length
      ? personalQuestionsData[0].questions.length - 1
      : 0,
    questions: personalQuestionsData[0].questions,
    destination: personalQuestionsData[0].section,
  };

  const otherQuestions = questions.onBoardCategoriesWithQuestions?.map(
    (category) => {
      const questionsClone = [...category.questions!];
      let questions = questionsClone;
      if (category.id === "2") {
        questions = questionsClone?.sort(() => Math.random() - 0.5);
      }

      const renameCategory = category.name.replace("&", "and");

      return {
        id: category.id,
        category: renameCategory,
        meta: personalQuestionsData[parseInt(category.id) - 1]?.meta,
        description:
          personalQuestionsData[parseInt(category.id) - 1]?.description,
        totalQuestions: category.questions?.length,
        destination: renameCategory,
        questions,
      };
    },
  );

  if (otherQuestions?.length) {
    return [personalQuestions, ...otherQuestions];
  }
  return [personalQuestions];
};
