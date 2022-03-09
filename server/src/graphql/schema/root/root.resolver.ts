import { Resolvers } from '@/types'

/* Root Resolvers */
export const rootResolver: Resolvers = {
	Query: {
		test: () => 'Test query succeeded!',
	},
	Mutation: {
		test: () => 'Test mutation succeeded!',
	},
}
