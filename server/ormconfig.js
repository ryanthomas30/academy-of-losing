module.exports = {
	"seeds": ['seeds/**/*{.ts,.js}'],
	"factories": ['seeds/factories/**/*{.ts,.js}'],
	"cli": {
		"entitiesDir": "src/entity",
		"migrationsDir": "src/migration",
		"subscribersDir": "src/subscriber",
	},
}
