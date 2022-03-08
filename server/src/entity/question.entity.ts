import {
	Entity,
	BaseEntity,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	ManyToMany,
	OneToMany,
} from 'typeorm'

import { Game } from './game.entity'
import { TeamAnswer } from './teamAnswer.entity'

@Entity()
export class Question extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: string

	@Column()
	question!: string

	@Column()
	answer!: string

	@OneToMany(() => TeamAnswer, teamAnswer => teamAnswer.question)
	teamAnswer!: TeamAnswer

	@ManyToMany(() => Game, game => game.questions)
	games!: Game[]

	@CreateDateColumn()
	createdAt!: Date

}
