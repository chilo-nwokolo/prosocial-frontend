"use client";

import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { ImageLinks, appRouteLinks } from "@/utils/constants";
import Image from "next/image";
import FormInput from "@/components/General/FormInput";
import useLoginPage from "@/features/auth/hooks/useLoginPage";
import Link from "next/link";

const logo = {
  display: "block",
  margin: "auto",
};

export default function LoginPage() {
  const { formik, loading } = useLoginPage();

  return (
    <Center h="90vh">
      <Box my="auto">
        <Image
          src={ImageLinks.logo}
          width={75}
          height={75}
          style={logo}
          alt="app logo"
        />
        <Text
          my="4"
          as="h1"
          color="primary.200"
          fontSize="2xl"
          fontWeight="600"
          pt="1em"
        >
          Welcome to ProSocial
        </Text>
        <Text fontSize="lg" mb="10">
          Enter your details to start interacting with your friends
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
            {/* Password */}
            <Flex flexDir="column" mb="2">
              <FormInput
                inputType="password"
                labelTitle="Password"
                name="password"
                autoComplete="current-password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
            </Flex>
            <Button
              w="full"
              type="submit"
              isLoading={loading}
              loadingText="Logging you in"
              spinnerPlacement="end"
            >
              Login
            </Button>
          </Flex>
        </form>
        <Link href={appRouteLinks.changePassword}>
          <Text
            mt="2em"
            color="info.100"
            textAlign="center"
            cursor="pointer"
            _hover={{ textDecor: "none" }}
            textDecor="underline"
          >
            I forgot my password
          </Text>
        </Link>
        <Flex mt="5" alignItems="center" justifyContent="center">
          Don&apos;t have an account? &nbsp;{" "}
          <Link href={appRouteLinks.register}>
            <Text
              color="info.100"
              cursor="pointer"
              _hover={{ textDecor: "none" }}
              textDecor="underline"
            >
              Create your account
            </Text>
          </Link>
        </Flex>
        {/* Demo credentials hint */}
        <Text
          mt="8"
          fontSize="xs"
          color="gray.500"
          textAlign="center"
          opacity={0.6}
          title="Demo: admin@mail.com / password123"
        >
          v1.0.0-demo • admin@mail.com • password123
        </Text>
      </Box>
    </Center>
  );
}
