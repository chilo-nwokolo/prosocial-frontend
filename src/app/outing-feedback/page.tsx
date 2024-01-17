"use client";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import FormInput from "@/components/General/FormInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const field = {
  labelTitle: "Date of birth",
  tooltip: "",
  inputType: "date",
  name: "date",
  infoText: "",
};

export default function OutingFeedbackPage() {
  const router = useRouter();

  const validationSchema = yup.object({
    date: yup.date().required(formFeedback.chooseValidOutingDate),
  });

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    onSubmit: (data) => {
      console.log(data);
      router.push(appRouteLinks.outingFeedbackCards);
    },
    validationSchema,
  });

  return (
    <Center h="90vh">
      <form className="w-100" onSubmit={formik.handleSubmit}>
        <Box my="auto" w="full">
          <Text fontSize="2xl" fontWeight="medium" mb="5">
            Outing Feedback
          </Text>
          <Text>When did you meet for your outing?</Text>
          <FormInput
            labelTitle={field.labelTitle}
            tooltip={field.tooltip}
            inputType={field.inputType}
            name={field.name}
            infoText={field.infoText}
            value={formik.values[field.name as keyof typeof formik.values]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[field.name as keyof typeof formik.values]}
          />
          <Flex flexDir="column" gap="4" mt="10">
            <Button type="submit" w="full">
              Save
            </Button>
          </Flex>
        </Box>
      </form>
    </Center>
  );
}
