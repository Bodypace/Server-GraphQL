const { gql } = require('apollo-server')
const { makeResponseCreator } = require('../resolvers-common')

const typeDefs = gql`
  extend type Mutation {
    # createMealTime(data: MealTimeData!): MealTimeOperationResponse
    patchMealTime(id: ID!, data: MealTimePatch!): MealTimeOperationResponse
    # deleteMealTime(id: ID!): MealTimeOperationResponse
  }

  type MealTimeOperationResponse {
    success: Boolean!
    mealTime: MealTime
  }

  input MealTimeData {
    day: String!
    hour: String!
    MealId: ID!
  }

  input MealTimePatch {
    day: String
    hour: String
    MealId: ID
  } 

  type MealTime {
    id: ID!
    day: String!
    hour: String!
    meal: Meal!
    eats: [Eat]!
  }
`

const response = makeResponseCreator('mealTime')

const resolvers = {
  Mutation: {
    patchMealTime: (_, { id, data }, { dataSources }) =>
      response(dataSources.bodypaceAPI.patchMealTime(id, data)),
  },
  MealTime: {
    meal: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getMeal(parent.MealId),

    eats: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getEats(parent.id),
  }
}

module.exports = { typeDefs, resolvers }