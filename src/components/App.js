import { Switch, Route } from 'react-router-dom'

import '../stylessheets/index.css'

import MoviesCatalog from './Pages/MoviesCatalog'
import Movie from './Pages/Movie'
import Actor from './Pages/Actor'

function App() {
  return (
    <>
      <Switch>

        <Route exact path='/'>
          <MoviesCatalog/>
        </Route>

        <Route path='/movie/:movieId'>
          <Movie />
        </Route>

        <Route path='/actor/:actorId'>
          <Actor />
        </Route>

      </Switch>
    </>
  )
}

export default App
