import { Resolvers } from '@/types'

export const teamResolver: Resolvers = {
	Query: {
		team: (_, { teamId }, { dataSources }) => dataSources.teamService.getTeam(teamId),
	},
	Mutation: {
		createTeam: (_, { newTeam, gameId }, { dataSources }) => dataSources.teamService.createTeam(newTeam, gameId),
		addUserToTeam: (_, { teamId, userId }, { dataSources }) => dataSources.teamService.addUserToTeam(teamId, userId),
		removeUserFromTeam: (_, { teamId, userId }, { dataSources }) => dataSources.teamService.removeUserFromTeam(teamId, userId),
		answerQuestion: (_, { teamId, answer, questionId }, { dataSources }) =>
			dataSources.questionService.answerQuestion(teamId, answer, questionId),
	},
	Team: {
		users: ({ users }, _, { dataSources }) => dataSources.utilService.resolveNilToArray(users),
		questions: ({ id }, _, { dataSources }) => dataSources.questionService.getTeamQuestions(`${id}`),
	},
}
