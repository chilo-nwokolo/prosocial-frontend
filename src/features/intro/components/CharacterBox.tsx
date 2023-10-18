'use client';
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	RadioGroup,
	Text,
	useRadio,
	useRadioGroup,
} from '@chakra-ui/react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

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
				borderWidth="2px"
				_checked={{
					bg: props.value === 'yes' ? 'teal.600' : 'red.400',
					color: 'white',
					borderColor: props.value === 'yes' ? 'teal.600' : 'red.400',
				}}
				_active={{
					color: 'white',
				}}
				w="full"
				textAlign="center"
				alignItems="center"
				justifyContent="center"
				py="3"
			>
				{props.children}
			</Flex>
		</Box>
	);
}

type Props = {
	title: string;
	name: string;
};

export default function CharacterBox({ title, name }: Props) {
	const options = ['no', 'yes'];
	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
	});

	const group = getRootProps();

	return (
		<FormControl as="fieldset">
			<FormLabel
				as="legend"
				mb="0"
				border="2px solid"
				borderColor="gray.200"
				p="5"
				w="full"
			>
				<Flex flexDir="column" gap="2">
					<Text fontWeight="medium" fontSize="lg">
						{title}
					</Text>
					<Text fontWeight="normal">
						You are the type of person who likes to try new things! Whereas other people
						might feel reluctant or uncomfortable when presented with a new opportunity,
						you are willing to take chances and explore, which helps you grow.
					</Text>
				</Flex>
			</FormLabel>
			<RadioGroup>
				<HStack {...group} gap="0">
					{options?.map((value, i) => {
						const radio = getRadioProps({ value });
						return (
							<RadioCard value={value} key={i} {...radio}>
								{value === 'yes' ? <AiOutlineCheck /> : <AiOutlineClose />}
							</RadioCard>
						);
					})}
				</HStack>
			</RadioGroup>
		</FormControl>
	);
}
