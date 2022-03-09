import { DirectiveTransformer } from '@/types'
import { GraphQLSchema } from 'graphql'

/**
 * Applies each `DirectiveTransformer` function on the provided `schema`
 * and returns a new transformed `schema` with the mapped directives.
 *
 * @param schema GraphQL `schema` to be transformed
 * @param transformers List of `DirectiveTransformers`
 * @returns New GraphQL `schema` with mapped directives
 */
export const applyTransformers = (schema: GraphQLSchema, transformers: Array<DirectiveTransformer>) =>
	transformers.reduce<GraphQLSchema>((prevSchema, transformer) => transformer(prevSchema), schema)
