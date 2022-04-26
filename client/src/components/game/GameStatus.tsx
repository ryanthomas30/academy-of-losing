import { CommentText, Flexbox, Row, Text, QuestionStatus, ProgressTracker } from '@/components'
import { GameQuery } from '@/apollo'
import { theme } from '@/constants'

type Team = GameQuery['game']['teams'][number]

interface GameStatusProps {
	teams: Team[]
	currentTeam?: Team
}

export const GameStatus: React.FC<GameStatusProps> = ({ teams, currentTeam }) => {
	const sortedTeams = () => teams.map(team => {
		const isCompleted = team.questions.every(q => q.isCorrect)
		const questionCompletionTimes = team.questions.map(q => q.completionTime ? parseInt(q.completionTime) : 0)
		const gameCompletionTime = isCompleted ? Math.max(...questionCompletionTimes) : Infinity
		const questionStatuses: QuestionStatus[] = team.questions.map((q, i) => ({
			isCompleted: q.isCorrect,
			questionId: q.id,
			questionNumber: i,
		}))
		return {
			...team,
			isCompleted,
			gameCompletionTime,
			isCurrentTeam: currentTeam?.id === team.id,
			questionStatuses,
		}
	}).sort((a, b) => a.gameCompletionTime - b.gameCompletionTime)

	const currentTeamPlace = sortedTeams().findIndex(t => t.id === currentTeam?.id) + 1

	const completedTeams = sortedTeams().filter(t => t.isCompleted)
	const incompleteTeams = sortedTeams().filter(t => !t.isCompleted)

	return (
		<Flexbox
			center
			full
			marginBetween='large'
		>
			{currentTeamPlace > 0 && (
				<Row center>
					<Text
						size={32}
						color={theme.color.yellow}
					>
						{`You got ${currentTeamPlace}th place!`}
					</Text>
				</Row>
			)}
			{completedTeams.length > 0 && (
				<Flexbox
					full='horizontal'
					marginBetween='medium'
					center
				>
					<Row center>
						<CommentText
							size={20}
							multiline
						>
							Leaderboard
						</CommentText>
					</Row>
					{completedTeams.map((team, i) => (
						<Row
							key={team.id}
							center
							marginBetween='medium'
						>
							<Text
								color={team.isCurrentTeam ? theme.color.teal : theme.color.white}
								size={18}
							>
								{`${i + 1}. ${team.name}`}
							</Text>
							<ProgressTracker
								questionStatuses={team.questionStatuses}
							/>
						</Row>
					))}
				</Flexbox>
			)}
			{incompleteTeams.length > 0 && (
				<Flexbox
					full='horizontal'
					marginBetween='medium'
					center
				>
					<Row center>
						<CommentText
							size={20}
							multiline
						>
							Not Finished
						</CommentText>
					</Row>
					{incompleteTeams.map((team) => (
						<Row
							key={team.id}
							center
							marginBetween='medium'
						>
							<Text
								color={team.isCurrentTeam ? theme.color.teal : theme.color.white}
								size={18}
							>
								{team.name}
							</Text>
							<ProgressTracker
								questionStatuses={team.questionStatuses}
							/>
						</Row>
					))}
				</Flexbox>
			)}
		</Flexbox>
	)
}
