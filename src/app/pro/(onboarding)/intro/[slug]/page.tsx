'use client';
import { Button, Flex, Text } from '@chakra-ui/react';
import { appRouteLinks } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import RatingScaleQuestion from '@/features/intro/RatingScaleQuestion';
import SingleChoiceQuestion from '@/features/intro/SingleChoiceQuestion';
import { questionSections } from '@/features/intro/questions';
import InputQuestions from '@/features/intro/InputQuestions';

export default function QuestionsPage({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [section, setSection] = useState<(typeof questionSections)[0]>();

	useEffect(() => {
		const section = questionSections.find(
			(question) => question.section === decodeURI(params.slug),
		);
		if (!section) {
			router.push(appRouteLinks.intro);
			return;
		}
		setSection(section);
	}, [params.slug, router]);

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
				<Text>{section?.questions.description}</Text>
			</Flex>
			<Flex flexDir="column" gap="10">
				{section?.questions.data.map((question) => {
					if (question.type === 'singleChoice') {
						return (
							<SingleChoiceQuestion
								key={question.id}
								id={question.id}
								title={question.question}
								options={question?.options}
							/>
						);
					} else if (question.type === 'text') {
						return <InputQuestions key={question.id} title={question.question} />;
					} else {
						return (
							<RatingScaleQuestion
								key={question.id}
								title={question.question}
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
