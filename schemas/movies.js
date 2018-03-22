const { makeExecutableSchema } = require('graphql-tools');
const movies = [...require('../data/movies')];
const studios = [...require('../data/studios')];
const directors = [...require('../data/directors')];

let movieIdIndex = movies.length - 1;
let directorIdIndex = directors.length - 1;

const typeDefs = `
    type Movie {
        id: ID!
        title: String!
				tagline: String
				revenue: Int
				studio: Studio
				releaseYear: Int
				directors: [Director!]
    }

		type Studio {
				id: ID!
				name: String!
				location: String!
		}

		type Director {
				id: ID!
				name: String!
		}

    type Query {
        hello: String
        allMovies: [Movie!]
				topMovieByRevenue: Movie!
        movieById (
					movieId: ID!
				): Movie!
				randomMovieByYear (
					year: Int!
				): Movie!
    }

		input DirectorInput {
				name: String!
		}

		type Mutation {
				createMovie (
						title: String!
						tagline: String
						revenue: Int
				): Movie
				addDirectorToMovie (
						movieId: ID!
						director: DirectorInput
				): Movie
		}
`;



const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    allMovies: (root, args, context) => {
      return movies;
    },
    topMovieByRevenue: (root, args, context) => {
      const moviesByRevenueDesc = movies.sort((movieA, movieB) => (movieA.revenue < movieB.revenue));
      return moviesByRevenueDesc[0];
    },
    movieById: (root, args, context) => {
      return movies.find(movie => movie.id === args.movieId);
    },
    randomMovieByYear: (root, args, context) => {
      const moviesByYear = movies.filter(movie => movie.releaseYear === args.year);
      const randomSeed = Math.floor(Math.random() * moviesByYear.length);
      return moviesByYear[randomSeed];
    }
  },
  Mutation: {
    createMovie: (root, args, context) => {
      const newMovie = {
        id: `movie_${++movieIdIndex}`,
        ...args
      };
      
      movies.push(newMovie);
      
      return newMovie;
    },
    addDirectorToMovie: (root, args, context) => {
      const newDirector = {
        id: `director_${++directorIdIndex}`,
        movieIds: [args.movieId],
        ...args.director
      };
      
      directors.push(newDirector);
      
      return movies.find(movie => movie.id === args.movieId);
    }
  },
  Movie: {
    studio: (root, args, context) => {
      return studios.find(studio => {
        return studio.movieIds.find(movieId => movieId === root.id);
      });
    },
    directors: (root, args, context) => {
      return directors.filter(director => {
        return director.movieIds.find(movieId => movieId === root.id);
      });
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});