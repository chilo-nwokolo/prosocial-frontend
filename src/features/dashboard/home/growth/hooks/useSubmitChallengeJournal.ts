import { appRouteLinks } from "@/utils/constants";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import {
  CREATE_JOURNAL_ENTRY,
  QUERY_ME_CHALLENGE_CATEGORIES,
  QUERY_ME_JOURNALS,
} from "@/features/dashboard/home/growth/queries";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDisclosure, useToast } from "@chakra-ui/react";
import useAppConfig from "@/hooks/useAppConfig";
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

  const { updateConfig, config } = useAppConfig({});

  const [mutate, { loading }] = useMutation(CREATE_JOURNAL_ENTRY, {
    onCompleted: () => {
      toast({
        status: "success",
        title: "Your entry was saved successfully.",
      });

      if (source === "challenges") {
        const res: string = config?.["user_challenges_story"] || "";
        if (!res.includes(title)) {
          const updatedRes = res.length ? `${res};${title}` : title;
          updateConfig([{ key: "user_challenges_story", value: updatedRes }]);
        }
      } else if (source === "journal") {
        const res: string = config?.["user_journal_story"] || "";
        if (!res.includes(title)) {
          const updatedRes = res.length ? `${res};${title}` : title;
          updateConfig([{ key: "user_journal_story", value: updatedRes }]);
        }
      }

      source === "challenges"
        ? router.push(appRouteLinks.growthChallenges)
        : router.push(appRouteLinks.growthJournal);
    },
    refetchQueries: [
      {
        query:
          source === "challenges"
            ? QUERY_ME_CHALLENGE_CATEGORIES
            : QUERY_ME_JOURNALS,
      },
    ],
  });

  const formik = useFormik({
    initialValues: {
      input: initialValue,
    },
    onSubmit: (values) => {
      mutate({
        variables: {
          input: values.input,
          journal_category_id: id.toString(),
        },
      });
    },
    validationSchema: Yup.object({
      input: Yup.string().required().min(100),
    }),
    enableReinitialize: true,
  });

  return { formik, loading, isOpen, onClose, onOpen } as const;
}
