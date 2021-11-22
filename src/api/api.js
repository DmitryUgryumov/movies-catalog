// const API_KEY = 'api_key=41ded1b2e567bbba63fba906ccc11068'
const API_KEY = '41ded1b2e567bbba63fba906ccc11068'

export function getMoviesList(page , sorted, setMovies, setError, setIsLoaded, ...filters) {
  console.log(filters)
  let movieFilters = filters.filter(filt => filt)

  if (movieFilters.length) {
    movieFilters = `&${movieFilters.join('&')}&`
  } else {
    movieFilters = ''
  }

  const URL = `http://api.themoviedb.org/3/discover/movie?page=${page}&${movieFilters}&sort_by=${sorted}&api_key=${API_KEY}`

  fetch(URL)
    .then(data =>
      data.ok
        ? data.json()
        : Promise.reject(data.statusText)
    )
    .then(json => {
      // console.log(json)
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

export function getTest(filters='') {
  const URL = `http://api.themoviedb.org/3/discover/movie?page=1&with_genres=10752&api_key=${API_KEY}`


  fetch(URL)
    .then(data =>{
            // console.log(data)
        return data.ok
          ? data.json()
          : Promise.reject(data.statusText)
    })
    .then(json => {
      console.log(json)
    })
    .catch(err => {
      console.log(err)
    })
}