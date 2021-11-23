const API_KEY = '41ded1b2e567bbba63fba906ccc11068'


export const genresArr = [
  {id: 28, description: 'Action', requestValue: 28, checked: false},
  {id: 12, description: 'Adventure', requestValue: 12, checked: false},
  {id: 16, description: 'Animation', requestValue: 16, checked: false},
  {id: 35, description: 'Comedy', requestValue: 35, checked: false},
  {id: 80, description: 'Crime', requestValue: 80, checked: false},
  {id: 99, description: 'Documentary', requestValue: 99, checked: false},
  {id: 18, description: 'Drama', requestValue: 18, checked: false},
  {id: 10751, description: 'Family', requestValue: 10751, checked: false},
  {id: 14, description: 'Fantasy', requestValue: 14, checked: false},
  {id: 36, description: 'History', requestValue: 36, checked: false},
  {id: 27, description: 'Horror', requestValue: 27, checked: false},
  {id: 10402, description: 'Music', requestValue: 10402, checked: false},
  {id: 9648, description: 'Mystery', requestValue: 9648, checked: false},
  {id: 10749, description: 'Romance', requestValue: 10749, checked: false},
  {id: 878, description: 'Science Fiction', requestValue: 878, checked: false},
  {id: 10770, description: 'TV Movie', requestValue: 10770, checked: false},
  {id: 53, description: 'Thriller', requestValue: 53, checked: false},
  {id: 10752, description: 'War', requestValue: 10752, checked: false}
]
export const dateArr = [
  {id: 1, description: 'all years', requestValue: '', checked: true},
  {id: 2, description: '2020-', requestValue: 'primary_release_date.gte=2020-01-01', checked: false},
  ...[...new Array(6)].map((year, ind) => {
    return { id: ind + 3, description: `${2010 - 10*ind} - ${2020 - 10*ind}`, requestValue: `primary_release_date.gte=${2010 - 10*ind}-01-01&primary_release_date.lte=${2020 - 1 - 10*ind}-12-30`, checked: false }
  })
]
export const sortedArr = [
  {id: 1, description: 'popularity', requestValue: 'popularity.desc&vote_count.gte=50', checked: true}, //default sorting
  {id: 2, description: 'vote average', requestValue: 'vote_average.desc&vote_count.gte=1000', checked: false},
  {id: 3, description: 'vote count', requestValue: 'vote_count.desc&vote_count.gte=50', checked: false},
  {id: 4, description: 'release date', requestValue: `primary_release_date.desc&vote_count.gte=50`, checked: false}
]


export function getMoviesList(page , sorted, setMovies, setError, setIsLoaded, ...filters) {
  let movieFilters = filters.filter(filt => filt)

  if (movieFilters.length) {
    movieFilters = `&${movieFilters.join('&')}&`
  } else {
    movieFilters = ''
  }

  const URL = `http://api.themoviedb.org/3/discover/movie?page=${page}${movieFilters || '&'}sort_by=${sorted}&api_key=${API_KEY}`
  console.log(URL)
  fetch(URL)
    .then(data =>
      data.ok
        ? data.json()
        : Promise.reject(data.statusText)
    )
    .then(json => {
      // setTimeout(() => {
      //   setMovies(json)
      //   setIsLoaded(true)
      //   setError(false)
      // }, 1500)
      setMovies(json)
      setIsLoaded(true)
      setError(false)
    })
    .catch(err => {
      setIsLoaded(true)
      setError(true)
    })
}

export function getMovie(id, setMovie, setError, setIsLoaded) {
  const URL = `https://api.themoviedb.org/3/movie/${id}?&api_key=${API_KEY}`

  fetch(URL)
    .then(data =>
      data.ok
        ? data.json()
        : Promise.reject(data.statusText)
    )
    .then(json => {
      console.log(json)
      setMovie(json)
      setIsLoaded(true)
      setError(false)
    })
    .catch(err => {
      setIsLoaded(true)
      setError(true)
    })
}

//https://api.themoviedb.org/3/movie/150540?api_key=###&append_to_response=credits

export function getActors(id, setMovie, setError, setIsLoaded) {
  const URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}` //список актеров

  fetch(URL)
    .then(data =>{
        // console.log(data)
        return data.ok
          ? data.json()
          : Promise.reject(data.statusText)
    }
    )
    .then(json => {
      console.log(json)
      setMovie(json)
      setIsLoaded(true)
      setError(false)
    })
    .catch(err => {
      // console.log(err)
      setIsLoaded(true)
      setError(true)
    })
}

export function getCollections(id, setMovie) {
  const URL = `https://api.themoviedb.org/3/collection/${id}?api_key=${API_KEY}` //список пфильмов из коллекции

  fetch(URL)
    .then(data =>{
        // console.log(data)
        return data.ok
          ? data.json()
          : Promise.reject(data.statusText)
      }
    )
    .then(json => {
      // console.log(json)
      setMovie(json)
    })
    .catch(err => {
      // console.log(err)
    })
}

export function getActorFilms(id, setActor, setError, setIsLoaded) {
  // const URL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}` //инф об актере
  const URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}` //инф об актере


  fetch(URL)
    .then(data =>{
        // console.log(data)
        return data.ok
          ? data.json()
          : Promise.reject(data.statusText)
      }
    )
    .then(json => {
      // console.log(json)
      setActor(json)
      setIsLoaded(true)
      setError(false)
    })
    .catch(err => {
      // console.log(err)
      setIsLoaded(true)
      setError(true)
    })
}

export function getActorInfo(id, setActor) {
  const URL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}` //инф об актере

  fetch(URL)
    .then(data =>{
        // console.log(data)
        return data.ok
          ? data.json()
          : Promise.reject(data.statusText)
      }
    )
    .then(json => {
      console.log(json)
      setActor(json)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getTest() {
  const URL = `http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=1960-01-01&primary_release_date.lte=1970-12-31&api_key=${API_KEY}`
  // const URL = `http://api.themoviedb.org/3/discover/movie?primary_release_year=2010&page=1&api_key=${API_KEY}`
  //http://api.themoviedb.org/3/discover/movie?page=1&with_genres=80,14&primary_release_date.gte1960-01-01&primary_release_date.lte=1970-12-30&sort_by=vote_count.desc&api_key=41ded1b2e567bbba63fba906ccc11068
  fetch('http://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=41ded1b2e567bbba63fba906ccc11068')
    .then(data =>{
      // console.log(data)
        return data.ok
          ? data.json()
          : Promise.reject(data.statusText)
    })
    .then(json => {
      // console.log(json)
    })
    .catch(err => {
      console.log(err)
    })
}