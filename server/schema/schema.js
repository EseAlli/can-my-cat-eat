const FoodList = require("../models/FoodList");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLBoolean,
} = require("graphql");

const FoodType = new GraphQLObjectType({
  name: "FoodList",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    level: { type: GraphQLString },
    description: { type: GraphQLString },
    canEat: { type: GraphQLBoolean },
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
    food: {
      type: FoodType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return FoodList.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //add Food
    addFood: {
      type: FoodType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        canEat: { type: GraphQLNonNull(GraphQLBoolean) },
        description: { type: GraphQLNonNull(GraphQLString) },
        tips: { type: GraphQLString },
        level: {
          type: new GraphQLEnumType({
            name: "ToxicityLevel",
            values: {
              non: { value: "Non Toxic" },
              moderate: { value: "Moderate" },
              toxic: { value: "Toxic" },
            },
            defaultValue: "Toxic",
          }),
        },
      },
      resolve(parent, args) {
        const food = new FoodList({
          name: args.name,
          tips: args.tips,
          description: args.description,
          canEat: args.canEat,
          level: args.level,
        });

        return food.save();
      },
    },

    //delete Food
    deleteFood: {
      type: FoodType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return FoodList.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
