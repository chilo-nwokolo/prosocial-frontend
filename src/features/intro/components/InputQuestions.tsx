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
      <FormLabel fontWeight="600">{title}</FormLabel>
      {isOptional && (
        <Text fontStyle="italic" fontSize="small" color="black">
          Optional
        </Text>
      )}
      <Input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        borderColor="black"
        bg={isOptional ? "none" : "white"}
      />
    </FormControl>
  );
}
