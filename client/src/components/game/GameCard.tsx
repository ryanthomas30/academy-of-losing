import { Game } from '@/apollo'
import { routeNames } from '@/routing'

import { Text, Card, Link } from '../common'

export interface GameCardProps {
	game: Pick<Game, 'id' | 'name' | 'questions'>
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
	const { name, id, questions } = game
	const numberOfQuestions = questions.length
	return (
		<Link to={routeNames.game(id)}>
			<Card
				center
				height={150}
				hover
				marginBetween='xs'
			>
				<Text size={18}>{name}</Text>
				<Text size={10}>
					{`Questions: ${numberOfQuestions}`}
				</Text>
			</Card>
		</Link>
	)
}
