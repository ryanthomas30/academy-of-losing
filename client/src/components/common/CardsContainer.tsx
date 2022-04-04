import styled from 'styled-components'

interface CardsContainerProps {
	minCardWidth?: number
}

export const CardsContainer = styled.div<CardsContainerProps>`
	width: 100%;
	height: 100%;
	display: grid;
	gap: 16px;
	grid-template-columns: ${({ minCardWidth = 400 }) => `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`};
	grid-auto-rows: 1fr;
`
