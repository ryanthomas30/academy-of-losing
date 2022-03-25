
import { LiteDataSource } from '@/dataSource'
import { Question, Game } from '@/entity'

import { Image } from '@/types'

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

	shapeImageResponse(imageUrl?: string): Image | null {
		if (!imageUrl) return null
		return {
			id: imageUrl,
			url: imageUrl,
		}
	}

}
