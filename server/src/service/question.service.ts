
import { LiteDataSource } from '@/dataSource'
import {
	Question,
	Game,
	Team,
	TeamQuestion,
	TeamAnswer,
} from '@/entity'
import { Answer } from '@/entity/answer.entity'

import { Image, NewQuestion } from '@/types'
import { DbError } from '@/util'
import { ApolloError, AuthenticationError } from 'apollo-server'

export class QuestionService extends LiteDataSource {

	getQuestion(questionId: string) {
		return Question.getOne(questionId)
	}

	getQuestions() {
		return Question.find({
			order: {
				createdAt: 'DESC',
			},
			take: 50,
		})
	}

	async getGameQuestions(gameId: string) {
		/* Get Game */
		const game = await Game.getOne(gameId, {
			relations: ['questions'],
		})
		return game.questions?.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) ?? []
	}

	async getTeamQuestions(teamId: string) {
		/* Get Team with Game */
		const team = await Team.getOne(teamId, {
			relations: ['game'],
		})
		const gameId = team.game?.id
		try {
			if (!gameId) throw Error
			const gameQuestions = await this.getGameQuestions(`${gameId}`)

			const questions = await Question.findByIds(gameQuestions.map((gq) => gq.id), {
				relations: ['teamAnswers'],
			})

			const teamQuestions: TeamQuestion[] = questions.map(question => ({
				...question,
				isCorrect: this.getTeamHasCorrectAnswer(teamId, question.teamAnswers ?? []),
			}))

			return teamQuestions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError(`An error occurred when fetching this team\'s questions -- ${e}`)
			}
		}
	}

	async answerQuestion(teamId: string, answer: string, questionId: string) {
		const { user: contextUser, dataSources } = this.context
		/* Get Team */
		const team = await Team.getOne(teamId, {
			relations: ['game'],
		})

		const game = team.game
		if (!game) throw Error('This team does not have a game')

		/* Check if user belongs to this team */
		const userTeamId = await dataSources.teamService.getTeamIdByUserGame(contextUser.userId, `${game.id}`)
		if (`${userTeamId}` !== teamId) throw new AuthenticationError('You do not have access to update these records')

		/* Get Question */
		const question = await Question.getOne(questionId)

		/* Check if Question was already answered correctly */
		const teamAnswers = await TeamAnswer.find({
			where: {
				teamId,
				questionId,
				isCorrect: true,
			},
		})

		if (teamAnswers.length > 0) throw new ApolloError(`Question: ${questionId} was already answered correctly by team: ${teamId}`)

		const isCorrect = !!question?.answers?.some(correctAnswer => correctAnswer.value.toLowerCase() === answer.toLowerCase())

		/* Create new TeamAnswer with Team, Question, Answer, IsCorrect */
		const newTeamAnswer = TeamAnswer.create({
			team,
			question,
			isCorrect,
			answer,
		})

		try {
			/* Save Answer */
			newTeamAnswer.save()
			return {
				...question,
				isCorrect,
			}
		} catch (e) {
			throw new ApolloError(
				`An error occurred when trying to create a new teamAnswer -- ${e}`,
			)
		}
	}

	private getTeamHasCorrectAnswer(teamId: string, teamAnswers: TeamAnswer[]) {
		return teamAnswers.filter((teamAnswer) => `${teamAnswer.teamId}` === teamId)
			.some((teamAnswer) => teamAnswer.isCorrect) ?? false
	}

	async createQuestion({ answers, ...newQuestion }: NewQuestion) {
		/* Create Answers */
		const answerEntities = answers.map(answer => (
			Answer.create({
				value: answer,
			})
		))

		/* Create Question */
		const question = Question.create({
			...newQuestion,
			imageUrl: newQuestion.imageUrl ?? undefined,
			answers: answerEntities,
		})

		try {
			/* Save Question */
			const questionResponse = await question.save()
			return questionResponse
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError(`An error occurred when creating this question -- ${e}`)
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
