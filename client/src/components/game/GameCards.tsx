import { Game } from '@/apollo'

import { GameCard } from './GameCard'
import { CardsContainer } from '../common'

export interface GameCardsProps {
	games: Pick<Game, 'id' | 'name' | 'questions'>[]
}

export const GameCards: React.FC<GameCardsProps> = ({ games }) => {
	const gameCards = () => games.map((game) => (
		<GameCard
			game={game}
			key={game.id}
		/>
	))

	return (
		<CardsContainer>
			{gameCards()}
		</CardsContainer>
	)
}

