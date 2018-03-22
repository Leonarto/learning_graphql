const { makeExecutableSchema } = require('graphql-tools');
const fetch = require('node-fetch');

const typeDefs = `
  type Post {
    id: Int!
    userId: Int
    title: String!
    body: String
  }
  
  type Comment {
    id: Int!
    postId: Int
    name: String
    email: String
    body: String
  }
  
  type Query {
    posts: [Post!]
    comments: [Comment!]
    commentsByPostId (
      postId: Int
    ): [Comment!]
  }
`;

const fetchPosts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json());

const fetchComments = fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json());

const resolvers = {
  Query: {
    posts: (root, args, context) => {
      return fetchPosts;
    },
    comments: (root, args, context) => {
      return fetchComments;
    },
    commentsByPostId: (root, args, context) => {
      return fetchComments
          .then(res => res.filter(comment => {
            return args.postId === comment.postId;
          }));
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});