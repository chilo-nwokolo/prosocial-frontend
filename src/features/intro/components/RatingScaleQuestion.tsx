import {
	Box,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	RadioGroup,
	Text,
	useRadio,
	useRadioGroup,
} from '@chakra-ui/react';

type Props = {
	title: string;
	options: { id: string; title?: string | null | undefined; value?: string | null | undefined }[] | null | undefined;
	source: string;
	name: string;
	error?: string;
	// eslint-disable-next-line no-unused-vars
	onChange: (e: any) => void;
	value: string;
};

export function RadioCard(props: any) {
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
				whiteSpace="pre-wrap"
			>
				{props.children}
			</Flex>
		</Box>
	);
}

export default function RatingScaleQuestion({ title, options, error, source, name, onChange, value }: Props) {
	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
		value,
	});

	const group = getRootProps({ onChange });
	
	return (
		<FormControl as="fieldset">
			<FormLabel
				as="legend"
				border="1px solid"
				mb="0"
				borderColor="gray.200"
				p="5"
				w="full"
			>
				{title}
			</FormLabel>
			<RadioGroup defaultValue={value}>
				<HStack {...group} gap="0">
					{options?.length ? options.map((value) => {
						const radio = getRadioProps({ value: source === 'The basics' ? value.value : value.id, onChange });
						return (
							<RadioCard key={value.id} {...radio}>
								{source === 'Behaviors and beliefs' ? value?.title?.charAt(value?.title.length - 1) : value.title}
							</RadioCard>
						);
					}):null}
				</HStack>
			</RadioGroup>
			{source === 'Behaviors and beliefs' ? (
				<Flex border="1px solid" borderColor="gray.200" borderTop="none" justifyContent="space-between" px="2">
					<Text fontSize="xs">Strongly <br />disagree</Text>
					<Text fontSize="xs">Strongly <br />agree</Text>
				</Flex>
			) : null}
			{error ? <FormHelperText>{error}</FormHelperText> : null}
		</FormControl>
	);
}
