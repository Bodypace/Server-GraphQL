const { gql } = require('apollo-server')
const { makeResponseCreator } = require('../resolvers-common')

const typeDefs = gql`
  extend type Mutation {
    patchGoal(id: ID!, data: GoalPatch!): GoalOperationResponse
  }

  type GoalOperationResponse {
    success: Boolean!
    goal: Goal
  }

  input GoalData {
    daySince: String!
    name: String!
    water: Int!
    kcal: Int!
    protein: Float!
    carb: Float!
    fat: Float!
    salt: Float!
  }

  input GoalPatch {
    daySince: String
    name: String
    water: Int
    kcal: Int
    protein: Float
    carb: Float
    fat: Float
    salt: Float
  }

  type Goal {
    id: ID!
    daySince: String!
    name: String!
    water: Int!
    kcal: Int!
    protein: Float!
    carb: Float!
    fat: Float!
    salt: Float!
  }
`

const response = makeResponseCreator('goal')

const resolvers = {
  Mutation: {
    // createGoal: (_, { data }, { dataSources }) =>
    //   response(dataSources.bodypaceAPI.createGoal(data)),

    patchGoal: (_, { id, data }, { dataSources }) =>
      response(dataSources.bodypaceAPI.patchGoal(id, data)),

    // deleteGoal: (_, { id, data }, { dataSources }) =>
    //   response(dataSources.bodypaceAPI.patchGoal(id, data))
  }
}

module.exports = { typeDefs, resolvers }