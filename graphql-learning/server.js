const express = require('express');

const {graphqlHTTP} = require('express-graphql');
// GraphQLSchema is the schema which needs to be present when schema is present
// GraphQLObjectType is the object type schema when querying is required
// GraphQLString is the string present in the graphql 
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
})



// through console.log we get to know that graphqlHTTP needs to be used
console.log(graphqlHTTP);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(5000,()=> {
    console.log("Server is running on port 5000");
});