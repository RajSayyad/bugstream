import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import MovieUpload from "./components/MovieUpload";
import MoviesPlayer from "./components/MoviesPlayer";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div><h1 style={{color: 'red', background: 'yellow', fontSize: '2rem'}}>HI</h1>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/movies" component={MoviesList} />
        <Route exact path="/movies/upload" component={MovieUpload} />
        <Route exact path="/movies/:id" component={MoviesPlayer} />
      </Switch>
    </Router>
  );
};

export default App;