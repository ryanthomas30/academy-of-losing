import { Page, LoadingBoundary, Button, Row, CommentText, GameCards, Flexbox, QuestionCards, Text } from '@/components'
import { useGamesQuery, useQuestionsQuery } from '@/apollo'
import { routeNames } from '@/routing'
import { theme } from '@/constants'

export const AdminHome: React.FC = () => {
	const { data: gamesData, loading: gamesLoading } = useGamesQuery()
	const { data: questionsData, loading: questionsLoading } = useQuestionsQuery()

	const games = gamesData?.games ?? []
	const questions = questionsData?.questions ?? []

	return (
		<Page
			center
			paddingVertical='large'
			paddingHorizontal='medium'
			marginBetween='large'
		>
			<Flexbox
				full
				center
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
					loading={gamesLoading}
				>
					<GameCards games={games} />
					{games.length === 0 && <Text color={theme.color.gray5}>No games yet...</Text>}
				</LoadingBoundary>
			</Flexbox>
			<Flexbox
				full
				center
			>
				<Row
					paddingBottom='medium'
					justify='between'
				>
					<CommentText
						multiline
						size={24}
					>
						Questions
					</CommentText>
					<Button
						to={routeNames.newQuestion()}
						primary
					>
						Create Question
					</Button>
				</Row>
				<LoadingBoundary loading={questionsLoading}>
					<QuestionCards
						questions={questions}
					/>
					{questions.length === 0 && <Text color={theme.color.gray5}>No questions yet...</Text>}
				</LoadingBoundary>
			</Flexbox>
		</Page>
	)
}
