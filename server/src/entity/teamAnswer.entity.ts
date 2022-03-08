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
	id!: string

	@Column({ default: false })
	isCorrect!: boolean

	@ManyToOne(() => Question, question => question.teamAnswer)
	question!: Question

	@ManyToOne(() => Team, team => team.teamAnswer)
	team!: Question

	@CreateDateColumn()
	createdAt!: Date

}
