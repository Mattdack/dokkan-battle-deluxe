import React from "react";
import All from './components/allCharacters';
import Details from './components/cardDetails';
import Links from './components/cardLinks';
import Suggested from './components/suggested';
import Web from './components/teamWeb';

function App() {
  return (
    <div className="grid grid-cols-3 gap-3 bg-black relative" id="app">
      <div className="py-4 mr-1 ml-2 grid h-screen gap-4 relative">
      <All/>
      </div>
      <div className="py-4 mr-1 ml-1 grid grid-rows-6 h-screen gap-4 relative">
      <Details/>
      <Links />
      <Suggested />
      </div>
      <div className="py-4 mr-2 ml-1 grid grid-rows-6 h-screen gap-4 relative">
      <Web />
      </div>
    </div>
  );
}

export default App;
