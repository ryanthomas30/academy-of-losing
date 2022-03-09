import { Resolvers } from '@/types'

export const teamResolver: Resolvers = {
	Query: {
		team: (_, { teamId }, { dataSources }) => dataSources.teamDataSource.getOne(teamId),
	},
	Mutation: {
		createTeam: (_, { newTeam, gameId }, { dataSources }) => dataSources.teamDataSource.create(newTeam, gameId),
	},
}
