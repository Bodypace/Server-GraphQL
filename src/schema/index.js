const { gql } = require('apollo-server')
const { merge } = require('lodash')
const {
  typeDefs: Meal,
  resolvers: mealResolvers
} = require('./basic/meal')
const {
  typeDefs: Mealtime,
  resolvers: mealtimeResolvers
} = require('./basic/mealtime')
const {
  typeDefs: Goal,
  resolvers: goalResolvers
} = require('./basic/goal')
const {
  typeDefs: Water,
  resolvers: waterResolvers
} = require('./basic/water')
const {
  typeDefs: Product,
  resolvers: productResolvers
} = require('./basic/product')
const {
  typeDefs: Buy,
  resolvers: buyResolvers
} = require('./basic/buy')
const {
  typeDefs: Eat,
  resolvers: eatResolvers
} = require('./basic/eat')
const {
  typeDefs: Items,
  resolvers: itemsResolvers
} = require('./screens/items')
const {
  typeDefs: Diet,
  resolvers: dietResolvers
} = require('./screens/diet')
const {
  typeDefs: Products,
  resolvers: productsResolvers
} = require('./screens/products')
const {
  typeDefs: User,
  resolvers: userResolvers
} = require('./screens/user')


const Base = gql`
  # scalar Date 

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  Base,
  Meal,
  Mealtime,
  Goal,
  Water,
  Product,
  Buy,
  Eat,
  Items,
  Diet,
  Products,
  User,
]

const resolvers = merge({},
  mealResolvers,
  mealtimeResolvers,
  goalResolvers,
  waterResolvers,
  productResolvers,
  buyResolvers,
  eatResolvers,
  itemsResolvers,
  dietResolvers,
  productsResolvers,
  userResolvers,
)

module.exports = { typeDefs, resolvers }
