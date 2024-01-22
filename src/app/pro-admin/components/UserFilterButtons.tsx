"use client";
import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        borderColor="primary.100"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        fontSize="14px"
        px={2}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const filterButtons = [
  "Affinities",
  "Group Distribution",
  "Big 5 Personality",
  "Narcissism - Social beliefs - Behavioral",
  // "Interests",
  // "Availability",
  // "Feedback",
  "Applied",
];

type UserFilterButtonsProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (activeButton: string) => void;
};

export default function UserFilterButtons({
  onChange,
}: UserFilterButtonsProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filterButtons",
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {filterButtons.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
