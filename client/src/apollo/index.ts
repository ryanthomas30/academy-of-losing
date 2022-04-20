import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { AuthLink, ErrorLink } from './link'

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_API_URL,
})

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([ErrorLink, AuthLink, httpLink]),
})

export * from './generated'
