import React from "react";
import All from './components/AllCharacters';
import Details from './components/CardDetails';
import Links from './components/CardLinks';
import Suggested from './components/Suggested';
import Web from './components/TeamWeb';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  // uri: '/graphql',
  uri: 'https://git-dokkan-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-3 bg-slate-800">
      <div className="py-4 ml-4 mr-4 lg:mr-0 grid bg-slate-800 h-screen gap-4">
      <All/>
      </div>
      <div className="py-4 ml-4 mr-4 lg:mr-0 lg:ml-0 grid grid-rows-6 bg-slate-800 h-screen gap-4 ">
      <Details/>
      <Links />
      <Suggested />
      </div>
      <div className="py-4 mr-4 ml-4 lg:ml-0 grid grid-rows-6 bg-slate-800 h-screen gap-4">
      <Web />
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
