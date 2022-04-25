import React, { useEffect } from 'react'
import { useAuth, useFirebase } from '@/firebase'
import { Flexbox, LoginButton, CommentText, StringText } from '@/components'
import { useCreateUserMutation } from '@/apollo'
import { useNavigate } from 'react-router-dom'
import { routeNames, useLocation } from '@/routing'
import { getRandomZoomiesPhrase } from '@/util'
import { useApolloClient } from '@apollo/client'

export const Login = () => {
	const firebase = useFirebase()
	const [loading, setLoading] = React.useState<boolean>(false)
	const [loginError, setLoginError] = React.useState<string>('')
	const [createUserMutation, { loading: createUserLoading }] = useCreateUserMutation()
	const navigate = useNavigate()
	const location = useLocation()
	const apolloClient = useApolloClient()

	const from = location.state?.from?.pathname || routeNames.home
	const isLoggedIn = !!useAuth()

	useEffect(() => {
		apolloClient.clearStore()
	}, [apolloClient])

	const createUser = (uid: string, email: string, displayName: string) => createUserMutation({
		variables: {
			newUser: {
				id: uid,
				email: email,
				fullName: displayName,
			},
		},
	})

	const onLogin = async () => {
		setLoading(true)
		const userCredential = await firebase.googleSignIn()
		try {
			const additionalUserInfo = firebase.getAdditionalUserInfo(userCredential)
			const { uid, email, displayName } = userCredential.user
			if (!email || !displayName) {
				throw Error
			}
			if (additionalUserInfo?.isNewUser) {
				await createUser(uid, email, displayName)
			}
		} catch (err) {
			await firebase.signOut()
			setLoginError('Uhhhh, guys? Something went wrong when you tried logging in.')
			return
		} finally {
			setLoading(false)
		}
		navigate(from, { replace: true })
	}

	React.useEffect(() => {
		if (isLoggedIn && !loading) {
			navigate(routeNames.home, { replace: true })
		}
	}, [isLoggedIn, loading])

	return (
		<Flexbox
			center
			padding='medium'
			marginBetween='large'
			full
		>
			<Flexbox
				marginBetween='small'
				center
			>
				<h1 style={{ textAlign: 'center' }}>
					The Alan & Ivan Academy of Losing
				</h1>
				<StringText>{getRandomZoomiesPhrase()}</StringText>
			</Flexbox>
			<Flexbox
				marginBetween='medium'
				center
			>
				<LoginButton
					onClick={onLogin}
				/>
				{createUserLoading && (
					<Flexbox>
						<CommentText multiline>Logging you in</CommentText>
					</Flexbox>
				)}
				{loginError && (
					<Flexbox>
						<CommentText multiline>{loginError}</CommentText>
					</Flexbox>
				)}
			</Flexbox>
		</Flexbox>
	)
}
