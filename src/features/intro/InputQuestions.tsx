import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

type InputQuestionsProps = {
  title: string;
}

export default function InputQuestions({ title }: InputQuestionsProps) {
	return (
		<FormControl>
			<FormLabel>{title}</FormLabel>
			<Input type="text" />
			<FormHelperText>We&apos;ll never share your email.</FormHelperText>
		</FormControl>
	);
}
