import { Resolvers } from '@/types'

export const userResolver: Resolvers = {
	Query: {
		user: (_, { userId }, { dataSources }) => dataSources.userDataSource.getOne(userId),
	},
	Mutation: {
		createUser: (_, { newUser }, { dataSources }) => dataSources.userDataSource.create(newUser),
	},
}
