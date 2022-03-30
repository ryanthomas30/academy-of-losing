import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import {
	User,
	Game,
	Team,
	Question,
	Answer,
} from '../src/entity'

export default class InitialDatabaseSeed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const users = await factory(User)().createMany(15)
		const questions = await factory(Question)().map(async (question) => {
			const [a, b] = question.description.split(' + ').map(Number)
			await factory(Answer)().create({ value: `${a + b}`, question })
			return question
		}).createMany(10)
		const game = await factory(Game)().map(async(game) => {
			game.questions = questions
			return game
		}).create()
		await factory(Team)().map(async (team) => {
			team.game = game
			// add 3 users to team
			const teamUsers = [users.pop(), users.pop(), users.pop()]
			team.users = teamUsers
			return team
		}).createMany(5)
	}
}
