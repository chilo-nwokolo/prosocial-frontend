import { useState, useEffect } from "react";
import { useAppQuestions } from "@/store";
import { useRouter } from "next/navigation";
import { appRouteLinks, configExtras } from "@/utils/constants";
import useAppConfig from "@/hooks/useAppConfig";
import localStorageService from "@/service/localStorage";

export default function useResultPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const [resultNote, setResultNote] = useState("");

  useAppConfig({
    initialConfig: [
      { key: configExtras.user_has_seen_personality_score, value: "true" },
    ],
  });

  const [
    updatePersonalityBucketQuestions,
    personalityBucketQuestions,
    updateOnboardAnswers,
  ] = useAppQuestions((state) => [
    state.updatePersonalityBucketQuestions,
    state.personalityBucketQuestions,
    state.updateOnboardAnswers,
  ]);

  useEffect(() => {
    // Load personality score from localStorage
    const score = localStorageService.getPersonalityScore();
    if (score) {
      setResult(score.personalityBucketType);
      // Confirm submission
      localStorageService.confirmUserSubmission();
    }
    setLoading(false);
  }, []);

  const checkIfAllAnswered = () => {
    return selected.length === result?.bucketQuestions?.length;
  };

  const onSubmit = () => {
    setSubmitting(true);

    let resultData = selected.map((id) => {
      if (personalityBucketQuestions.includes(id)) {
        return {
          response: "yes",
          bucket_id: id,
        };
      }
      return {
        response: "no",
        bucket_id: id,
      };
    });

    if (resultNote) {
      resultData = resultData.map((result, i) => {
        if (i === 0) {
          return {
            ...result,
            butterfly_info: {
              note: resultNote,
            },
          };
        }
        return result;
      });
    }

    try {
      localStorageService.submitPersonalityBucketQuestions(resultData as any);
      updateOnboardAnswers(null);
      router.push(appRouteLinks.resultSuccess);
    } catch (error) {
      console.error("Failed to submit:", error);
    }

    setSubmitting(false);
  };

  return {
    loading,
    result,
    checkIfAllAnswered,
    updatePersonalityBucketQuestions,
    personalityBucketQuestions,
    setSelected,
    selected,
    submitting,
    onSubmit,
    resultNote,
    setResultNote,
  } as const;
}
