import { Flex, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic'

const QuestionCategories = dynamic(() => import('@/features/intro/components/QuestionCategories'), { ssr: false });

export default function IntroPage() {
	return (
		<Flex mt="5" flexDir="column">
			<Text mb="4" fontSize="2xl" fontWeight="medium">
				About You
			</Text>
			<Text>
				Answering these questions will help us match you with people we think you&apos;ll
				like. When you finish, we&apos;ll tell you about some of the qualities that make
				you a great friend!
			</Text>
			<QuestionCategories />
		</Flex>
	);
}
