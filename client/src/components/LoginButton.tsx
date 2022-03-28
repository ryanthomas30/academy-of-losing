import styled from 'styled-components'

import { Button, ButtonProps } from './common'
import { ReactComponent as Google } from '../assets/google.svg'

interface Props extends ButtonProps {
	className?: string
}

const BaseLoginButton: React.FC<Props> = ({ className, label = 'Sign in with Google', ...other }) => (
	<Button
		label={label}
		className={className}
		icon={
			<Google
				height={24}
				width={24}
			/>
		}
		{...other}
	/>
)

export const LoginButton = styled(BaseLoginButton)`
	font-family: 'Roboto';
`
