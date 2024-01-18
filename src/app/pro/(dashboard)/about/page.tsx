"use client";
import { ImageLinks } from "@/utils/constants";
import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const safetyTips = "/files/safety_tips.pdf";
const communityGuidelines = "/files/community_guidelines.pdf";
const privacyPolicy = "/files/privacy_policy.pdf";
const cookiesPolicy = "/files/cookie_policy.pdf";

export default function AboutPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [inView, setInView] = useState("");

  const openFrame = (page: string) => {
    setInView(page);
    onOpen();
  };

  return (
    <Flex mt="10" flexDir="column" alignItems="center">
      <Image src={ImageLinks.logo} height={100} width={100} alt="app logo" />
      <Flex flexDir="column" w="full" gap="2" mt="10">
        <Text fontWeight="medium" fontSize="2xl">
          About Prosocial
        </Text>

        <Text>
          We are committed to helping our members establish deep, meaningful
          relationships. This commitment requires you to entrust us with your
          personal information. We will never sell your personal information.
          Our goal is to enrich your life with opportunities to socialize, serve
          your community and explore important questions. Thank you for allowing
          ProSocial to enhance your life and the lives of others.
        </Text>

        <Flex flexDir="column" gap="2">
          <Text
            cursor="pointer"
            color="blue"
            _hover={{ textDecor: "underline" }}
            onClick={() => openFrame(cookiesPolicy)}
          >
            Cookie Policy
          </Text>
          <Text
            cursor="pointer"
            color="blue"
            _hover={{ textDecor: "underline" }}
            onClick={() => openFrame(privacyPolicy)}
          >
            Privacy Policy
          </Text>
          <Text
            cursor="pointer"
            color="blue"
            _hover={{ textDecor: "underline" }}
            onClick={() => openFrame(communityGuidelines)}
          >
            Community Guidelines
          </Text>
          <Text
            cursor="pointer"
            color="blue"
            _hover={{ textDecor: "underline" }}
            onClick={() => openFrame(safetyTips)}
          >
            Safety Tips
          </Text>
        </Flex>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent h="100vh">
            <iframe src={inView} height="100%" width="100%" />
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
}
