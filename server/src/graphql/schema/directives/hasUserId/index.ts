import { ProducedContext } from '@/context'
import { DirectiveTransformer } from '@/types'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { defaultFieldResolver, GraphQLFieldConfig } from 'graphql'

const DirectiveName = 'hasUserId'

/**
 * Schema directive that checks if the user's ID from the context (JWT)
 * matches the `userId` provided in the query argument.
 *
 * # Example
 * This user will pass the authorization check.
 * ## Schema
 * ```graphql
 * user(userId: ID!): User @hasUserId
 * ```
 * ## Query
 * ```graphql
 * {
 *   user(userId: "12345") {
 *     id
 *     name
 *   }
 * }
 * ```
 * ## User (Context)
 * ```typescript
 * {
 *   userId: '12345',
 * }
 * ```
 */
export const hasUserIdTransformer: DirectiveTransformer = (schema) => mapSchema(schema, {
	[MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, ProducedContext>) => {
		const directive = getDirective(schema, fieldConfig, DirectiveName)
		if (directive) {
			const { resolve = defaultFieldResolver } = fieldConfig
			fieldConfig.resolve = async (...args) => {
				const [, { userId }, { user: contextUser }] = args
				if (contextUser) {
					if (contextUser.admin) return resolve(...args)
					if (userId === contextUser.userId) return resolve(...args)
					throw new ForbiddenError('You are not authorized to view this resource.')
				} else {
					throw new AuthenticationError('You must be signed in to view this resource.')
				}
			}
			return fieldConfig
		}
	},
})
