// const { GraphQLScalarType, Kind } = require('graphql');

// module.exports = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value) {
//     return new Date(value).getTime();
//   },
//   parseValue(value) {
//     return new Date(value).toISOString();
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10)).toISOString();
//     }
//     return null;
//   },
// });

