import { ApolloError } from 'apollo-server'
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
	FindOneOptions,
} from 'typeorm'

import { Game } from './game.entity'
import { TeamAnswer } from './teamAnswer.entity'
import { User } from './user.entity'

@Entity()
@Unique(['name', 'gameId'])
export class Team extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	name!: string

	@Column()
	gameId!: number

	@ManyToOne(() => Game, game => game.teams)
	game?: Game

	@ManyToMany(() => User, user => user.teams, {
		eager: true,
	})
	@JoinTable({
		name: 'team_user',
	})
	users?: User[]

	@OneToMany(() => TeamAnswer, teamAnswer => teamAnswer.team)
	teamAnswers?: TeamAnswer[]

	@CreateDateColumn()
	createdAt!: Date

	static async getOne(teamId: string | number, options?: FindOneOptions<Team>) {
		try {
			return Team.findOneOrFail(teamId, options)
		} catch (e) {
			throw new ApolloError(`An error occurred when trying to fetch team ${teamId} -- ${e}`)
		}
	}
}
