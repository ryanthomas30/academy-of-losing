import { Routes as RouteGroup, Route } from 'react-router-dom'

import { AuthProvider, useFirebaseAuthListener } from '../firebase'
import { RequireAuth } from './AuthRoute'
import { routeNames } from './routeNames'

/* Pages */
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'

export const Routes = () => {
	const firebaseUser = useFirebaseAuthListener()
	return (
		<AuthProvider value={firebaseUser}>
			<RouteGroup>
				<Route
					path={routeNames.home}
					element={<RequireAuth element={<Home />} />}
				>
				</Route>
				<Route
					path={routeNames.login}
					element={<Login />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</RouteGroup>
		</AuthProvider>
	)
}
