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
  name: Scalars['String'];
  questions: Array<GameQuestion>;
  team: Team;
  teams: Array<Team>;
};

/**  Question for a game  */
export type GameQuestion = {
  __typename?: 'GameQuestion';
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  title: Scalars['String'];
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
  /**  Submit a Team's Answer  */
  answerQuestion: TeamQuestion;
  /**  Create a new game.  */
  createGame: Game;
  /**  Create a new question.  */
  createQuestion: GameQuestion;
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
export type MutationAnswerQuestionArgs = {
  answer: Scalars['String'];
  questionId: Scalars['ID'];
  teamId: Scalars['ID'];
};


/**  Root Mutation  */
export type MutationCreateGameArgs = {
  newGame: NewGame;
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

/**  New Game  */
export type NewGame = {
  name: Scalars['String'];
};

/**  New Question  */
export type NewQuestion = {
  answers: Array<Scalars['String']>;
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
  /**  Get logged in user.  */
  me: User;
  /**  Get a question by id.  */
  question: GameQuestion;
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

/**  Team  */
export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  questions: Array<TeamQuestion>;
  users: Array<User>;
};

/**  Question for a team  */
export type TeamQuestion = {
  __typename?: 'TeamQuestion';
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  isCorrect: Scalars['Boolean'];
  title: Scalars['String'];
};

/**  User  */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  fullName: Scalars['String'];
  games: Array<Game>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  photoUrl?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  newUser: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean } };

export type GameQueryVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type GameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, name: string, team: { __typename?: 'Team', id: string, name: string, questions: Array<{ __typename?: 'TeamQuestion', id: string, title: string, description: string, isCorrect: boolean, image?: { __typename?: 'Image', id: string, url: string } | null }> } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, isAdmin: boolean, email: string, fullName: string, photoUrl?: string | null, games: Array<{ __typename?: 'Game', id: string, name: string }> } };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', test?: string | null };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, isAdmin: boolean, email: string, fullName: string, photoUrl?: string | null, games: Array<{ __typename?: 'Game', id: string }> } };


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
export const GameDocument = gql`
    query Game($gameId: ID!) {
  game(gameId: $gameId) {
    id
    name
    team {
      id
      name
      questions {
        id
        title
        description
        isCorrect
        image {
          id
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGameQuery__
 *
 * To run a query within a React component, call `useGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useGameQuery(baseOptions: Apollo.QueryHookOptions<GameQuery, GameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameQuery, GameQueryVariables>(GameDocument, options);
      }
export function useGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameQuery, GameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameQuery, GameQueryVariables>(GameDocument, options);
        }
export type GameQueryHookResult = ReturnType<typeof useGameQuery>;
export type GameLazyQueryHookResult = ReturnType<typeof useGameLazyQuery>;
export type GameQueryResult = Apollo.QueryResult<GameQuery, GameQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    isAdmin
    email
    fullName
    photoUrl
    games {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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
export const UserDocument = gql`
    query User($userId: ID!) {
  user(userId: $userId) {
    id
    isAdmin
    email
    fullName
    photoUrl
    games {
      id
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;