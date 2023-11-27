import { apolloErrorHandler } from "@/utils/helpers";
import { Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
  error: any;
  loadingText?: string;
};

export default function QueryContainer({
  loading,
  children,
  error,
  loadingText = "",
}: Props) {
  const toast = useToast();

  if (loading) {
    return (
      <Center h="100vh">
        <Flex flexDir="column" py="8" alignItems="center" gap="5">
          <Spinner size="xl" />
          {loadingText ? (
            <Text fontSize="xl" fontWeight="medium" textAlign="center">
              {loadingText}
            </Text>
          ) : null}
        </Flex>
      </Center>
    );
  }

  if (error) {
    toast({
      status: "error",
      description: "Error",
      title: apolloErrorHandler(error),
    });
  }
  return <>{children}</>;
}
