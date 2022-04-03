import { Page, LoadingBoundary, Button, Row, CommentText, GameCards, Flexbox } from '@/components'
import { useGamesQuery } from '@/apollo'
import { routeNames } from '@/routing'

export const AdminHome: React.FC = () => {
	const { data: gamesData, loading: gamesLoading } = useGamesQuery()

	const games = gamesData?.games ?? []

	return (
		<Page
			center
			paddingVertical='large'
			paddingHorizontal='medium'
		>
			<Flexbox full>
				<Row
					paddingBottom='medium'
					justify='between'
				>
					<CommentText
						multiline
						size={24}
					>
						Games
					</CommentText>
					<Button
						to={routeNames.newGame()}
						primary
					>
						Create Game
					</Button>
				</Row>
				<LoadingBoundary
					loading={gamesLoading}
				>
					<GameCards games={games} />
				</LoadingBoundary>
			</Flexbox>
		</Page>
	)
}
