const login = 'login'
const home = '/'
const adminHome = 'admin'
const newRoute = 'new'
const gameIndex = 'game'
const game = (gameId = ':gameId', absolute?: boolean) => `${absolute ? '/' : ''}${gameIndex}/${gameId}`
const newGame = () => `game/${newRoute}`
const question = (questionIndex = ':questionIndex') => `question/${questionIndex}`
const gameQuestion = (gameId: string, questionIndex: string) => `/${game(gameId)}/${question(questionIndex)}`

export const routeNames = {
	login,
	home,
	adminHome,
	newRoute,
	gameIndex,
	game,
	question,
	gameQuestion,
	newGame,
}
