"use client";
import { ImageLinks } from "@/utils/constants";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import useAdminLoginPage from "./useAdminLoginPage";
import FormInput from "@/components/General/FormInput";

export default function AdminLoginPage() {
  const { formik, loading } = useAdminLoginPage();

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" alignItems="center">
          <Image
            src={ImageLinks.logo}
            alt="app logo"
            width={100}
            height={100}
          />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
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
          </Box>
        </form>
      </Stack>
    </Container>
  );
}
