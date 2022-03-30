import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import { Team } from '../../src/entity'

define(Team, (faker: typeof Faker) => {
	const team = new Team()
	team.name = faker.name.firstName()

	return team
})
