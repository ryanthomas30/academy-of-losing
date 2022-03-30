import { define } from 'typeorm-seeding'
import { Answer } from '../../src/entity'

define(Answer, () => {
	const answer = new Answer()
	return answer
})
