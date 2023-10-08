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
	options: [{ id: string, title: string, value: string }] | undefined;
	error?: string;
};

function RadioCard(props: any) {
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
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				h="5.8rem"
				w="full"
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

export default function RatingScaleQuestion({ title, options, error }: Props) {

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
					{options?.map((value) => {
						const radio = getRadioProps({ value: value.value });
						return (
							<RadioCard key={value.id} {...radio}>
								{value.title}
							</RadioCard>
						);
					})}
				</HStack>
			</RadioGroup>
			{error ? <FormHelperText>{error}</FormHelperText> : null}
		</FormControl>
	);
}
