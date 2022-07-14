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

    mealTimes: async (_, __, { dataSources, day }) => {
      const mealTimes = await dataSources.bodypaceAPI.getMealTimes(day);
      const meals = await dataSources.bodypaceAPI.getMealsForDay(day);

      meals.forEach((meal) => {
        mealTimes.push({
          id: null,
          day,
          hour: meal.defaultHour,
          meal,
          eats: [],
        });
      });

      return mealTimes;
    },
  },
};

module.exports = { typeDefs, resolvers };
