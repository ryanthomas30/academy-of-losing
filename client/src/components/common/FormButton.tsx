import React, { useCallback } from 'react'

import { useFormikContext } from 'formik'

import { Button, ButtonProps } from './Button'

export const FormButton: React.FC<ButtonProps> = ({ ...other }) => {
	const { handleSubmit, errors, isSubmitting } = useFormikContext()
	const disabled = Object.values(errors).some(e => e !== '') || isSubmitting

	const handleClick = useCallback((e: React.MouseEvent): void => {
		e.preventDefault()
		handleSubmit()
	}, [handleSubmit])

	return (
		<Button
			onClick={handleClick}
			disabled={disabled}
			type='submit'
			{...other}
		/>
	)
}
