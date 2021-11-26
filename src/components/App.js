import { Route, HashRouter } from 'react-router-dom'

import '../stylessheets/index.css'

import MoviesCatalog from './Pages/MoviesCatalog'
import Movie from './Pages/Movie'
import Actor from './Pages/Actor'

function App() {
  return (
    <>
      <HashRouter basename='/'>

        <Route exact path='/'>
          <MoviesCatalog />
        </Route>

        <Route path='/movie/:movieId'>
          <Movie />
        </Route>

        <Route path='/actor/:actorId'>
          <Actor />
        </Route>

      </HashRouter>
    </>
  )
}

export default App
