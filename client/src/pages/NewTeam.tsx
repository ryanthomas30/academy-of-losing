import { Page, Form, Flexbox, TextInput, Text, FormButton, Row } from '@/components'
import { AdminGameDocument, useCreateTeamMutation } from '@/apollo'
import { theme } from '@/constants'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { routeNames } from '@/routing'

type NewTeamRouteParams = {
	gameId: string
}

interface FormValues {
	name: string
}

const InitialFormValues: FormValues = {
	name: '',
}

const formSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
})

export const NewTeam: React.FC = () => {
	const { gameId } = useParams<NewTeamRouteParams>()
	const [createTeam, { loading, error }] = useCreateTeamMutation()
	const navigate = useNavigate()

	const onFormSubmit = async ({ name }: FormValues) => {
		try {
			await createTeam({
				variables: {
					gameId: gameId!,
					newTeam: {
						name: name.trim(),
					},
				},
				refetchQueries: [AdminGameDocument],
			})
			navigate(`/${routeNames.adminHome}/${routeNames.game(gameId)}`)
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
						marginBetween='medium'
						paddingBottom='medium'
					>
						<TextInput
							label='Team Name'
							name='name'
							placeholder='Make a nutty team name'
						/>
					</Flexbox>
					<FormButton
						primary
						disabled={loading}
					>
						Create Team
					</FormButton>
				</Form>
			</Flexbox>
		</Page>
	)
}
