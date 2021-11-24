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
  {id: 1, description: 'Popularity', requestValue: 'popularity.desc&vote_count.gte=50', checked: true}, //default sorting
  {id: 2, description: 'Vote average', requestValue: 'vote_average.desc&vote_count.gte=1000', checked: false},
  {id: 3, description: 'Vote count', requestValue: 'vote_count.desc&vote_count.gte=50', checked: false},
  {id: 4, description: 'Release date', requestValue: `primary_release_date.desc&vote_count.gte=50`, checked: false}
]


export function getMoviesList(page , sorted, setMovies, setError, setIsLoaded, ...filters) {
  let movieFilters = filters.filter(filt => filt)

  if (movieFilters.length) {
    movieFilters = `&${movieFilters.join('&')}&`
  } else {
    movieFilters = ''
  }

  const URL = `http://api.themoviedb.org/3/discover/movie?page=${page}${movieFilters || '&'}sort_by=${sorted}&api_key=${API_KEY}`
  fetch(URL)
    .then(data =>
      data.ok
        ? data.json()
        : Promise.reject(data.statusText)
    )
    .then(json => {
      console.log(json)
      setMovies(json)
      setIsLoaded(true)
      setError(false)
    })
    .catch(err => {
      setIsLoaded(true)
      setError(err)
    })
}

export function apiMethod(option, id, setState, credits='', setError='', setIsLoaded='') {
  const URL = `https://api.themoviedb.org/3/${option}/${id}${credits}?&api_key=${API_KEY}`

  fetch(URL)
    .then(data =>
      data.ok
        ? data.json()
        : Promise.reject(data.statusText)
    )
    .then(json => {
      console.log(json)
      setState(json)
      if (setIsLoaded && setError) {
        setIsLoaded(true)
        setError(false)
      }
    })
    .catch(err => {
      if (setIsLoaded && setError) {
        setIsLoaded(true)
        setError(err)
      }
    })
}
