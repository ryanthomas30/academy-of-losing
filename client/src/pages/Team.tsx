import { CommentText, Flexbox, LoadingBoundary, Page, Row, UserCard } from '@/components'
import { useParams } from 'react-router-dom'
import { useAdminGameQuery, useUsersQuery } from '@/apollo'

type TeamRouteParams = {
	teamId: string
	gameId: string
}

export const Team: React.FC = () => {
	const { teamId, gameId } = useParams<TeamRouteParams>()
	const { data: usersData, loading: usersLoading, error: usersError } = useUsersQuery()
	const { data, error, loading } = useAdminGameQuery({
		variables: {
			gameId: gameId!,
		},
		skip: !gameId,
	})

	const queriesLoading = loading || usersLoading

	if (usersError || error) {
		<CommentText multiline>
			Something went horribly wrong
		</CommentText>
	}

	const teams = data?.game.teams ?? []
	const thisTeam = teams.find((team) => team.id === teamId)
	const allUsers = usersData?.users ?? []

	const userCards = () => allUsers.map((user) => {
		const currentTeam = teams.find((team) => team.users.some((teamUser) => teamUser.id === user.id))
		const isInThisTeam = currentTeam?.id === teamId
		return (
			<UserCard
				isInThisTeam={isInThisTeam}
				teamId={teamId!}
				user={user}
				team={currentTeam}
				key={user.id}
			/>
		)
	})

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
					{thisTeam?.name}
				</CommentText>
			</Row>
			<LoadingBoundary loading={queriesLoading}>
				<Flexbox
					direction='row'
					marginBetween='medium'
				>
					{userCards()}
				</Flexbox>
			</LoadingBoundary>
		</Page>
	)
}
