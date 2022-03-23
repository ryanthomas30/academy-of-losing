import { ApolloError } from 'apollo-server'
import { User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewUser } from '@/types'
import { LiteDataSource } from '@/dataSource'

export class UserService extends LiteDataSource {

	getUser(userId: string) {
		return User.getOne(userId)
	}

	async createUser(newUser: NewUser) {
		/* Create User */
		const user = User.create({
			...newUser,
		})
		try {
			/* Save User */
			const userResponse = await user.save()
			return userResponse
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				case PgErrorCode.UniqueViolation:
					throw new ApolloError('A user with this email already exists')
				default:
					throw new ApolloError('An error occurred when creating this user')
			}
		}
	}
}
