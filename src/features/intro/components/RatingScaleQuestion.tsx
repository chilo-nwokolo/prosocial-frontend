import { ComponentConfigType } from "@/app/pro/(onboarding)/intro/[slug]/componentConfig";
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  RadioGroup,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

type Props = {
  title: string;
  options:
    | {
        id: string;
        title?: string | null | undefined;
        value?: string | null | undefined;
      }[]
    | null
    | undefined;
  config?: ComponentConfigType;
  name: string;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  value: string;
};

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
        borderColor="gray.500"
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
      >
        {props.children}
      </Flex>
    </Box>
  );
}

export default function RatingScaleQuestion({
  title,
  options,
  error,
  config,
  name,
  onChange,
  value,
}: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
  });

  const group = getRootProps({ onChange });

  return (
    <FormControl as="fieldset">
      <FormLabel
        as="legend"
        border="1px solid"
        mb="0"
        borderColor="gray.500"
        p="5"
        w="full"
      >
        {config?.lowerCaseTitle ? title.toLowerCase() : title}
      </FormLabel>
      <RadioGroup defaultValue={value}>
        <HStack {...group} gap="0">
          {options?.length
            ? options.map((value) => {
                const radio = getRadioProps({
                  value: config?.useIdAsValue ? value.id : value.value,
                  onChange,
                });
                return (
                  <RadioCard key={value.id} {...radio}>
                    {config?.returnTitle
                      ? value.title
                      : value?.title?.charAt(value?.title.length - 1)}
                  </RadioCard>
                );
              })
            : null}
        </HStack>
      </RadioGroup>
      {config?.hasLabel ? (
        <Flex
          border="1px solid"
          borderColor="gray.500"
          borderTop="none"
          justifyContent="space-between"
          px="2"
        >
          <Text fontSize="xs" whiteSpace="pre-line" textAlign="center">
            {config?.leftLabel}
          </Text>
          <Text fontSize="xs" whiteSpace="pre-line" textAlign="center">
            {config?.midLabel}
          </Text>
          <Text fontSize="xs" whiteSpace="pre-line" textAlign="center">
            {config?.rightLabel}
          </Text>
        </Flex>
      ) : null}
      {error ? (
        <FormHelperText color="critical.100" fontSize="xs">
          {error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
