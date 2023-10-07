'use client';

import { questionSections } from '@/features/intro/questions';
import { appRouteLinks } from '@/utils/constants';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

export default function IntroPage() {
	const router = useRouter();

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
			<Flex flexDir="column" gap="8" mt="10">
				{questionSections.map((sect) => (
					<Flex
						key={sect.id}
						border="1px solid"
						alignItems="center"
						borderColor="gray.400"
						py="16"
						px="5"
						borderRadius="lg"
						cursor="pointer"
						onClick={() => router.push(`${appRouteLinks.intro}/${sect.section}`)}
					>
						<Flex flexDir="column" gap="2">
							<Text fontWeight="semibold" fontSize="lg">{sect.section}</Text>
							<Text>0/{sect.totalQuestions}</Text>
						</Flex>
						<Text ml="auto">
							<FaChevronRight />
						</Text>
					</Flex>
				))}
			</Flex>
			<Button mt="10">View Results</Button>
		</Flex>
	);
}
