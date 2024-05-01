"use client";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
// import { FaPeopleArrows } from "react-icons/fa";
import { BiSolidChevronRight } from "react-icons/bi";
import { appRouteLinks, configExtras, externalLinks } from "@/utils/constants";
import Link from "next/link";
import useAppConfig from "@/hooks/useAppConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const homeSections = [
  {
    id: 3,
    title: "Your personality",
    destination: appRouteLinks.profilePersonalityResult,
    desc: "",
    subText: "",
    icon: null,
  },
  // {
  //   id: 1,
  //   icon: <GrGrow style={{ fontSize: "30px" }} />,
  //   title: "Growth",
  //   desc: "Discover your strengths and growth areas",
  //   subText: "Tell us about your talents and interests",
  //   destination: appRouteLinks.growth,
  // },
  // {
  //   id: 2,
  //   title: "Social",
  //   icon: <FaPeopleArrows style={{ fontSize: "30px" }} />,
  //   desc: "",
  //   subText: "Update your weekly availability",
  //   destination: appRouteLinks.socialPreference,
  // },
];

export default function HomePage() {
  const { config, loading } = useAppConfig({});
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (
      !loading &&
      config &&
      !config[configExtras.user_has_seen_personality_score]
    ) {
      toast({
        status: "error",
        description: "Please, complete your registration first",
      });
      return router.push(appRouteLinks.onbording);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, loading]);

  return (
    <Flex flexDir="column" w="full" gap="5">
      <Box gap="4" mb="3">
        <Text as="h2" fontWeight="lg" fontSize="2xl">
          What to expect next
        </Text>
        <Text mt="3">
          You will receive an email from {externalLinks.email} with your group
          and instructions for your outing by June 1st.
        </Text>
      </Box>
      {homeSections.map((section) => (
        <Link href={section.destination} key={section.id}>
          <Flex
            cursor="pointer"
            flexDir="column"
            w="full"
            _hover={{ shadow: "md" }}
            gap="4"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="xl"
            py="10"
            px="5"
          >
            <Text>{section?.icon}</Text>
            <Flex alignItems="center" gap="4">
              <Text fontWeight="medium" fontSize="2xl">
                {section.title}
              </Text>
              <Box as="span">
                <BiSolidChevronRight style={{ fontSize: "20px" }} />
              </Box>
            </Flex>
            <Text>{section.desc}</Text>
            <Text>{section.subText}</Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
