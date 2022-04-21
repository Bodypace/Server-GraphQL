const { gql } = require('apollo-server')

const typeDefs = gql`
  type Eat {
    id: ID!
    amount: Int!
    buy: Buy
    product: Product!
  }
`

const resolvers = {
  Eat: {
    buy: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getBuy(parent.BuyId),

    product: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getProduct(parent.ProductId),
  }
}

module.exports = { typeDefs, resolvers }