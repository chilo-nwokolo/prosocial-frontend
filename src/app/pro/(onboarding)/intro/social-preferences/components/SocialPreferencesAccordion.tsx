import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

export const friendTypeOptions = [
  {
    id: 1,
    title: "Close Friend",
    description:
      "Someone who gets you on a deep level. They understand the kind of person you are and appreciates what makes you tick.",
  },
  {
    id: 2,
    title: "Fun Friend",
    description:
      "Someone who will join you for a drink, watch a movie, go to a music concert, or enjoy a ball game.",
  },
  {
    id: 3,
    title: "Adventure Friend",
    description:
      "Someone who likes to try new and different things. They like to go on trips, meet new people and are not scared of the unknown.",
  },
  {
    id: 4,
    title: "Athletic Friend",
    description:
      "Someone who enjoys playing sports, working out, going for a run or going for a hike",
  },
  {
    id: 5,
    title: "Supportive Friend",
    description:
      "Someone who is there for you, is present, and emotionally available.",
  },
  {
    id: 6,
    title: "Intelligent Friend",
    description: "Someone with whom you can have interesting conversations.",
  },
  {
    id: 7,
    title: "Parent Friend",
    description:
      "A parent with children of a similar age who is interested in spending time together (with children or without) to commiserate about the joys and difficulties of parenthood.",
  },
];

export default function SocialPreferencesAccordion() {
  return (
    <Accordion defaultIndex={[0]}>
      <AccordionItem border="1px solid">
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontSize="xl">
              ProSocial friend types
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex flexDir="column" gap="4">
            {friendTypeOptions.map((option) => (
              <Box
                key={option.id}
                borderBottom="1px solid"
                pb="5"
                borderColor="gray.600"
              >
                <Text fontWeight="semibold" fontSize="16px">
                  {option.title}
                </Text>
                <Text>{option.description}</Text>
              </Box>
            ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
