import { Button, Page, LoadingBoundary } from '@/components'
import { useMeQuery, useTestLazyQuery } from '@/apollo'

export const Home: React.FC = () => {
	const [testQuery] = useTestLazyQuery()
	const { data, loading } = useMeQuery()

	const handleButtonClick = async () => {
		await testQuery()
	}

	return (
		<Page center>
			<Button
				primary
				onClick={handleButtonClick}
			>
				Run Test Query
			</Button>
			<LoadingBoundary
				loading={loading}
			>
				{JSON.stringify(data?.me)}
			</LoadingBoundary>
		</Page>
	)
}
