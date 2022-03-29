/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/**  Game  */
export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  questions: Array<Question>;
  teams: Array<Team>;
};

/**  Image Object  */
export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  url: Scalars['String'];
};

/**  Root Mutation  */
export type Mutation = {
  __typename?: 'Mutation';
  /**  Add a question to a game.  */
  addQuestionToGame?: Maybe<Game>;
  /**  Add a user to a team.  */
  addUserToTeam: Team;
  /**  Create a new game.  */
  createGame: Game;
  /**  Create a new question.  */
  createQuestion: Question;
  /**  Create a new team.  */
  createTeam: Team;
  /**  Create a new user.  */
  createUser: User;
  /**  Test mutation for health checks.  */
  test?: Maybe<Scalars['String']>;
};


/**  Root Mutation  */
export type MutationAddQuestionToGameArgs = {
  gameId: Scalars['ID'];
  questionId: Scalars['ID'];
};


/**  Root Mutation  */
export type MutationAddUserToTeamArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};


/**  Root Mutation  */
export type MutationCreateQuestionArgs = {
  newQuestion: NewQuestion;
};


/**  Root Mutation  */
export type MutationCreateTeamArgs = {
  gameId: Scalars['ID'];
  newTeam: NewTeam;
};


/**  Root Mutation  */
export type MutationCreateUserArgs = {
  newUser: NewUser;
};

/**  New Question  */
export type NewQuestion = {
  answer: Scalars['String'];
  description: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

/**  New team object  */
export type NewTeam = {
  /**  The name of the team.  */
  name: Scalars['String'];
};

/**  New user object  */
export type NewUser = {
  /**  The user's email address.  */
  email: Scalars['String'];
  /**  The user's full name.  */
  fullName: Scalars['String'];
  id: Scalars['ID'];
};

/**  Root Query  */
export type Query = {
  __typename?: 'Query';
  /**  Get a game by id.  */
  game: Game;
  /**  Get a question by id.  */
  question: Question;
  /**  Get a team by id.  */
  team: Team;
  /**  Test query for health checks.  */
  test?: Maybe<Scalars['String']>;
  /**  Get a user by id.  */
  user: User;
};


/**  Root Query  */
export type QueryGameArgs = {
  gameId: Scalars['ID'];
};


/**  Root Query  */
export type QueryQuestionArgs = {
  questionId: Scalars['ID'];
};


/**  Root Query  */
export type QueryTeamArgs = {
  teamId: Scalars['ID'];
};


/**  Root Query  */
export type QueryUserArgs = {
  userId: Scalars['ID'];
};

/**  Question  */
export type Question = {
  __typename?: 'Question';
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  title: Scalars['String'];
};

/**  Team  */
export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  users: Array<User>;
};

/**  User  */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  fullName: Scalars['String'];
  games: Array<Game>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
};

export type CreateUserMutationVariables = Exact<{
  newUser: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean } };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', test?: string | null };


export const CreateUserDocument = gql`
    mutation CreateUser($newUser: NewUser!) {
  createUser(newUser: $newUser) {
    id
    fullName
    email
    isAdmin
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const TestDocument = gql`
    query Test {
  test
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;