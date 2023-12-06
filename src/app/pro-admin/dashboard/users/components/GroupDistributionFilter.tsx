import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";

export default function GroupDistributionFilter() {
  return (
    <SimpleGrid w="full" columns={4} spacing="5">
      <Flex flexDir="column">
        <FormControl display="flex" gap="3" alignItems="center">
          <Switch id="gender" />
          <FormLabel htmlFor="gender" mb="0">
            Gender
          </FormLabel>
        </FormControl>
        <Select mt="5">
          <option value="all">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonConforming">Gender variant / non conforming</option>
          <option value="trangender">Transgender</option>
          <option value="preferNotToAnswer">Prefer not to answer</option>
        </Select>
      </Flex>
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch id="race" />
          <FormLabel htmlFor="race" mb="0">
            Race
          </FormLabel>
        </FormControl>
        <Select mt="5">
          <option value="all">All</option>
          <option value="white">White</option>
          <option value="africanAmerican">Black or African American</option>
          <option value="Hispanic/Latino">Hispanic/Latino</option>
          <option value="Asian">Asian</option>
          <option value="nativeHawaiian">
            Native Hawaiian / Other pacific islander
          </option>
          <option value="multiracial">Multiracial</option>
          <option value="other">Other</option>
          <option value="dontKnow">Don&apos;t know/ not sure</option>
        </Select>
      </Flex>
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch id="relationshipStatus" />
          <FormLabel htmlFor="relationshipStatus" mb="0">
            Relationship Status
          </FormLabel>
        </FormControl>
        <Select mt="5">
          <option value="single">Single</option>
          <option value="dating">Dating</option>
          <option value="inARelationship">In a committed relationship</option>
        </Select>
      </Flex>
      <Flex flexDir="column">
        <FormControl gap="4" display="flex" alignItems="center">
          <Switch id="health" />
          <FormLabel htmlFor="health" mb="0">
            Health
          </FormLabel>
        </FormControl>
        <Select mt="5">
          <option value="poor">Poor</option>
          <option value="moderate">Moderate</option>
          <option value="good">Good</option>
          <option value="veryGood">Very Good</option>
          <option value="excelleng">Excellent</option>
        </Select>
      </Flex>
    </SimpleGrid>
  );
}
