import { theme } from '@/constants'
import { Text, TextProps } from './Text'

export interface StringTextProps extends TextProps {
	single?: boolean
}

export const StringText: React.FC<StringTextProps> = ({ children, single, size = 14, color = theme.color.stringText }) => (
	<Text
		size={size}
		color={color}
	>
		{single ? '\'' : '"'}
		{children}
		{single ? '\'' : '"'}
	</Text>
)
