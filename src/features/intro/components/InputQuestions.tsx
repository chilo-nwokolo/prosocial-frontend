import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

type InputQuestionsProps = {
  title: string;
  name: string;
  value: string;
  isOptional?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
};

export default function InputQuestions({
  title,
  name,
  value,
  isOptional = false,
  onChange,
}: InputQuestionsProps) {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      {isOptional && (
        <Text fontStyle="italic" fontSize="small" color="gray.500">
          Optional
        </Text>
      )}
      <Input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        borderColor="gray.500"
      />
    </FormControl>
  );
}
