import { LiteDataSource } from '@/dataSource'

export class UtilService extends LiteDataSource {
	resolveNilToArray<T>(nilOrArray: T[] | undefined | null): T[] {
		if (!nilOrArray) return []
		return nilOrArray
	}
}
