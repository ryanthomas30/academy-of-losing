
import { LiteDataSource } from '@/dataSource'
import { auth } from 'firebase-admin'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'

import { CustomClaims } from '@/types'
import { ApolloError } from 'apollo-server'

export class FirebaseService extends LiteDataSource {

	setCustomUserClaims(firebaseId: string, customUserClaims: CustomClaims): Promise<void> {
		return auth().setCustomUserClaims(firebaseId, customUserClaims)
	}

	deleteUser(firebaseId: string): Promise<void> {
		return auth().deleteUser(firebaseId)
	}

	getUser(firebaseId: string): Promise<UserRecord> {
		try {
			return auth().getUser(firebaseId)
		} catch (e) {
			throw new ApolloError(`Error fetching user with id: ${firebaseId}`)
		}
	}

	async getUserPhotoUrl(firebaseId: string): Promise<string | null> {
		const user = await this.getUser(firebaseId)
		return user.photoURL ?? null
	}

}
