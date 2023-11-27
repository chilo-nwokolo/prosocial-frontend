"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  text?: string;
  destination?: string;
  icon?: ReactNode;
};

export default function BackButton({ text, destination, icon }: Props) {
  const router = useRouter();
  return (
    <Box>
      <Button
        variant="ghost"
        onClick={() => {
          destination ? router.replace(destination) : router.back();
        }}
      >
        <Flex alignItems="center" gap="2">
          {icon ? icon : <BiArrowBack className="fs-2" />}
          {text ? <Text>{text}</Text> : null}
        </Flex>
      </Button>
    </Box>
  );
}
