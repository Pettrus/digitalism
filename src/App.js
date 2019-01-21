import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './routes/Home';
import Style from './routes/Style';
import { Helmet } from "react-helmet";

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Digitalism</title>
          <meta name="keywords" content="react,meta,art,machinelearning,machine-learning" />
          <meta name="description" content="Turn your pictures into art" />
        </Helmet>

        <Router>
            <div className="App">
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/style" component={ Style } />
              </Switch>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
