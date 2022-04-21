const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    items(day: String!): Items
  }

  type Items {
    home: [Buy]!
    shoppingList: [Buy]!
    wasted: [Eat]!
  }
`

const resolvers = {

}

module.exports = { typeDefs, resolvers }