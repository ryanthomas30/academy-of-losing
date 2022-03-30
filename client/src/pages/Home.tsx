import { Page, LoadingBoundary, GameCards, Row, CommentText } from '@/components'
import { useMeQuery } from '@/apollo'

export const Home: React.FC = () => {
	const { data, loading } = useMeQuery()

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
				<GameCards games={data?.me.games ?? []} />
			</LoadingBoundary>
		</Page>
	)
}
