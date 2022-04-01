import { ApolloError } from 'apollo-server'
import { Game, Question, User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { LiteDataSource } from '@/dataSource'
import { NewGame } from '@/types'

export class GameService extends LiteDataSource {

	getGame(gameId: string) {
		return Game.getOne(gameId)
	}

	async getGamesByUserId(userId: string) {
		const user = await User.getOne(userId, {
			relations: ['teams'],
		})
		const gameIds = user.teams?.map(({ gameId }) => gameId) ?? []
		return Game.findByIds(gameIds, {
			order: {
				createdAt: 'DESC',
			},
		})
	}

	async createGame(newGame: NewGame) {
		/* Create Game */
		const game = Game.create({
			...newGame,
		})
		try {
			/* Save Game */
			const gameResponse = await game.save()
			return gameResponse
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError(`An error occurred when creating this game -- ${e}`)
			}
		}
	}

	async addQuestionToGame(gameId: string, questionId: string) {
		/* Get Game */
		const game = await Game.getOne(gameId)

		/* Get Question */
		const question = await Question.getOne(questionId)

		/* Add Question to Game */
		game.questions = [...(game.questions ?? []), question]
		try {
			/* Save Question */
			return game.save()
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				case PgErrorCode.UniqueViolation:
					throw new ApolloError(`This question already exists on this game -- ${e}`)
				default:
					throw new ApolloError(`An error occurred when adding question: "${questionId}" to game: "${gameId}" -- ${e}`)
			}
		}
	}
}
