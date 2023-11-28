import useAppConfig from "@/hooks/useAppConfig";
import { appRouteLinks } from "@/utils/constants";

export default function useGrowthPage() {
  const { config } = useAppConfig({});

  const checkPersonalityProgress = () => {
    const progress = { personalityQuiz: 0, interests: 0 };
    for (let key in config) {
      if (key.includes("user_quiz_personality-")) {
        progress.personalityQuiz += 1;
      }
      if (key.includes("user_completed_interests_2")) {
        progress.interests += 1;
      }
    }
    return progress;
  };

  const growthSections = [
    {
      id: 1,
      title: "Personality Quizzes",
      description: "Learn about yourself and get even better social matches",
      progress: 3,
      destination: appRouteLinks.growthPersonality,
      answers: checkPersonalityProgress().personalityQuiz,
    },
    {
      id: 2,
      title: "Interests",
      description:
        "Tell us about your interests so we can help you find like-minded people",
      progress: 1,
      destination: appRouteLinks.growthInterests,
      answers: checkPersonalityProgress().interests,
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

  return { growthSections };
}
