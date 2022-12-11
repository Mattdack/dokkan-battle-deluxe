import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS, QUERY_ONECHARACTER } from "../util/queries";
import Suggested from "./Suggested"

function AllCharacters() {
  // const { characterPass, setCharacterPass } = useState('')
  
  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const allCharacters = data?.characters || [];
  
  function handlePass (id) {
    console.log(id)
    // setCharacterPass()
  }
  
  return (
    <div className="">
      <div className="bg-gradient-radial from-amber-400 to via-orange-600 to-amber-800 rounded-md m-2 py-12 border-black border-2">
        <h1 className="text-center text-black -mt-5">Search Filters</h1>
        <div>
          <select className="m-5 p-2.5 text-black bg-white border-2 border-black shadow-sm outline-none appearance-none focus:border-black" id="categories">
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
        </div>
        <div>
          <div className="rounded-md border-2 border-black text-black m-3 flex bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)]" id="btn-1">
            <button className="w-1/6 hover:bg-gray-600 m-1 rounded-l-md">N</button>
            <button className="w-1/6 hover:bg-gray-600 m-1">R</button>
            <button className="w-1/6 hover:bg-gray-600 m-1">SR</button>
            <button className="w-1/6 hover:bg-gray-600 m-1">SSR</button>
            <button className="w-1/6 hover:bg-gray-600 m-1">UR</button>
            <button className="w-1/6 hover:bg-gray-600 m-1 rounded-r-md">LR</button>
          </div>
          <div className="rounded-md border-2 border-black text-black m-3 flex bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)]" id="btn-2">
            <button className="w-1/5 hover:bg-gray-600 m-1 rounded-l-md">AGL</button>
            <button className="w-1/5 hover:bg-gray-600 m-1">TEQ</button>
            <button className="w-1/5 hover:bg-gray-600 m-1">INT</button>
            <button className="w-1/5 hover:bg-gray-600 m-1">STR</button>
            <button className="w-1/5 hover:bg-gray-600 m-1 rounded-r-md">PHY</button>
          </div>
          <div className="rounded-md border-2 border-black text-black m-3 flex bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)]" id="btn-3">
            <button className="w-1/2 hover:bg-gray-600 m-1 rounded-l-md">Super</button>
            <button className="w-1/2 hover:bg-gray-600 m-1 rounded-r-md">Extreme</button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-radial from-blue-300 via-blue-500 to-blue-900 rounded-md m-2 px-5 border-black border-2">
        <h1 className="text-center text-black m-5">Main Character Selection</h1>
        <div className="">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-black my-4 p-5 overflow-auto grid grid-cols-4 md:grid-cols-5 max-h-96 md:max-h-96 xl:max-h-96 2xl:max-h-128 opacity">
              {/* {allCharacters && allCharacters.map((character) => (
                <Suggested key={character.id} characterId={character.id} characterLinks={character.link_skill}/>
                  // <div key={character.id} className="h-12 md:h-28 md:h-14 w-12 md:w-28 md:w-14 m-2 gap-4 bg-no-repeat" style={{ backgroundImage: `url("https://placedog.net/50/50?random")`, backgroundSize: `100%` }}>
                  //   <div className="">
                  //     <h4 className=""  >{character.id}</h4>
                  //   </div>
                  // </div>
                ))} */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default AllCharacters;
