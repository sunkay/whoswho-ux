import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import "typeface-roboto";
import "./App.css";

import BrowserRouter from "react-router-dom/BrowserRouter";
import { ApolloProvider } from "react-apollo";
import Dashboard from "./Dashboard";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <div>
              <Dashboard />
            </div>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
