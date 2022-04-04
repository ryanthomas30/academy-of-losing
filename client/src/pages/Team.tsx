import { Avatar, Text, CommentText, Flexbox, LoadingBoundary, Page, Row } from '@/components'
import { useParams } from 'react-router-dom'
import { useUsersQuery } from '@/apollo'
import styled from 'styled-components'
import { theme } from '@/constants'

type TeamRouteParams = {
	teamId: string
}

export const Team: React.FC = () => {
	const { teamId } = useParams<TeamRouteParams>()
	console.log('teamId:', teamId)

	const { data, loading, error } = useUsersQuery()

	if (error) {
		<CommentText multiline>
			Something went horribly wrong
		</CommentText>
	}

	const userAvatars = () => users.map((user) => (
		<UserCard
			direction='row'
			center
			marginBetween='small'
			padding='medium'
			key={user.id}
		>
			<Avatar
				src={user.photoUrl!}
				size={24}
			/>
			<Text size={12}>{user.fullName}</Text>
		</UserCard>
	))

	const users = data?.users ?? []

	return (
		<Page
			center
			paddingTop='large'
			paddingHorizontal='medium'
			marginBetween='large'
		>
			<Row
				paddingBottom='medium'
				justify='between'
			>
				<CommentText
					multiline
					size={18}
				>
					Users
				</CommentText>
			</Row>
			<LoadingBoundary loading={loading}>
				<Flexbox
					direction='row'
					marginBetween='medium'
				>
					{userAvatars()}
				</Flexbox>
			</LoadingBoundary>
		</Page>
	)
}

const UserCard = styled(Flexbox)`
	background-color: ${theme.color.foreground};
	border-radius: ${theme.borderRadius};
`
