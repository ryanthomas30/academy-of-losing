import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { DirectiveTransformer } from '@/types'

import { rootResolver, userResolver, teamResolver, hasUserIdTransformer } from './schema'

import { applyTransformers } from './util'

/**
 * Resolvers
 */
export const resolvers = [
	rootResolver,
	userResolver,
	teamResolver,
]

/**
 * Directive Transformer Functions
 */
export const transformers: Array<DirectiveTransformer> = [
	hasUserIdTransformer,
]

export const makeSchema = async () => {
	const typeDefs = await loadSchema('./**/*.graphql', {
		loaders: [new GraphQLFileLoader()],
	})

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	})

	return applyTransformers(schema, transformers)
}

export default makeSchema
