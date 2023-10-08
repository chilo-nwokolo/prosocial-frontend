import {
	FormControl,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
	VStack,
} from '@chakra-ui/react';

type Props = {
  title: string;
  options: [{ id: string, title: string, value: string }] | undefined;
  error?: string;
  id: number;
};

export default function SingleChoiceQuestion({title, options, error, id}: Props) {
	return (
		<FormControl as="fieldset">
			<FormLabel as="legend">{id}. {title}</FormLabel>
			<RadioGroup>
				<VStack alignItems="start" spacing="12px">
          {
            options?.map((option) => (
              <Radio key={`${option.value}-${option.id}`} value={option?.value}>{option.title}</Radio>
            ))
          }
				</VStack>
			</RadioGroup>
      {
        error ? <FormHelperText>{error}</FormHelperText> : null
      }
		</FormControl>
	);
}
