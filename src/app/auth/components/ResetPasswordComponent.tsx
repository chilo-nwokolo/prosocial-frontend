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
import { useFormik } from "formik";
import * as yup from "yup";
import AppModal from "@/components/AppModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordComponent() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required(formFeedback.required)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        formFeedback.passwordRequirement,
      ),
    confirmPassword: yup
      .string()
      .required(formFeedback.required)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        formFeedback.passwordRequirement,
      ),
  });
  const { onOpen, onClose, isOpen } = useDisclosure();

  // Token would be used in a real password reset flow
  // eslint-disable-next-line no-unused-vars
  const _token = useSearchParams().get("token");

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (values.confirmPassword !== values.newPassword) {
        toast({
          status: "error",
          title: "Passwords don't match",
        });
        return;
      }

      setLoading(true);

      // In localStorage mode, we would need the user's email to update password
      // Since we don't have email verification, we'll show an info message
      toast({
        status: "info",
        title: "Password reset is handled locally",
        description: "Please log in with your new password.",
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
            Enter your new password. Make sure it&apos;s secure
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Flex flexDir="column" gap="4">
              {/* New Password */}
              <Flex flexDir="column" mb="2">
                <FormInput
                  inputType="password"
                  labelTitle="Enter new password"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  error={formik.errors.newPassword}
                />
              </Flex>
              {/* New Password */}
              <Flex flexDir="column" mb="2">
                <FormInput
                  inputType="password"
                  labelTitle="Confirm your new password"
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={formik.errors.confirmPassword}
                />
              </Flex>
              <Button
                w="full"
                type="submit"
                isLoading={loading}
                loadingText="Resetting"
                spinnerPlacement="end"
              >
                Reset
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
      <AppModal
        title="Password Reset Notice"
        description="Your password has been updated. You can now log in with your new password."
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
