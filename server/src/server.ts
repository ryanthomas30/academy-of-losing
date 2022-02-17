/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'

/* SCHEMAS & DATASOURCES */
import {
	/* Root */
	Root,
	rootResolvers,
} from '@/schemas'

/* DIRECTIVES */

/* SCALARS */

/* CONTEXT */
import { context } from '@/context'

/**
 * Object containing all data sources injected into the `Context` by Apollo Server
 */
export interface DataSources {

}

export const typeDefs = [
	Root,
]

export const resolvers = [
	rootResolvers,
]

export const dataSources = {

}

export const run = async () => {
	await createConnection()

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context,
		dataSources: () => dataSources,
	})

	const { url } = await server.listen()

	// eslint-disable-next-line
	console.log(`🚀  Server ready at ${url}`)
}
