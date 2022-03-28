import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'

import { storeAuthUser, getAuthUser, removeAuthUser, setToken, removeToken } from '@/localStorage'

import Firebase from '.'

/* Firebase */
export const FirebaseContext = createContext<Firebase | null>(null)
export const FirebaseProvider = FirebaseContext.Provider
export const FirebaseConsumer = FirebaseContext.Consumer
export const useFirebase = () => useContext(FirebaseContext) as unknown as Firebase

export const useFirebaseAuthListener = () => {
	const [firebaseUser, setFirebaseUser] = useState<User | null>(getAuthUser())
	const firebase = useFirebase()

	useEffect(() => {
		const unsubscribe = firebase.auth.onAuthStateChanged(
			(authUser) => {
				setFirebaseUser(authUser)
				firebase.getToken()?.then((token) => {
					if (authUser && token) {
						storeAuthUser(authUser)
						setToken(token)
					} else {
						removeAuthUser()
						removeToken()
					}
				})
			},
		)
		return () => {
			unsubscribe()
		}
	}, [firebase.auth, firebase])
	return firebaseUser
}
/* Session Management */
export const AuthContext = createContext<User | null>(null)
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer
export const useAuth = () => useContext(AuthContext)
