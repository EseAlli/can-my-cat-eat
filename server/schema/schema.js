const FoodList = require("../models/FoodList");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const FoodType = new GraphQLObjectType({
  name: "FoodList",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    level: { type: GraphQLString },
    description: { type: GraphQLString },
    tips: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    foods: {
      type: new GraphQLList(FoodType),
      resolve() {
        return FoodList.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
