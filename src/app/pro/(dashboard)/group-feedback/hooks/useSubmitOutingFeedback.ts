import { useGlobalStore } from "@/store";
import { useMutation } from "@apollo/client";
import { MUTATION_SUBMIT_FEEDBACK } from "../graphql/gql";
import { appRouteLinks, storeKeys } from "@/utils/constants";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { apolloErrorHandler } from "@/utils/helpers";
import { OutingFeedbackInput } from "@/__generated__/graphql";

export default function useSubmitOutingFeedback() {
  const [userData, feedbackResponses, excludeUsers, outingTextFeedback] =
    useGlobalStore((state) => [
      state.userData,
      state.feedbackResponses,
      state.excludeUsers,
      state.outingTextFeedback,
    ]);

  const toast = useToast();
  const router = useRouter();

  const [submitFeedback, { loading }] = useMutation(MUTATION_SUBMIT_FEEDBACK, {
    onCompleted: (data) => {
      toast({
        status: "success",
        title: data.submitFeedback?.message,
      });
      localStorage.removeItem(storeKeys.GLOBAL_STORE);
      router.push(appRouteLinks.outingFeedbackSuccess);
    },
    onError: (error) => {
      toast({
        status: "error",
        title: apolloErrorHandler(error),
      });
    },
  });

  const handleSubmit = (message: string) => {
    const formData: OutingFeedbackInput = {
      group_id: userData!.groupId,
      unique_user_id: userData!.userId,
      feedbackResponses,
      meta: [
        {
          key: "Would you like to go on a second outing?",
          value: message,
        },
      ],
      user_excluded_matches: excludeUsers,
      outing_feedback_note: outingTextFeedback,
    };

    submitFeedback({
      variables: {
        input: { ...formData },
      },
    });
  };

  return { handleSubmit, loading } as const;
}
