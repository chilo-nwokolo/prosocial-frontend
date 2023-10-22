import { OnBoardCategoriesWithQuestionsQuery } from '@/__generated__/graphql';
import { sampleData } from '@/features/intro/questions';

export const transformQuestions = (questions: OnBoardCategoriesWithQuestionsQuery) => {
	const personalQuestions = {
		id: sampleData[0].id,
		category: sampleData[0].section,
		meta: sampleData[0]?.meta,
		description: sampleData[0]?.description,
		totalQuestions: sampleData[0].questions?.length,
		questions: sampleData[0].questions,
	};

	const otherQuestions = questions.onBoardCategoriesWithQuestions?.map((category) => {
		return {
			id: category.id,
			category: category.name.replace('&', 'and'),
			meta: sampleData[parseInt(category.id) - 1]?.meta,
			description: sampleData[parseInt(category.id) - 1]?.description,
			totalQuestions: category.questions?.length,
			questions: category.questions,
		};
	});
	
	if (otherQuestions?.length) {
		return [personalQuestions, ...otherQuestions];
	}
	return [personalQuestions];
};
