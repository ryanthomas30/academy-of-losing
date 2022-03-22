import { ApolloError } from 'apollo-server'
import {
	Entity,
	BaseEntity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	ManyToMany,
	FindOneOptions,
} from 'typeorm'

import { Team } from './team.entity'

@Entity()
export class User extends BaseEntity {

	@PrimaryColumn()
	id!: string

	@Column()
	fullName!: string

	@Column({
		unique: true,
	})
	email!: string

	@Column({
		default: false,
	})
	isAdmin!: boolean

	@ManyToMany(() => Team, team => team.users)
	teams?: Team[]

	@CreateDateColumn()
	createdAt!: Date

	static async getOne(userId: string, options?: FindOneOptions<User>) {
		try {
			return User.findOneOrFail(userId, options)
		} catch (err) {
			throw new ApolloError(`An error occurred when trying to fetch user ${userId}.`)
		}
	}
}
