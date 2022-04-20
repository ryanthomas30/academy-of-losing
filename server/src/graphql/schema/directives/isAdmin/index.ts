import { ProducedContext } from '@/context'
import { DirectiveTransformer } from '@/types'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { defaultFieldResolver, GraphQLFieldConfig } from 'graphql'

const DirectiveName = 'isAdmin'

/**
 * Schema directive that checks if the user is an admin. Derived from a JWT claim.
 *
 * # Example
 * This user will pass the authorization check.
 * ## Schema
 * ```graphql
 * deleteUser(userId: ID!): User @isAdmin
 * ```
 * ## Query
 * ```graphql
 * {
 *   deleteUser(userId: "12345") {
 *     id
 *     name
 *   }
 * }
 * ```
 * ## User (Context)
 * ```typescript
 * {
 *   isAdmin: true,
 * }
 * ```
 */
export const isAdminTransformer: DirectiveTransformer = (schema) => mapSchema(schema, {
	[MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, ProducedContext>) => {
		const directive = getDirective(schema, fieldConfig, DirectiveName)
		if (directive) {
			const { resolve = defaultFieldResolver } = fieldConfig
			fieldConfig.resolve = async (...args) => {
				const [, , { user: contextUser }] = args
				if (contextUser) {
					if (contextUser.admin) return resolve(...args)
					throw new ForbiddenError('You are not authorized to view this resource.')
				} else {
					throw new AuthenticationError('You must be signed in to view this resource.')
				}
			}
			return fieldConfig
		}
	},
})
