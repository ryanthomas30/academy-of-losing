import { zoomiesPhrases } from '@/constants'

export const getRandomPhrase = (phrases: string[]): string => phrases[Math.floor(Math.random() * phrases.length)]

export const getRandomZoomiesPhrase = () => getRandomPhrase(zoomiesPhrases)
