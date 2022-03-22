import { UserService } from './user.service'
import { TeamService } from './team.service'
import { GameService } from './game.service'

export const dataSources = {
	userService: new UserService(),
	teamService: new TeamService(),
	gameService: new GameService(),
}

/**
 * Object containing all data sources injected into the `Context` by Apollo Server
 */
export type DataSources = typeof dataSources