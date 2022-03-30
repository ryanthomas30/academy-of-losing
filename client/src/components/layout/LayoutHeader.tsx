import { useMatch } from 'react-router-dom'
import { useFirebase } from '@/firebase'
import { routeNames } from '@/routing'
import { Row, Flexbox, Button, Avatar, Link, StringText } from '../common'
import { getRandomPhrase } from '@/util'

export interface LayoutHeaderProps {
	isAdmin?: boolean
	photoUrl?: string | null
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({ isAdmin, photoUrl }) => {
	const firebase = useFirebase()
	const isAdminPanel = !!useMatch(routeNames.adminHome)
	const showAdminPanelButton = isAdmin && !isAdminPanel

	const handleSignOut = () => {
		firebase.signOut()
	}
	return (
		<Row
			justify='between'
			paddingHorizontal='large'
			paddingTop='medium'
			paddingBottom='large'
		>
			<Flexbox
				marginBetween='medium'
				direction='row'
				align='center'
			>
				<Link to={routeNames.home}>
					<h2>
						Academy of Losing
					</h2>
				</Link>
				<StringText>
					{getRandomPhrase()}
				</StringText>
			</Flexbox>
			<Flexbox
				marginBetween='medium'
				direction='row'
				align='center'
			>
				{showAdminPanelButton && (
					<Button
						to={routeNames.adminHome}
						primary
					>
						Admin Panel
					</Button>
				)}
				<Button
					onClick={handleSignOut}
				>
					Logout
				</Button>
				{photoUrl && <Avatar src={photoUrl} />}
			</Flexbox>
		</Row>
	)
}
