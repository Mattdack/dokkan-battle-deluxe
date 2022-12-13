import React, { useState } from "react";
import SingleCard from './SingleCard';
import SuggestToWeb from './SuggestToWeb';



import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS } from "../util/queries";
import CardDetails from "./CardDetails";

function AllComponents() {
  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const allCharacters = data?.characters || [];

  const [cardDetails, setCardDetails] = useState({})
  const [suggestion, setSuggestion] = useState([])

  let suggestionArr = []
  function arraySuggestion(character) {
    suggestionArr.push(character.id)
    suggestionArr.push(character.link_skill)
    setSuggestion(suggestionArr)
  }

  return (
    //Creates all three columns for the app & sets up window-size transitions
    <div className="bg-slate-800 xl:flex xl:flex-row lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-col xs:flex xs:flex-col h-screen">
      <div className="basis-1/3 rounded-md flex-col">
        {/* collapse this div */}
        <div className="bg-slate-600 rounded-md border-2 border-black text-center basis-1/2">
          Search by Filters:
          <select className="m-5 p-2.5 text-black bg-white border-2 border-blue-900 rounded-md shadow-sm outline-none appearance-none focus:border-blue-900 relative" id="categories">
            <option>Categories:</option>
            <option>Fusion</option>
            <option>Shadow Dragon Saga</option>
            <option>World Tournament</option>
            <option>Peppy Gals</option>
            <option>Hybrid Saiyans</option>
            <option>Universe Survival Saga</option>
            <option>Resurrected Warriors</option>
            <option>Realm of Gods</option>
            <option>Majin Buu Saga</option>
            <option>Potara</option>
            <option>Low-Class Warrior</option>
            <option>Super Saiyan 3</option>
            <option>Giant Form</option>
            <option>Planet Namek Saga</option>
            <option>Ginyu Force</option>
            <option>Movie Bosses</option>
            <option>Pure Saiyans</option>
            <option>Namekians</option>
            <option>Future Saga</option>
            <option>Full Power</option>
            <option>Androids</option>
            <option>Representatives of Universe 7</option>
            <option>Transformation Boost</option>
            <option>Wicked Bloodline</option>
            <option>Dragon Ball Seekers</option>
            <option>Time Travelers</option>
            <option>Universe 6</option>
            <option>Joined Forces</option>
            <option>Movie Heroes</option>
            <option>Goku's Family</option>
            <option>Vegeta's Family</option>
            <option>Artificial Life Forms</option>
            <option>Youth</option>
            <option>DB Saga</option>
            <option>Siblings' Bond</option>
            <option>Super Saiyans</option>
            <option>Worthy Rivals</option>
            <option>Androids/Cell Saga</option>
            <option>Kamehameha</option>
            <option>Bond of Master and Disciple</option>
            <option>Terrifying Conquerors</option>
            <option>Dragon Ball Heroes</option>
            <option>Target: Goku</option>
            <option>Otherworld Warriors</option>
            <option>Super Saiyan 2</option>
            <option>Final Trump Card</option>
            <option>Exploding Rage</option>
            <option>Revenge</option>
            <option>Team Bardock</option>
            <option>Inhuman Deeds</option>
            <option>Earthlings</option>
            <option>Special Pose</option>
            <option>Majin Power</option>
            <option>Rapid Growth</option>
            <option>All-Out Struggle</option>
            <option>Universe 11</option>
            <option>Saviors</option>
            <option>Battle of Wits</option>
            <option>Power Absorption</option>
            <option>Giant Ape Power</option>
            <option>Crossover</option>
            <option>Space-Traveling Warriors</option>
            <option>Connected Hope</option>
            <option>Corroded Body and Mind</option>
            <option>Turtle School</option>
            <option>Miraculous Awakening</option>
            <option>Powerful Comeback</option>
            <option>Gifted Warriors</option>
            <option>Planetary Destruction</option>
            <option>Defenders of Justice</option>
            <option>Storied Figures</option>
            <option>GT Heroes</option>
            <option>GT Bosses</option>
            <option>Heavenly Events</option>
            <option>Time Limit</option>
            <option>Mastered Evolution</option>
            <option>Legendary Existence</option>
            <option>Sowrn Enemies</option>
            <option>Bond of Friendship</option>
            <option>Accelerated Battle</option>
            <option>Entrusted Will</option>
            <option>Worldwide Chaos</option>
            <option>Battle of Fate</option>
            <option>Power Beyond Super Saiyan</option>
            <option>Fused Fighters</option>
            <option>Saiyan Saga</option>
            <option>Bond of Parent and Child</option>
            <option>Warriors Raised on Earth</option>
          </select>
          <div className="bg-orange-300 w-[75%] m-5 p-2 relative rounded-md border-2 border-blue-900" id="box-1">
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">N</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">R</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">SR</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">SSR</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">UR</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">LR</button>
          </div>
          <div className="bg-orange-300 w-[70%] m-5 p-2 relative rounded-md border-2 border-blue-900" id="box-2">
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">AGL</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">TEQ</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">INT</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">STR</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">PHY</button>
          </div>
          <div className="bg-orange-300 w-[40%] m-5 p-2 relative rounded-md border-2 border-blue-900" id="box-3">
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">Super</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">Extreme</button>
          </div>
        </div>
        <div className="bg-slate-600 rounded-md border-2 border-black text-center basis-1/2">
          <h2 className="p-3 mt-3">Main Character Selection</h2>
          <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="overflow-auto max-h-96 md:max-h-96 xl:max-h-96 2xl:max-h-128 border-2 border-black">
                {allCharacters && allCharacters.map((character) => (
                  <div key={character.id} onClick={() => {
                    setCardDetails(character)
                    arraySuggestion(character)
                    console.log(character.artwork)
                  }}>
                    <SingleCard characterId={character.id} characterLinks={character.link_skill} characterThumb={character.thumb} characterArt={character.art} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="basis-1/3">
        <CardDetails cardDetails={cardDetails} />
        {/* <Links links={links}/> */}
      </div>
      <div className="basis-1/3">
        <SuggestToWeb suggestion={suggestion} />
      </div>
    </div>
  );
}

export default AllComponents;
