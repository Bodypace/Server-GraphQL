const { gql } = require('apollo-server')

const typeDefs = gql`
  type Buy {
    day: String
    amount: Int
    price: Float
    product: Product!
  }
`

const resolvers = {
  Buy: {
    product: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getProduct(parent.ProductId),
  }
}

module.exports = { typeDefs, resolvers }