
import { ApolloError } from 'apollo-server'
import { LiteDataSource } from '@/dataSource'
import { Team as TeamEntity, Game as GameEntity, User as UserEntity } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewTeam, Team } from '@/types'
import { getManager } from 'typeorm'

export class TeamService extends LiteDataSource {
	async getTeamWithUsers(teamId: string): Promise<Team> {
		return TeamEntity.getOne(teamId, {
			relations: ['users'],
		})
	}

	async createTeam(newTeam: NewTeam, gameId: string): Promise<Team> {
		try {
			return getManager().transaction(async entityManager => {
				/* Get Game */
				const game = await GameEntity.getOne(gameId)

				/* Create new Team with Game */
				const team = TeamEntity.create({
					...newTeam,
					game,
				})

				/* Save Team */
				const teamResponse = await entityManager.save(team)

				return {
					...teamResponse,
				}
			})
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				case PgErrorCode.UniqueViolation:
					throw new ApolloError('A team with this name already exists')
				default:
					throw new ApolloError('An error occurred when creating this team')
			}
		}
	}

	async addUserToTeam(teamId: string, userId: string): Promise<Team> {
		try {
			return getManager().transaction(async entityManager => {
				/* Get Team with Users */
				const teamWithUsers = await TeamEntity.getOne(teamId, {
					relations: ['users'],
				})

				/* Get User */
				const user = await UserEntity.getOne(userId)

				/* Add new User to Team */
				teamWithUsers.users = [...teamWithUsers.users, user]

				/* Save Team */
				return entityManager.save(teamWithUsers)
			})
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				case PgErrorCode.UniqueViolation:
					throw new ApolloError('This user already exists on this team')
				default:
					throw new ApolloError('An error occurred when creating this team')
			}
		}
	}

}
