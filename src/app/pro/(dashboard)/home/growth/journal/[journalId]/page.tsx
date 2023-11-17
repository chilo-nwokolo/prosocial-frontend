import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import BackButton from '@/components/General/BackButton';
import { RiDeleteBin6Line } from 'react-icons/ri';

const titles = [
  '',
	'What is your happiest memory from childhood?',
	'What is your greatest personal achievement',
	'What is the hardest lesson you have learned in life',
	'Can you describe your most valued relationship',
];

export default function ViewJournalPage({ params: { journalId } }: { params: { journalId: number } }) {
	return (
		<Flex flexDir="column">
      <Flex justifyContent="space-between" alignItems="center">
				<BackButton />
				<Button variant="outline" leftIcon={<RiDeleteBin6Line />} textTransform="capitalize">
					Clear Entry
				</Button>
			</Flex>
			<Text fontSize="lg" mt="4" fontWeight="medium">
				Journal {journalId}
			</Text>
			<Text mt="2">{titles[journalId]}</Text>
			<Textarea mt="4" size="lg" rows={25}></Textarea>
			<Box mt="6" w="full">
				<Button w="full">Save</Button>
			</Box>
		</Flex>
	);
}
