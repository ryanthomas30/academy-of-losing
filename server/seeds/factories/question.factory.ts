import { Faker } from '@faker-js/faker'
import { define } from 'typeorm-seeding'
import { Question } from '../../src/entity'

define(Question, (faker: Faker) => {
	const question = new Question()
	const firstNumber = faker.datatype.number()
	const secondNumber = faker.datatype.number()
	question.title = 'ADD THESE NUMBERS'
	question.description = `${firstNumber} + ${secondNumber}`
	return question
})
