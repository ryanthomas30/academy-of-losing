import { Button, Layout, Row, Flexbox } from '@/components'
import { useFirebase } from '@/firebase'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
	const firebase = useFirebase()

	const handleSignOut = () => {
		firebase.signOut()
	}
	return (
		<Layout>
			<Row
				justify='end'
				paddingHorizontal='large'
				paddingTop='medium'
				paddingBottom='large'
			>
				<Button onClick={handleSignOut}>Logout</Button>
			</Row>
			<Flexbox center>
				<Outlet />
			</Flexbox>
		</Layout>
	)
}
