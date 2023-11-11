'use client';
import { Button, Flex, Text } from '@chakra-ui/react';
import { appRouteLinks } from '@/utils/constants';
import { FaChevronLeft } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import usePersonalityQuestionsPage from '@/features/dashboard/home/growth/hooks/usePersonalityQuestionsPage';

const RatingScaleQuestion = dynamic(
	() => import('@/features/intro/components/RatingScaleQuestion'),
);

export default function PersonalityQuestionsPage({
	params,
}: {
	params: { quizId: string };
}) {

	const { formik, router, sectionQuestions, loading } = usePersonalityQuestionsPage({
		quizId: params.quizId,
	});

	return (
		<Flex flexDir="column" gap="8" mb="5">
			<Flex mt="5">
				<Button
					variant="link"
					color="black"
					onClick={() => router.push(appRouteLinks.growthPersonality)}
				>
					<FaChevronLeft />
				</Button>
			</Flex>
			<Flex flexDir="column" gap="5">
				<Text fontSize="3xl" fontWeight="semibold">
					Your {decodeURI(params.quizId)}
				</Text>
				<Text>
					Below are a number of personality traits that may or may not apply to you. Do
					your best to choose the option that best reflects who you are as a person.
				</Text>
			</Flex>
			<Text fontSize="2xl" fontWeight="medium">
				I am someone who:
			</Text>
			<Flex flexDir="column" gap="10">
				{sectionQuestions?.map((sect) => (
					<RatingScaleQuestion
						key={`quest-${sect.id}`}
						title={sect.text}
						options={sect.options}
						source={decodeURI(params.quizId)}
						name={sect.id}
						value={formik.values[sect.id]}
						onChange={formik.handleChange}
					/>
				))}
				<Button
					isLoading={loading}
					loadingText="Saving..."
					onClick={() => {
						formik.handleSubmit();
					}}
				>
					Save
				</Button>
			</Flex>
		</Flex>
	);
}
