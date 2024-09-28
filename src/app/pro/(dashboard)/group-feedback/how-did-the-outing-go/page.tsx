"use client";
import { useGlobalStore } from "@/store";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function FeedbackPage() {
  const [setOutingTextFeedback, outingTextFeedback] = useGlobalStore(
    (state) => [state.setOutingTextFeedback, state.outingTextFeedback],
  );

  const router = useRouter();

  const validationSchema = Yup.object({
    feedback: Yup.string().required(formFeedback.required),
  });

  const formik = useFormik({
    initialValues: {
      feedback: outingTextFeedback || "",
    },
    onSubmit: (data) => {
      setOutingTextFeedback(data.feedback);

      router.push(appRouteLinks.outingFeedbackSecondOuting);
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex flexDir="column" gap="3">
        <Text fontSize="2xl" as="h1" mt="3" fontWeight="semibold">
          How did the outing go for you?
        </Text>
        <Text>
          Please take a moment to write a few sentences about your experience.
        </Text>
        <Text fontStyle="italic" mb="5">
          Your response is private and will never be shared outside of the
          ProSocial admin team. We&apos;ll use your feedback to improve our
          matching for social outings.
        </Text>
        <FormControl>
          <Textarea
            name="feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
            rows={10}
            borderRadius="0"
            bg="white"
            placeholder="Write your thoughts here."
          />
          {formik.errors.feedback ? (
            <FormHelperText fontSize="s" color="critical.100" fontWeight="600">
              {formik.errors.feedback}
            </FormHelperText>
          ) : null}
        </FormControl>
        <Button w="full" type="submit" mt="5" mb="5" alignItems="center">
          Next
        </Button>
      </Flex>
    </form>
  );
}
