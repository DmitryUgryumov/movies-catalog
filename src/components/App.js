import '../stylessheets/index.css'

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import MoviesCatalog from "./Pages/MoviesCatalog";
import Movie from "./Pages/Movie";
import Actor from "./Pages/Actor";



function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
