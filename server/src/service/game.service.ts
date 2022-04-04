import { ApolloError, AuthenticationError } from 'apollo-server'
import { Game, Question, User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { LiteDataSource } from '@/dataSource'
import { NewGame } from '@/types'

export class GameService extends LiteDataSource {

	async getGame(gameId: string) {
		const { user: contextUser } = this.context
		if (contextUser.admin) return Game.getOne(gameId)
		const userHasGame = await this.userHasGame(contextUser.userId, gameId)
		if (!userHasGame) throw new AuthenticationError('You do not have access to this game')
		return Game.getOne(gameId)
	}

	getGames() {
		return Game.find({
			order: {
				createdAt: 'DESC',
			},
			take: 20,
		})
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

	private async userHasGame(userId: string, gameId: string): Promise<Boolean> {
		const games = await this.getGamesByUserId(userId)
		return games.some(({ id }) => id === gameId)
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
			/* Save Game */
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

	async removeQuestionFromGame(gameId: string, questionId: string) {
		/* Get Game */
		const game = await Game.getOne(gameId)

		/* Remove Question from Game */
		game.questions = game.questions?.filter((question) => `${question.id}` !== questionId) ?? []
		try {
			/* Save Game */
			return game.save()
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError(`An error occurred when removing question: "${questionId}" from game: "${gameId}" -- ${e}`)
			}
		}
	}
}
