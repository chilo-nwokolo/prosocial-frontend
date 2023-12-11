"use client";
import GrowthLayoutWrapper from "@/features/dashboard/home/growth/components/GrowthLayoutWrapper";
import useAppConfig from "@/hooks/useAppConfig";
import { appRouteLinks, configExtras } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";

const journalTitles = [
  "Happiest Childhood Memory",
  "Greatest Personal Achievement",
  "Hardest Learned Life Lesson",
  "Most Valued Relationship",
];

export default function JournalPage() {
  const { config } = useAppConfig({});
  return (
    <GrowthLayoutWrapper
      title="Journal prompts"
      description="The opportunity to reflect on our life experiences is an important aspect of
		personal growth. Below are some journaling prompts. Write as little or as much
		as you like. If you don’t feel like typing, we recommend using voice to text."
      destination={appRouteLinks.growth}
    >
      <Flex flexDir="column" gap="5" mt="4">
        {journalTitles.map((journal, i) => (
          <Link href={`${appRouteLinks.growthJournal}/${i + 1}`} key={journal}>
            <Flex
              w="full"
              border="1px solid"
              borderRadius="lg"
              px="5"
              py="8"
              borderColor="black"
              flexDir="column"
              gap="3"
            >
              <Flex w="full" alignItems="center" justifyContent="space-between">
                <Text fontSize="xl" w="56" fontWeight="medium">
                  {i + 1}: {journal}
                </Text>
                <Text>
                  <FaChevronRight />
                </Text>
              </Flex>
              {config?.[configExtras.user_journal_story]?.includes(journal) ? (
                <Flex color="green.500" gap="2" alignItems="center">
                  <FaCheckCircle />
                  <Text fontWeight="semibold">Completed</Text>
                </Flex>
              ) : null}
            </Flex>
          </Link>
        ))}
      </Flex>
    </GrowthLayoutWrapper>
  );
}
