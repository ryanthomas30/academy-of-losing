import { Resolvers } from '@/types'

export const gameResolver: Resolvers = {
	Query: {
		game: (_, { gameId }, { dataSources }) => dataSources.gameService.getGame(gameId),
	},
	Mutation: {
		createGame: (_, { newGame }, { dataSources }) => dataSources.gameService.createGame(newGame),
		addQuestionToGame: (_, { gameId, questionId }, { dataSources }) => dataSources.gameService.addQuestionToGame(gameId, questionId),
	},
	Game: {
		teams: ({ teams }, _, { dataSources }) => dataSources.utilService.resolveNilToArray(teams),
		questions: ({ id }, _, { dataSources }) => dataSources.questionService.getGameQuestions(id),
	},
}
