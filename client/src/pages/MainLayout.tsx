import { Outlet } from 'react-router-dom'
import { useMeQuery } from '@/apollo'
import { Layout, LayoutHeader, Flexbox } from '@/components'

export const MainLayout: React.FC = () => {
	const { data } = useMeQuery()
	return (
		<Layout>
			<LayoutHeader
				isAdmin={!!data?.me.isAdmin}
				photoUrl={data?.me.photoUrl}
			/>
			<Flexbox center>
				<Outlet />
			</Flexbox>
		</Layout>
	)
}
