import { Page } from '@/components'

import { useParams } from 'react-router-dom'

type GameEditorRouteParams = {
	gameId: string
}

export const GameEditor: React.FC = () => {
	const { gameId } = useParams<GameEditorRouteParams>()

	return (
		<Page
			center
			paddingTop='large'
			paddingHorizontal='medium'
		>
			Game Editor
			{' '}
			{gameId}
		</Page>
	)
}
