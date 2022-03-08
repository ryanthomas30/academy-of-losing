import {
	Entity,
	BaseEntity,
	Column,
	CreateDateColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
	Unique,
	OneToMany,
} from 'typeorm'

import { Game } from './game.entity'
import { TeamAnswer } from './teamAnswer.entity'
import { User } from './user.entity'

@Entity()
@Unique(['name', 'game'])
export class Team extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: string

	@Column()
	name!: string

	@ManyToOne(() => Game, game => game.teams)
	game!: Game

	@ManyToMany(() => User, user => user.teams, {
		eager: true,
	})
	@JoinTable({
		name: 'team_user',
	})
	users!: User[]

	@OneToMany(() => TeamAnswer, teamAnswer => teamAnswer.team)
	teamAnswer!: TeamAnswer

	@CreateDateColumn()
	createdAt!: Date

}
