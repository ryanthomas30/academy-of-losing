import { CodeColors } from '@/constants'
import { getRandomFromArray } from './getRandomFromArray'

export const getRandomColor = () => getRandomFromArray(CodeColors)
