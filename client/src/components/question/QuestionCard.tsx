import { useAddQuestionToGameMutation, useRemoveQuestionFromGameMutation } from '@/apollo'

import { Text, Card } from '../common'
import { CardQuestion } from './QuestionCards'

export interface QuestionCardProps {
	question: CardQuestion
	gameId: string
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, gameId }) => {
	const { id: questionId, description, title, isInGame, image } = question
	const [addQuestionToGame, { loading: addQuestionLoading }] = useAddQuestionToGameMutation({
		variables: {
			gameId,
			questionId,
		},
	})
	const [removeQuestionFromGame, { loading: removeQuestionLoading }] = useRemoveQuestionFromGameMutation({
		variables: {
			gameId,
			questionId,
		},
	})

	const loading = addQuestionLoading || removeQuestionLoading

	const handleCardClick = async () => {
		if (loading) return
		if (isInGame) {
			await removeQuestionFromGame()
		} else {
			await addQuestionToGame()
		}
	}
	return (
		<Card
			center
			height={150}
			padding='medium'
			marginBetween='small'
			highlight={isInGame}
			onClick={handleCardClick}
		>
			<Text
				size={14}
				textAlign='center'
			>
				{title}
			</Text>
			<Text size={10}>
				{description}
			</Text>
			{image && (
				<Text size={10}>
					{image.url}
				</Text>
			)}
		</Card>
	)
}
