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
  addQuestionToGame: Game;
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
  /**  Removes a question from a game.  */
  removeQuestionFromGame: Game;
  /**  Remove a user from a team.  */
  removeUserFromTeam: Team;
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


/**  Root Mutation  */
export type MutationRemoveQuestionFromGameArgs = {
  gameId: Scalars['ID'];
  questionId: Scalars['ID'];
};


/**  Root Mutation  */
export type MutationRemoveUserFromTeamArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
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
  /**  Get all games.  */
  games: Array<Game>;
  /**  Get logged in user.  */
  me: User;
  /**  Get a question by id.  */
  question: GameQuestion;
  /**  Get all questions.  */
  questions: Array<GameQuestion>;
  /**  Get a team by id.  */
  team: Team;
  /**  Test query for health checks.  */
  test?: Maybe<Scalars['String']>;
  /**  Get a user by id.  */
  user: User;
  /**  Get all users.  */
  users: Array<User>;
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

export type AddQuestionToGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
  questionId: Scalars['ID'];
}>;


export type AddQuestionToGameMutation = { __typename?: 'Mutation', addQuestionToGame: { __typename?: 'Game', id: string, name: string, teams: Array<{ __typename?: 'Team', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> }>, questions: Array<{ __typename?: 'GameQuestion', id: string, title: string, description: string, image?: { __typename?: 'Image', id: string, url: string } | null }> } };

export type AddUserToTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type AddUserToTeamMutation = { __typename?: 'Mutation', addUserToTeam: { __typename?: 'Team', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> } };

export type AdminGameQueryVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type AdminGameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, name: string, teams: Array<{ __typename?: 'Team', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> }>, questions: Array<{ __typename?: 'GameQuestion', id: string, title: string, description: string, image?: { __typename?: 'Image', id: string, url: string } | null }> } };

export type CreateGameMutationVariables = Exact<{
  newGame: NewGame;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, name: string } };

export type CreateQuestionMutationVariables = Exact<{
  newQuestion: NewQuestion;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'GameQuestion', id: string, title: string, description: string, image?: { __typename?: 'Image', id: string, url: string } | null } };

export type CreateTeamMutationVariables = Exact<{
  newTeam: NewTeam;
  gameId: Scalars['ID'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> } };

export type CreateUserMutationVariables = Exact<{
  newUser: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean } };

export type GameQueryVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type GameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, name: string, team: { __typename?: 'Team', id: string, name: string, questions: Array<{ __typename?: 'TeamQuestion', id: string, title: string, description: string, isCorrect: boolean, image?: { __typename?: 'Image', id: string, url: string } | null }> }, questions: Array<{ __typename?: 'GameQuestion', id: string, description: string, title: string }> } };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: string, name: string, questions: Array<{ __typename?: 'GameQuestion', id: string, description: string, title: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, isAdmin: boolean, email: string, fullName: string, photoUrl?: string | null, games: Array<{ __typename?: 'Game', id: string, name: string, questions: Array<{ __typename?: 'GameQuestion', id: string, description: string, title: string }> }> } };

export type QuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'GameQuestion', id: string, title: string, description: string, image?: { __typename?: 'Image', id: string, url: string } | null }> };

export type RemoveQuestionFromGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
  questionId: Scalars['ID'];
}>;


export type RemoveQuestionFromGameMutation = { __typename?: 'Mutation', removeQuestionFromGame: { __typename?: 'Game', id: string, name: string, teams: Array<{ __typename?: 'Team', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> }>, questions: Array<{ __typename?: 'GameQuestion', id: string, title: string, description: string, image?: { __typename?: 'Image', id: string, url: string } | null }> } };

export type RemoveUserFromTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type RemoveUserFromTeamMutation = { __typename?: 'Mutation', removeUserFromTeam: { __typename?: 'Team', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> } };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', test?: string | null };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, isAdmin: boolean, email: string, fullName: string, photoUrl?: string | null, games: Array<{ __typename?: 'Game', id: string }> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isAdmin: boolean, photoUrl?: string | null }> };


