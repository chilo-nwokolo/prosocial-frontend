import { Box, Text } from '@chakra-ui/react';

export default function IntroPage() {
	return (
		<Box mt="5">
			<Text mb="4" fontSize="2xl" fontWeight="medium">About You</Text>
			<Text>
				Answering these questions will help us match you with people we think you&apos;ll like.
				When you finish, we&apos;ll tell you about some of the qualities that make you a great
				friend!
			</Text>
		</Box>
	);
}
