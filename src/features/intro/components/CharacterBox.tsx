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
import { AiOutlineCheck } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';

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
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
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
	const options = [false, true];
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
					<Text fontWeight="medium" fontSize="lg">{title}</Text>
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
							<RadioCard key={i} {...radio}>
								{value ? <AiOutlineCheck /> : <BsXLg /> }
							</RadioCard>
						);
					})}
				</HStack>
			</RadioGroup>
		</FormControl>
	);
}
