"use client";
import RatingScaleQuestion from "@/features/intro/components/RatingScaleQuestion";
import { useGlobalStore } from "@/store";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function FeedbackPage() {
  const [
    setOutingTextFeedback,
    setParticipationConfirmation,
    outingTextFeedback,
    participationConfirmation,
  ] = useGlobalStore((state) => [
    state.setOutingTextFeedback,
    state.setParticipationConfirmation,
    state.outingTextFeedback,
    state.participationConfirmation,
  ]);

  const router = useRouter();

  const validationSchema = Yup.object({
    feedback: Yup.string().required(formFeedback.required),
    willParticipate: Yup.string().required(formFeedback.required),
  });

  const formik = useFormik({
    initialValues: {
      feedback: outingTextFeedback || "",
      willParticipate: participationConfirmation || "",
    },
    onSubmit: (data) => {
      setOutingTextFeedback(data.feedback);
      setParticipationConfirmation(data.willParticipate);

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
        <Text fontSize="sm">
          Please take a moment to write a few sentences about your experience.
        </Text>
        <FormControl>
          <Textarea
            name="feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
            rows={10}
            placeholder="Write your thoughts here. Your response is private and will never be shared outside of the ProSocial admin team. We'll use your feedback to improve our matching for social outings."
          />
          {formik.errors.feedback ? (
            <FormHelperText fontSize="xs" color="critical.100">
              {formik.errors.feedback}
            </FormHelperText>
          ) : null}
        </FormControl>

        <RatingScaleQuestion
          name="willParticipate"
          value={formik.values.willParticipate}
          onChange={formik.handleChange}
          error={formik.errors.willParticipate}
          title={
            <FormLabel
              borderBottom="1px solid"
              borderColor="gray.500"
              w="full"
              mt="5"
              pb="5"
              mb="0"
              textAlign="left"
            >
              Would you participate in an outing like this if you weren’t
              getting a free month at Fitness 19?
            </FormLabel>
          }
          options={[
            { id: "1", title: "Yes", value: "YES" },
            { id: "2", title: "No", value: "NO" },
          ]}
          config={{ useIdAsValue: false, returnTitle: true }}
        />
        <Button w="full" type="submit">
          Next
        </Button>
      </Flex>
    </form>
  );
}
