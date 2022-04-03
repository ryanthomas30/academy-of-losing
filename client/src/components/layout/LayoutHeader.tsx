import { useMatch } from 'react-router-dom'
import { useFirebase } from '@/firebase'
import { routeNames } from '@/routing'
import { Row, Flexbox, Button, Avatar, Link, StringText } from '../common'
import { getRandomPhrase } from '@/util'
import styled from 'styled-components'
import { theme } from '@/constants'

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

	const randomPhrase = getRandomPhrase()

	return (
		<HeaderContainer
			full='horizontal'
			paddingHorizontal='large'
			paddingVertical='medium'
			marginBottom='large'
		>
			<Row
				justify='between'
			>
				<Flexbox
					marginBetween='medium'
					direction='row'
					align='center'
				>
					<Link to={routeNames.home}>
						<WordMark>
							Academy of Losing
						</WordMark>
						<WordMarkMobile>
							AoL
						</WordMarkMobile>
					</Link>
					<Tagline>
						{randomPhrase}
					</Tagline>
				</Flexbox>
				<ButtonContainer
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
				</ButtonContainer>
				<ButtonContainerMobile
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
				</ButtonContainerMobile>
			</Row>
			<BottomRow
				justify='between'
			>
				<Flexbox
					marginBetween='medium'
					direction='row'
					align='center'
				>
					<StringText>
						{randomPhrase}
					</StringText>
				</Flexbox>
			</BottomRow>
		</HeaderContainer>
	)
}

const WordMark = styled.h2`
	${theme.mediaQuery.tablet} {
		display: none;
	}
`
const WordMarkMobile = styled.h2`
	display: none;
	${theme.mediaQuery.tablet} {
		display: inherit;
	}
`

const Tagline = styled(StringText)`
	${theme.mediaQuery.smallDesktop} {
		display: none;
	}
`

const BottomRow = styled(Row)`
	display: none !important;
	${theme.mediaQuery.smallDesktop} {
		display: inherit !important;
	}
`

const ButtonContainer = styled(Flexbox)`
	${theme.mediaQuery.mobile} {
		display: none !important;
	}
`

const ButtonContainerMobile = styled(Flexbox)`
	display: none !important;
	${theme.mediaQuery.mobile} {
		display: inherit !important;
	}
`

const HeaderContainer = styled(Flexbox)`
	background-color: ${theme.color.foreground};
	position: sticky;
	top: 0px;
	box-shadow: ${theme.boxShadow.small};
`
