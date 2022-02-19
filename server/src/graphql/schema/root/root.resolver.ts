import { Resolvers } from '@/types'

/* Root Resolvers */
export const rootResolvers: Resolvers = {
	Query: {
		test: () => 'Test query succeeded!',
	},
	Mutation: {
		test: () => 'Test mutation succeeded!',
	},
}
