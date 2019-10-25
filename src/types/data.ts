export type MovieListItem = {
	Title: string
	Poster: string
	Year: string
	Type: string
	imdbID: string
}

export type MovieItem = MovieListItem & {
	Released: string
	Rated: string
	Runtime: string
	Genre: string
	Director: string
	Writer: string
	Actors: string
	Plot: string
	Language: string
	Country: string
	Awards: string
	imdbRating: string
	imdbVotes: string
	DVD: string
	BoxOffice: string
	Production: string
	Website: string

	Ratings: {
		Source: string
		Value: string
	}[]
}
