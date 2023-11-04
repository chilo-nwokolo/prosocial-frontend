import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import BackButton from '@/components/General/BackButton';

const titles = [
  '',
	'Write down an interesting or Funny Story',
	'Write down your commitments commitments',
	'What are you curious about',
];

export default function ViewJournalPage({ params: { challengeId } }: { params: { challengeId: number } }) {
	return (
		<Flex flexDir="column">
      <Flex justifyContent="flex-end"><BackButton icon={<GrClose />} /></Flex>
			<Text fontSize="lg" fontWeight="medium">
				Challenge {challengeId}
			</Text>
			<Text mt="2">{titles[challengeId]}</Text>
			<Textarea mt="4" size="lg" rows={25}></Textarea>
			<Box mt="6" w="full">
				<Button w="full">Save</Button>
			</Box>
		</Flex>
	);
}
