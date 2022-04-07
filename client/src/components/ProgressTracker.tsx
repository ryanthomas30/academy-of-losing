import { theme } from '@/constants'
import { routeNames } from '@/routing'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Flexbox } from './common'

export interface QuestionStatus {
	questionNumber: number
	questionId: string
	isCompleted: boolean
}

export interface ProgressTrackerProps {
	questionStatuses: QuestionStatus[]
	currentQuestionNumber?: number
	gameId?: string
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ questionStatuses, currentQuestionNumber, gameId }) => {
	const navigate = useNavigate()

	const goToQuestion = (questionNumber: number) => {
		if (!gameId) return
		navigate(routeNames.gameQuestion(gameId, `${questionNumber}`))
	}

	return (
		<ProgressContainer count={2 * questionStatuses.length - 1}>
			{questionStatuses.map(({ questionId, isCompleted, questionNumber }, i) => {
				const nextQuestionStatus = (questionStatuses[i + 1] as QuestionStatus | undefined)
				const nextQuestionStatusExists = !!nextQuestionStatus
				const nextQuestionStatusCorrect = !!nextQuestionStatus?.isCompleted
				return (
					<React.Fragment key={questionId}>
						<ProgressNode
							isCompleted={isCompleted}
							active={currentQuestionNumber === questionNumber}
							onClick={gameId ? () => goToQuestion(questionNumber) : undefined}
						/>
						{nextQuestionStatusExists && (
							<ProgressVertex
								isCompleted={nextQuestionStatusCorrect && isCompleted}
							/>
						)}
					</React.Fragment>
				)
			})}
		</ProgressContainer>
	)
}

interface ProgressContainerProps {
	count: number
}

export const ProgressContainer = styled.div<ProgressContainerProps>`
	/* width: 100%; */
	display: grid;
	grid-template-columns: ${({ count }) => `repeat(${count}, 1fr)`};
`

interface ProgressNodeProps {
	isCompleted: boolean
	active: boolean
}

const ProgressNode = styled(Flexbox) <ProgressNodeProps>`
	content: '';
	height: 36px;
	width: 36px;
	border-radius: 50%;
	justify-self: center;
	align-self: center;
	z-index: 10;
	border: ${({ isCompleted }) => `4px solid ${isCompleted ? theme.color.darkGreen : theme.color.gray3}`};
	background-color: ${({ isCompleted, active }) => {
		if (!active) return 'transparent'
		if (isCompleted) return theme.color.darkGreen
		return theme.color.gray4
	}};
`

interface ProgressVertexProps {
	isCompleted: boolean
}

const ProgressVertex = styled.div<ProgressVertexProps>`
	content: '';
	width: 110%;
	height: 12px;
	justify-self: center;
	align-self: center;
	background-color: ${({ isCompleted }) => isCompleted ? theme.color.darkGreen : theme.color.gray3};
`
