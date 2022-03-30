import styled from 'styled-components'
import { Game } from '@/apollo'

import { GameCard } from './GameCard'

export interface GameCardsProps {
	games: Pick<Game, 'id' | 'name'>[]
}

export const GameCards: React.FC<GameCardsProps> = ({ games }) => {
	const gameCards = () => games.map((game) => (
		<GameCard
			game={game}
			key={game.id}
		/>
	))

	return (
		<GameCardsContainer>
			{gameCards()}
		</GameCardsContainer>
	)
}

const GameCardsContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`
