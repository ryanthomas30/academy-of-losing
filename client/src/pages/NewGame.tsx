import { Page, Form, Flexbox, TextInput, Text, FormButton, Row } from '@/components'
import { useCreateGameMutation } from '@/apollo'
import { theme } from '@/constants'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { routeNames } from '@/routing'

interface FormValues {
	name: string
}

const InitialFormValues: FormValues = {
	name: '',
}

const formSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
})

export const NewGame: React.FC = () => {

	const [createGame, { loading, error }] = useCreateGameMutation()
	const navigate = useNavigate()

	const onFormSubmit = async ({ name }: FormValues) => {
		try {
			const { data } = await createGame({
				variables: {
					newGame: {
						name,
					},
				},
			})
			navigate(`/${routeNames.adminHome}${routeNames.game(data?.createGame.id, true)}`)
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
			>
				<Form
					initialValues={InitialFormValues}
					validationSchema={formSchema}
					validateOnBlur
					onSubmit={onFormSubmit}
				>
					<Flexbox
						marginBetween='small'
						paddingBottom='medium'
					>
						<TextInput
							label='Game Name'
							name='name'
							placeholder='Uhhh, guys? This game needs a name.'
						/>
					</Flexbox>
					<FormButton
						primary
						disabled={loading}
					>
						Create Game
					</FormButton>
				</Form>
			</Flexbox>
		</Page>
	)
}
