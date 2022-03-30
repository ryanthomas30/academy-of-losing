import { Button, Page, LoadingBoundary } from '@/components'
import { useMeQuery, useTestLazyQuery } from '@/apollo'

export const AdminHome: React.FC = () => {
	const [testQuery] = useTestLazyQuery()
	const { loading } = useMeQuery()

	const handleButtonClick = async () => {
		await testQuery()
	}

	return (
		<Page center>
			<Button
				primary
				onClick={handleButtonClick}
			>
				Fake Admin Button
			</Button>
			<LoadingBoundary
				loading={loading}
			>
				Fake Admin Page
			</LoadingBoundary>
		</Page>
	)
}
