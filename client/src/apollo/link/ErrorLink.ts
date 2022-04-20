import { onError } from '@apollo/client/link/error'
import {
	getAuth,
	getIdToken,
	signOut,
} from 'firebase/auth'

import { setToken } from '@/localStorage'
import { promiseToObservable } from '@/util'

export const ErrorLink = onError(({ graphQLErrors, operation, forward }) => {
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
