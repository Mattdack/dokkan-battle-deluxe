import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AllComponents from "./components/AllComponents"
import AllStrategy from "./components-strategy/AllStrategy"
import AllAPI from "./components-api/AllAPI"
import Help from "./components/Help";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS, GET_ITEMS_DATA, GET_SUPPORT_MEMORY_DATA } from "../src/util/queries";

export const UserContext = React.createContext(null)

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_KEY,
  cache: new InMemoryCache(),
});

function withData(Component) {
  return function WrappedComponent(props) {
    const { loading: allCharactersLoading, data: allCharactersData } = useQuery(QUERY_CHARACTERS);
    const allCharacters = allCharactersData?.characters || [];

    const characterDictionary = Object.fromEntries(
      allCharacters.map((characterObj) => [characterObj.id, characterObj])
    );

    const { loading: allItemsLoading, data: allItemsData } = useQuery(GET_ITEMS_DATA);
    const allItems = allItemsData?.items || []
    
    const { loading: allSupportMemoryoading, data: allSupperMemoryData } = useQuery(GET_SUPPORT_MEMORY_DATA);
    const allSupportMemories = allSupperMemoryData?.supportMemory || []

    return <Component allCharacters={allCharacters} allCharactersLoading={allCharactersLoading} characterDictionary={characterDictionary} allItems={allItems} allSupportMemories={allSupportMemories} {...props} />;
  };
}

const AllComponentsWithData = withData(AllComponents);
const AllStrategiesWithData = withData(AllStrategy);

function App() {
  const [showMiddleDiv, setShowMiddleDiv] = useState(false)
  const [showSummationLinks, setShowSummationLinks] = useState(false)
  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="app">
          <UserContext.Provider value={{ 
            showMiddleDiv: showMiddleDiv, 
            setShowMiddleDiv: setShowMiddleDiv,
            showSummationLinks: showSummationLinks,
            setShowSummationLinks: setShowSummationLinks
             }}>
            <Routes>
              <Route exact path="/" element={<AllComponentsWithData />} />
              <Route exact path='/strategy' element={<AllStrategiesWithData />} />
              <Route exact path={process.env.REACT_APP_API_CONNECT} element={<AllAPI />} />
              <Route exact path='/help' element={<Help />} />
            </Routes>
          </UserContext.Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
