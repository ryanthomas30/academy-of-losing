import { Page, Form, Flexbox, TextInput, Text, FormButton, Row } from '@/components'
import { QuestionsDocument, useCreateQuestionMutation } from '@/apollo'
import { theme } from '@/constants'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { routeNames } from '@/routing'

interface FormValues {
	title: string
	description: string
	answers: string
	imageUrl?: string
}

const InitialFormValues: FormValues = {
	title: '',
	description: '',
	answers: '',
	imageUrl: '',
}

const formSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	answers: Yup.string().required('Required'),
	imageUrl: Yup.string().url(),
})

export const NewQuestion: React.FC = () => {

	const [createQuestion, { loading, error }] = useCreateQuestionMutation()
	const navigate = useNavigate()

	const onFormSubmit = async ({ title, description, answers, imageUrl }: FormValues) => {
		const answerArray = answers.split(',').map((answer) => answer.trim())
		try {
			await createQuestion({
				variables: {
					newQuestion: {
						title: title.trim(),
						description: description.trim(),
						answers: answerArray,
						imageUrl: imageUrl?.trim() || null,
					},
				},
				refetchQueries: [QuestionsDocument],
			})
			navigate(`/${routeNames.adminHome}`)
		} catch (e) {
			console.warn(e)
		}
	}

	return (
		<Page
			center
			paddingTop='large'
			paddingHorizontal='medium'
		>

			<Row center>
				{error && <Text color={theme.color.red}>Something went horribly wrong</Text>}
			</Row>
			<Flexbox
				width={400}
				marginBetween='large'
			>
				<Row>
					<Text
						size={28}
						color={theme.color.yellow}
					>
						New Question
					</Text>
				</Row>
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
							label='Title'
							name='title'
							placeholder='2 + 2'
						/>
						<TextInput
							label='Description'
							name='description'
							placeholder='Do you know basic math?'
						/>
						<TextInput
							label='Answers (Comma Separated)'
							name='answers'
							placeholder='4,four,fore'
						/>
						<TextInput
							label='Image URL (Optional)'
							name='imageUrl'
							placeholder='Optional image for the question'
						/>
					</Flexbox>
					<FormButton
						primary
						disabled={loading}
					>
						Create Question
					</FormButton>
				</Form>
			</Flexbox>
		</Page>
	)
}
