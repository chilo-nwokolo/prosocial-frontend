import { AnswerType } from "@/utils/constants";

export const sampleData = [
	{
		id: 1,
		section: 'The basics',
		totalQuestions: 0,
		description:
			'Note: Your information will not be visible to other users and never sold to third parties.',
		meta: '',
		questions: [
			{
				id: "gender",
				question: 'What gender do you identify with?',
				options: [
					{ id: 1, title: 'Female', value: 'FEMALE' },
					{ id: 2, title: 'Male', value: 'MALE' },
					{ id: 3, title: 'Gender variant/Non-conforming', value: 'NONCONFORMING' },
					{ id: 4, title: 'Transgender', value: 'TRANSGENDER' },
					{ id: 5, title: 'Prefer not to answer', value: 'OTHER' },
				],
				type: AnswerType.SINGLE_CHOICE,
			},
			{
				id: "race",
				question: 'What is your race/ethnicity?',
				options: [
					{ id: 1, title: 'White', value: 'White' },
					{ id: 2, title: 'Black or African', value: 'Black or African' },
					{ id: 3, title: 'American', value: 'American' },
					{ id: 4, title: 'Hispanic/Latino', value: 'Hispanic/Latino' },
					{ id: 5, title: 'Asian', value: 'Asian' },
					{ id: 6, title: 'Native Hawaiian/Other Pacific Islander', value: 'Native Hawaiian/Other Pacific Islander' },
					{ id: 7, title: 'American Indian/Alaskan Native', value: 'American Indian/Alaskan Native' },
					{ id: 8, title: 'Multiracial', value: 'Multiracial' },
					{ id: 9, title: 'Other', value: 'Other' },
					{ id: 10, title: 'Don’t know/Not sure', value: 'Don’t know/Not sure' },
				],
				type: AnswerType.SINGLE_CHOICE,
			},
			{
				id: "relationship_status",
				question: 'What is your relationship status?',
				options: [
					{ id: 1, title: 'Single', value: 'Single' },
					{ id: 2, title: 'Dating', value: 'Dating' },
					{ id: 3, title: 'In a committed relationship', value: 'In a committed relationship' },
				],
				type: AnswerType.SINGLE_CHOICE,
			},
			{
				id: "level_of_education",
				question: 'What is your level of education?',
				options: [
					{ id: 1, title: 'Elementary or Middle school', value: 'Elementary or Middle school' },
					{ id: 2, title: 'High school graduate/GED equivalent', value: 'High school graduate/GED equivalent' },
					{ id: 3, title: 'Some college', value: 'Some college' },
					{ id: 4, title: 'Associates degree', value: 'Associates degree' },
					{ id: 5, title: 'Bachelor’s degree', value: 'Bachelor’s degree' },
					{ id: 6, title: 'Graduate or professional degree', value: 'Graduate or professional degree' },
				],
				type: AnswerType.SINGLE_CHOICE,
			},
			{
				id: "zip_code",
				question: 'What is your zip code?',
				type: 'text',
			},
			{
				id: "political_orientation",
				question: 'What is your political orientation?',
				options: [
					{ id: 1, title: 'Strongly liberal', value: 'Strongly liberal' },
					{ id: 2, title: 'Slightly liberal', value: 'Slightly liberal' },
					{ id: 3, title: 'Moderate', value: 'Moderate' },
					{ id: 4, title: 'Slightly conservative', value: 'Slightly conservative' },
					{ id: 5, title: 'Strongly conservative', value: 'Strongly conservative' },
				],
				type: AnswerType.RATING_SCALE,
			},
			{
				id: "socialization",
				question: 'How often do you go out to socialize?',
				options: [
					{ id: 1, title: 'Almost never', value: 'Almost never' },
					{ id: 2, title: '1/x a week', value: '1/x a week' },
					{ id: 3, title: '2/x a week', value: '2/x a week' },
					{ id: 4, title: 'Most days', value: 'Most days' },
					{ id: 5, title: 'Every day', value: 'Every day' },
				],
				type: AnswerType.RATING_SCALE,
			},
			{
				id: "to_socialization",
				question: 'How often would you like to go out to socialize?',
				options: [
					{ id: 1, title: 'Almost never', value: 'Almost never' },
					{ id: 2, title: '1/x a week', value: '1/x a week' },
					{ id: 3, title: '2/x a week', value: '2/x a week' },
					{ id: 4, title: 'Most days', value: 'Most days' },
					{ id: 5, title: 'Every day', value: 'Every day' },
				],
				type: AnswerType.RATING_SCALE,
			},
			{
				id: "health_rating",
				question: 'How would you rate your health, generally speaking?',
				options: [
					{ id: 1, title: 'Poor', value: 'Poor' },
					{ id: 2, title: 'Moderate', value: 'Moderate' },
					{ id: 3, title: 'Good', value: 'Good' },
					{ id: 4, title: 'Very good', value: 'Very good' },
					{ id: 5, title: 'Excellent', value: 'Excellent' },
				],
				type: AnswerType.RATING_SCALE,
			},
		],
	},
	{
		id: 2,
		section: 'Your personality',
		totalQuestions: 0,
		meta: 'I am someone who...',
		description:
			'Below are a number of personality traits that may or may not apply to you. Do your best to choose the option that best reflects who you are as a person.',
	},
	{
		id: 3,
		section: 'Behaviors and beliefs',
		totalQuestions: 0,
		meta: 'In the past month...',
		description:
			'The following questions are designed to help us understand how you currently feel about life. For every question, please choose the answer that best describes how you felt during the past month.',
	},
];
