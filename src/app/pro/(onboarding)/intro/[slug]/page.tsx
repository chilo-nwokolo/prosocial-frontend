'use client';
import { Button, Flex, Text } from '@chakra-ui/react';
import { AnswerType, appRouteLinks } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import RatingScaleQuestion from '@/features/intro/RatingScaleQuestion';
import SingleChoiceQuestion from '@/features/intro/SingleChoiceQuestion';
import InputQuestions from '@/features/intro/InputQuestions';
import { useOnboardQuestions } from '@/store';

export default function QuestionsPage({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [section, setSection] = useState<any>(null);
	const [questions] = useOnboardQuestions((state) => [state.questions]);

	console.log(section);

	useEffect(() => {
		const section = questions.find(
			(question: any) => question.category === decodeURI(params.slug),
		);
		if (!section) {
			router.push(appRouteLinks.intro);
			return;
		}
		setSection(section);
	}, [params.slug, questions, router]);

	return (
		<Flex flexDir="column" gap="8" mb="5">
			<Flex mt="5">
				<Button
					variant="link"
					color="black"
					onClick={() => router.push(appRouteLinks.intro)}
				>
					<FaChevronLeft />
				</Button>
			</Flex>
			<Flex flexDir="column" gap="5">
				<Text fontSize="3xl" fontWeight="semibold">
					{decodeURI(params.slug)}
				</Text>
				<Text>{section?.description}</Text>
			</Flex>
			<Text fontSize="xl" mb="-3">
				{section?.meta}
			</Text>
			<Flex flexDir="column" gap="10">
				{section?.questions.map((question: any) => {
					if (question.type === AnswerType.SINGLE_CHOICE) {
						return (
							<SingleChoiceQuestion
								key={`quest-${question.id}`}
								id={question.id}
								title={question.question ?? question.text}
								options={question?.options}
							/>
						);
					} else if (question.type === 'text') {
						return (
							<InputQuestions key={`quest-${question.id}`} title={question.question} />
						);
					} else {
						return (
							<RatingScaleQuestion
								key={`quest-${question.id}`}
								title={question.text}
								options={question?.options}
							/>
						);
					}
				})}
				<Button>Save</Button>
			</Flex>
		</Flex>
	);
}
