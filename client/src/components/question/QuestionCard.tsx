import { useAddQuestionToGameMutation, useRemoveQuestionFromGameMutation } from '@/apollo'
import { theme } from '@/constants'
import styled from 'styled-components'

import { Text, Card } from '../common'
import { CardQuestion } from './QuestionCards'

export interface QuestionCardProps {
	question: CardQuestion
	gameId?: string
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, gameId }) => {
	const { id: questionId, description, title, isInGame, image } = question
	const [addQuestionToGame, { loading: addQuestionLoading }] = useAddQuestionToGameMutation()
	const [removeQuestionFromGame, { loading: removeQuestionLoading }] = useRemoveQuestionFromGameMutation()

	const loading = addQuestionLoading || removeQuestionLoading

	const handleCardClick = async () => {
		if (loading || !gameId) return
		const mutationOptions = {
			variables: {
				gameId,
				questionId,
			},
		}
		if (isInGame) {
			await removeQuestionFromGame(mutationOptions)
		} else {
			await addQuestionToGame(mutationOptions)
		}
	}
	return (
		<Card
			center
			height={150}
			padding='medium'
			marginBetween='small'
			highlight={isInGame}
			onClick={gameId ? handleCardClick : undefined}
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
				<ImageLink
					href={image.url}
					target='_blank'
					rel='noreferrer'
				>
					<Text
						size={10}
						color={theme.color.darkBlue}
					>
						{image.url}
					</Text>
				</ImageLink>
			)}
		</Card>
	)
}

const ImageLink = styled.a`
	text-decoration: none;
`
