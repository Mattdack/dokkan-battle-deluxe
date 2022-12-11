import React, { useState }from "react";
import AllComponents from "./components/AllComponents"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  // uri: 'http://localhost:3001/graphql',
  uri: 'https://dokkan-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <AllComponents />
    </ApolloProvider>
  );
}

export default App;
