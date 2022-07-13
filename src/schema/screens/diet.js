const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    diet(day: String!): Diet
  }

  type Diet {
    goal: Goal
    water: [Water]!
    mealTimes: [MealTime]!
  }
`;

const resolvers = {
  Query: {
    diet: (_, { day }, context) => {
      context.day = day;
      return {};
    },
  },
  Diet: {
    goal: (_, __, { dataSources, day }) => dataSources.bodypaceAPI.getGoal(day),

    water: (_, __, { dataSources, day }) =>
      dataSources.bodypaceAPI.getWater(day),

    mealTimes: (_, __, { dataSources, day }) =>
      dataSources.bodypaceAPI.getMealTimes(day),
  },
};

module.exports = { typeDefs, resolvers };
