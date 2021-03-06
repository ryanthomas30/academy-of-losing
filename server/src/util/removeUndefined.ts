import { ObjectLiteral } from 'typeorm'

/**
 * Removes an object's fields with a value of undefined
 *
 * @param obj The object whose undefined fields you want to remove.
 */
export const removeUndefined = (obj: ObjectLiteral) => {
	Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
	return obj
}
