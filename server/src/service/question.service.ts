
import { LiteDataSource } from '@/dataSource'
import { Question, Game } from '@/entity'

import { Image, NewQuestion } from '@/types'
import { DbError } from '@/util'
import { ApolloError } from 'apollo-server'

export class QuestionService extends LiteDataSource {

	getQuestion(questionId: string) {
		return Question.getOne(questionId)
	}

	async getQuestionsByGameId(gameId: string) {
		/* Get Game */
		const game = await Game.getOne(gameId, {
			relations: ['questions'],
			order: {
				createdAt: 'ASC',
			},
		})
		return game.questions ?? []
	}

	async createQuestion(newQuestion: NewQuestion) {
		/* Create Question */
		const question = Question.create({
			...newQuestion,
			imageUrl: newQuestion.imageUrl ?? undefined,
		})
		try {
			/* Save Question */
			const questionResponse = await question.save()
			return questionResponse
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError('An error occurred when creating this user')
			}
		}
	}

	shapeImageResponse(imageUrl?: string): Image | null {
		if (!imageUrl) return null
		return {
			id: imageUrl,
			url: imageUrl,
		}
	}

}
