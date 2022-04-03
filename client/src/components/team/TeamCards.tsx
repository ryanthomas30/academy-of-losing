import { AdminGameQuery } from '@/apollo'

import { CardsContainer } from '../common'
import { TeamCard } from './TeamCard'

export interface TeamCardsProps {
	teams: AdminGameQuery['game']['teams']
	gameId: string
}

export const TeamCards: React.FC<TeamCardsProps> = ({ teams, gameId }) => {
	const teamCards = () => teams.map((team) => (
		<TeamCard
			team={team}
			gameId={gameId}
			key={team.id}
		/>
	))

	return (
		<CardsContainer>
			{teamCards()}
		</CardsContainer>
	)
}

