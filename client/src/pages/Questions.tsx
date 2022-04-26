
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import {
	Button,
	Flexbox,
	Row,
	Text,
	ProgressTracker,
	QuestionStatus,
	Question,
} from '@/components'
import { useGameQuery } from '@/apollo'
import { routeNames } from '@/routing'

type QuestionsRouteParams = {
	gameId: string
	questionNumber: string
}

export const Questions: React.FC = () => {
	const { gameId, questionNumber } = useParams<QuestionsRouteParams>()
	const navigate = useNavigate()
	const { data } = useGameQuery({
		variables: {
			gameId: gameId!,
		},
		fetchPolicy: 'cache-only',
		skip: !gameId,
	})

	const questions = data?.game.team.questions ?? []
	const isGameCompleted = questions.every(q => q.isCorrect)
	const team = data?.game.team
	const otherTeams = data?.game.teams.filter((t) => t.id !== team?.id) ?? []
	const numberOfQuestions = questions.length

	if (isGameCompleted) {
		return (
			<Navigate
				to={routeNames.game(gameId, true)}
			/>
		)
	}

	if (numberOfQuestions === 0 || gameId === undefined || questionNumber === undefined) {
		return (
			<Navigate
				to={routeNames.home}
				replace
			/>
		)
	}

	const questionIdx = parseInt(questionNumber)

	if (isNaN(questionIdx) || questionIdx < 0 || questionIdx > numberOfQuestions - 1) {
		return (
			<Navigate
				to={routeNames.game(gameId, true)}
				replace
			/>
		)
	}

	const onLastQuestion = questionIdx === numberOfQuestions - 1
	const onFirstQuestion = questionIdx === 0

	const goToQuestion = (questionNumber: number) => {
		navigate(routeNames.gameQuestion(gameId, `${questionNumber}`))
	}

	const nextQuestion = () => {
		if (!onLastQuestion) goToQuestion(questionIdx + 1)
	}

	const previousQuestion = () => {
		if (!onFirstQuestion) goToQuestion(questionIdx - 1)
	}

	const questionStatuses = (): QuestionStatus[] => questions.map((q, i) => ({
		isCompleted: q.isCorrect,
		questionId: q.id,
		questionNumber: i,
	}))

	const otherTeamsWithStatus = () => otherTeams.map((team) => ({
		...team,
		questionStatuses: team.questions.map((q, i) => ({
			isCompleted: q.isCorrect,
			questionId: q.id,
			questionNumber: i,
		})),
	}))

	const question = questions[questionIdx]

	return (
		<Flexbox
			center
			full
			marginBetween='large'
		>
			<NavigationButtonContainer
				justify={onFirstQuestion ? 'end' : 'between'}
				marginBetween='small'
				maxWidth={750}
			>
				{!onFirstQuestion && (
					<Button
						small
						onClick={previousQuestion}
					>
						Previous Question
					</Button>
				)}
				{!onLastQuestion && (
					<Button
						small
						primary
						onClick={nextQuestion}
					>
						Next Question
					</Button>
				)}
			</NavigationButtonContainer>
			<Question
				question={question}
				questionNumber={questionIdx}
				teamId={team?.id}
			/>
			<Flexbox
				marginBetween='small'
				center
			>
				<Text size={12}>{`Your team's progress (${team?.name})`}</Text>
				<ProgressTracker
					questionStatuses={questionStatuses()}
					currentQuestionNumber={questionIdx}
					gameId={gameId}
				/>

			</Flexbox>
			<Flexbox
				center
				full='horizontal'
				marginBetween='medium'
			>
				{otherTeamsWithStatus().map((team) => (
					<Flexbox
						key={team.id}
						marginBetween='small'
						center
					>
						<Text size={12}>{team.name}</Text>
						<ProgressTracker
							questionStatuses={team.questionStatuses}
						/>
					</Flexbox>
				))}
			</Flexbox>
		</Flexbox>
	)
}

const NavigationButtonContainer = styled(Row)`
`
