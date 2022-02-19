import { GraphQLSchema } from 'graphql'

// eslint-disable-next-line no-unused-vars
export type DirectiveTransformer = (schema: GraphQLSchema) => GraphQLSchema
