import { UserDataSource } from './user'
import { TeamDataSource } from './team'

export const dataSources = {
	userDataSource: new UserDataSource(),
	teamDataSource: new TeamDataSource(),
}

/**
 * Object containing all data sources injected into the `Context` by Apollo Server
 */
export type DataSources = typeof dataSources
