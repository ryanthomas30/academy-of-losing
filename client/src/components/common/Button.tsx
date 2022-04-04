import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

import { theme } from '@/constants'
import { Flexbox } from './Flexbox'
import { Link } from './Link'

export interface ButtonProps {
	children?: ReactNode
	label?: ReactNode
	to?: string
	onClick?: React.MouseEventHandler<Element>
	icon?: ReactNode
	color?: string
	flat?: boolean
	primary?: boolean
	full?: boolean
	disabled?: boolean
	type?: 'button' | 'reset' | 'submit'
	small?: boolean
	className?: string
	style?: CSSProperties
}

const BaseButton: React.FC<ButtonProps> = (props) => {
	const { children, label, to, onClick, full, disabled, icon, type = 'button', style, className } = props
	const labelNode = (!!children || !!label) && <Flexbox>{children || label}</Flexbox>

	const buttonInner = (
		<Flexbox
			className={className}
			justify='center'
			align='center'
			marginBetween='small'
			direction='row'
			wrap={false}
			full={full && 'horizontal'}
			onClick={onClick && !disabled ? (e) => onClick(e) : undefined}
			tag='button'
			type={type}
			style={style}
		>
			{icon}
			{labelNode}
		</Flexbox>
	)

	if (to && !disabled) {
		return (
			<Link
				to={to}
				style={{ width: full ? '100%' : '' }}
			>
				{buttonInner}
			</Link>
		)
	}
	return buttonInner
}

export const Button = styled(BaseButton)`
	user-select: none;
	border-style: none;
	cursor: pointer;
	padding: 0px 20px;
	border-radius: ${theme.borderRadius};
	min-width: ${({ small }) => small ? '62px' : '74px'};
	height: ${({ small }) => small ? '28px' : '44px'};
	background-color: ${({ primary }) => primary ? theme.color.blue : theme.color.gray3};
	transition: ${theme.transition('background-color')};
	opacity: ${({ disabled }) => disabled ? 0.6 : 'inherit'};
	&:focus {
		outline: none;
	}
	&:hover {
		background-color: ${({ primary }) => primary ? theme.color.blueAlternate : theme.color.gray4};
	}

	/* Button Text */
	color: ${() => theme.color.white};
	font-size: ${({ small }) => small ? '10px' : '14px'};
	font-family: 'Source Code Pro';
	white-space: nowrap;
`
