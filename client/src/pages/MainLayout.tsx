import { useMeQuery } from '@/apollo'
import { Button, Layout, Row, Flexbox, Avatar } from '@/components'
import { useFirebase } from '@/firebase'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
	const firebase = useFirebase()
	const { data } = useMeQuery()
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
				marginBetween='medium'
			>
				<Button
					onClick={handleSignOut}
				>
					Logout
				</Button>
				{data?.me.photoUrl && <Avatar src={data?.me.photoUrl} />}
			</Row>
			<Flexbox center>
				<Outlet />
			</Flexbox>
		</Layout>
	)
}
