import { gql } from 'apollo-server'
import { IResolvers } from '@graphql-tools/utils'

/* Root TypeDefs */
export const Root = gql`
	# TypeDefs
	type Query {
		"""Test query for health checks."""
		testQuery: String
	}
	
	type Mutation {
		"""Test mutation for health checks."""
		testMutation: String
	}
`

/* Root Resolvers */
export const rootResolvers: IResolvers = {
	Query: {
		testQuery: () => 'Test query succeeded!',
	},
	Mutation: {
		testMutation: () => 'Test mutation succeeded!',
	},
}

