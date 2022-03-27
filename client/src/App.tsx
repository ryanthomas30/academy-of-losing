import styled from 'styled-components'

import { Flexbox } from './components'
import { AuthProvider, useFirebaseAuthListener } from './firebase'
import { Routes } from './routing/Routes'

const App = () => {
	const firebaseUser = useFirebaseAuthListener()
	return (
		<AuthProvider value={firebaseUser}>
			<AppContainer
				className='app'
				justify='center'
				align='center'
			>
				<Routes />
			</AppContainer>
		</AuthProvider>
	)
}

const AppContainer = styled(Flexbox)`
	height: 100vh;
	max-width: 100%;
	width: 100vw;
`

export default App
