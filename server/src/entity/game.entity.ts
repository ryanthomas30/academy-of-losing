import {
	Entity,
	BaseEntity,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm'

import { Question } from './question.entity'
import { Team } from './team.entity'

@Entity()
export class Game extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: string

	@ManyToMany(() => Question, question => question.games)
	@JoinTable({
		name: 'game_question',
	})
	questions!: Question[]

	@OneToMany(() => Team, team => team.game)
	teams!: Team[]

	@CreateDateColumn()
	createdAt!: Date

}
