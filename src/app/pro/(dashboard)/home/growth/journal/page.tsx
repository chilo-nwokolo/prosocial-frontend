import GrowthLayoutWrapper from "@/features/dashboard/home/growth/components/GrowthLayoutWrapper";
import { appRouteLinks } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const journalTitles = [
  "Happiest Childhood Memory",
  "Greatest Personal Achievement",
  "Hardest Learned Life Lesson",
  "Most Valued Relationship",
];

export default function JournalPage() {
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
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="xl" w="56" fontWeight="medium">
                {i + 1}: {journal}
              </Text>
              <Text>
                <FaChevronRight />
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </GrowthLayoutWrapper>
  );
}
