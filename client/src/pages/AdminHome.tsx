import { Page, LoadingBoundary, Button, Row, CommentText, GameCards } from '@/components'
import { useGamesQuery } from '@/apollo'
import { routeNames } from '@/routing'

export const AdminHome: React.FC = () => {
	const { data, loading } = useGamesQuery()

	return (
		<Page
			center
			paddingTop='large'
			paddingHorizontal='medium'
		>
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
				loading={loading}
			>
				<GameCards games={data?.games ?? []} />
			</LoadingBoundary>
		</Page>
	)
}
