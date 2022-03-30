import styled from 'styled-components'

export interface AvatarProps {
	src: string
	size?: number
}

const DefaultSize = 36

export const Avatar: React.FC<AvatarProps> = ({ src, size = DefaultSize }) => (
	<AvatarImage
		src={src}
		size={size}
		referrerPolicy='no-referrer'
	/>

)

const AvatarImage = styled.img<{ size: number }>`
	object-fit: cover;
	border-radius: 50%;
	height: ${({ size }) => `${size}px`};
	width: ${({ size }) => `${size}px`};

`
