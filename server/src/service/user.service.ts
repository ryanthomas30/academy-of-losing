import { DataSource } from 'apollo-datasource'
import { ApolloError } from 'apollo-server'
import { ProducedContext } from '@/context'
import { User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewUser, User as UserType } from '@/types'

export class UserService extends DataSource<ProducedContext> {

	getOne(userId: string): Promise<UserType> {
		try {
			return User.findOneOrFail({
				where: { id: userId },
			})
		} catch (err) {
			throw new ApolloError('Could not find the requested user')
		}
	}

	async create(newUser: NewUser): Promise<UserType> {
		const user = User.create({
			...newUser,
		})
		try {
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
