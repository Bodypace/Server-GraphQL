const { gql } = require('apollo-server')


const typeDefs = gql`
  extend type Query {
    login(email: String!, password: String!): LoginResponse!
    user: User
  }

  extend type Mutation {
    register(email: String!, password: String!): LoginResponse!
  }

  type LoginResponse {
    success: Boolean!
    token: String
  }

  type User {
    email: String!
    glassSize: Int!
    language: String!
    currency: String!
    goals: [Goal]!
    meals: [Meal]!
  }
`

const loginResponse = async loginUserPromise => {
  const response = await loginUserPromise
  if (response === null) {
    return { success: false }
  }
  return { ...response, success: true }
}

const resolvers = {
  Query: {
    login: (_, { email, password }, { dataSources }) =>
      loginResponse(dataSources.bodypaceAPI.loginUser(email, password)),

    user: (_, __, { dataSources }) =>
      dataSources.bodypaceAPI.getUser(),
  },
  Mutation: {
    register: async (_, { email, password }, { dataSources }) =>
      loginResponse(dataSources.bodypaceAPI.loginUser(email, password)),
  },
  User: {
    goals: (_, __, { dataSources }) =>
      dataSources.bodypaceAPI.getGoals(),

    meals: (_, __, { dataSources }) =>
      dataSources.bodypaceAPI.getMeals(),
  },
}

module.exports = { typeDefs, resolvers }