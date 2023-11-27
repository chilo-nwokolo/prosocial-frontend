import { ImageLinks } from "@/utils/constants";
import { Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";

export default function AboutPage() {
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

        <Text mt="5" fontWeight="medium" fontSize="xl">
          Version 1.1
        </Text>
        <UnorderedList>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </ListItem>
          <ListItem>
            Proin accumsan nulla vel magna venenatis, eu condimentum arcu
            congue.
          </ListItem>
          <ListItem>
            Donec quis est nec magna volutpat ultrices. Etiam ultricies nisi in
            lorem viverra condimentum.
          </ListItem>
          <ListItem>
            Quisque vitae metus imperdiet, citur magna nec, posuere massa.
          </ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
}
