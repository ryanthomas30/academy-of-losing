import { Flexbox, FlexboxProps } from './Flexbox'

export const Row: React.FC<FlexboxProps> = ({ children, ...props }) => (
	<Flexbox
		full='horizontal'
		direction='row'
		align='center'
		{...props}
	>
		{children}
	</Flexbox>
)

