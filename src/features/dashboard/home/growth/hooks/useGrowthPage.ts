import { useAppQuestions } from "@/store";
import { appRouteLinks } from "@/utils/constants";

export default function useGrowthPage() {
  const [userPersonalityAnswers] = useAppQuestions((state) => [
    state.userPersonalityAnswers,
  ]);

  const checkAnswers = (answers: { [id: string]: number }[]) => {
    let completed = 0;

    answers.forEach((value) => {
      const data = Object.values(value);
      if (data[0] === 10) {
        completed++;
      }
    });
    return completed;
  };

  checkAnswers(userPersonalityAnswers);

  const growthSections = [
    {
      id: 1,
      title: "Personality Quizzes",
      description: "Learn about yourself and get even better social matches",
      progress: 3,
      destination: appRouteLinks.growthPersonality,
      answers: checkAnswers(userPersonalityAnswers),
    },
    {
      id: 2,
      title: "Interests",
      description:
        "Tell us about your interests so we can help you find like-minded people",
      progress: 1,
      destination: appRouteLinks.growthInterests,
      answers: 0,
    },
    {
      id: 3,
      title: "Journaling",
      description:
        "Spend time in self-reflection to discover your strengths and growth areas",
      progress: 4,
      destination: appRouteLinks.growthJournal,
      answers: 0,
    },
    {
      id: 4,
      title: "Challenges",
      description:
        "We give you daily goals that provide opportunities for personal growth",
      progress: 3,
      destination: appRouteLinks.growthChallenges,
      answers: 0,
    },
  ];

  const calculateProgress = (qty: number, total: number) => {
    if (qty === 0) return `white 100%`;
    const breakdown = 100 / total;

    return `green ${breakdown * qty}%, #fdf5e9 0%`;
  };

  return { calculateProgress, growthSections };
}
