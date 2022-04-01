
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Page } from '@/components'
import { useGameQuery } from '@/apollo'
import { routeNames } from '@/routing'

type QuestionsRouteParams = {
	gameId: string
	questionIndex: string
}

export const Questions: React.FC = () => {
	const { gameId, questionIndex } = useParams<QuestionsRouteParams>()
	const { data } = useGameQuery({
		variables: {
			gameId: gameId!,
		},
		fetchPolicy: 'cache-only',
		skip: !gameId,
	})

	const questions = useMemo(() => data?.game.team.questions ?? [], [data])
	const numberOfQuestions = questions.length

	if (numberOfQuestions === 0 || gameId === undefined || questionIndex === undefined) {
		return (
			<Navigate
				to={routeNames.home}
				replace
			/>
		)
	}

	if (isNaN(parseInt(questionIndex)) || parseInt(questionIndex) < 0 || parseInt(questionIndex) > numberOfQuestions - 1) {
		return (
			<Navigate
				to={routeNames.game(gameId, true)}
				replace
			/>
		)
	}

	const question = questions[parseInt(questionIndex)]

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
