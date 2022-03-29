import { theme } from '@/constants'
import styled from 'styled-components'

export interface TextProps {
	color?: string
	size?: number
	fontWeight?: string
	italic?: boolean
	cursor?: string
}

export const Text = styled.label<TextProps>`
	color: ${({ color = theme.color.white }): string => color};
	font-size: ${({ size }): string | undefined => size ? `${size}px` : undefined};
	font-weight: ${({ fontWeight = 'normal' }): string | undefined => fontWeight};
	font-style: ${({ italic }): string => italic ? 'italic' : 'normal'};
	cursor: ${({ cursor = 'inherit' }): string => cursor};
`
