import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

type InputQuestionsProps = {
  title: string;
}

export default function InputQuestions({ title }: InputQuestionsProps) {
	return (
		<FormControl>
			<FormLabel>{title}</FormLabel>
			<Input type="text" />
			<FormHelperText>Error goes here</FormHelperText>
		</FormControl>
	);
}
