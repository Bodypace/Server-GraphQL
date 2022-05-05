const { gql } = require('apollo-server')
const { makeResponseCreator } = require('../resolvers-common')

const typeDefs = gql`
  extend type Mutation {
    createMeal(data: MealData!): MealOperationResponse
    patchMeal(id: ID!, data: MealPatch!): MealOperationResponse
    deleteMeal(id: ID!): MealOperationResponse
  }

  type MealOperationResponse {
    success: Boolean!
    meal: Meal
  }

  input MealData {
    daySince: String!
    dayUntil: String
    defaultHour: String!
    name: String!
  }

  input MealPatch {
    daySince: String
    dayUntil: String
    defaultHour: String
    name: String
  }

  type Meal {
    id: ID!
    daySince: String!
    dayUntil: String
    defaultHour: String!
    name: String!
  }
`

const response = makeResponseCreator('meal')

const resolvers = {
  Mutation: {
    createMeal: (_, { data }, { dataSources }) =>
      response(dataSources.bodypaceAPI.createMeal(data)),

    patchMeal: (_, { id, data }, { dataSources }) =>
      response(dataSources.bodypaceAPI.patchMeal(id, data)),

    deleteMeal: (_, { id, data }, { dataSources }) =>
      response(dataSources.bodypaceAPI.patchMeal(id, data))
  }
}

module.exports = { typeDefs, resolvers }