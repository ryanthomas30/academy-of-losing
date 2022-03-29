import { User } from 'firebase/auth'

const AUTH_USER = 'authUser'
const TOKEN = 'academy_of_losing_token'
const LOGIN_REDIRECT = 'login_redirect'

/* Auth User */
export const storeAuthUser = (authUser: User) => {
	localStorage.setItem(AUTH_USER, JSON.stringify(authUser))
}

export const getAuthUser = (): User | null => {
	const authUserString = localStorage.getItem(AUTH_USER)
	return authUserString ? JSON.parse(authUserString) : null
}

export const removeAuthUser = () => {
	localStorage.removeItem(AUTH_USER)
}

/* Token */
export const setToken = (token: string) => {
	localStorage.setItem(TOKEN, token)
}

export const getToken = (): string | null => localStorage.getItem(TOKEN)

export const removeToken = () => localStorage.removeItem(TOKEN)

/* Login Redirect */
export const setLoginRedirect = (path: string) => {
	localStorage.setItem(LOGIN_REDIRECT, path)
}

export const getLoginRedirect = () => localStorage.getItem(LOGIN_REDIRECT)

