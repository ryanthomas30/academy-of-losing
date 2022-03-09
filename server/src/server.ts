/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'
import { makeSchema } from '@/graphql'
import { context } from '@/context'
import { dataSources } from '@/service'

export const run = async () => {
	await createConnection()
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
