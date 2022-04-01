import { Resolvers } from '@/types'

export const questionResolver: Resolvers = {
	Query: {
		question: (_, { questionId }, { dataSources }) => dataSources.questionService.getQuestion(questionId),
	},
	Mutation: {
		createQuestion: (_, { newQuestion }, { dataSources }) => dataSources.questionService.createQuestion(newQuestion),
	},
	GameQuestion: {
		image: ({ imageUrl }, _, { dataSources }) => dataSources.questionService.shapeImageResponse(imageUrl),
	},
	TeamQuestion: {
		image: ({ imageUrl }, _, { dataSources }) => dataSources.questionService.shapeImageResponse(imageUrl),
	},
}
