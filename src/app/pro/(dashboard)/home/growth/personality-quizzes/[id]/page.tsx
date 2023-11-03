'use client';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { appRouteLinks } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import { UserQuestionsType, useUser } from '@/store';
import RatingScaleQuestion from '@/features/intro/components/RatingScaleQuestion';

export default function PersonalityQuestionsPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const toast = useToast();
	const [sectionQuestions, setSectionQuestions] = useState<
		UserQuestionsType[] | undefined
	>(undefined);
	const [questions] = useUser((state) => [state.questions]);

	useEffect(() => {
		const sectionQuestions = questions?.filter(
			(question) => question.sub_category === decodeURI(params.id),
		);
		setSectionQuestions(sectionQuestions);
		return () => {
			setSectionQuestions(undefined);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id, questions]);

	const genDefaultValues = () => {
		const result: { [index: string]: string } = {};
		sectionQuestions?.forEach((element) => {
			result[element.id] = '';
		});
		return result;
	};

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
					Your {decodeURI(params.id)}
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
						source={decodeURI(params.id)}
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
