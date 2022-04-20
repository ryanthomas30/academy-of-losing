import { Observable } from '@apollo/client'

export function promiseToObservable<T>(promise: Promise<T>) {
	return new Observable<T>((subscriber) => {
		promise.then(
			(value) => {
				if (subscriber.closed) return
				subscriber.next(value)
				subscriber.complete()
			},
			err => subscriber.error(err),
		)
	})
}
