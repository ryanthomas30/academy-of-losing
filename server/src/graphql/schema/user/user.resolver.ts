import { Resolvers } from '@/types'

export const userResolver: Resolvers = {
	Query: {
		user: (_, { userId }, { dataSources }) => dataSources.userService.getUser(userId),
	},
	Mutation: {
		createUser: (_, { newUser }, { dataSources }) => dataSources.userService.createUser(newUser),
	},
}
