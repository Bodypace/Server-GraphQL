const { gql } = require('apollo-server')


const typeDefs = gql`
  extend type Query {
    products: [Product]
  }
`

const resolvers = {

}

module.exports = { typeDefs, resolvers }