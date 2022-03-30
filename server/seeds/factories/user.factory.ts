import { define } from 'typeorm-seeding'
import * as Faker from 'faker'

import { User } from '../../src/entity'

define(User, (faker: typeof Faker) => {
	const user = new User()
	user.email = faker.internet.email()
	user.id = faker.datatype.uuid()
	user.fullName = faker.name.findName()

	return user
})
