const { gql } = require('apollo-server')

const typeDefs = gql`
  type Water {
    day: String!
    hour: String!
    amount: Int
  }
`

const resolvers = {
}

module.exports = { typeDefs, resolvers }