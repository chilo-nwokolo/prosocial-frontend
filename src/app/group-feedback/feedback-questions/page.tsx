"use client";
import { InteractionFeedbackType, useGlobalStore } from "@/store";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FeedbackConnection, FeedbackResponse } from "@/__generated__/graphql";

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
  const [interactionFeedback, outingDate, setFeedbackResponses] =
    useGlobalStore((state) => [
      state.interactionFeedback,
      state.outingDate,
      state.setFeedbackResponses,
    ]);

  const router = useRouter();

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

      setFeedbackResponses(responses);

      router.push(appRouteLinks.outingFeedbackToGroup);
    },
    validationSchema,
  });

  const [result, setResult] = useState<ResultType[]>([]);

  useEffect(() => {
    checkResultBreakdown();
  }, []);

  const checkResultBreakdown = useCallback(() => {
    const resultbreakdown: {
      [x: string]: InteractionFeedbackType[];
    } = {
      YES: [],
      NO: [],
    };

    let initialResult: ResultType[] = [];

    let hasYes = false;

    interactionFeedback.forEach((feedback) => {
      if (feedback.connection === "YES") {
        resultbreakdown.YES.push(feedback);
      } else if (feedback.connection === "NO") {
        resultbreakdown.NO.push(feedback);
      }
    });

    if (resultbreakdown?.YES?.length < 1 && resultbreakdown?.NO?.length < 1) {
      router.push(appRouteLinks.outingFeedbackToGroup);
      return;
    }

    if (resultbreakdown?.YES?.length) {
      hasYes = true;
      const question = resultbreakdown["YES"][0];
      initialResult = [
        ...initialResult,
        { ...question, inputName: "answerOne" },
      ];
    }

    if (resultbreakdown?.NO?.length) {
      const question2 = resultbreakdown["NO"][0];
      initialResult = [
        ...initialResult,
        { ...question2, inputName: hasYes ? "answerTwo" : "answerOne" },
      ];
    }

    setResult(initialResult);
  }, [interactionFeedback, router]);

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
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Flex>
  );
}
