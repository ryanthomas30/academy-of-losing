
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { Flexbox, Form, FormButton, Row, StringText, Text, TextInput } from '@/components'
import { useAnswerQuestionMutation, GameQuery } from '@/apollo'
import { theme } from '@/constants'
import { getRandomColor, getWrongAnswerPhrases } from '@/util'

interface QuestionProps {
	questionNumber: number
	question: GameQuery['game']['team']['questions'][number]
	teamId?: string
	goToNextQuestion: () => void
}

interface FormValues {
	answer: string
}

const InitialFormValues: FormValues = {
	answer: '',
}

const formSchema = Yup.object().shape({
	answer: Yup.string().required('Required'),
})

export const Question: React.FC<QuestionProps> = ({ questionNumber, question, teamId, goToNextQuestion }) => {
	const [wrongAnswerMessage, setWrongAnswerMessage] = useState<string>('')
	const [answerQuestion, { loading: answerQuestionLoading }] = useAnswerQuestionMutation()

	useEffect(() => {
		setWrongAnswerMessage('')
	}, [questionNumber])

	const onFormSubmit = async ({ answer }: FormValues) => {
		try {
			if (!teamId) return
			const { data } = await answerQuestion({
				variables: {
					answer: answer.trim(),
					questionId: question.questionId,
					teamId: teamId,
				},
			})
			if (data?.answerQuestion.isCorrect === false) {
				setWrongAnswerMessage(getWrongAnswerPhrases())
			} else {
				setWrongAnswerMessage('')
			}
		} catch (e) {
			console.warn(e)
		}
	}

	return (
		<Flexbox
			center
			full
			marginBetween='large'
		>
			<QuestionHeader
				center
			>
				<Row center>
					<Text
						size={18}
						color={getRandomColor()}
					>
						Question
					</Text>
					&nbsp;
					<Text
						size={18}
						color={getRandomColor()}
					>
						{questionNumber + 1}
					</Text>
				</Row>
			</QuestionHeader>
			<ContentContainer
				center
				full
				marginBetween='medium'
			>
				<Flexbox
					align='center'
					marginBetween='small'
				>
					<Text
						fontWeight='bold'
						color={theme.color.yellow}
						size={32}
					>
						{question.title}
					</Text>
					<StringText size={14}>{question.description}</StringText>
				</Flexbox>
				{question.image?.url && <QuestionImage src={question.image.url} />}
			</ContentContainer>
			<FormContainer
				full
				center
				maxWidth={400}
				marginBetween='medium'
			>
				{!question.isCorrect && (
					<Form
						initialValues={InitialFormValues}
						validationSchema={formSchema}
						onSubmit={onFormSubmit}
						validateOnBlur={false}
						validateOnChange={false}
					>
						<Flexbox
							marginBetween='medium'
							paddingBottom='medium'
						>
							<TextInput
								label='Answer'
								name='answer'
								placeholder='Submit your answer'
								autoFocus
								key={questionNumber}
							/>
						</Flexbox>
						<FormButton
							primary
							disabled={answerQuestionLoading}
						>
							Submit
						</FormButton>
					</Form>
				)}
				{question.isCorrect && (
					<CorrectAnswerBanner
						onClick={goToNextQuestion}
						center
					>
						<Text size={14}>
							Correct
						</Text>
						<Text size={10}>Click to continue</Text>
					</CorrectAnswerBanner>
				)}
				{wrongAnswerMessage && (
					<WrongAnswerBanner
						center
					>
						{wrongAnswerMessage}
					</WrongAnswerBanner>
				)}
			</FormContainer>
		</Flexbox>
	)
}

const QuestionImage = styled.img`
	object-fit: cover;
	object-position: center;
	max-width: 100%;
	max-height: 350px;
	width: auto;
	height: auto;
`

const QuestionHeader = styled(Row)`
`

const ContentContainer = styled(Flexbox)`
	position: relative;
`

const FormContainer = styled(Flexbox)`
`

const CorrectAnswerBanner = styled(Flexbox)`
	border-radius: ${theme.borderRadius};
	background-color: ${theme.color.darkGreen};
	color: ${theme.color.white};
	height: 44px;
	width: 100%;
`

const WrongAnswerBanner = styled(CorrectAnswerBanner)`
	background-color: ${theme.color.red};
`

