
import { AdminGameQuery } from '@/apollo'
import { routeNames } from '@/routing'
import { Text, Card, Avatar, Flexbox, Button } from '../common'

export interface TeamCardProps {
	team: AdminGameQuery['game']['teams'][number]
	gameId: string
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
	const { id, name, users } = team

	const userAvatars = () => users.map((user) => (
		<Flexbox
			direction='row'
			align='center'
			marginBetween='small'
			key={user.id}
		>
			<Avatar
				src={user.photoUrl!}
				size={24}
			/>
			<Text size={12}>{user.fullName}</Text>
		</Flexbox>
	))

	return (
		<Card
			align='center'
			justify='start'
			minHeight={100}
			paddingHorizontal='medium'
			paddingVertical='large'
			marginBetween='medium'
		>
			<Text
				size={18}
				textAlign='center'
			>
				{name}
			</Text>
			<Flexbox
				marginBetween='small'
				align='center'
			>
				{userAvatars()}
				<Flexbox
					direction='row'
					align='center'
					marginTop='xs'
				>
					<Button
						primary
						small
						to={`${routeNames.teamIndex}/${id}`}
					>
						Add User
					</Button>
				</Flexbox>
			</Flexbox>
		</Card>
	)
}
