"use client";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { AnswerType, appRouteLinks } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import RatingScaleQuestion from "@/features/intro/components/RatingScaleQuestion";
import SingleChoiceQuestion from "@/features/intro/components/SingleChoiceQuestion";
import InputQuestions from "@/features/intro/components/InputQuestions";
import { useAppQuestions } from "@/store";
import { useFormik } from "formik";
import { decodeUrl, generateQuestions } from "@/utils/helpers";
import { componentConfig } from "./componentConfig";

export default function IntroQuestionsPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const toast = useToast();
  const [section, setSection] = useState<any>(null);
  const [onboardQuestions, onboardAnswers, updateOnboardAnswers] =
    useAppQuestions((state) => [
      state.onboardQuestions,
      state.onboardAnswers,
      state.updateOnboardAnswers,
    ]);

  useEffect(() => {
    const section = onboardQuestions?.find(
      (question: any) => question.category === decodeURI(params.slug),
    );
    if (!section) {
      router.push(appRouteLinks.intro);
      return;
    }
    setSection(section);
  }, [params.slug, onboardQuestions, router]);

  const formik = useFormik({
    initialValues: Object.keys(
      onboardAnswers?.[decodeUrl(params.slug, "-")] || "",
    )?.length
      ? onboardAnswers[decodeUrl(params.slug, "-")]
      : generateQuestions(section),
    onSubmit: (values) => {
      console.log(onboardQuestions);
      const source = decodeUrl(params.slug, "-");
      const updatedAnswers = { ...onboardAnswers, [source]: values };
      updateOnboardAnswers(updatedAnswers);
    },
  });

  return (
    <Flex flexDir="column" gap="8" mb="5">
      <Flex mt="5">
        <Button
          color="black"
          variant="secondary"
          onClick={() => router.push(appRouteLinks.intro)}
        >
          <FaChevronLeft />
        </Button>
      </Flex>
      <Flex flexDir="column" gap="5">
        <Text as="h1" fontSize="3xl" fontWeight="semibold">
          {decodeURI(params.slug)}
        </Text>
        <Text>{section?.description}</Text>
      </Flex>
      <Text as="h2" fontSize="xl" mb="-3">
        {section?.meta}
      </Text>
      <Flex flexDir="column" gap="10">
        {section?.questions.map((question: any) => {
          if (question.type === AnswerType.SINGLE_CHOICE) {
            return (
              <SingleChoiceQuestion
                key={`quest-${question.id}`}
                title={question.question ?? question.text}
                options={question?.options}
                value={formik.values[question.id]}
                name={question.id}
                onChange={formik.handleChange}
                config={
                  componentConfig[params.slug as keyof typeof componentConfig]
                    ?.singleChoiceQuestion
                }
              />
            );
          } else if (question.type === AnswerType.TEXT) {
            return (
              <InputQuestions
                onChange={formik.handleChange}
                value={formik.values[question.id]}
                key={`quest-${question.id}`}
                name={question.id}
                title={question.question}
              />
            );
          } else if (question.type === AnswerType.MULTIPLE_CHOICE) {
            return (
              <SingleChoiceQuestion
                key={`quest-${question.id}`}
                title={question.question ?? question.text}
                options={question?.options}
                value={formik.values[question.id]}
                name={question.id}
                onChange={formik.handleChange}
                config={
                  componentConfig[params.slug as keyof typeof componentConfig]
                    ?.ratingScaleQuestion
                }
              />
            );
          } else if (question.type === AnswerType.RATING_SCALE) {
            return (
              <RatingScaleQuestion
                key={`quest-${question.id}`}
                title={question.question ?? question.text}
                options={question?.options}
                config={
                  componentConfig[params.slug as keyof typeof componentConfig]
                    ?.ratingScaleQuestion
                }
                name={question.id}
                value={formik.values[question.id]}
                onChange={formik.handleChange}
              />
            );
          } else {
            return (
              <InputQuestions
                onChange={formik.handleChange}
                value={formik.values[question.id]}
                key={`quest-${question.id}`}
                name={question.id}
                title={question.question}
              />
            );
          }
        })}
        <Button
          onClick={() => {
            formik.handleSubmit();
            router.back();
            toast({
              title: "Saved successfully",
              status: "success",
            });
          }}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
}
