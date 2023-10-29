'use client';
import { useConfig } from '@/store/configStore';
import { Flex, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic'
import { useEffect } from 'react';

const QuestionCategories = dynamic(() => import('@/features/intro/components/QuestionCategories'), { ssr: false });

export default function IntroPage() {
	const [updateConfig] = useConfig((state) => [state.updateConfig]);

	useEffect(() => {
		updateConfig({ user_visited_intro_page: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
