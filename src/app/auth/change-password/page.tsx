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
import AppModal from "@/components/AppModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(formFeedback.invalidEmail)
      .required(formFeedback.required),
  });
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // eslint-disable-next-line no-unused-vars
    onSubmit: (_values) => {
      setLoading(true);
      // Since we're using localStorage, we'll just simulate a password reset
      // In a real localStorage-only app, you would handle this differently
      toast({
        status: "info",
        title: "Password reset is not available in offline mode",
        description: "Please contact support for assistance.",
      });
      setLoading(false);
      onOpen();
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
                color="info.100"
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
        title="Password Reset Notice"
        description="In offline mode, password reset is handled locally. If you forgot your password, please contact support or create a new account."
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
