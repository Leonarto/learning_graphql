const express = require('express');
const graphqlHTTP = require('express-graphql');
const MoviesSchema = require('./schemas/movies');
const PostsSchema = require('./schemas/posts');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: MoviesSchema,
  rootValue: {},
  graphiql: true,
}));

app.use('/posts', graphqlHTTP({
  schema: PostsSchema,
  rootValue: {},
  graphiql: true,
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));