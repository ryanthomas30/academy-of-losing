import { allPhrases, zoomiesPhrases, wrongAnswerPhrases } from '@/constants'

import { getRandomFromArray } from './getRandomFromArray'

export const getRandomPhrase = () => getRandomFromArray(allPhrases)

export const getRandomZoomiesPhrase = () => getRandomFromArray(zoomiesPhrases)

export const getWrongAnswerPhrases = () => getRandomFromArray(wrongAnswerPhrases)
