const { gql } = require('apollo-server')
const { makeResponseCreator } = require('../resolvers-common')

const typeDefs = gql`
  extend type Mutation {
    patchEat(id: ID!, data: EatPatch!): EatOperationResponse
  }

  type EatOperationResponse {
    success: Boolean!
    eat: Eat
  }

  input EatPatch {
    amount: Int
  }

  type Eat {
    id: ID!
    amount: Int!
    buy: Buy
    product: Product!
  }
`

const response = makeResponseCreator('eat')

const resolvers = {
  Mutation: {
    patchEat: (_, { id, data }, { dataSources }) =>
      response(dataSources.bodypaceAPI.patchEat(id, data)),
  },
  Eat: {
    buy: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getBuy(parent.BuyId),

    product: (parent, __, { dataSources }) =>
      dataSources.bodypaceAPI.getProduct(parent.ProductId),
  }
}

module.exports = { typeDefs, resolvers }