
import { LiteDataSource } from '@/dataSource'
import { Question, Game } from '@/entity'

export class QuestionService extends LiteDataSource {

	getQuestion(questionId: string) {
		return Question.getOne(questionId)
	}

	async getQuestionsByGameId(gameId: string) {
		/* Get Game */
		const game = await Game.getOne(gameId, {
			relations: ['questions'],
		})
		return game.questions ?? []
	}

}
