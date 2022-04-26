import { useParams, Outlet, Navigate } from 'react-router-dom'
import { Page, CommentText, LoadingBoundary, GameStatus } from '@/components'
import { useGameQuery } from '@/apollo'
import { routeNames } from '@/routing'

type GameRouteParams = {
	gameId: string
}

export const Game: React.FC = () => {
	const { gameId } = useParams<GameRouteParams>()
	const { loading, error } = useGameQuery({
		variables: {
			gameId: gameId!,
		},
		pollInterval: 1000 * 5,
		skip: !gameId,
	})
	if (error) {
		<CommentText multiline>
			Something went horribly wrong
		</CommentText>
	}
	return (
		<Page
			center
			paddingBottom='medium'
			paddingHorizontal='medium'
		>
			<LoadingBoundary loading={loading}>
				<Outlet />
			</LoadingBoundary>
		</Page>
	)
}

export const GameIndex: React.FC = () => {
	const { gameId } = useParams<GameRouteParams>()
	const { data } = useGameQuery({
		variables: {
			gameId: gameId!,
		},
		fetchPolicy: 'cache-only',
		skip: !gameId,
	})

	const questions = data?.game.team.questions ?? []
	const isGameCompleted = questions.every(q => q.isCorrect)
	const currentTeam = data?.game.team
	const teams = data?.game.teams ?? []

	if (!isGameCompleted) {
		return (
			<Navigate
				to={routeNames.question('0')}
				replace
			/>
		)
	}

	return (
		<GameStatus
			teams={teams}
			currentTeam={currentTeam}
		/>
	)
}
