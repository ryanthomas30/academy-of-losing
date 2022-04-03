import { GameQuestion } from '@/apollo'

import { QuestionCard } from './QuestionCard'
import { CardsContainer } from '../common'

export interface CardQuestion extends GameQuestion {
	isInGame?: boolean
}

export interface QuestionCardsProps {
	questions: CardQuestion[]
	gameId: string
}

export const QuestionCards: React.FC<QuestionCardsProps> = ({ questions, gameId }) => {
	const questionCards = () => questions.map((question) => (
		<QuestionCard
			question={question}
			gameId={gameId}
			key={question.id}
		/>
	))

	return (
		<CardsContainer>
			{questionCards()}
		</CardsContainer>
	)
}

