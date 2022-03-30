import { UserService } from './user.service'
import { TeamService } from './team.service'
import { GameService } from './game.service'
import { QuestionService } from './question.service'
import { UtilService } from './util.service'
import { FirebaseService } from './firebase.service'

export const dataSources = {
	userService: new UserService(),
	teamService: new TeamService(),
	gameService: new GameService(),
	questionService: new QuestionService(),
	utilService: new UtilService(),
	firebaseService: new FirebaseService(),
}

/**
 * Object containing all data sources injected into the `Context` by Apollo Server
 */
export type DataSources = typeof dataSources
