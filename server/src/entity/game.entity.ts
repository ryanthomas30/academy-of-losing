import { ApolloError } from 'apollo-server'
import {
	Entity,
	BaseEntity,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
	FindOneOptions,
	Column,
} from 'typeorm'

import { Question } from './question.entity'
import { Team } from './team.entity'

@Entity()
export class Game extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: string

	@Column()
	name!: string

	@ManyToMany(() => Question, question => question.games, {
		eager: true,
	})
	@JoinTable({
		name: 'game_question',
	})
	questions?: Question[]

	@OneToMany(() => Team, team => team.game, {
		eager: true,
	})
	teams?: Team[]

	@CreateDateColumn()
	createdAt!: Date

	static async getOne(gameId: string, options?: FindOneOptions<Game>) {
		try {
			return Game.findOneOrFail(gameId, options)
		} catch (err) {
			throw new ApolloError(`An error occurred when trying to fetch game ${gameId}.`)
		}
	}
}
