import { theme } from '@/constants'
import { Property } from 'csstype'
import styled from 'styled-components'

export interface TextProps {
	color?: string
	size?: number
	fontWeight?: string
	italic?: boolean
	cursor?: string
	textAlign?: Property.TextAlign
}

export const Text = styled.span<TextProps>`
	color: ${({ color = theme.color.white }): string => color};
	font-size: ${({ size }): string | undefined => size ? `${size}px` : undefined};
	font-weight: ${({ fontWeight = 'normal' }): string | undefined => fontWeight};
	font-style: ${({ italic }): string => italic ? 'italic' : 'normal'};
	text-align: ${({ textAlign = 'inherit' }) => textAlign};
	cursor: ${({ cursor = 'inherit' }): string => cursor};
`
