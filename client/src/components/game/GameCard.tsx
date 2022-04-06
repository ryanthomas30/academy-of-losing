import { theme } from '@/constants'
import { routeNames } from '@/routing'

import { Text, Card, Link } from '../common'
import { CardGame } from './GameCards'

export interface GameCardProps {
	game: CardGame
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
	const { name, id, questions } = game
	const numberOfQuestions = questions.length
	const showProgress = questions.some(question => typeof question.isCorrect === 'boolean')
	const questionsCompleted = questions.reduce((acc, question) => question.isCorrect ? acc + 1 : acc, 0)
	const isNotStarted = questionsCompleted === 0
	const isCompleted = questionsCompleted === numberOfQuestions

	const getCompletionText = (): string => {
		if (isNotStarted) return 'Not Started'
		if (isCompleted) return 'Completed'
		return 'In Progress'
	}

	const getCompletionTextColor = (): string => {
		if (isNotStarted) return theme.color.gray5
		if (isCompleted) return theme.color.teal
		return theme.color.yellow
	}

	return (
		<Link to={routeNames.game(id)}>
			<Card
				center
				height={150}
				padding='medium'
				hover
				marginBetween='xs'
			>
				<Text size={18}>{name}</Text>
				<Text size={10}>
					{`Questions: ${numberOfQuestions}`}
				</Text>
				{showProgress && (
					<Text
						color={getCompletionTextColor()}
						size={10}
					>
						{getCompletionText()}
					</Text>
				)}
			</Card>
		</Link>
	)
}
