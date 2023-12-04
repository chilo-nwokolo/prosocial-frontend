import { useState } from "react";
import { useAppQuestions } from "@/store";
import { useMutation, useQuery } from "@apollo/client";
import {
  QUERY_ME_PERSONALITY_SCORE,
  USER_BUCKET_QUESTIONS_RESPONSE_INPUT,
} from "../gql";
import { apolloErrorHandler } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { appRouteLinks, configExtras } from "@/utils/constants";
import useAppConfig from "@/hooks/useAppConfig";

export default function useResultPage() {
  const { data, loading } = useQuery(QUERY_ME_PERSONALITY_SCORE);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  useAppConfig({
    initialConfig: [
      { key: configExtras.user_has_seen_personality_score, value: "true" },
    ],
  });

  const [updatePersonalityBucketQuestions, personalityBucketQuestions] =
    useAppQuestions((state) => [
      state.updatePersonalityBucketQuestions,
      state.personalityBucketQuestions,
    ]);

  const result = data?.me?.personalityScore?.personalityBucketType;

  const checkIfAllAnswered = () => {
    return selected.length === result?.bucketQuestions?.length;
  };

  const [submit, { loading: submitting }] = useMutation(
    USER_BUCKET_QUESTIONS_RESPONSE_INPUT,
    {
      onError: (error) => {
        apolloErrorHandler(error);
      },
      onCompleted: () => {
        router.push(appRouteLinks.resultSuccess);
      },
    },
  );

  const onSubmit = () => {
    const result = selected.map((id) => {
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
    submit({
      variables: {
        input: result,
      },
    });
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
  } as const;
}
