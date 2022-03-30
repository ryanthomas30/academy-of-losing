import { allPhrases, zoomiesPhrases } from '@/constants'

import { getRandomFromArray } from './getRandomFromArray'

export const getRandomPhrase = () => getRandomFromArray(allPhrases)

export const getRandomZoomiesPhrase = () => getRandomFromArray(zoomiesPhrases)
