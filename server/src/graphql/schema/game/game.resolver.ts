import { Resolvers } from '@/types'

export const gameResolver: Resolvers = {
	Query: {
		game: (_, { gameId }, { dataSources }) => dataSources.gameService.getGame(gameId),
		games: (_, __, { dataSources }) => dataSources.gameService.getGames(),
	},
	Mutation: {
		createGame: (_, { newGame }, { dataSources }) => dataSources.gameService.createGame(newGame),
		addQuestionToGame: (_, { gameId, questionId }, { dataSources }) => dataSources.gameService.addQuestionToGame(gameId, questionId),
		removeQuestionFromGame: (_, { gameId, questionId }, { dataSources }) => dataSources.gameService.removeQuestionFromGame(gameId, questionId),
	},
	Game: {
		teams: ({ teams }, _, { dataSources }) => dataSources.utilService.resolveNilToArray(teams),
		questions: ({ id }, _, { dataSources }) => dataSources.questionService.getGameQuestions(`${id}`),
		team: ({ id }, _, { dataSources, user }) => dataSources.teamService.getTeamByUserGame(user.userId, `${id}`),
	},
}
