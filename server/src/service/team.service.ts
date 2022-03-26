
import { ApolloError } from 'apollo-server'
import { LiteDataSource } from '@/dataSource'
import { Team, Game, User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewTeam } from '@/types'

export class TeamService extends LiteDataSource {

	getTeam(teamId: string) {
		return Team.getOne(teamId)
	}

	async getTeamByUserGame(userId: string, gameId: string) {
		try {
			const team = await Team
				.createQueryBuilder('team')
				.leftJoinAndSelect(
					'team.users',
					'user',
					'user.id = :userId',
					{ userId },
				)
				.where(
					'team.gameId = :gameId',
					{ gameId },
				)
				.getOneOrFail()
			return team
		} catch (err) {
			throw new ApolloError(`An error occurred when trying to fetch team for user: "${userId}" and game: "${gameId}".`)
		}
	}

	async getTeamIdByUserGame(userId: string, gameId: string) {
		const team = await this.getTeamByUserGame(userId, gameId)
		return team.id
	}

	async createTeam(newTeam: NewTeam, gameId: string) {
		/* Get Game */
		const game = await Game.getOne(gameId)

		/* Create new Team with Game */
		const team = Team.create({
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

	async addUserToTeam(teamId: string, userId: string) {
		/* Get Team */
		const team = await Team.getOne(teamId)

		/* Get User */
		const user = await User.getOne(userId)

		/* Add User to Team */
		team.users = [...(team.users ?? []), user]
		try {
			/* Save Team */
			return team.save()
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				case PgErrorCode.UniqueViolation:
					throw new ApolloError('This user already exists on this team')
				default:
					throw new ApolloError(`An error occurred when adding user: "${userId}" to team: "${teamId}"`)
			}
		}
	}
}
