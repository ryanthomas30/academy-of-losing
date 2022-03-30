import { DataSource, DataSourceConfig } from 'apollo-datasource'
import { Context } from '@/context'

export class LiteDataSource extends DataSource<Context> {
	context: Context

	constructor() {
		super()
		this.context = {} as Context
	}

	initialize({ context }: DataSourceConfig<Context>) {
		this.context = context
	}

}
