"use client";
import { InteractionFeedbackType, useGlobalStore } from "@/store";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import { useMutation } from "@apollo/client";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { MUTATION_SUBMIT_FEEDBACK } from "../graphql/gql";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FeedbackConnection, FeedbackResponse } from "@/__generated__/graphql";
import { apolloErrorHandler } from "@/utils/helpers";

const connections = {
  YES: "did feel a connection",
  NO: "did not feel a connection",
  NOINTERACTION: "did not interact",
};

type ResultType = {
  connection: string;
  userId: string;
  name: string;
  inputName: string;
};

const QuestionBox = ({
  name,
  connection,
  inputName,
  onChange,
  onBlur,
  value,
  error,
}: {
  name: string;
  connection: string;
  inputName: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<any>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur: (e: any) => void;
  value: string;
  error?: string;
}) => {
  return (
    <FormControl>
      <Text my="3">
        You said you {connections[connection as keyof typeof connections]} with{" "}
        {name}. Could you tell us why?
      </Text>
      <Textarea
        rows={10}
        name={inputName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Write your thoughts here. Your response is private and will never be shared outside of the ProSocial admin team. We'll use your feedback to improve our matching for social outings."
      />
      {error ? (
        <FormHelperText fontSize="xs" color="critical.100">
          {error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default function FeedbackQuestionsPage() {
  const [
    interactionFeedback,
    userData,
    outingDate,
    setOutingDate,
    setInteractionFeedback,
    updateGroupData,
    setUserData,
  ] = useGlobalStore((state) => [
    state.interactionFeedback,
    state.userData,
    state.outingDate,
    state.setOutingDate,
    state.setInteractionFeedback,
    state.updateGroupData,
    state.setUserData,
  ]);

  const router = useRouter();
  const toast = useToast();

  const [submitFeedback, { loading }] = useMutation(MUTATION_SUBMIT_FEEDBACK, {
    onCompleted: (data) => {
      setOutingDate("");
      setInteractionFeedback([]);
      updateGroupData(null);
      setUserData(null);
      toast({
        status: "success",
        title: data.submitFeedback?.message,
      });
      formik.resetForm();
      router.push(appRouteLinks.outingFeedbackSuccess);
    },
    onError: (error) => {
      toast({
        status: "error",
        title: apolloErrorHandler(error),
      });
    },
  });

  const validationSchema = yup.object({
    answerOne: yup.string().required(formFeedback.required),
    answerTwo: yup.string().required(formFeedback.required),
  });

  const formik = useFormik({
    initialValues: {
      answerOne: "",
      answerTwo: "",
    },
    onSubmit: (feedback) => {
      const responses: FeedbackResponse[] = result.map((res) => {
        return {
          note: `${
            feedback[res.inputName as keyof typeof feedback]
          } \n Outing Date: ${outingDate}`,
          connection: res.connection as FeedbackConnection,
          receiving_user_id: res.userId,
        };
      });

      const formData = {
        group_id: userData!.groupId,
        unique_user_id: userData!.userId,
        feedbackResponses: responses,
      };

      submitFeedback({
        variables: {
          input: { ...formData },
        },
      });
    },
    validationSchema,
  });

  const [result, setResult] = useState<ResultType[]>([]);

  useEffect(() => {
    const resultbreakdown: {
      [x: string]: InteractionFeedbackType[];
    } = {
      YES: [],
      NO: [],
      NOINTERACTION: [],
    };

    const selectedIndex = [];

    const finalResult = [];

    interactionFeedback.forEach((feedback) => {
      if (feedback.connection === "YES") {
        resultbreakdown.YES.push(feedback);
      } else if (feedback.connection === "NO") {
        resultbreakdown.NO.push(feedback);
      } else if (feedback.connection === "NOINTERACTION") {
        resultbreakdown.NOINTERACTION.push(feedback);
      }
    });

    if (resultbreakdown.YES.length >= 1) {
      for (const res in resultbreakdown) {
        if (res === "YES") {
          const items = resultbreakdown[res];
          const randomIndex = Math.floor(Math.random() * items.length);
          selectedIndex.push(randomIndex);
          const item = items[randomIndex];
          finalResult.push(item);
        }
      }
    }

    if (resultbreakdown.NO.length >= 1) {
      for (const res in resultbreakdown) {
        if (res === "NO") {
          const items = resultbreakdown[res];
          const randomIndex = Math.floor(Math.random() * items.length);
          selectedIndex.push(randomIndex);
          const item = items[randomIndex];
          finalResult.push(item);
        }
      }
    }

    if (selectedIndex.length < 1) {
      finalResult.push(interactionFeedback[0]);
      finalResult.push(interactionFeedback[2]);
    } else if (selectedIndex.length === 1) {
      const intlength = interactionFeedback.length;
      if (!selectedIndex.includes(intlength - 1)) {
        finalResult.push(interactionFeedback[intlength - 1]);
      } else {
        finalResult.push(interactionFeedback[intlength - 2]);
      }
    }

    const res = finalResult.map((result, i) => {
      return { ...result, inputName: i === 0 ? "answerOne" : "answerTwo" };
    });

    setResult(res);
  }, [interactionFeedback]);

  return (
    <Flex flexDir="column">
      <Text fontSize="sm" textAlign="right">
        Complete in about 3 minutes.
      </Text>
      <Text fontSize="2xl" mt="3" fontWeight="semibold">
        Two Questions
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir="column" gap="3">
          {result.map((res) => (
            <QuestionBox
              name={res.name}
              inputName={res.inputName}
              connection={res.connection}
              key={res.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[res.inputName as keyof typeof formik.values]}
              error={formik.errors[res.inputName as keyof typeof formik.values]}
            />
          ))}
        </Flex>
        <Flex mt="5" justifyContent="center">
          <Button isLoading={loading} type="submit">
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
