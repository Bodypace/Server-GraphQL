const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    home(day: String!): Home
  }

  type Home {
    inventory: [Buy]!
    shoppingList: [Buy]!
    wasted: [Eat]!
    goal: Goal
    mealTimes: [MealTime]!
  }
`;

const resolvers = {
  Query: {
    home: (_, { day }, context) => {
      context.day = day;
      return {};
    },
  },
  Home: {
    inventory: (_, __, { dataSources, day }) =>
      dataSources.bodypaceAPI.getInventory(day),

    shoppingList: (_, __, { dataSources, day }) =>
      dataSources.bodypaceAPI.getShoppingList(day),

    wasted: (_, __, { dataSources, day }) =>
      dataSources.bodypaceAPI.getWasted(day),

    goal: (_, __, { dataSources, day }) => dataSources.bodypaceAPI.getGoal(day),

    mealTimes: (_, __, { dataSources, day }) =>
      dataSources.bodypaceAPI.getMealTimes(day),
  },
};

module.exports = { typeDefs, resolvers };
