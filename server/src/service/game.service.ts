import { ApolloError } from 'apollo-server'
import { Game as GameEntity } from '@/entity'
import { DbError } from '@/util'
import { Game } from '@/types'
import { LiteDataSource } from '@/dataSource'

export class GameService extends LiteDataSource {

	getGame(gameId: string): Promise<Game> {
		return GameEntity.getOne(gameId, {
			relations: ['teams', 'questions'],
		})
	}

	async createGame(): Promise<Game> {
		/* Create Game */
		const game = GameEntity.create()
		try {
			/* Save Game */
			const gameResponse = await game.save()

			return gameResponse
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError('An error occurred when creating this game')
			}
		}
	}
}
