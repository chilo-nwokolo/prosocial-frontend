'use client';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { AnswerType, appRouteLinks } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import RatingScaleQuestion from '@/features/intro/components/RatingScaleQuestion';
import SingleChoiceQuestion from '@/features/intro/components/SingleChoiceQuestion';
import InputQuestions from '@/features/intro/components/InputQuestions';
import { useOnboardQuestions } from '@/store';
import { useFormik } from 'formik';
import { decodeUrl, generateQuestions } from '@/utils/helpers';

export default function QuestionsPage({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const toast = useToast();
	const [section, setSection] = useState<any>(null);
	const [questions, answers, updateAnswers] = useOnboardQuestions((state) => [
		state.questions,
		state.answers,
		state.updateAnswers,
	]);

	useEffect(() => {
		const section = questions?.find(
			(question: any) => question.category === decodeURI(params.slug),
		);
		if (!section) {
			router.push(appRouteLinks.intro);
			return;
		}
		setSection(section);
	}, [params.slug, questions, router]);

	const formik = useFormik({
		initialValues: Object.keys(answers?.[decodeUrl(params.slug, '-')] || '')
			?.length
			? answers[decodeUrl(params.slug, '-')]
			: generateQuestions(section),
		onSubmit: (values) => {
			const source = decodeUrl(params.slug, '-');
			const updatedAnswers = { ...answers, [source]: values };
			updateAnswers(updatedAnswers);
		},
	});

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
								title={question.question ?? question.text}
								options={question?.options}
								value={formik.values[question.id]}
								name={question.id}
								onChange={formik.handleChange}
								source={decodeUrl(params.slug)}
							/>
						);
					} else if (question.type === 'text') {
						return (
							<InputQuestions
								onChange={formik.handleChange}
								value={formik.values[question.id]}
								key={`quest-${question.id}`}
								name={question.id}
								title={question.question}
							/>
						);
					} else {
						return (
							<RatingScaleQuestion
								key={`quest-${question.id}`}
								title={question.question ?? question.text}
								options={question?.options}
								source={decodeURI(params.slug)}
								name={question.id}
								value={formik.values[question.id]}
								onChange={formik.handleChange}
							/>
						);
					}
				})}
				<Button
					onClick={() => {
						formik.handleSubmit();
						router.back();
						toast({
							title: 'Saved successfully',
							status: 'success',
						});
					}}
				>
					Save
				</Button>
			</Flex>
		</Flex>
	);
}
