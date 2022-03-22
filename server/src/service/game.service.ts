import { DataSource } from 'apollo-datasource'
import { ApolloError } from 'apollo-server'
import { ProducedContext } from '@/context'
import { Game as GameEntity } from '@/entity'
import { DbError } from '@/util'
import { Game } from '@/types'
import { getManager } from 'typeorm'

export class GameService extends DataSource<ProducedContext> {

	async getOne(gameId: string): Promise<Game> {
		try {
			const gameResponse = await GameEntity.findOneOrFail({
				where: { id: gameId },
				relations: ['teams', 'questions'],
			})
			return {
				...gameResponse,
			}
		} catch (err) {
			throw new ApolloError('Could not find the requested game')
		}
	}

	async create(): Promise<Game> {
		try {
			return getManager().transaction(async entityManager => {
				/* Create new Game with Game */
				const game = GameEntity.create()

				/* Save Team */
				const gameResponse = await entityManager.save(game)

				return {
					...gameResponse,
				}
			})
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError('An error occurred when creating this game')
			}
		}

	}
}
