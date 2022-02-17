import { GraphQLSchema } from 'graphql'

// eslint-disable-next-line no-unused-vars
export type DirectiveTransformer = (schema: GraphQLSchema) => GraphQLSchema

export interface DirectiveObject {
	typeDefs: string
	transformer: DirectiveTransformer
}

// eslint-disable-next-line no-unused-vars
export type DirectiveFunction = (directiveName: string) => DirectiveObject
