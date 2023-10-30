import { Flex, Text } from '@chakra-ui/react';
import BackButton from '@/components/General/BackButton';

export default function JournalPage() {
	return (
		<Flex flexDir="column" w="full" gap="5">
			<BackButton />
			<Flex flexDir="column">
				<Text fontSize="2xl" fontWeight="semibold">
					Journal prompts
				</Text>
				<Text mt="2">
					The opportunity to reflect on our life experiences is an important aspect of
					personal growth. Below are some journaling prompts. Write as little or as much
					as you like. If you don’t feel like typing, we recommend using voice to text.
				</Text>
			</Flex>
		</Flex>
	);
}
