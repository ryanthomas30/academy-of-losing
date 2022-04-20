import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { getToken, setToken } from '@/localStorage'
import { promiseToObservable } from '@/util'

import {
	getAuth,
	getIdToken,
	signOut,
} from 'firebase/auth'

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_API_URL,
})

const authLink = setContext((_, { headers }) => {
	const token = getToken()
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
	if (graphQLErrors) {
		const auth = getAuth()
		for (const err of graphQLErrors) {
			switch (err.extensions.code) {
				case 'UNAUTHENTICATED': {
					if (auth.currentUser) {
						const token = getIdToken(auth.currentUser, true)
						return promiseToObservable(token).flatMap((token) => {
							if (!token) {
								signOut(auth)
							}
							setToken(token)
							const oldHeaders = operation.getContext().headers
							operation.setContext({
								headers: {
									...oldHeaders,
									authorization: `Bearer ${token}`,
								},
							})
							return forward(operation)
						})
					}
					signOut(auth)
					return
				}
				default:
					return
			}
		}
	}
})

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([errorLink, authLink, httpLink]),
})

export * from './generated'
