import { appRouteLinks, configExtras } from "@/utils/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDisclosure, useToast } from "@chakra-ui/react";
import useAppConfig from "@/hooks/useAppConfig";
import { useState } from "react";
import localStorageService from "@/service/localStorage";

type Props = {
  id: number;
  initialValue: string;
  source: string;
  title: string;
};

export default function useSubmitChallengeJournal({
  id,
  initialValue,
  source,
  title,
}: Props) {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const goToPrevPage = () => {
    source === "challenges"
      ? router.push(appRouteLinks.growthChallenges)
      : router.push(appRouteLinks.growthJournal);
  };

  const { updateConfig, config } = useAppConfig({
    onUpdateSuccess: () => {
      goToPrevPage();
    },
  });

  const formik = useFormik({
    initialValues: {
      input: initialValue,
    },
    onSubmit: async (values) => {
      setLoading(true);

      try {
        localStorageService.createJournalEntry(
          values.input,
          id.toString(),
          source === "challenges" ? "challenge" : "journal",
        );

        toast({
          status: "success",
          title: "Your entry was saved successfully.",
        });

        if (source === "challenges") {
          const res: string =
            config?.[configExtras.user_challenges_story] || "";
          if (!res.includes(title)) {
            const updatedRes = res.length ? `${res};${title}` : title;
            updateConfig([
              { key: configExtras.user_challenges_story, value: updatedRes },
            ]);
            setLoading(false);
            return;
          }
          goToPrevPage();
        } else if (source === "journal") {
          const res: string = config?.[configExtras.user_journal_story] || "";
          if (!res.includes(title)) {
            const updatedRes = res.length ? `${res};${title}` : title;
            updateConfig([
              { key: configExtras.user_journal_story, value: updatedRes },
            ]);
            setLoading(false);
            return;
          }
          goToPrevPage();
        }
      } catch (error: any) {
        toast({
          status: "error",
          title: error.message || "Failed to save entry",
        });
      }

      setLoading(false);
    },
    validationSchema: Yup.object({
      input: Yup.string().required().min(100),
    }),
    enableReinitialize: true,
  });

  return { formik, loading, isOpen, onClose, onOpen } as const;
}
