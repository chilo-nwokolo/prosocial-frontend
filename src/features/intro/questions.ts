export const questionSections = [
	{
		id: 1,
		section: 'The basics',
		totalQuestions: 9,
		questions: {
			description:
				'Note: Your information will not be visible to other users and never sold to third parties.',
			data: [
				{
					id: 1,
					question: 'What gender do you identify with?',
					options: [
						'Female',
						'Male',
						'Gender variant/Non-conforming',
						'Transgender',
						'Prefer not to answer',
					],
					type: 'singleChoice',
				},
				{
					id: 2,
					question: 'What is your race/ethnicity?',
					options: [
						'White',
						'Black or African',
						'American',
						'Hispanic/Latino',
						'Asian',
						'Native Hawaiian/Other Pacific Islander',
						'American Indian/Alaskan Native',
						'Multiracial',
						'Other',
						'Don’t know/Not sure',
					],
					type: 'singleChoice',
				},
				{
					id: 3,
					question: 'What is your relationship status?',
					options: ['Single', 'Dating', 'In a committed relationship'],
					type: 'singleChoice',
				},
				{
					id: 4,
					question: 'What is your level of education?',
					options: [
						'Elementary or Middle school',
						'High school graduate/GED equivalent',
						'Some college',
						'Associates degree',
						'Bachelor’s degree',
						'Graduate or professional degree',
					],
					type: 'singleChoice',
				},
				{
					id: 5,
					question: 'What is your zip code?',
					type: 'text',
				},
				{
					id: 6,
					question: 'What is your political orientation?',
					options: [
						'Strongly liberal',
						'Slightly liberal',
						'Moderate',
						'Slightly conservative',
						'Strongly conservative',
					],
					type: 'ratingScale',
				},
				{
					id: 7,
					question: 'How often do you go out to socialize?',
					options: ['Almost never', '1/x a week', '2/x a week', 'Most days', 'Every day'],
					type: 'ratingScale',
				},
				{
					id: 8,
					question: 'How often would you like to go out to socialize?',
					options: ['Almost never', '1/x a week', '2/x a week', 'Most days', 'Every day'],
					type: 'ratingScale',
				},
				{
					id: 9,
					question: 'How would you rate your health, generally speaking?',
					options: ['Poor', 'Moderate', 'Good', 'Very good', 'Excellent'],
					type: 'ratingScale',
				},
			],
		},
	},
	{
		id: 2,
		section: 'Your personality',
		totalQuestions: 20,
		questions: {
			meta: 'I am someone who...',
			description:
				'Below are a number of personality traits that may or may not apply to you. Do your best to choose the option that best reflects who you are as a person.',
			data: [
				{
					id: 1,
					question: 'tends to be quiet.',
					options: ['1', '2', '3', '4', '5'],
					type: 'ratingScale',
				},
				{
					id: 2,
					question: 'is compassionate, has a soft heart.',
					options: ['1', '2', '3', '4', '5'],
					type: 'ratingScale',
				},
				{
					id: 3,
					question: 'reacts annoyed if another person steals the show from me.',
					options: ['1', '2', '3', '4', '5'],
					type: 'ratingScale',
				},
				{
					id: 4,
					question: 'tends to be disorganized.',
					options: ['1', '2', '3', '4', '5'],
					type: 'ratingScale',
				},
				{
					id: 5,
					question: 'worries a lot.',
					options: ['1', '2', '3', '4', '5'],
					type: 'ratingScale',
				},
			],
		},
	},
	{
		id: 3,
		section: 'Behaviors and beliefs',
		totalQuestions: 11,
		questions: {
			meta: 'In the past month...',
			description:
				'The following questions are designed to help us understand how you currently feel about life. For every question, please choose the answer that best describes how you felt during the past month.',
			data: [
				{
					id: 1,
					question: 'I felt very anxious.',
					options: ['Never', 'Seldom', 'Sometimes', 'Often', 'Mostly', 'Continuously'],
					type: 'singleChoice',
				},
				{
					id: 2,
					question: 'I felt so down that nothing could cheer me up.',
					options: ['Never', 'Seldom', 'Sometimes', 'Often', 'Mostly', 'Continuously'],
					type: 'singleChoice',
				},
				{
					id: 3,
					question: 'I felt calm and peaceful.',
					options: ['Never', 'Seldom', 'Sometimes', 'Often', 'Mostly', 'Continuously'],
					type: 'singleChoice',
				},
				{
					id: 4,
					question: 'It helps to turn to people in times of need.',
					options: ['1', '2', '3', '4', '5', '6', '7'],
					type: 'ratingScale',
				},
				{
					id: 5,
					question: 'I usually discuss my problems and concerns with others.',
					options: ['1', '2', '3', '4', '5', '6', '7'],
					type: 'ratingScale',
				},
			],
		},
	},
];
