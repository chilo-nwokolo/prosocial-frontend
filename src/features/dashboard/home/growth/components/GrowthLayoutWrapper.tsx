import { ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import BackButton from '@/components/General/BackButton';

type Props = {
	children: ReactNode;
	title: string;
	description: string;
	destination?: string;
};

export default function GrowthLayoutWrapper({
	children,
	title,
	description,
	destination,
}: Props) {
	return (
		<Flex flexDir="column" w="full" gap="5">
			<BackButton destination={destination} />
			<Flex flexDir="column">
				<Text fontSize="2xl" fontWeight="semibold">
					{title}
				</Text>
				<Text mt="2">{description}</Text>
				<>{children}</>
			</Flex>
		</Flex>
	);
}
