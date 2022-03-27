import { Route, RouteProps, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../firebase'
import { routeNames } from './routeNames'

interface Props {
	element: React.ReactNode
}

export const RequireAuth: React.FC<Props> = ({ element }) => {
	const authUser = useAuth()
	const location = useLocation()

	if (!authUser) {
		return (
			<Navigate
				to={routeNames.login}
				state={{ from: location }}
				replace
			/>
		)
	}

	return <>{element}</>
}

export const AuthRoute: React.FC<RouteProps> = ({ element, ...props }) => (
	<Route
		{...props}
		element={(<RequireAuth element={element} />)}
	/>
)

