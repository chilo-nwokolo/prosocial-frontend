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
import GroupDistributionFilter from "../dashboard/users/components/GroupDistributionFilter";
import Big5Personality from "../dashboard/users/components/Big5Personality";
// import InterestsFilter from "../dashboard/users/components/InterestsFilter";
import AvailabilityFilter from "../dashboard/users/components/AvailabilityFilter";
import { useState } from "react";
import NarcissismFilter from "../dashboard/users/components/NarcissismFilter";
// import FeedbackFilter from "../dashboard/users/components/FeedbackFilter";
// import AppliedFilter from "../dashboard/users/components/AppliedFilter";
import { useFilterContext } from "../dashboard/users/hooks/useFilterContext";

export default function AdminUserAccordion() {
  const { isOpen, onToggle, onOpen } = useDisclosure();
  const [activeButton, setActiveButton] = useState("");
  const { updateFilterProp, updateActiveFilters } = useFilterContext();

  const onActiveButtonChange = (activeButton: string) => {
    setActiveButton(activeButton);
    if (activeButton && !isOpen) {
      onOpen();
    }
  };

  const reset = () => {
    setActiveButton("");
    updateFilterProp([]);
    updateActiveFilters([]);
  };

  return (
    <Flex flexDir="column" px="8" pb="10">
      <Flex justifyContent="space-between" mb="2.5" alignItems="center" mt="5">
        <Flex gap="4">
          <Text fontSize="2xl">Filters</Text>
          <Button variant="ghost" onClick={onToggle}>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </Button>
        </Flex>
        <Button onClick={reset}>Reset</Button>
      </Flex>
      <Flex mb="5" mt="2.5">
        <UserFilterButtons onChange={onActiveButtonChange} />
      </Flex>
      {isOpen ? (
        <Box>
          <Divider borderColor="primary.100" my="4" />
          {activeButton === "Affinities" && <AffinitiesFilter />}
          {activeButton === "Group Distribution" && <GroupDistributionFilter />}
          {activeButton === "Big 5 Personality" && <Big5Personality />}
          {activeButton === "Narcissism - Social beliefs - Behavioral" && (
            <NarcissismFilter />
          )}
          {/* {activeButton === "Interests" && <InterestsFilter />} */}
          {activeButton === "Availability" && <AvailabilityFilter />}
          {/* {activeButton === "Feedback" && <FeedbackFilter />} */}
          {/* {activeButton === "Applied" && <AppliedFilter />} */}
        </Box>
      ) : null}
    </Flex>
  );
}
