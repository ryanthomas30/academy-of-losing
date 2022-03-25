import { Resolvers } from '@/types'

export const questionResolver: Resolvers = {
	Query: {
		question: (_, { questionId }, { dataSources }) => dataSources.questionService.getQuestion(questionId),
	},
	Question: {
		image: ({ imageUrl }, _, { dataSources }) => dataSources.questionService.shapeImageResponse(imageUrl),
	},
	Mutation: {
		createQuestion: (_, { newQuestion }, { dataSources }) => dataSources.questionService.createQuestion(newQuestion),
	},
}
