import { getNamespacedUuid } from './getNamespacedUuid'

export const getQuestionUuid = (title: string, description: string) => getNamespacedUuid(title + description)
