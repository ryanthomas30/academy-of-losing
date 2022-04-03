import React from 'react'

import { theme } from '@/constants'

import { Flexbox, FlexboxProps } from './Flexbox'
import { Text } from './Text'
import { Row } from './Row'

interface Props extends FlexboxProps {
	label?: string
	error?: string
}

export const FormField: React.FC<Props> = ({ children, label, error, ...other }) => (
	<Flexbox
		full='horizontal'
		align='start'
		justify='center'
		marginBetween='xs'
		{...other}
	>
		<Row justify='between'>
			<Flexbox
				direction='row'
				align='center'
				marginBetween='xs'
			>
				<Text size={12}>
					{label}
				</Text>
			</Flexbox>
			<Text
				size={12}
				color={theme.color.red}
			>
				{error}
			</Text>
		</Row>
		{children}
	</Flexbox>
)
