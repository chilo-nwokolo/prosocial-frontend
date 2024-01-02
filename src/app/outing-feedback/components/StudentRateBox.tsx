import { ImageLinks } from "@/utils/constants";
import {
  Box,
  Flex,
  HStack,
  Image,
  RadioGroup,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

export function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        h="5.8rem"
        w="full"
        borderTop="none"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        fontSize="xs"
        whiteSpace="pre-wrap"
        borderLeft="0.5px solid black"
        borderRight="0.5px solid black"
      >
        {props.children}
      </Flex>
    </Box>
  );
}

export default function StudentRateBox() {
  const options = ["Yes", "No", "Didn't interact"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "feedback",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Flex border="1px solid black" flexDir="column" alignItems="center">
      <Box py="10">
        <Image
          src={ImageLinks.dpPlaceholder}
          alt="display picture"
          width="150px"
          height="150px"
        />
        <Text textAlign="center" fontSize="lg" fontWeight="semibold" mt="9">
          Name 1
        </Text>
      </Box>
      <Box w="full" borderTop="1px solid" borderColor="black">
        <RadioGroup>
          <HStack {...group} gap="0">
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </RadioGroup>
      </Box>
    </Flex>
  );
}
