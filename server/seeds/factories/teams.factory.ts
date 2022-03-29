import { define } from 'typeorm-seeding'
import { Faker } from '@faker-js/faker'
import { Team } from '../../src/entity'

define(Team, (faker: Faker) => {
	const team = new Team()
	team.name = faker.name.firstName()

	return team
})
