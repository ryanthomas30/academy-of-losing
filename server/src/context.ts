import { AuthenticationError } from 'apollo-server'

import { ContextFunction } from 'apollo-server-core'
import { Request, Response } from 'express'
import { ExecutionParams } from 'subscriptions-transport-ws'
import { auth } from 'firebase-admin'

import { DataSources } from '@/service'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { isDevelopment } from './util'

/**
 * Express context from apollo-server-core.
 */
interface ExpressContext {
	req: Request
	res: Response
	connection?: ExecutionParams
}

/**
 * Context object produced by `ContextFunction`.
 */
export interface ProducedContext {
	user: ContextUser
	req: Request
	res: Response
}

export interface ContextUser {
	userId: string
	admin: boolean
	email: string
}

/**
 * Full context object generated at runtime by Apollo Server after injecting `DataSources`.
 */
export interface Context extends ProducedContext {
	dataSources: DataSources
}

/**
 * Returns the context object that is available globally throughout the server.
 * The context is injected into resolvers and datasources.
 *
 * Do not include datasources explicitly in the context to avoid circular dependencies.
 * Apollo Server will automatically include datasources in the context at runtime.
 */
export const context: ContextFunction<ExpressContext, ProducedContext> = async ({ req, res, connection }) => {
	if (connection) return connection.context
	const authHeader = `${req.headers.authorization}` || ''
	try {
		if (authHeader.startsWith('Bearer ')) {
			const token = authHeader.split(' ')[1]
			const decodedToken: DecodedIdToken = await auth().verifyIdToken(token)

			return {
				user: {
					userId: decodedToken.uid,
					email: decodedToken.email ?? '',
					admin: !!decodedToken.admin,
				},
				req,
				res,
			}
		}
		/* Allows introspection in development */
		if (!isDevelopment()) throw Error
		return {
			user: {
				userId: '',
				email: '',
				admin: false,
			},
		}
	} catch (err) {
		throw new AuthenticationError(`You are not authenticated -- ${err}`)
	}

}
