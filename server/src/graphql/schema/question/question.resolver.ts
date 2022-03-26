import { Resolvers } from '@/types'

export const questionResolver: Resolvers = {
	Query: {
		question: (_, { questionId }, { dataSources }) => dataSources.questionService.getQuestion(questionId),
	},
	Mutation: {
		createQuestion: (_, { newQuestion }, { dataSources }) => dataSources.questionService.createQuestion(newQuestion),
	},
	Question: {
		image: ({ imageUrl }, _, { dataSources }) => dataSources.questionService.shapeImageResponse(imageUrl),
	},
}
