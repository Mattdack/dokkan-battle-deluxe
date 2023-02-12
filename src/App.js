import React from "react";
import AllComponents from "./components/AllComponents"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


const client = new ApolloClient({
  // uri: 'http://localhost:3001/graphql',
  uri: process.env.REACT_APP_API_KEY,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<AllComponents/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
