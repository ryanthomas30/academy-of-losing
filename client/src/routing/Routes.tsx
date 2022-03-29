import { Routes as RouteGroup, Route } from 'react-router-dom'

import { AuthProvider, useFirebaseAuthListener } from '../firebase'
import { RequireAuth } from './AuthRoute'
import { routeNames } from './routeNames'

/* Pages */
import { MainLayout } from '@/pages/MainLayout'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'

export const Routes = () => {
	const firebaseUser = useFirebaseAuthListener()
	return (
		<AuthProvider value={firebaseUser}>
			<RouteGroup>
				<Route element={<RequireAuth element={<MainLayout />} />}>
					<Route
						index
						element={<Home />}
					/>
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
