import { v5 as uuid } from 'uuid'

export const getNamespacedUuid = (str: string) => uuid(str, process.env.REACT_APP_UUID_NAMESPACE!)
