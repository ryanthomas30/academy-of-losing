import { theme } from '@/constants'
import { Text, TextProps } from './Text'

export interface StringTextProps extends TextProps {
	single?: boolean
	className?: string
}

export const StringText: React.FC<StringTextProps> = ({ children, single, size = 14, className, color = theme.color.stringText }) => (
	<Text
		size={size}
		color={color}
		className={className}
	>
		{single ? '\'' : '"'}
		{children}
		{single ? '\'' : '"'}
	</Text>
)
