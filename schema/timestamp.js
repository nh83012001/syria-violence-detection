const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const resolverMap = {
    Date: new GraphQLScalarType({
        name: "Timestamp",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value).getTime(); // value from the client
        },
        serialize(value) {
            return value; // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value).getTime(); // ast value is always in string format
            }
            return null;
        }
    })
};