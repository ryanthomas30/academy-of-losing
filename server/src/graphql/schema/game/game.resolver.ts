import { Resolvers } from '@/types'

export const gameResolver: Resolvers = {
	Query: {
		game: (_, { gameId }, { dataSources }) => dataSources.gameService.getOne(gameId),
	},
	Mutation: {
		createGame: (_, {}, { dataSources }) => dataSources.gameService.create(),
	},
}
