import { DataSource, DataSourceConfig } from 'apollo-datasource'
import { ProducedContext } from '@/context'

export class LiteDataSource extends DataSource<ProducedContext> {
	context: ProducedContext

	constructor() {
		super()
		this.context = {} as ProducedContext
	}

	initialize({ context }: DataSourceConfig<ProducedContext>) {
		this.context = context
	}

}
