"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ImageLinks, appRouteLinks, formFeedback } from "@/utils/constants";
import Image from "next/image";
import FormInput from "@/components/General/FormInput";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD_LINK } from "@/features/auth/gql";
import AppModal from "@/components/AppModal";
import { apolloErrorHandler } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(formFeedback.invalidEmail)
      .required(formFeedback.required),
  });
  const toast = useToast();
  const router = useRouter();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [submit, { loading }] = useMutation(RESET_PASSWORD_LINK, {
    onCompleted: () => {
      onOpen();
    },
    onError: (error) => {
      toast({
        status: "error",
        title: apolloErrorHandler(error),
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      submit({
        variables: {
          email: values.email,
        },
      });
    },
    validationSchema,
  });

  return (
    <>
      <Center h="90vh">
        <Box my="auto" w="full">
          <Image src={ImageLinks.logo} width={75} height={75} alt="app logo" />
          <Text my="4" as="h1" fontSize="2xl" fontWeight="medium">
            Reset Password
          </Text>
          <Text fontSize="lg" mb="10">
            Enter your email address
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Flex flexDir="column" gap="4">
              {/* Email */}
              <FormInput
                inputType="email"
                labelTitle="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
              <Button
                w="full"
                type="submit"
                isLoading={loading}
                loadingText="Submitting..."
                spinnerPlacement="end"
              >
                Reset Password
              </Button>
            </Flex>
          </form>
          <Flex mt="5" fontSize="sm" alignItems="center">
            <Link href={appRouteLinks.login}>
              <Text
                fontSize="sm"
                color="blue.400"
                cursor="pointer"
                _hover={{ textDecor: "none" }}
                textDecor="underline"
              >
                Go back to Login
              </Text>
            </Link>
          </Flex>
        </Box>
      </Center>
      <AppModal
        title="Check your email"
        description="An email has been sent to your email address for confirmation. Kindly check your email and follow the intructions to reset your password."
        onClose={onClose}
        isOpen={isOpen}
        actionButtons={
          <Button
            onClick={() => {
              onClose();
              router.push(appRouteLinks.login);
            }}
          >
            Close
          </Button>
        }
      />
    </>
  );
}
