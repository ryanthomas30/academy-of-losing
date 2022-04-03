
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Page } from '@/components'
import { useGameQuery } from '@/apollo'
import { routeNames } from '@/routing'

type QuestionsRouteParams = {
	gameId: string
	questionNumber: string
}

export const Questions: React.FC = () => {
	const { gameId, questionNumber } = useParams<QuestionsRouteParams>()
	const { data } = useGameQuery({
		variables: {
			gameId: gameId!,
		},
		fetchPolicy: 'cache-only',
		skip: !gameId,
	})

	const questions = useMemo(() => data?.game.team.questions ?? [], [data])
	const numberOfQuestions = questions.length

	if (numberOfQuestions === 0 || gameId === undefined || questionNumber === undefined) {
		return (
			<Navigate
				to={routeNames.home}
				replace
			/>
		)
	}

	if (isNaN(parseInt(questionNumber)) || parseInt(questionNumber) < 0 || parseInt(questionNumber) > numberOfQuestions - 1) {
		return (
			<Navigate
				to={routeNames.game(gameId, true)}
				replace
			/>
		)
	}

	const question = questions[parseInt(questionNumber)]

	return (
		<Page
			center
			paddingTop='large'
			paddingHorizontal='medium'
		>
			{JSON.stringify(question)}
		</Page>
	)
}
