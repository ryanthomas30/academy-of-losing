const login = 'login'
const home = '/'
const adminHome = 'admin'
const game = (gameId = ':gameId', absolute?: boolean) => `${absolute ? '/' : ''}game/${gameId}`
const question = (questionIndex = ':questionIndex') => `question/${questionIndex}`
const gameQuestion = (gameId: string, questionIndex: string) => `/${game(gameId)}/${question(questionIndex)}`

export const routeNames = {
	login,
	home,
	adminHome,
	game,
	question,
	gameQuestion,
}
