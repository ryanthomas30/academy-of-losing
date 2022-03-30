import { CommentText } from './CommentText'

export interface LoundingBoundaryProps {
	fallBack?: React.ReactNode
	loading?: boolean
}

export const LoadingBoundary: React.FC<LoundingBoundaryProps> = ({ children, loading, fallBack }) => {
	if (!loading) return <>{children}</>
	return <>{fallBack ?? <CommentText multiline>Loading</CommentText>}</>
}

