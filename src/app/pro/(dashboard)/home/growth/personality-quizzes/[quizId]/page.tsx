'use client';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { appRouteLinks } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import { UserQuestionsType, useUser } from '@/store';
import RatingScaleQuestion from '@/features/intro/components/RatingScaleQuestion';
import { useMutation } from '@apollo/client';
import { QUESTION_RESPONSE_MUTATION } from '@/features/intro/gql';
import { apolloErrorHandler } from '@/utils/helpers';

export default function PersonalityQuestionsPage({ params }: { params: { quizId: string } }) {
	const router = useRouter();
	const toast = useToast();
	const [sectionQuestions, setSectionQuestions] = useState<
		UserQuestionsType[] | undefined
	>(undefined);
	const [questions] = useUser((state) => [state.questions]);

	useEffect(() => {
		const sectionQuestions = questions?.filter(
			(question) => question.sub_category === decodeURI(params.quizId),
		);
		if (!sectionQuestions?.length) {
			router.back();
		}
		setSectionQuestions(sectionQuestions);
		return () => {
			setSectionQuestions(undefined);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.quizId, questions]);

	const genDefaultValues = () => {
		const result: { [index: string]: string } = {};
		sectionQuestions?.forEach((element) => {
			result[element.id] = '';
		});
		return result;
	};

	// eslint-disable-next-line no-unused-vars
	const [submitAnswers, { loading }] = useMutation(QUESTION_RESPONSE_MUTATION, {
		onError: (error) => {
			toast({
				status: 'error',
				title: apolloErrorHandler(error),
			});
		},
		onCompleted: () => {
			router.push(appRouteLinks.result);
		},
	});

	const formik = useFormik({
		initialValues: genDefaultValues(),
		onSubmit: (values) => {
			console.log(values);
		},
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
