import { Page, LoadingBoundary, Button, Row, CommentText, GameCards, Flexbox, QuestionCards } from '@/components'
import { useGamesQuery, useQuestionsQuery } from '@/apollo'
import { routeNames } from '@/routing'

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
			<Flexbox full>
				<Row
					paddingBottom='medium'
					justify='between'
				>
					<CommentText
						multiline
						size={18}
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
				</LoadingBoundary>
			</Flexbox>
		</Page>
	)
}
