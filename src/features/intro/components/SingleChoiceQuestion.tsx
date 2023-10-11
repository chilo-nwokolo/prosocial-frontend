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
	options: [{ id: string; title: string; value: string }] | undefined;
	value: string;
	// eslint-disable-next-line no-unused-vars
	onChange: (e: any) => void;
	name: string;
	source: string;
	error?: string;
};

export default function SingleChoiceQuestion({
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
			<RadioGroup defaultValue={value}>
				<VStack alignItems="start" spacing="12px">
					{options?.map((option) => (
						<Radio
							key={`${option.value}-${option.id}`}
							value={source === 'The basics' ? option.value : option.id}
							name={name}
							onChange={onChange}
						>
							{option.title}
						</Radio>
					))}
				</VStack>
			</RadioGroup>
			{error ? <FormHelperText>{error}</FormHelperText> : null}
		</FormControl>
	);
}
