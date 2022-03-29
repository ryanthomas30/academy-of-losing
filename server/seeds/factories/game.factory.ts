import { define } from 'typeorm-seeding'
import { Game } from '../../src/entity'

define(Game, () => {
	const game = new Game()
	return game
})
