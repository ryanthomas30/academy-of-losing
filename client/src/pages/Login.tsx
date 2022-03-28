// import { useFirebase } from '@/firebase'
import { Flexbox, LoginButton } from '@/components'

export const Login = () => {
	// const firebase = useFirebase()
	// const [createUser] = useMutation<CreateUser, CreateUserVariables>(CREATE_USER)

	const onLogin = async () => {
		console.log('LOGIN')
		// const userCredentials = await firebase.googleSignIn()

		// if (additionalUserInfo?.isNewUser && user) {

		// }
	}

	return (
		<Flexbox
			align='center'
			justify='center'
			padding='medium'
			full
		>
			<LoginButton
				onClick={onLogin}
			/>
		</Flexbox>
	)
}
