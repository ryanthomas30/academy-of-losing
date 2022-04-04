/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
import { User as UserEntity } from '../../entity/user.entity';
import { Team as TeamEntity } from '../../entity/team.entity';
import { Game as GameEntity } from '../../entity/game.entity';
import { Question as QuestionEntity, TeamQuestion as TeamQuestionEntity } from '../../entity/question.entity';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Game: ResolverTypeWrapper<GameEntity>;
  GameQuestion: ResolverTypeWrapper<QuestionEntity>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Mutation: ResolverTypeWrapper<{}>;
  NewGame: NewGame;
  NewQuestion: NewQuestion;
  NewTeam: NewTeam;
  NewUser: NewUser;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Team: ResolverTypeWrapper<TeamEntity>;
  TeamQuestion: ResolverTypeWrapper<TeamQuestionEntity>;
  User: ResolverTypeWrapper<UserEntity>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Game: GameEntity;
  GameQuestion: QuestionEntity;
  ID: Scalars['ID'];
  Image: Image;
  Mutation: {};
  NewGame: NewGame;
  NewQuestion: NewQuestion;
  NewTeam: NewTeam;
  NewUser: NewUser;
  Query: {};
  String: Scalars['String'];
  Team: TeamEntity;
  TeamQuestion: TeamQuestionEntity;
  User: UserEntity;
}>;

export type HasUserIdDirectiveArgs = { };

export type HasUserIdDirectiveResolver<Result, Parent, ContextType = any, Args = HasUserIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsAdminDirectiveArgs = { };

export type IsAdminDirectiveResolver<Result, Parent, ContextType = any, Args = IsAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['GameQuestion']>, ParentType, ContextType>;
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameQuestion'] = ResolversParentTypes['GameQuestion']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addQuestionToGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationAddQuestionToGameArgs, 'gameId' | 'questionId'>>;
  addUserToTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationAddUserToTeamArgs, 'teamId' | 'userId'>>;
  answerQuestion?: Resolver<ResolversTypes['TeamQuestion'], ParentType, ContextType, RequireFields<MutationAnswerQuestionArgs, 'answer' | 'questionId' | 'teamId'>>;
  createGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'newGame'>>;
  createQuestion?: Resolver<ResolversTypes['GameQuestion'], ParentType, ContextType, RequireFields<MutationCreateQuestionArgs, 'newQuestion'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'gameId' | 'newTeam'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'newUser'>>;
  removeQuestionFromGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationRemoveQuestionFromGameArgs, 'gameId' | 'questionId'>>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<QueryGameArgs, 'gameId'>>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['GameQuestion'], ParentType, ContextType, RequireFields<QueryQuestionArgs, 'questionId'>>;
  questions?: Resolver<Array<ResolversTypes['GameQuestion']>, ParentType, ContextType>;
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryTeamArgs, 'teamId'>>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['TeamQuestion']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeamQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamQuestion'] = ResolversParentTypes['TeamQuestion']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  isCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Game?: GameResolvers<ContextType>;
  GameQuestion?: GameQuestionResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamQuestion?: TeamQuestionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  hasUserId?: HasUserIdDirectiveResolver<any, any, ContextType>;
  isAdmin?: IsAdminDirectiveResolver<any, any, ContextType>;
}>;
