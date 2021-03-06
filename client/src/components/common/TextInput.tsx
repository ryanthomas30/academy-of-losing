import React from 'react'

import { useField } from 'formik'

import { FormField } from './FormField'
import { Input } from './Input'

export interface TextInputProps {
	name: string
	label?: string
	placeholder?: string
	autoFocus?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({ name, placeholder, label, autoFocus }) => {
	const [field, { touched, error }] = useField(name)
	return (
		<FormField
			label={label}
			error={touched ? error : ''}
		>
			<Input
				type='text'
				placeholder={placeholder}
				autoFocus={autoFocus}
				{...field}
			/>
		</FormField>
	)
}
