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

	@Column()
	answer!: string

	@OneToMany(() => TeamAnswer, teamAnswer => teamAnswer.question)
	teamAnswer!: TeamAnswer

	@ManyToMany(() => Game, game => game.questions)
	games!: Game[]

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
