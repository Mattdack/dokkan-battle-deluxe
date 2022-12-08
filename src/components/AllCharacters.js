import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS } from "../util/queries";

function AllCharacters() {
  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const characters = data?.characters || [];

  return (
    <div className="bg-slate-700 rounded-md p-4 h-full">
      <div className="bg-slate-600 rounded-md mb-2 py-4 text-center relative">
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
      <div className="bg-slate-600 rounded-md py-4 text-center h-2/3">
        <h2 className="pb-5">Main Character Selection</h2>
        <div className="rounded-md m-2 max-h-96">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="my-4 overflow-auto grid grid-cols-4 md:grid-cols-5 max-h-96 md:max-h-96 xl:max-h-96 2xl:max-h-128">
              {characters &&
                characters.map((character) => (
                  <div key={character.id} className="h-12 md:h-28 lg:h-14 w-12 md:w-28 lg:w-14 m-2 gap-4 bg-no-repeat" style = {{backgroundImage: `url("https://placedog.net/50/50?random")`, backgroundSize: `100%`}}>
                    <div className="">
                      <h4 className=""  >{character.id}</h4>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCharacters;
