import { ComponentConfigType } from "@/app/pro/(onboarding)/intro/[slug]/componentConfig";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  title: string;
  options:
    | [{ id: string; title: string; value: string }]
    | { id: string; title: string; value: string }[]
    | undefined;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  name: string;
  infoText?: string;
  config?: ComponentConfigType;
  error?: string;
};

export default function SingleChoiceQuestion({
  title,
  options,
  error,
  name,
  onChange,
  value,
  config,
  infoText,
}: Props) {
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">
        <Flex flexDir="column">
          <Text>{title}</Text>
          {infoText ? (
            <Text fontSize="sm" color="gray.600">
              &#9432; {infoText}
            </Text>
          ) : null}
        </Flex>
      </FormLabel>
      <RadioGroup defaultValue={value} mt="3">
        <VStack alignItems="start" spacing="15px">
          {options?.map((option) => (
            <Radio
              key={`${option.value}-${option.id}`}
              value={config?.useIdAsValue ? option.id : option.value}
              name={name}
              onChange={onChange}
              sx={{ border: "1.5px solid", color: "black", bg: "white" }}
            >
              {option.title}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      {error ? (
        <FormHelperText color="critical.100" fontSize="xs">
          {error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
