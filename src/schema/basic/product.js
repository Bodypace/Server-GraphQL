const { gql } = require('apollo-server')

const typeDefs = gql`
  type Product {
    name: String!
    vendor: String
    units: Int!
    unitSize: Int!
    barcode: String
    kcal: Int!
    protein: Float!
    carb: Float!
    sugar: Float!
    fat: Float!
    saturated: Float!
    salt: Float
  }
`

const resolvers = {
}

module.exports = { typeDefs, resolvers }