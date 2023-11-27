import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type InputQuestionsProps = {
  title: string;
  name: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
};

export default function InputQuestions({
  title,
  name,
  value,
  onChange,
}: InputQuestionsProps) {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Input type="text" name={name} value={value} onChange={onChange} />
    </FormControl>
  );
}
