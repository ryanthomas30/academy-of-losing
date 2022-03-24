import { Resolvers } from '@/types'

export const questionResolver: Resolvers = {
	Query: {
		question: (_, { questionId }, { dataSources }) => dataSources.questionService.getQuestion(questionId),
	},
}
