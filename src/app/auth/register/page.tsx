"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
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
import IFrameModal from "@/components/General/IFrameModal";
import ProfilePictureUploader from "@/components/General/ProfilePictureUploader";

const registrationOptions = [
  {
    labelTitle: "Date of birth",
    tooltip:
      "ProSocial requires your date of birth to verify you are 18 years or older. We also group our members with people at similar life stages, which often is reflected by age",
    inputType: "date",
    name: "dob",
    infoText: "Why do you ask for my Date of birth?",
  },
  {
    labelTitle: "First Name",
    tooltip: "",
    name: "firstName",
    inputType: "text",
    infoText: "",
  },
  {
    labelTitle: "Last Name",
    tooltip: "",
    name: "lastName",
    inputType: "text",
    infoText: "",
  },
];

const termsPage = "/files/terms_and_conditions.pdf";

const registrationOptions2 = [
  {
    labelTitle: "Email Address",
    tooltip: "",
    name: "email",
    inputType: "email",
    infoText:
      "We will never share your email, except with other ProSocial users when you're matched for an outing.",
  },
  {
    labelTitle: "Password",
    tooltip: "",
    inputType: "password",
    name: "password",
    infoText:
      "Password must contain at least 8 characters and a combination of uppercase letters, lowercase letters, numbers, and symbols. Symbols include: !, @, #, $, %, ^, &, *, (, ), _, and +.",
  },
];

export default function RegistrationPage() {
  const {
    formik,
    setPhone,
    phone,
    loading,
    loadingGroups,
    groups,
    setAcceptTc,
  } = UseRegistrationPage();

  const {
    isOpen: isPhoneInfo,
    onClose: onPhoneInfoClose,
    onOpen: onPhoneInfoOpen,
  } = useDisclosure();

  const {
    isOpen: isTermsOpen,
    onClose: onCloseTerms,
    onOpen: onOpenTerms,
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
                // @ts-ignore
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
            {registrationOptions.map((options) => (
              <FormInput
                key={options.labelTitle}
                labelTitle={options.labelTitle}
                tooltip={options.tooltip}
                inputType={options.inputType}
                name={options.name}
                infoText={options.infoText}
                value={
                  formik.values[options.name as keyof typeof formik.values]
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors?.[options.name as keyof typeof formik.values]
                }
              />
            ))}
            {/* GROUP SELECT */}
            <FormControl>
              <FormLabel color="primary.200">Select a group</FormLabel>
              <Select
                borderRadius="0"
                border="0.75px solid #876a6c"
                disabled={loadingGroups}
                bg="white"
                onChange={formik.handleChange}
                name="universityId"
                value={formik.values.universityId}
                onBlur={formik.handleBlur}
                _focus={{ border: "1.5px solid #7bb4ce" }}
              >
                <option value="">Choose one</option>
                {groups?.universities?.map((group) => (
                  <option value={group.id} key={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
              {formik.errors?.universityId ? (
                <FormHelperText fontSize="xs" color="critical.100">
                  {formik.errors?.universityId}
                </FormHelperText>
              ) : null}
            </FormControl>
            {registrationOptions2.map((options) => (
              <FormInput
                key={options.labelTitle}
                labelTitle={options.labelTitle}
                tooltip={options.tooltip}
                inputType={options.inputType}
                name={options.name}
                infoText={options.infoText}
                value={
                  formik.values[options.name as keyof typeof formik.values]
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors?.[options.name as keyof typeof formik.values]
                }
              />
            ))}

            <Flex flexDir="column">
              <Text as="h2" fontWeight="bold">
                Add a profile photo
              </Text>
              <Text mt={2}>
                Please add a clear photo of your face without sunglasses. Your
                profile photo is not public but will be seen by potential
                friends once an outing has been completed.
              </Text>
              <ProfilePictureUploader />
            </Flex>
            <Flex>
              <Checkbox
                onChange={(state) => setAcceptTc(state.target.checked)}
                fontWeight="500"
              >
                I have read and accept the{" "}
                <Button
                  onClick={onOpenTerms}
                  color="blue"
                  fontWeight="500"
                  variant="link"
                >
                  Terms and Conditions
                </Button>
              </Checkbox>
            </Flex>
            <Button
              mt="5"
              w="full"
              type="submit"
              isLoading={loading}
              loadingText="Creating your account"
              spinnerPlacement="end"
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
      <IFrameModal
        onClose={onCloseTerms}
        isOpen={isTermsOpen}
        inView={termsPage}
      />
      <AppModal
        title=""
        description="We need your phone number for push notifications and account recovery purposes."
        isOpen={isPhoneInfo}
        onClose={onPhoneInfoClose}
      />
    </>
  );
}
