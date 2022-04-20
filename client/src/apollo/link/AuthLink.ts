import { setContext } from '@apollo/client/link/context'

import { getToken } from '@/localStorage'

export const AuthLink = setContext((_, { headers }) => {
	const token = getToken()
	return {
		headers: {
			...headers,
			authorization: `Bearer ${token ?? ''}`,
		},
	}
})