export const AddQuestionToGameDocument = gql`
    mutation AddQuestionToGame($gameId: ID!, $questionId: ID!) {
  addQuestionToGame(gameId: $gameId, questionId: $questionId) {
    id
    name
    teams {
      id
      name
      users {
        id
        fullName
        email
        isAdmin
        photoUrl
      }
    }
    questions {
      id
      title
      description
      image {
        id
        url
      }
    }
  }
}
    `;
export type AddQuestionToGameMutationFn = Apollo.MutationFunction<AddQuestionToGameMutation, AddQuestionToGameMutationVariables>;

/**
 * __useAddQuestionToGameMutation__
 *
 * To run a mutation, you first call `useAddQuestionToGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuestionToGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuestionToGameMutation, { data, loading, error }] = useAddQuestionToGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useAddQuestionToGameMutation(baseOptions?: Apollo.MutationHookOptions<AddQuestionToGameMutation, AddQuestionToGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQuestionToGameMutation, AddQuestionToGameMutationVariables>(AddQuestionToGameDocument, options);
      }
export type AddQuestionToGameMutationHookResult = ReturnType<typeof useAddQuestionToGameMutation>;
export type AddQuestionToGameMutationResult = Apollo.MutationResult<AddQuestionToGameMutation>;
export type AddQuestionToGameMutationOptions = Apollo.BaseMutationOptions<AddQuestionToGameMutation, AddQuestionToGameMutationVariables>;
export const AddUserToTeamDocument = gql`
    mutation AddUserToTeam($teamId: ID!, $userId: ID!) {
  addUserToTeam(teamId: $teamId, userId: $userId) {
    id
    name
    users {
      id
      fullName
      email
      isAdmin
      photoUrl
    }
  }
}
    `;
export type AddUserToTeamMutationFn = Apollo.MutationFunction<AddUserToTeamMutation, AddUserToTeamMutationVariables>;

/**
 * __useAddUserToTeamMutation__
 *
 * To run a mutation, you first call `useAddUserToTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToTeamMutation, { data, loading, error }] = useAddUserToTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddUserToTeamMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToTeamMutation, AddUserToTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToTeamMutation, AddUserToTeamMutationVariables>(AddUserToTeamDocument, options);
      }
export type AddUserToTeamMutationHookResult = ReturnType<typeof useAddUserToTeamMutation>;
export type AddUserToTeamMutationResult = Apollo.MutationResult<AddUserToTeamMutation>;
export type AddUserToTeamMutationOptions = Apollo.BaseMutationOptions<AddUserToTeamMutation, AddUserToTeamMutationVariables>;
export const AdminGameDocument = gql`
    query AdminGame($gameId: ID!) {
  game(gameId: $gameId) {
    id
    name
    teams {
      id
      name
      users {
        id
        fullName
        email
        isAdmin
        photoUrl
      }
    }
    questions {
      id
      title
      description
      image {
        id
        url
      }
    }
  }
}
    `;

/**
 * __useAdminGameQuery__
 *
 * To run a query within a React component, call `useAdminGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGameQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useAdminGameQuery(baseOptions: Apollo.QueryHookOptions<AdminGameQuery, AdminGameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGameQuery, AdminGameQueryVariables>(AdminGameDocument, options);
      }
export function useAdminGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGameQuery, AdminGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGameQuery, AdminGameQueryVariables>(AdminGameDocument, options);
        }
export type AdminGameQueryHookResult = ReturnType<typeof useAdminGameQuery>;
export type AdminGameLazyQueryHookResult = ReturnType<typeof useAdminGameLazyQuery>;
export type AdminGameQueryResult = Apollo.QueryResult<AdminGameQuery, AdminGameQueryVariables>;
export const CreateGameDocument = gql`
    mutation CreateGame($newGame: NewGame!) {
  createGame(newGame: $newGame) {
    id
    name
  }
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      newGame: // value for 'newGame'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($newQuestion: NewQuestion!) {
  createQuestion(newQuestion: $newQuestion) {
    id
    title
    description
    image {
      id
      url
    }
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      newQuestion: // value for 'newQuestion'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($newTeam: NewTeam!, $gameId: ID!) {
  createTeam(newTeam: $newTeam, gameId: $gameId) {
    id
    name
    users {
      id
      fullName
      email
      isAdmin
      photoUrl
    }
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      newTeam: // value for 'newTeam'
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
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
    questions {
      id
      description
      title
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
export const GamesDocument = gql`
    query Games {
  games {
    id
    name
    questions {
      id
      description
      title
    }
  }
}
    `;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesQuery(baseOptions?: Apollo.QueryHookOptions<GamesQuery, GamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
      }
export function useGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
        }
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesQueryResult = Apollo.QueryResult<GamesQuery, GamesQueryVariables>;
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
      questions {
        id
        description
        title
      }
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
export const QuestionsDocument = gql`
    query Questions {
  questions {
    id
    title
    description
    image {
      id
      url
    }
  }
}
    `;

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const RemoveQuestionFromGameDocument = gql`
    mutation RemoveQuestionFromGame($gameId: ID!, $questionId: ID!) {
  removeQuestionFromGame(gameId: $gameId, questionId: $questionId) {
    id
    name
    teams {
      id
      name
      users {
        id
        fullName
        email
        isAdmin
        photoUrl
      }
    }
    questions {
      id
      title
      description
      image {
        id
        url
      }
    }
  }
}
    `;
export type RemoveQuestionFromGameMutationFn = Apollo.MutationFunction<RemoveQuestionFromGameMutation, RemoveQuestionFromGameMutationVariables>;

/**
 * __useRemoveQuestionFromGameMutation__
 *
 * To run a mutation, you first call `useRemoveQuestionFromGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuestionFromGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuestionFromGameMutation, { data, loading, error }] = useRemoveQuestionFromGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useRemoveQuestionFromGameMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuestionFromGameMutation, RemoveQuestionFromGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveQuestionFromGameMutation, RemoveQuestionFromGameMutationVariables>(RemoveQuestionFromGameDocument, options);
      }
export type RemoveQuestionFromGameMutationHookResult = ReturnType<typeof useRemoveQuestionFromGameMutation>;
export type RemoveQuestionFromGameMutationResult = Apollo.MutationResult<RemoveQuestionFromGameMutation>;
export type RemoveQuestionFromGameMutationOptions = Apollo.BaseMutationOptions<RemoveQuestionFromGameMutation, RemoveQuestionFromGameMutationVariables>;
export const RemoveUserFromTeamDocument = gql`
    mutation RemoveUserFromTeam($teamId: ID!, $userId: ID!) {
  removeUserFromTeam(teamId: $teamId, userId: $userId) {
    id
    name
    users {
      id
      fullName
      email
      isAdmin
      photoUrl
    }
  }
}
    `;
export type RemoveUserFromTeamMutationFn = Apollo.MutationFunction<RemoveUserFromTeamMutation, RemoveUserFromTeamMutationVariables>;

/**
 * __useRemoveUserFromTeamMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromTeamMutation, { data, loading, error }] = useRemoveUserFromTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserFromTeamMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromTeamMutation, RemoveUserFromTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromTeamMutation, RemoveUserFromTeamMutationVariables>(RemoveUserFromTeamDocument, options);
      }
export type RemoveUserFromTeamMutationHookResult = ReturnType<typeof useRemoveUserFromTeamMutation>;
export type RemoveUserFromTeamMutationResult = Apollo.MutationResult<RemoveUserFromTeamMutation>;
export type RemoveUserFromTeamMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromTeamMutation, RemoveUserFromTeamMutationVariables>;
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
export const UsersDocument = gql`
    query Users {
  users {
    id
    fullName
    email
    isAdmin
    photoUrl
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;