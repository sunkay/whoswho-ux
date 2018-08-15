import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import logo from './logo.svg';
import './App.css';
import './EmpList';

import { ApolloProvider } from "react-apollo";
import EmpList from './EmpList';

const client = new ApolloClient({
  uri: "http://localhost:4000"
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>My first Apollo app 🚀</h2>
          </header>
          <div>
            <EmpList />
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
