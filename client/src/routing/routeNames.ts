const login = 'login'
const home = '/'
const adminHome = 'admin'
const newRoute = 'new'
const gameIndex = 'game'
const game = (gameId = ':gameId', absolute?: boolean) => `${absolute ? '/' : ''}${gameIndex}/${gameId}`
const newGame = () => `${gameIndex}/${newRoute}`
const questionIndex = 'question'
const question = (questionNumber = ':questionNumber') => `${questionIndex}/${questionNumber}`
const newQuestion = () => `${questionIndex}/${newRoute}`
const gameQuestion = (gameId: string, questionIndex: string) => `/${game(gameId)}/${question(questionIndex)}`
const teamIndex = 'team'
const newTeam = () => `${teamIndex}/${newRoute}`

export const routeNames = {
	login,
	home,
	adminHome,
	newRoute,
	gameIndex,
	game,
	questionIndex,
	question,
	gameQuestion,
	newQuestion,
	newGame,
	teamIndex,
	newTeam,
}
