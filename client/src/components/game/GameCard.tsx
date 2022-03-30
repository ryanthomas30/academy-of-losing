import styled from 'styled-components'
import { Game } from '@/apollo'

import { Flexbox, Text } from '../common'
import { theme } from '@/constants'

export interface GameCardProps {
	game: Pick<Game, 'id' | 'name'>
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
	const { name } = game
	return (
		<GameCardContainer
			center
			height={150}
		>
			<Text>{name}</Text>
		</GameCardContainer>
	)
}

const GameCardContainer = styled(Flexbox)`
	cursor: pointer;
	user-select: none;
	background-color: ${theme.color.foreground};
	border-radius: ${theme.borderRadius};
	transition: ${theme.transition('background-color')};
	&:hover {
		background-color: ${theme.color.gray3};
	}
`
