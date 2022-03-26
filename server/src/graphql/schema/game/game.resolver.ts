import { Resolvers } from '@/types'

export const gameResolver: Resolvers = {
	Query: {
		game: (_, { gameId }, { dataSources }) => dataSources.gameService.getGame(gameId),
	},
	Mutation: {
		createGame: (_, __, { dataSources }) => dataSources.gameService.createGame(),
		addQuestionToGame: (_, { gameId, questionId }, { dataSources }) => dataSources.gameService.addQuestionToGame(gameId, questionId),
	},
	Game: {
		teams: ({ teams }, _, { dataSources }) => dataSources.utilService.resolveNilToArray(teams),
		questions: ({ questions }, _, { dataSources }) => dataSources.utilService.resolveNilToArray(questions),
	},
}
