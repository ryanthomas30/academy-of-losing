import { Routes as RouteGroup, Route, Outlet } from 'react-router-dom'

import { RequireAuth } from './AuthRoute'
import { RequireAdmin } from './AdminRoute'
import { routeNames } from './routeNames'

/* Pages */
import { MainLayout } from '@/pages/MainLayout'
import { Home } from '@/pages/Home'
import { AdminHome } from '@/pages/AdminHome'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'

export const Routes = () => (
	<RouteGroup>
		<Route
			path={routeNames.home}
			element={<RequireAuth element={<MainLayout />} />}
		>
			<Route
				index
				element={<Home />}
			/>
			<Route
				path={routeNames.adminHome}
				element={(
					<RequireAdmin
						element={<Outlet />}
					/>
				)}
			>
				<Route
					index
					element={<AdminHome />}
				/>
			</Route>
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
)
