require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema');

const BodypaceAPI = require('./datasources/bodypace')

const dataSources = () => ({
  bodypaceAPI: new BodypaceAPI()
})


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    auth: req.headers.authorization,
  }),
  dataSources
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
