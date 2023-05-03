const express = require('express');

const {graphqlHTTP} = require('express-graphql');
// GraphQLSchema is the schema which needs to be present when schema is present
// GraphQLObjectType is the object type schema when querying is required
// GraphQLString is the string present in the graphql 
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const app = express();

// static book data
const books = [
    {
      id: 1,
      name: "To Kill a Mockingbird",
      authorId: 1
    },
    {
      id: 2,
      name: "The Great Gatsby",
      authorId: 2
    },
    {
      id: 3,
      name: "The Catcher in the Rye",
      authorId: 3
    },
    {
      id: 4,
      name: "One Hundred Years of Solitude",
      authorId: 2
    },
    {
      id: 5,
      name: "Pride and Prejudice",
      authorId: 2
    },
    {
      id: 6,
      name: "The Adventures of Huckleberry Finn",
      authorId: 2
    },
    {
      id: 7,
      name: "Animal Farm",
      authorId: 7
    },
    {
      id: 8,
      name: "Lord of the Flies",
      authorId: 8
    }
  ];

  // authors static data
  const authors = [
    {
      id: 1,
      name: "Harper Lee"
    },
    {
      id: 2,
      name: "F. Scott Fitzgerald"
    },
    {
      id: 3,
      name: "J.D. Salinger"
    },
    {
      id: 4,
      name: "Gabriel Garcia Marquez"
    },
    {
      id: 5,
      name: "Jane Austen"
    },
    {
      id: 6,
      name: "Mark Twain"
    },
    {
      id: 7,
      name: "George Orwell"
    },
    {
      id: 8,
      name: "William Golding"
    }
  ];

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
          type: GraphQLInt,
          description: 'A single Book Information',
          args: {
            id: {
              type: GraphQLInt,
            }
          },
          resolve: (parent,args) => {
            return books.find(book => books.id === args.id )
          }
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all Books',
            resolve: () => books
        },
        authors: {
            type: GraphQLList(AuthorType),
            description: 'List of all Authors',
            resolve: () => authors
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This Represents the book written by author',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt) },
        name: {type: GraphQLNonNull(GraphQLString) },
        authorId: {type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId )
            }
        }
    }),
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This Represents the Author of the book',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt) },
        name: {type: GraphQLNonNull(GraphQLString) },
        books: {
          type: new GraphQLList(BookType),
          resolve: (author) => {
            return books.filter(books => books.authorId === author.id)
          }
        }
        // books: {
        //     type: new GraphQLList(BookType),
        //     resolve: (books) => {
        //         return books.find(books => books.authorId === author.id)
        //     }
        // }
    }),
})


const schema = new GraphQLSchema({
    query: RootQueryType
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

/***
 * 
 * {
  authors {
    id
    name
    books {
      name
      id
      authorId
    }
  }
}
This is the one you are passing the query
 * 
 * 
 * 
 */