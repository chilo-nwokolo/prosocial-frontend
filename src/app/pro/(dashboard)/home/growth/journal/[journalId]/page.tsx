import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import BackButton from '@/components/General/BackButton';

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
      <Flex justifyContent="flex-end"><BackButton icon={<GrClose />} /></Flex>
			<Text fontSize="lg" fontWeight="medium">
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
