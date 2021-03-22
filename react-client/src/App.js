import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './component/NavBar'
import Home from "./component/Home";
import Animals from "./component/Animals";
const App = () =>{
  return (
    <div className="App">
    <NavBar/>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/animals" component={Animals} /> 

        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;


