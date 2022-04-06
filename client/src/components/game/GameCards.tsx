import { Image } from '@/apollo'

import { GameCard } from './GameCard'
import { CardsContainer } from '../common'

export interface CardGame {
	id: string
	name: string
	questions: CardGameQuestion[]
}

export interface CardGameQuestion {
	description: string
	id: string
	image?: Image | null
	isCorrect?: boolean | null
	title: string
}

export interface GameCardsProps {
	games: CardGame[]
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

