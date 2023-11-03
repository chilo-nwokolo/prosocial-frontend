import { useQuery } from "@apollo/client";
import { ALL_QUESTIONS } from "../home/growth/queries";
import { useUser } from "@/store";

export default function usePersonalityQuizzesPage() {
  const [questions, updateQuestions] = useUser((state) => [state.questions, state.updateQuestions]);

	const { loading, error } = useQuery(ALL_QUESTIONS, {
    onCompleted: (data) => {
      const questions = data.questionCategories?.[1].questions;
      const questionsClone = [...questions!];
      const randomizedQuestions = questionsClone?.sort(() => Math.random() - 0.5)
      updateQuestions(randomizedQuestions);
    }
  });

  return { loading, error, questions, }
}