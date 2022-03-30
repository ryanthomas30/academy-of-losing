import { theme } from '@/constants'
import { Text, TextProps } from './Text'

export interface CommentTextProps extends TextProps {
	multiline?: boolean
}

export const CommentText: React.FC<CommentTextProps> = ({ children, multiline, size = 14, color = theme.color.commentText }) => (
	<Text
		size={size}
		color={color}
	>
		{multiline ? '/*' : '//'}
		{' '}
		{children}
		{multiline && ' '}
		{multiline && '*/'}
	</Text>
)
