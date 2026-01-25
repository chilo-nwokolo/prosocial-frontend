import { useGlobalStore } from "@/store";
import { appRouteLinks, storeKeys } from "@/utils/constants";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import localStorageService from "@/service/localStorage";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (message: string) => {
    setLoading(true);

    try {
      const formData = {
        group_id: userData!.groupId,
        unique_user_id: userData!.userId,
        feedbackResponses: feedbackResponses.map((fr: any) => ({
          receiving_user_id: fr.receiving_user_id || fr.receivingUserId,
          connection: fr.connection,
          note: fr.note,
        })),
        meta: [
          {
            key: "Would you like to go on a second outing?",
            value: message,
          },
        ],
        user_excluded_matches: excludeUsers,
        outing_feedback_note: outingTextFeedback,
      };

      localStorageService.submitFeedback(formData);

      toast({
        status: "success",
        title: "Feedback submitted successfully!",
      });
      localStorage.removeItem(storeKeys.GLOBAL_STORE);
      router.push(appRouteLinks.outingFeedbackSuccess);
    } catch (error: any) {
      toast({
        status: "error",
        title: error.message || "Failed to submit feedback",
      });
    }

    setLoading(false);
  };

  return { handleSubmit, loading } as const;
}
