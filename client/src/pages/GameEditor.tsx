import { Button, CardQuestion, CommentText, Flexbox, LoadingBoundary, Page, QuestionCards, Row, TeamCards } from '@/components'
import { Outlet, useOutlet, useParams } from 'react-router-dom'
import { useAdminGameQuery, useQuestionsQuery } from '@/apollo'
import { routeNames } from '@/routing'

type GameEditorRouteParams = {
	gameId: string
}

export const GameEditor: React.FC = () => {
	const hasOutlet = !!useOutlet()
	const { gameId } = useParams<GameEditorRouteParams>()
	const { data, error, loading } = useAdminGameQuery({
		variables: {
			gameId: gameId!,
		},
		skip: !gameId,
	})

	const { data: questionsData, loading: questionsLoading, error: questionsError } = useQuestionsQuery()

	if (error || questionsError) {
		<CommentText multiline>
			Something went horribly wrong
		</CommentText>
	}

	const teams = data?.game.teams ?? []
	const gameQuestionIds = data?.game.questions.map((question) => question.id) ?? []
	const questions: CardQuestion[] = questionsData?.questions
		.map((question) => ({
			...question,
			isInGame: gameQuestionIds.includes(question.id),
		}))
		?? []

	if (hasOutlet) return <Outlet />

	return (
		<Page
			center
			paddingTop='large'
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
						size={18}
					>
						Teams
					</CommentText>
					<Button
						to={routeNames.newTeam()}
						primary
					>
						Create Team
					</Button>
				</Row>
				<LoadingBoundary loading={loading}>
					<TeamCards
						teams={teams}
						gameId={gameId!}
					/>
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
				</Row>
				<LoadingBoundary loading={questionsLoading}>
					<QuestionCards
						questions={questions}
						gameId={gameId!}
					/>
				</LoadingBoundary>
			</Flexbox>
		</Page>
	)
}
