import { ImageLinks, externalLinks } from "@/utils/constants";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <Flex mt="20" flexDir="column" alignItems="center">
      <Image src={ImageLinks.logo} height={100} width={100} alt="app logo" />
      <Flex flexDir="column" w="full" gap="2" mt="10">
        <Text fontWeight="medium" fontSize="2xl">Contact Prosocial</Text>

        <Text>If you&apos;d like to send us feedback email us at:</Text>

        <Link href={`mailto:${externalLinks.email}`} style={{ color: "blue" }}>{externalLinks.email}</Link>
      </Flex>
    </Flex>
  )
}