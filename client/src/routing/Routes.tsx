import { Routes as RouteGroup, Route, Outlet } from 'react-router-dom'

import { RequireAuth } from './AuthRoute'
import { RequireAdmin } from './AdminRoute'
import { routeNames } from './routeNames'

/* Pages */
import { MainLayout } from '@/pages/MainLayout'
import { Home } from '@/pages/Home'
import { Game, GameIndex } from '@/pages/Game'
import { AdminHome } from '@/pages/AdminHome'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'
import { Questions } from '@/pages/Questions'
import { NewQuestion } from '@/pages/NewQuestion'
import { NewGame } from '@/pages/NewGame'
import { GameEditor } from '@/pages/GameEditor'
import { NewTeam } from '@/pages/NewTeam'
import { Team } from '@/pages/Team'

/* eslint react/jsx-first-prop-new-line: [2, "never"] */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-one-expression-per-line */
export const Routes = () => (
	<RouteGroup>
		<Route path={routeNames.home} element={<RequireAuth element={<MainLayout />} />}>
			<Route index element={<Home />} />
			<Route path={routeNames.game()} element={<Game />}>
				<Route index element={<GameIndex />} />
				<Route path={routeNames.question()} element={<Questions />} />
			</Route>
			<Route path={routeNames.adminHome} element={(<RequireAdmin element={<Outlet />} />)}>
				<Route index element={<AdminHome />} />
				<Route path={routeNames.gameIndex}>
					<Route path=':gameId' element={<GameEditor />}>
						<Route path={routeNames.teamIndex}>
							<Route path={routeNames.newRoute} element={<NewTeam />} />
							<Route path=':teamId' element={<Team />} />
						</Route>
					</Route>
					<Route path={routeNames.newRoute} element={<NewGame />} />
				</Route>
				<Route path={routeNames.questionIndex}>
					<Route path={routeNames.newRoute} element={<NewQuestion />} />
				</Route>
			</Route>
		</Route>
		<Route path={routeNames.login} element={<Login />} />
		<Route path='*' element={<NotFound />} />
	</RouteGroup>
)
