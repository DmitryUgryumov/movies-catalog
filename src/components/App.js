import { Switch, Route } from 'react-router-dom'

import MoviesCatalog from './Pages/MoviesCatalog'
import Movie from './Pages/Movie'
import Actor from './Pages/Actor'

import '../stylessheets/index.css'

function App() {
  return (
    <>
      <Switch>

        <Route exact path='/'>
          <MoviesCatalog/>
        </Route>

        <Route exact path='/movie/:movieId'>
          <Movie />
        </Route>

        <Route exact path='/actor/:actorId'>
          <Actor />
        </Route>

      </Switch>
    </>
  )
}

export default App
