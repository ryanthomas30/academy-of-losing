import { Avatar, Text, Flexbox } from '@/components'
import { useAddUserToTeamMutation, useRemoveUserFromTeamMutation, AdminGameDocument, UsersQuery, AdminGameQuery } from '@/apollo'
import styled from 'styled-components'
import { theme } from '@/constants'

interface UserCardProps {
	teamId: string
	isInThisTeam: boolean
	user: UsersQuery['users'][number]
	team?: AdminGameQuery['game']['teams'][number]
}

export const UserCard: React.FC<UserCardProps> = ({ teamId, user, isInThisTeam, team }) => {
	const [addUserToTeam, { loading: addUserLoading }] = useAddUserToTeamMutation()
	const [removeUserFromTeam, { loading: removeUserLoading }] = useRemoveUserFromTeamMutation()

	const mutationsLoading = addUserLoading || removeUserLoading

	const handleCardClick = async () => {
		if (mutationsLoading) return
		if (isInThisTeam) {
			await removeUserFromTeam({
				variables: {
					teamId: teamId!,
					userId: user.id,
				},
				refetchQueries: [AdminGameDocument],
			})
		} else {
			await addUserToTeam({
				variables: {
					teamId: teamId!,
					userId: user.id,
				},
				refetchQueries: [AdminGameDocument],
			})
		}
	}
	const teamTextColor = (): string => {
		if (mutationsLoading) return theme.color.commentText
		if (!team) return theme.color.gray5
		if (!isInThisTeam) return theme.color.white
		return theme.color.teal
	}

	const teamText = (): string => {
		if (mutationsLoading) return ' /* Loading */'
		if (!team) return 'Not in Game'
		if (!isInThisTeam) return team.name
		return 'On this team'
	}

	return (
		<UserCardContainer
			center
			padding='medium'
			key={user.id}
			marginBetween='small'
			onClick={handleCardClick}
		>
			<Flexbox
				direction='row'
				marginBetween='small'
				center
			>
				<Avatar
					src={user.photoUrl!}
					size={28}
				/>
				<Text size={14}>{user.fullName}</Text>
			</Flexbox>
			<Text
				size={12}
				color={teamTextColor()}
			>
				{teamText()}
			</Text>
		</UserCardContainer>
	)
}

const UserCardContainer = styled(Flexbox)`
	background-color: ${theme.color.foreground};
	border-radius: ${theme.borderRadius};
	user-select: none;
`
