import { Page, LoadingBoundary, GameCards, Row, CommentText, Text } from '@/components'
import { useMeQuery } from '@/apollo'
import { theme } from '@/constants'

export const Home: React.FC = () => {
	const { data, loading } = useMeQuery({
		fetchPolicy: 'no-cache',
	})

	const games = data?.me.games.map(game => ({
		...game,
		questions: game.team.questions,
	})) ?? []

	return (
		<Page
			center
			paddingTop='large'
			paddingHorizontal='medium'
		>
			<Row paddingBottom='medium'>
				<CommentText
					multiline
					size={24}
				>
					Games
				</CommentText>
			</Row>
			<LoadingBoundary
				loading={loading}
			>
				<GameCards games={games} />
				{games.length === 0 && <Text color={theme.color.gray5}>No one wants to play games with you</Text>}
			</LoadingBoundary>
		</Page>
	)
}
