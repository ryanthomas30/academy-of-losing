import {
	Entity,
	BaseEntity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	ManyToMany,
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

}
