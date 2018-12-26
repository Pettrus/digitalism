import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './routes/Home';
import Style from './routes/Style';
import DocumentMeta from 'react-document-meta';

class App extends Component {
  render() {
    const meta = {
      title: 'Digitalism',
      description: 'Turn your pictures into art',
      canonical: 'https://digitalism.com.br',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,art,machinelearning,machine learning'
        }
      }
    };

    return (
      <DocumentMeta {...meta}>
        <div>
          <Router>
              <div className="App">
                <Switch>
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/style" component={ Style } />
                </Switch>
              </div>
            </Router>
        </div>
      </DocumentMeta>
    );
  }
}

export default App;
