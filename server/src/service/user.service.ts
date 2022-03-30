import { ApolloError } from 'apollo-server'
import { User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewUser } from '@/types'
import { LiteDataSource } from '@/dataSource'
import { adminWhiteList } from '@/constants'

export class UserService extends LiteDataSource {

	getUser(userId: string) {
		return User.getOne(userId)
	}

	async createUser(newUser: NewUser) {
		const { user: contextUser, dataSources: { firebaseService } } = this.context
		const isAdmin = adminWhiteList.includes(contextUser.email)
		/* Create User */
		const user = User.create({
			...newUser,
			isAdmin,
		})
		try {
			/* Save User */
			const userResponse = await user.save()
			firebaseService.setCustomUserClaims(contextUser.userId, {
				admin: isAdmin,
			})
			return userResponse
		} catch (e) {
			const error = new DbError(e)
			await firebaseService.deleteUser(contextUser.userId)
			switch (error.code) {
				case PgErrorCode.UniqueViolation:
					throw new ApolloError('A user with this email already exists')
				default:
					throw new ApolloError('An error occurred when creating this user')
			}
		}
	}
}
