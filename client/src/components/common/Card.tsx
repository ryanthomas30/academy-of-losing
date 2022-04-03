import styled from 'styled-components'

import { Flexbox, FlexboxProps } from '../common'
import { theme } from '@/constants'

export interface CardProps extends FlexboxProps {
	hover?: boolean
	highlight?: boolean
}

export const BaseCard: React.FC<CardProps> = ({ children, ...props }) => (
	<Flexbox {...props}>
		{children}
	</Flexbox>
)

export const Card = styled(BaseCard)`
	user-select: none;
	background-color: ${({ highlight }) => highlight ? theme.color.gray3 : theme.color.foreground};
	border-radius: ${theme.borderRadius};
	transition: ${theme.transition('background-color')};
	&:hover {
		background-color: ${({ onClick, hover }) => onClick || hover ? theme.color.gray3 : undefined};
	}
`
