
import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Flexbox, Form, FormButton, Row, StringText, Text, TextInput } from '@/components'
import { useGameQuery, useAnswerQuestionMutation } from '@/apollo'
import { routeNames } from '@/routing'
import styled from 'styled-components'
import * as Yup from 'yup'
import { theme } from '@/constants'
import { getRandomColor, getWrongAnswerPhrases } from '@/util'

type QuestionsRouteParams = {
	gameId: string
	questionNumber: string
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

export const Questions: React.FC = () => {
	const { gameId, questionNumber } = useParams<QuestionsRouteParams>()
	const navigate = useNavigate()
	const [wrongAnswerMessage, setWrongAnswerMessage] = useState<string>('')
	const { data } = useGameQuery({
		variables: {
			gameId: gameId!,
		},
		fetchPolicy: 'cache-only',
		skip: !gameId,
	})
	const [answerQuestion, { loading: answerQuestionLoading }] = useAnswerQuestionMutation()

	const questions = useMemo(() => data?.game.team.questions ?? [], [data])
	const team = data?.game.team
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
	const questionIdx = parseInt(questionNumber)
	const onLastQuestion = questionIdx === numberOfQuestions - 1
	const onFirstQuestion = questionIdx === 0

	const goToQuestion = (questionNumber: number) => {
		setWrongAnswerMessage('')
		navigate(routeNames.gameQuestion(gameId, `${questionNumber}`))
	}

	const nextQuestion = () => {
		if (!onLastQuestion) goToQuestion(questionIdx + 1)
	}

	const previousQuestion = () => {
		if (!onFirstQuestion) goToQuestion(questionIdx - 1)
	}

	const question = questions[questionIdx]

	const onFormSubmit = async ({ answer }: FormValues) => {
		try {
			if (!team?.id) return
			const { data } = await answerQuestion({
				variables: {
					answer: answer.trim(),
					questionId: question.id,
					teamId: team.id,
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
						{questionIdx + 1}
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
						validateOnBlur
						onSubmit={onFormSubmit}
					>
						<Flexbox
							marginBetween='medium'
							paddingBottom='medium'
						>
							<TextInput
								label='Answer'
								name='answer'
								placeholder='Submit your answer'
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
						center
					>
						Correct!
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
`

const NavigationButtonContainer = styled(Row)`
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
