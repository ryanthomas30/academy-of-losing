import { ApolloError } from 'apollo-server'
import {
	Entity,
	BaseEntity,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	ManyToMany,
	OneToMany,
	FindOneOptions,
} from 'typeorm'
import { Answer } from './answer.entity'

import { Game } from './game.entity'
import { TeamAnswer } from './teamAnswer.entity'

@Entity()
export class Question extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: string

	@Column()
	title!: string

	@Column()
	description!: string

	@Column({ nullable: true })
	imageUrl?: string

	@OneToMany(() => Answer, answer => answer.question, {
		cascade: true,
		eager: true,
	})
	answers?: Answer[]

	@OneToMany(() => TeamAnswer, teamAnswer => teamAnswer.question)
	teamAnswers?: TeamAnswer[]

	@ManyToMany(() => Game, game => game.questions)
	games?: Game[]

	@CreateDateColumn()
	createdAt!: Date

	static async getOne(questionId: string, options?: FindOneOptions<Question>) {
		try {
			return Question.findOneOrFail(questionId, options)
		} catch (err) {
			throw new ApolloError(`An error occurred when trying to fetch team ${questionId}`)
		}
	}
}

/**
 * Custom TeamQuestion resolve mapper for codegen
 */
export interface TeamQuestion {
	id: string
	title: string
	description: string
	imageUrl?: string
	answers?: Answer[]
	teamAnswers?: TeamAnswer[]
	games?: Game[]
	createdAt: Date
	isCorrect: boolean
}
