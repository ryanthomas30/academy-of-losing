import { DatabaseError } from 'pg-protocol'

export enum PgErrorCode {
	UniqueViolation = '23505',
	InternalError = 'XX000'
}

export class DbError {
	public readonly code: PgErrorCode

	constructor(error: unknown) {
		if (!(error instanceof DatabaseError)) {
			this.code = PgErrorCode.InternalError
		} else {
			this.code = error.code as PgErrorCode ?? PgErrorCode.InternalError
		}
	}
}
