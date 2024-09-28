"use client";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  RadioGroup,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function RadioCard(props: any) {
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
        borderColor="gray.600"
        bg="white"
        _checked={{
          bg: props.value === "yes" ? "info.300" : "#F95C47",
          color: "white",
          borderColor: props.value === "yes" ? "info.300" : "#F95C47",
        }}
        _active={{
          color: "white",
        }}
        w="full"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        py="3"
      >
        {props.children}
      </Flex>
    </Box>
  );
}

type Props = {
  title: string;
  description: string;
  id: string;
  personalityBucketQuestions: string[];
  updatePersonalityBucketQuestions: (
    // eslint-disable-next-line no-unused-vars
    personalityBucketQuestions: string[],
  ) => void;
  setSelected: Dispatch<SetStateAction<string[]>>;
  selected: string[];
};

export default function CharacterBox({
  title,
  description,
  id,
  updatePersonalityBucketQuestions,
  personalityBucketQuestions,
  selected,
  setSelected,
}: Props) {
  const options = ["no", "yes"];

  const removeItemFromList = (id: string) => {
    const newResult = personalityBucketQuestions;
    const index = newResult.indexOf(id);
    newResult.splice(index, 1);
    updatePersonalityBucketQuestions(newResult);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: id,
    onChange: (value) => {
      if (!selected.includes(id)) {
        setSelected([...selected, id]);
      }
      if (personalityBucketQuestions.includes(id) && value === "no") {
        // Remove Answer
        removeItemFromList(id);
        return;
      }
      if (value === "yes") {
        // Add Answer
        if (personalityBucketQuestions.includes(id)) return;
        updatePersonalityBucketQuestions([...personalityBucketQuestions, id]);
      }
    },
  });

  const group = getRootProps();

  return (
    <FormControl as="fieldset">
      <FormLabel
        as="legend"
        mb="0"
        border="1px solid"
        borderColor="black"
        borderBottom="none"
        p="5"
        w="full"
      >
        <Flex flexDir="column" gap="2">
          <Text fontWeight="medium" fontSize="lg">
            {title}
          </Text>
          <Text fontWeight="normal">{description}</Text>
        </Flex>
      </FormLabel>
      <RadioGroup>
        <HStack {...group} gap="0" /*boxShadow="3px 3px 3px 0px #CECDCD"*/>
          {options?.map((value, i) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard value={value} key={i} {...radio}>
                {value === "yes" ? <AiOutlineCheck /> : <AiOutlineClose />}
              </RadioCard>
            );
          })}
        </HStack>
      </RadioGroup>
    </FormControl>
  );
}
