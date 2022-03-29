import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { isDevelopment, isProduction } from '@/util'

export const initializeFirebaseAdmin = () => {
	if (isDevelopment()) {
		initializeApp({
			credential: applicationDefault(),
		})
	} else if (isProduction()) {
		initializeApp({
			serviceAccountId: 'firebase-adminsdk-ydf5f@overwatchmen-8e34c.iam.gserviceaccount.com',
		})
	}
}
