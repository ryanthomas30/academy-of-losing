import { Game } from '@/apollo'
import { routeNames } from '@/routing'

import { Text, Card, Link } from '../common'

export interface GameCardProps {
	game: Pick<Game, 'id' | 'name'>
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
	const { name, id } = game
	return (
		<Link to={routeNames.game(id)}>
			<Card
				center
				height={150}
				hover
			>
				<Text>{name}</Text>
			</Card>
		</Link>
	)
}
