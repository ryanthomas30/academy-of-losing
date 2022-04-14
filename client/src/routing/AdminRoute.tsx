import React from 'react'
import { Route, RouteProps, Navigate } from 'react-router-dom'
import { useAuth } from '@/firebase'
import { useMeQuery } from '@/apollo'

import { routeNames } from './routeNames'

interface Props {
	element: React.ReactNode
}

export interface CustomClaims {
	admin?: boolean
}

export const RequireAdmin: React.FC<Props> = ({ element }) => {
	const isLoggedIn = !!useAuth()
	const { data, loading } = useMeQuery({
		skip: !isLoggedIn,
		fetchPolicy: 'network-only',
	})

	const isAdmin = !!data?.me.isAdmin

	if ((!isLoggedIn || !isAdmin) && !loading) {
		return (
			<Navigate
				to={routeNames.home}
				replace
			/>
		)
	}

	return <>{element}</>
}

export const AdminRoute: React.FC<RouteProps> = ({ element, ...props }) => (
	<Route
		{...props}
		element={(<RequireAdmin element={element} />)}
	/>
)

