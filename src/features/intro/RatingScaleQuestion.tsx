import {
	Box,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	RadioGroup,
	useRadio,
	useRadioGroup,
} from '@chakra-ui/react';

type Props = {
	title: string;
	options: string[];
	error?: string;
};

function RadioCard(props: any) {
	const { getInputProps, getRadioProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getRadioProps();

	return (
		<Box as="label">
			<input {...input} />
			<Flex
				{...checkbox}
				cursor="pointer"
				borderWidth="1px"
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				h="5.8rem"
				w="5.8rem"
        borderTop="none"
				textAlign="center"
				alignItems="center"
				justifyContent="center"
				fontSize="xs"
			>
				{props.children}
			</Flex>
		</Box>
	);
}
const defaultOptions = [
	'Disagree strongly',
	'Disagree a little',
	'Neutral: no opinion',
	'Agree a little',
	'Agree strongly',
];

export default function RatingScaleQuestion({ title, options, error }: Props) {
	const questionOptions = options.length ? options : defaultOptions;

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'survey',
		onChange: console.log,
	});

	const group = getRootProps();

	return (
		<FormControl as="fieldset">
			<FormLabel as="legend" border="1px solid" mb="0" borderColor="gray.200" p="5" w="full">
				{title}
			</FormLabel>
			<RadioGroup>
				<HStack {...group} gap="0">
					{questionOptions.map((value) => {
						const radio = getRadioProps({ value });
						return (
							<RadioCard key={value} {...radio}>
								{value}
							</RadioCard>
						);
					})}
				</HStack>
			</RadioGroup>
			{error ? <FormHelperText>{error}</FormHelperText> : null}
		</FormControl>
	);
}
