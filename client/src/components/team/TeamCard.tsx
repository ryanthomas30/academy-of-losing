
import { AdminGameQuery } from '@/apollo'
import { Text, Card, Avatar, Flexbox } from '../common'

export interface TeamCardProps {
	team: AdminGameQuery['game']['teams'][number]
	gameId: string
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
	const { name, users } = team

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
			center
			height={150}
			padding='medium'
			marginBetween='small'
		>
			<Text
				size={18}
				textAlign='center'
			>
				{name}
			</Text>
			<Flexbox
				direction='row'
				marginBetween='medium'
				align='center'
			>
				{userAvatars()}
			</Flexbox>
		</Card>
	)
}
