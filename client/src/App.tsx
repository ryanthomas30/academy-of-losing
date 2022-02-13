import { ThemeProvider } from 'styled-components'

import { Flexbox } from './components'
import { theme } from './constants'

/* Routes */

/* Auth HoC */

import { useFirebaseAuthListener, AuthProvider } from './firebase'

const App = () => {
	const firebaseUser = useFirebaseAuthListener()
	return (
		<AuthProvider value={firebaseUser}>
			<ThemeProvider theme={theme}>
				<Flexbox
					className='app'
					justify='center'
					align='center'
				>
					<h1>
						Alan and Ivan Academy of Losing
					</h1>
				</Flexbox>
			</ThemeProvider>
		</AuthProvider>
	)
}

export default App
