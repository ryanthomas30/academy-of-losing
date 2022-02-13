import { initializeApp } from 'firebase/app'
import { Analytics, getAnalytics } from 'firebase/analytics'
import {
	GoogleAuthProvider,
	getAuth,
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	sendPasswordResetEmail,
	updatePassword,
	signOut,
	getIdToken,
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDXqQtnn8hjcII6jPCcIFUhPjUfneQP7TY',
	authDomain: 'academy-of-losing.firebaseapp.com',
	projectId: 'academy-of-losing',
	storageBucket: 'academy-of-losing.appspot.com',
	messagingSenderId: '692579933621',
	appId: '1:692579933621:web:8d55be0a8ab56e990c8dfc',
	measurementId: 'G-V8EQLT9VTD',
}

class Firebase {
	auth: Auth
	googleProvider: GoogleAuthProvider
	analytics: Analytics

	constructor() {
		const app = initializeApp(firebaseConfig)
		this.analytics = getAnalytics(app)

		this.auth = getAuth()

		this.googleProvider = new GoogleAuthProvider()
	}

	createUserWithEmailAndPassword(email: string, password: string) {
		return createUserWithEmailAndPassword(this.auth, email, password)
	}

	signInWithEmailAndPassword(email: string, password: string) {
		return signInWithEmailAndPassword(this.auth, email, password)
	}

	googleSignIn() {
		return signInWithPopup(this.auth, this.googleProvider)
	}

	signOut() {
		return signOut(this.auth)
	}

	sendPasswordResetEmail(email: string) {
		return sendPasswordResetEmail(this.auth, email)
	}

	updatePassword(newPassword: string) {
		if (this.auth.currentUser) return updatePassword(this.auth.currentUser, newPassword)
		return new Promise<void>((resolve) => resolve())
	}

	getToken() {
		if (this.auth.currentUser) return getIdToken(this.auth.currentUser)
		return new Promise<string>((resolve) => resolve(''))
	}

}
export default Firebase
