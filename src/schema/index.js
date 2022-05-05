const fs = require('fs')
const { gql } = require('apollo-server')
const { merge } = require('lodash')


const Base = gql`
  # scalar Date 

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

let typeDefs = [Base]
let resolvers = {}

const require_dir = dir => {
  fs.readdirSync(`src/schema/${dir}`).forEach(file => {
    const {
      typeDefs: Type,
      resolvers: typeResolvers
    } = require(`./${dir}/${file}`)

    typeDefs.push(Type)
    resolvers = merge(resolvers, typeResolvers)
  })
}

require_dir("basic")
require_dir("screens")

module.exports = { typeDefs, resolvers }