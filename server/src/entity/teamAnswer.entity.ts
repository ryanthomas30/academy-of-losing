import {
	Entity,
	BaseEntity,
	Column,
	CreateDateColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { Question } from './question.entity'
import { Team } from './team.entity'

@Entity()
export class TeamAnswer extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number

	@Column({ default: false })
	isCorrect!: boolean

	@Column()
	answer!: string

	@Column()
	questionId!: number

	@Column()
	teamId!: number

	@ManyToOne(() => Question, question => question.teamAnswers)
	question?: Question

	@ManyToOne(() => Team, team => team.teamAnswers)
	team?: Question

	@CreateDateColumn()
	createdAt!: Date

}
