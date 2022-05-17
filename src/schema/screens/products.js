const { gql } = require('apollo-server')


const typeDefs = gql`
  extend type Query {
    products: [Product]
  }
`

const resolvers = {
  Query: {
    products: (_, __, { dataSources } ) =>
      dataSources.bodypaceAPI.getProducts()
  }
}

module.exports = { typeDefs, resolvers }