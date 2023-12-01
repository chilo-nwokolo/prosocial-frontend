import useAppConfig from "@/hooks/useAppConfig";
import { appRouteLinks, configExtras } from "@/utils/constants";

export default function useGrowthPage() {
  const { config, loading } = useAppConfig({});

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

  const checkJournalAndChallengesProgress = () => {
    const journal = config?.[configExtras.user_journal_story];
    const challenge = config?.[configExtras.user_challenges_story];

    const journalLength = journal?.split(";").length || 0;
    const challengeLength = challenge?.split(";").length || 0;

    return { journalLength, challengeLength };
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
      answers: checkJournalAndChallengesProgress().journalLength,
    },
    {
      id: 4,
      title: "Challenges",
      description:
        "We give you daily goals that provide opportunities for personal growth",
      progress: 8,
      destination: appRouteLinks.growthChallenges,
      answers: checkJournalAndChallengesProgress().challengeLength,
    },
  ];

  return { growthSections, loading };
}
