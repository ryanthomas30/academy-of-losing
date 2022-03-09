import { Resolvers } from '@/types'

export const teamResolver: Resolvers = {
	Query: {
		team: (_, { teamId }, { dataSources }) => dataSources.teamService.getOne(teamId),
	},
	Mutation: {
		createTeam: (_, { newTeam, gameId }, { dataSources }) => dataSources.teamService.create(newTeam, gameId),
	},
}
