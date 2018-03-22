# GraphQL testing with node.js and express

Go to [localhost:4000/graphql](localhost:4000/graphql)

#### Make some basic *queries*

Hello world
```
query {
    hello
}
```

Query for movies
```
query {
  allMovies {
    id
  }
}
```

Query for specific data
```
query {
  allMovies {
    id
    title
    revenue
  }
}
```

Query for top revenue
```
query {
  topMovieByRevenue {
    title
  }
}
```

#### Make some basic *mutations*

Mutation 1 (Scalar type):
```
mutation {
  createMovie (
    title: "The day the earth died",
    tagline: "Death"
  ) {
    id
    title
    tagline
  }
}
```

Mutation 2 (with Input object type):
Add a variable on query variables on the lower part of the GraphiQL queries console
```json
{
	"directorToAdd": {
  	"name": "John the killer"
	}
}
```

Then, make this mutation
```
mutation ($directorToAdd:DirectorInput) {
  addDirectorToMovie (
    movieId: "movie_0",
    director: $directorToAdd
  ) {
    title
    tagline
    directors {
      id
      name
    }
  }
}
``` 

#### Not so simple queries
Queries with aliases, those will be returned as properties of the response object, with the alias as propertyName
```
query {
  movieOne: movieById (movieId: "movie_0") {
    id
    title
  } 
  movieTwo: movieById (movieId: "movie_1") {
    id
    title
  }
}
```

Make more with fragments
```
query {
  movieOne: movieById (movieId: "movie_0") {
    ...movieDetails
  } 
  movieTwo: movieById (movieId: "movie_1") {
    ...movieDetails
  }
}

fragment movieDetails on Movie {
  id
  title
  tagline
  revenue
}
```

Put default values to variables
```
query ($year:Int=2000) {
  randomMovieByYear (
    year: $year
  ) {
    id
    title
    releaseYear
  }
}
```