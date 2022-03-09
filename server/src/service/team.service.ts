import { DataSource } from 'apollo-datasource'
import { ApolloError } from 'apollo-server'
import { ProducedContext } from '@/context'
import { Team as TeamEntity, Game as GameEntity } from '@/entity'
import { DbError, PgErrorCode } from '@/util'
import { NewTeam, Team } from '@/types'
import { getManager } from 'typeorm'

export class TeamService extends DataSource<ProducedContext> {

	async getOne(teamId: string): Promise<Team> {
		try {
			const teamResponse = await TeamEntity.findOneOrFail({
				where: { id: teamId },
				relations: ['users'],
			})
			return {
				...teamResponse,
			}
		} catch (err) {
			throw new ApolloError('Could not find the requested team')
		}
	}

	async create(newTeam: NewTeam, gameId: string): Promise<Team> {
		try {
			return getManager().transaction(async entityManager => {
				/* Get Game */
				const game = await GameEntity.findOneOrFail({
					where: {
						id: gameId,
					},
				})

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
}
