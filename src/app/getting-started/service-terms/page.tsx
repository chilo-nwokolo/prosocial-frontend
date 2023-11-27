import { appRouteLinks } from "@/utils/constants";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ServiceTermsPage() {
  return (
    <Box>
      <Text as="h1" fontSize="2xl" fontWeight="medium">
        About our terms of service
      </Text>
      <Text my="4" fontSize="lg" fontWeight="medium">
        How we use your data
      </Text>
      {[1, 2, 3, 4].map((i) => (
        <Text key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias tenetur
          ipsum voluptatum perspiciatis sapiente aliquid nulla expedita,
          recusandae ducimus autem sint, laboriosam in deleniti optio qui esse
          dicta officia consequatur!
        </Text>
      ))}
      <Flex justifyContent="center" mt="10">
        <Link href={appRouteLinks.termsConditions}>
          <Button>View terms and conditions</Button>
        </Link>
      </Flex>
    </Box>
  );
}
