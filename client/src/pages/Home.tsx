import { Button, Page } from '@/components'
import { useTestLazyQuery } from '@/apollo'

export const Home: React.FC = () => {
	const [testQuery] = useTestLazyQuery()

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
		</Page>
	)
}
