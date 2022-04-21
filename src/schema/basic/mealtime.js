const { gql } = require('apollo-server')

const typeDefs = gql`
  type MealTime {
    id: ID!
    day: String!
    hour: String!
    meal: Meal!
    eats: [Eat]!
  }
`

const resolvers = {
  MealTime: {
    meal: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getMeal(parent.MealId),

    eats: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getEats(parent.id),
  }
}

module.exports = { typeDefs, resolvers }