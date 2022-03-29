import { theme } from '@/constants'
import { Text, TextProps } from './Text'

export interface CommentText extends TextProps {
	multiline?: boolean
}

export const CommentText: React.FC<CommentText> = ({ children, multiline, size = 14, color = theme.color.commentText }) => (
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
