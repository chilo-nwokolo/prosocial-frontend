"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import TelInput from "react-phone-number-input/input";
import { AiFillInfoCircle } from "react-icons/ai";
import FormInput from "@/components/General/FormInput";
import UseRegistrationPage from "@/features/auth/hooks/useRegistrationPage";
import AppModal from "@/components/AppModal";
import Link from "next/link";
import { appRouteLinks } from "@/utils/constants";

export default function RegistrationPage() {
  const { formik, setPhone, phone, loading } = UseRegistrationPage();

  const {
    isOpen: isPhoneInfo,
    onClose: onPhoneInfoClose,
    onOpen: onPhoneInfoOpen,
  } = useDisclosure();

  return (
    <>
      <Box mt="5">
        <Text mb="4" as="h1" fontSize="2xl" fontWeight="medium">
          Let&apos;s create your account
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDir="column" gap="4">
            {/* Phone Number */}
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <TelInput
                country="US"
                international
                className="telInput"
                withCountryCallingCode
                value={phone}
                // @ts-ignore
                onChange={setPhone}
              />
              <FormHelperText fontSize="xs">
                <Tooltip
                  label="We need your phone number for push notifications and account recovery purposes"
                  placement="bottom"
                  fontSize="xs"
                >
                  <Flex
                    alignItems="center"
                    gap="1"
                    fontSize="xs"
                    cursor="default"
                    _hover={{ textDecoration: "none" }}
                    textDecoration="underline"
                    onClick={onPhoneInfoOpen}
                  >
                    <AiFillInfoCircle /> Why do you ask for my phone number?
                  </Flex>
                </Tooltip>
              </FormHelperText>
            </FormControl>
            {/* Date of Birth */}
            <FormInput
              labelTitle="Date of birth"
              tooltip="ProSocial requires your date of birth to verify you are 18 years or older. We also group our members with people at similar life stages, which often is reflected by age"
              inputType="date"
              name="dob"
              infoText="Why do you ask for my Date of birth?"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.dob}
            />
            {/* First Name */}
            <FormInput
              labelTitle="First Name"
              tooltip=""
              name="firstName"
              inputType="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.firstName}
            />
            {/* Last Name */}
            <FormInput
              labelTitle="Last Name"
              tooltip=""
              name="lastName"
              inputType="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
            />
            {/* Email */}
            <FormInput
              labelTitle="Email Address"
              tooltip=""
              name="email"
              inputType="email"
              infoText="We'll never share your email."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
            />
            {/* Password */}
            <FormInput
              labelTitle="Password"
              tooltip=""
              inputType="password"
              name="password"
              infoText="Password must contain at least 8 characters and a combination of uppercase
							letters, lowercase letters, numbers, and symbols."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
            />
            <Button
              mt="5"
              w="full"
              type="submit"
              isLoading={loading}
              loadingText="Creating your account"
            >
              Sign Up
            </Button>
          </Flex>
        </form>
        <Flex mt="5" fontSize="sm" justifyContent="center" alignItems="center">
          Already have an account?&nbsp;
          <Link href={appRouteLinks.login}>
            <Text
              fontSize="sm"
              color="blue.400"
              cursor="pointer"
              _hover={{ textDecor: "none" }}
              textDecor="underline"
            >
              Click to Login
            </Text>
          </Link>
        </Flex>
      </Box>
      <AppModal
        title=""
        description="We need your phone number for push notifications and account recovery purposes."
        isOpen={isPhoneInfo}
        onClose={onPhoneInfoClose}
      />
    </>
  );
}
