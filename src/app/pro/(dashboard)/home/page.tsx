"use client";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { BiSolidChevronRight } from "react-icons/bi";
import { appRouteLinks, configExtras } from "@/utils/constants";
import Link from "next/link";
import useAppConfig from "@/hooks/useAppConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import EmailLink from "@/components/General/EmailLink";
import localStorageService from "@/service/localStorage";

const homeSections = [
  {
    id: 3,
    title: "Your social category",
    destination: appRouteLinks.profilePersonalityResult,
    desc: "",
    subText: "",
    icon: null,
  },
  {
    id: 4,
    title: "Outing feedback",
    destination: appRouteLinks.outingMembers,
    desc: "View your group; give outing feedback",
    subText: "",
    icon: null,
  },
];

export default function HomePage() {
  const { config, loading } = useAppConfig({});
  const router = useRouter();
  const toast = useToast();

  const [setUserProfile, userProfile] = useUserStore((state) => [
    state.setUserProfile,
    state.userProfile,
  ]);

  useEffect(() => {
    // Fetch user data from localStorage
    const user = localStorageService.getCurrentUser();
    if (user) {
      const meData = {
        me: {
          __typename: "User" as const,
          id: user.id,
          unique_id: user.unique_id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profile: {
            avatar: user.profile.avatar,
          },
          groups: user.groups.map((g) => ({
            id: g.id,
            name: g.name,
            created_at: g.created_at,
            users: g.users.map((u) => ({ id: u.id, name: u.name })),
          })),
        },
      };
      setUserProfile(meData);
    }
  }, [setUserProfile]);

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
    <Flex flexDir="column" w="full" gap="5" textAlign="left">
      <Box gap="4" mb="3">
        <Text as="h2" fontWeight="600" fontSize="24px">
          What to expect next
        </Text>
        <Text mt="3">
          You will receive an email from <EmailLink /> with your group and
          instructions for your outing.
        </Text>
      </Box>
      {homeSections.map((section) => (
        <Link
          href={
            section.id === 4 && userProfile?.me?.groups?.length === 0
              ? "#"
              : section.destination
          }
          key={section.id}
        >
          <Flex
            cursor="pointer"
            flexDir="column"
            w="full"
            gap="4"
            border="1px solid"
            borderColor="black"
            backgroundColor="#fff"
            py="16"
            px="5"
            borderRadius="0"
            boxShadow={
              section.id === 4 && userProfile?.me?.groups?.length === 0
                ? "none"
                : "3px 3px 3px 0px #CECDCD"
            }
            opacity={
              section.id === 4 && userProfile?.me?.groups?.length === 0
                ? 0.5
                : 1
            }
          >
            <Text>{section?.icon}</Text>
            <Flex alignItems="center" gap="4">
              <Text
                fontWeight="600"
                fontSize="2xl"
                fontFamily="var(--font-comfortaa)"
                textAlign="left"
              >
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
