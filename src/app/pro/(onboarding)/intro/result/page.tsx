'use client';
import CharacterBox from '@/features/intro/components/CharacterBox';
import { ME_PERSONALITY_SCORE } from '@/features/intro/gql';
import { useQuery } from '@apollo/client';
import { Box, Button, Flex, SimpleGrid, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { FcInfo } from 'react-icons/fc';

export default function ResultPage() {

	const { data } = useQuery(ME_PERSONALITY_SCORE);
	const [numberOfButtons] = useState(1);

	console.log(data);
	
	return (
		<>
			<Flex justifyContent="end" alignItems="center" gap="1">
				<FcInfo />
        <Tooltip label='Every answer you provided during the registration procuces a score that combines together to place you into a category. If you feel this category is not an accurate reflection of your personality, you will have the opportunity to answer some more questions so we can further refine our understanding of who you are as a person.'>
          <Text fontSize="sm" color="blue.600" cursor="pointer">
            How did my answers produce this result?
          </Text>
        </Tooltip>
			</Flex>
			<Flex mt="5" flexDir="column">
				<Text fontWeight="medium" fontSize="xl">
					Based on your answers, you seem to fit one of our social categories:{' '}
				</Text>
				<Flex flexDir="column" alignItems="center" my="8">
					<Box h="48" border="1px solid black" w="60"></Box>
					<Text fontSize="2xl" fontWeight="bold" marginTop="5">
						Explorer
					</Text>
					<Text>Menelaus Blue</Text>
					<Text mt="4">
						In Greek mythology, Menelaus was a king of Mycenaean, Sparta. Like the
						butterfly that bears his name, you are a beautiful explorer of the world and
						someone who people trust.
					</Text>
				</Flex>
				<Text textAlign="center" px="9" fontWeight="bold">
					Select whether or not you agree these characteristics match you.
				</Text>
				<Flex flexDir="column" gap="4" my="5">
					{[1, 2, 3].map((val) => (
						<CharacterBox key={val} title="Explorative" name="explorer" />
					))}
				</Flex>
				<SimpleGrid columns={numberOfButtons} spacing="3" mb="3">
					{numberOfButtons === 1 ? (
						<Button>Yes, let&apos;s go</Button>
					) : (
						<>
							<Button h="16">Answer more <br />questions</Button>
							<Button h="16">Proceed to social <br />preferences</Button>
						</>
					)}
				</SimpleGrid>
			</Flex>
		</>
	);
}
