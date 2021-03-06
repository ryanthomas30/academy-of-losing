import { Field as FormikField } from 'formik'
import styled from 'styled-components'

import { theme } from '@/constants'

export const Input = styled(FormikField)`
	width: -webkit-fill-available;
	height: 32px;
	border: none;
	padding: 4px 12px;
	border-radius: ${theme.borderRadius};
	background-color: ${theme.color.gray1};
	color: ${theme.color.white};
	transition: all 200ms ease-in-out;
	font-size: 14px;
	font-family: 'Source Code Pro';
	&:focus {
		outline: none;
	}
`
