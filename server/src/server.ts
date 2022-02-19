/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server'

// import { createConnection } from 'typeorm'

import { makeSchema } from '@/graphql'

/* CONTEXT */
import { context } from '@/context'

/**
 * Object containing all data sources injected into the `Context` by Apollo Server
 */
export interface DataSources {

}

export const dataSources = {

}

export const run = async () => {
	// await createConnection()
	const schema = await makeSchema()

	const server = new ApolloServer({
		schema,
		context,
		dataSources: () => dataSources,
		introspection: true,
	})

	const { url } = await server.listen()

	// eslint-disable-next-line
	console.log(`🚀  Server ready at ${url}`)
}
