import { useState } from 'react'

import { Button, CardQuestion, CommentText, Flexbox, LoadingBoundary, Page, QuestionCards, Row, TeamCards, Text, GameStatus } from '@/components'
import { Outlet, useOutlet, useParams } from 'react-router-dom'
import { useAdminGameQuery, useQuestionsQuery } from '@/apollo'
import { routeNames } from '@/routing'
import { theme } from '@/constants'

type GameEditorRouteParams = {
	gameId: string
}

export const GameEditor: React.FC = () => {
	const hasOutlet = !!useOutlet()
	const { gameId } = useParams<GameEditorRouteParams>()
	const [showGameStatus, setShowGameStatus] = useState<boolean>(false)
	const { data, error, loading } = useAdminGameQuery({
		variables: {
			gameId: gameId!,
		},
		pollInterval: showGameStatus ? 1000 * 1 : 0,
		skip: !gameId,
	})

	const { data: questionsData, loading: questionsLoading, error: questionsError } = useQuestionsQuery({
		fetchPolicy: 'network-only',
	})

	if (error || questionsError) {
		<CommentText multiline>
			Something went horribly wrong
		</CommentText>
	}

	const game = data?.game
	const teams = game?.teams ?? []
	const gameQuestionIds = game?.questions.map((question) => question.id) ?? []
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
			paddingVertical='large'
			paddingHorizontal='medium'
			marginBetween='large'
		>
			<Row justify='between'>
				<Text
					size={28}
					color={theme.color.yellow}
				>
					{game?.name}
				</Text>
				<Flexbox
					direction='row'
					align='center'
					marginBetween='medium'
				>
					<Button
						onClick={() => setShowGameStatus(!showGameStatus)}
						primary
					>
						{`${showGameStatus ? 'Hide' : 'Show'} Game Status`}
					</Button>
					<Button
						to={`/${routeNames.adminHome}`}
					>
						Back to Admin Panel Home
					</Button>
				</Flexbox>
			</Row>
			{showGameStatus && <GameStatus teams={teams} />}
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
