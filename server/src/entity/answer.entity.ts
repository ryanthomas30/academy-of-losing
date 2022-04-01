import { ApolloError } from 'apollo-server'
import {
	Entity,
	BaseEntity,
	Column,
	ManyToOne,
	PrimaryGeneratedColumn,
	FindOneOptions,
	Unique,
} from 'typeorm'

import { Question } from './question.entity'

@Entity()
@Unique(['value', 'questionId'])
export class Answer extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: string

	@Column()
	value!: string

	@Column()
	questionId!: string

	@ManyToOne(() => Question, question => question.answers)
	question?: Question

	static async getOne(answerId: string, options?: FindOneOptions<Answer>) {
		try {
			return Answer.findOneOrFail(answerId, options)
		} catch (e) {
			throw new ApolloError(`An error occurred when trying to fetch answer ${answerId} -- ${e}`)
		}
	}
}
