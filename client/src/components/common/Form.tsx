import { Formik, FormikConfig, Form as FormikForm } from 'formik'
import styled from 'styled-components'

/* eslint-disable-next-line @typescript-eslint/ban-types */
const isFunction = (obj: unknown): obj is Function =>
	typeof obj === 'function'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const Form: React.FC<FormikConfig<any>> = ({ children, ...other }) => (
	<Formik {...other}>
		{(props): JSX.Element =>
			<FormElement
				onSubmit={(e): void => e.preventDefault()}
			>
				{isFunction(children) && children
					? children(props)
					: children
				}
			</FormElement>
		}
	</Formik>
)

export const FormElement = styled(FormikForm)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`
