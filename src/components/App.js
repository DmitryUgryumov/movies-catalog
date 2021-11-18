import '../stylessheets/index.css'

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import MoviesCatalog from "./Pages/MoviesCatalog";
import Movie from "./Pages/Movie";
import Actor from "./Pages/Actor";
import {useEffect, useState} from "react";


function App() {
  console.log(window.location.href.includes('movie') || window.location.href.includes('actor'))
  const [isHomePage, setIsHomePage] = useState(true)
  useEffect(() => {
    setIsHomePage(window.location.href.includes('movie') || window.location.href.includes('actor'))
    console.log(window.location.href.includes('movie') || window.location.href.includes('actor'))
  })

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

      {/*{*/}
      {/*  isHomePage*/}
      {/*    ? <button className='to-home'>To home page</button>*/}
      {/*    : null*/}
      {/*}*/}
    </div>
  );
}

export default App;
