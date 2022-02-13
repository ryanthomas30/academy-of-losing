/* React */
import React from 'react'
import ReactDOM from 'react-dom'

/* React-Router */
import { BrowserRouter } from 'react-router-dom'

/* Apollo */
import { apolloClient } from './apollo'
import { ApolloProvider } from '@apollo/client'

/* Firebase */
import Firebase, { FirebaseProvider } from './firebase'

/* Stylesheet */
import './styles/index.scss'

/* Root Component */
import App from './App'

/* Web Vitals */
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<FirebaseProvider value={new Firebase()}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</FirebaseProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
