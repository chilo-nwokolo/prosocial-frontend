"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { appRouteLinks } from "@/utils/constants";

export default function VerifyEmailComponent() {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Email verification is now skipped
    // Users are automatically verified upon registration
    toast({
      title: "Email verified successfully",
      description: "You can now log in to your account.",
      status: "success",
    });

    // Redirect to login after a short delay
    const timer = setTimeout(() => {
      router.push(appRouteLinks.login);
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center h="100vh" flexDir="column" gap="6">
      <Spinner size="xl" />
      <Text fontSize="xl" fontWeight="medium">
        Verifying your email...
      </Text>
      <Text color="gray.600">You will be redirected to login shortly.</Text>
      <Link href={appRouteLinks.login}>
        <Button mt="4">Go to Login</Button>
      </Link>
    </Center>
  );
}
