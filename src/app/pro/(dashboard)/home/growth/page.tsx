"use client";
import BackButton from "@/components/General/BackButton";
import useGrowthPage from "@/features/dashboard/home/growth/hooks/useGrowthPage";
import { appRouteLinks } from "@/utils/constants";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function GrowthPage() {
  const { calculateProgress, growthSections } = useGrowthPage();

  return (
    <Flex flexDir="column" w="full" gap="5">
      <BackButton destination={appRouteLinks.home} />
      <Text fontSize="2xl" textAlign="center" fontWeight="semibold">
        Growth
      </Text>
      <SimpleGrid columns={{ base: 1, xs: 2 }} gap="4">
        {growthSections.map((section) => (
          <Link href={section.destination} key={section.id}>
            <Flex
              flexDir="column"
              border="1px solid"
              borderColor="gray.500"
              pt="16"
              borderRadius="md"
              h="full"
              overflow="hidden"
            >
              <Flex px="5" pb="16" flexDir="column" gap="4">
                <Text fontWeight="semibold" fontSize="2xl">
                  {section.title}
                </Text>
                <Text>{section.description}</Text>
              </Flex>
              <Box
                mt="auto"
                bg={`linear-gradient(to right, ${calculateProgress(
                  section.answers,
                  section.progress,
                )})`}
                borderTop="1px solid"
                w="full"
                p="2"
              >
                {section.answers}/{section.progress}
              </Box>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
