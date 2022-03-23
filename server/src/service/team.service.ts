
import { ApolloError } from 'apollo-server'
import { LiteDataSource } from '@/dataSource'
import { Team as TeamEntity, Game as GameEntity, User as UserEntity } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewTeam, Team } from '@/types'

export class TeamService extends LiteDataSource {

	getTeam(teamId: string): Promise<Team> {
		return TeamEntity.getOne(teamId)
	}

	async createTeam(newTeam: NewTeam, gameId: string): Promise<Team> {
		/* Get Game */
		const game = await GameEntity.getOne(gameId)

		/* Create new Team with Game */
		const team = TeamEntity.create({
			...newTeam,
			game,
		})
		try {
			/* Save Team */
			const teamResponse = await team.save()
			return teamResponse
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
		/* Get Team */
		const team = await TeamEntity.getOne(teamId)

		/* Get User */
		const user = await UserEntity.getOne(userId)

		/* Add new User to Team */
		team.users = [...team.users, user]
		try {
			/* Save Team */
			return team.save()
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
