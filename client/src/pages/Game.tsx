import { useParams, Outlet, Navigate } from 'react-router-dom'
import { Page, CommentText, LoadingBoundary } from '@/components'
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
		pollInterval: 1000 * 10,
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

export const GameIndex: React.FC = () => (
	<Navigate
		to={routeNames.question('0')}
		replace
	/>
)
