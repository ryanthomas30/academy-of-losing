import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { DirectiveTransformer } from '@/types'

import {
	rootResolver,
	userResolver,
	teamResolver,
	questionResolver,
	gameResolver,
	hasUserIdTransformer,
	isAdminTransformer,
} from './schema'

import { applyTransformers } from './util'

/**
 * Resolvers
 */
export const resolvers = [
	rootResolver,
	userResolver,
	teamResolver,
	questionResolver,
	gameResolver,
]

/**
 * Directive Transformer Functions
 */
export const transformers: Array<DirectiveTransformer> = [
	hasUserIdTransformer,
	isAdminTransformer,
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
