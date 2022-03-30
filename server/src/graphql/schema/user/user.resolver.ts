import { Resolvers } from '@/types'

export const userResolver: Resolvers = {
	Query: {
		me: (_, __, { dataSources, user }) => dataSources.userService.getUser(user.userId),
		user: (_, { userId }, { dataSources }) => dataSources.userService.getUser(userId),
	},
	Mutation: {
		createUser: (_, { newUser }, { dataSources }) => dataSources.userService.createUser(newUser),
	},
	User: {
		games: ({ id }, _, { dataSources }) => dataSources.gameService.getGamesByUserId(id),
		photoUrl: ({ id }, _, { dataSources }) => dataSources.firebaseService.getUserPhotoUrl(id),
	},
}
