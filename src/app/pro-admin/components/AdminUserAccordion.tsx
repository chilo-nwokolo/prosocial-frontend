"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import UserFilterButtons from "./UserFilterButtons";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AffinitiesFilter from "../dashboard/users/components/AffinitiesFilter";

export default function AdminUserAccordion() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex flexDir="column" px="10">
      <Flex justifyContent="space-between" mb="2.5" alignItems="center" mt="5">
        <Flex gap="4">
          <Text fontSize="2xl">Filters</Text>
          <Button variant="ghost" onClick={onToggle}>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </Button>
        </Flex>
        <Button>Reset</Button>
      </Flex>
      <Flex mb="5" mt="2.5">
        <UserFilterButtons />
      </Flex>
      {isOpen ? (
        <Box>
          <Divider borderColor="primary.100" my="4" />
          <AffinitiesFilter />
        </Box>
      ) : null}
    </Flex>
  );
}
