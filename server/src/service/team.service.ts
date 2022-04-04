import { ApolloError } from 'apollo-server'
import { LiteDataSource } from '@/dataSource'
import { Team, Game, User } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewTeam } from '@/types'

export class TeamService extends LiteDataSource {
	getTeam(teamId: string) {
		return Team.getOne(teamId)
	}

	async getTeamByUserGame(userId: string, gameId: string): Promise<Team> {
		try {
			const team = await this.getMaybeTeamByUserGame(userId, gameId)
			if (!team) throw new Error('Team does not exist for this user and game')
			return team
		} catch (e) {
			throw new ApolloError(
				`An error occurred when trying to fetch team for user: "${userId}" and game: "${gameId}" -- ${e}`,
			)
		}
	}

	async getMaybeTeamByUserGame(userId: string, gameId: string): Promise<Team | undefined> {
		try {
			const team = await Team.createQueryBuilder('team')
				.leftJoinAndSelect('team.users', 'user', 'user.id = :userId', {
					userId,
				})
				.where('team.gameId = :gameId', { gameId })
				.getOne()
			return team
		} catch (e) {
			throw new ApolloError(
				`An error occurred when trying to fetch team for user: "${userId}" and game: "${gameId}" -- ${e}`,
			)
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
					throw new ApolloError(`A team with this name already exists -- ${e}`)
				default:
					throw new ApolloError(`An error occurred when creating this team -- ${e}`)
			}
		}
	}

	async addUserToTeam(teamId: string, userId: string) {
		/* Get Team */
		const team = await Team.getOne(teamId, {
			relations: ['game'],
		})

		/* Get Game */
		const gameId = team.game?.id
		if (!gameId) throw Error('No game found for this team')

		/* Get Existing Team */
		const existingTeam = await this.getMaybeTeamByUserGame(userId, gameId)
		console.log('existingTeam:', existingTeam)

		/* If Existing Team === New Team, do nothing */
		if (existingTeam?.id === team.id) return team

		/* Remove User from existing Team */
		if (existingTeam) await this.removeUserFromTeam(existingTeam.id, userId)

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
					throw new ApolloError(`This user already exists on this team -- ${e}`)
				default:
					throw new ApolloError(
						`An error occurred when adding user: "${userId}" to team: "${teamId}" -- ${e}`,
					)
			}
		}
	}

	async removeUserFromTeam(teamId: string, userId: string) {
		/* Get Team */
		const team = await Team.getOne(teamId)

		/* Remove User from Team */
		team.users = team.users?.filter((user) => `${user.id}` !== userId) ?? []
		try {
			/* Save Team */
			return team.save()
		} catch (e) {
			const error = new DbError(e)
			switch (error.code) {
				default:
					throw new ApolloError(
						`An error occurred when removing user: "${userId}" from team: "${teamId}" -- ${e}`,
					)
			}
		}

	}
}
