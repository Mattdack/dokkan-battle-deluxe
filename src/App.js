import React from "react";
import All from './components/allCharacters';
import Details from './components/cardDetails';
import Links from './components/cardLinks';
import Suggested from './components/suggested';
import Web from './components/teamWeb';


function App() {
  return (
    <div className="grid grid-cols-3 gap-3 bg-slate-800">
      <div className="py-4 ml-4 grid grid-rows-6 bg-slate-800 h-screen gap-4">
      <All/>
      </div>
      <div className="py-4 grid grid-rows-6 bg-slate-800 h-screen gap-4 ">
      <Details/>
      <Links />
      <Suggested />
      </div>
      <div className="py-4 mr-4 grid grid-rows-6 bg-slate-800 h-screen gap-4">
      <Web />
      </div>
    </div>
  );
}

export default App;
