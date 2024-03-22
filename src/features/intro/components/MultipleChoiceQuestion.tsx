import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

type Props = {
  title: string;
  options: [{ id: string; title: string; value: string }] | undefined;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  name: string;
  source: string;
  error?: string;
};

export default function MultipleChoiceQuestions({
  title,
  options,
  error,
  name,
  onChange,
  value,
  source,
}: Props) {
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" fontWeight="medium" fontSize="lg">
        {title}
      </FormLabel>
      <CheckboxGroup defaultValue={[value]}>
        <VStack alignItems="start" spacing="15px">
          {options?.map((option) => (
            <Checkbox
              key={`${option.value}-${option.id}`}
              value={source === "The basics" ? option.value : option.id}
              name={name}
              onChange={onChange}
            >
              {option.title}
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}
