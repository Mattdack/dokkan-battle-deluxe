import React from "react";
import All from './components/AllCharacters';
import Details from './components/CardDetails';
import Links from './components/CardLinks';
import Suggested from './components/Suggested';
import Web from './components/TeamWeb';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  uri: 'https://dokkan-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-gradient-radial from-slate-600 via-slate-700 to-slate-800 h-screen flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col">
        <div className="md:w-1/3 xs:w-full rounded-md m-2">
          <All />
        </div>
        <div className="md:w-1/3 xs:w-full my-2">
          <Details />
          <Links />
          <Suggested />
        </div>
        <div className="md:w-1/3 xs:w-full m-2">
          <Web />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
