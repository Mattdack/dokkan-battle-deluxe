import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import SuggestToWeb from "./SuggestToWeb";
import { handleRarityChange } from "../util/helpers";

import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS } from "../util/queries";
import CardDetails from "./CardDetails";

function AllComponents() {
  const categorySelect = document.getElementById("categories");

  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [characterCategory, setCharacterCategory] = useState("");

  const [rarityCategory, setRarityCategory] = useState("ALL");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [typeCharacters, setTypeCharacters] = useState(["AGL", "INT", "TEQ", "STR", "PHY"]);
  const [cardDetails, setCardDetails] = useState({});
  const [suggestion, setSuggestion] = useState([]);

  const [urActive, setUrActive] = useState(false);
  const [lrActive, setLrActive] = useState(false);

  const [aglActive, setAglActive] = useState(true);
  const [teqActive, setTeqActive] = useState(true);
  const [intActive, setIntActive] = useState(true);
  const [strActive, setStrActive] = useState(true);
  const [phyActive, setPhyActive] = useState(true);

  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const allCharacters = data?.characters || [];

  useEffect(() => {
    setCharacters(allCharacters);
    setFilteredCharacters(allCharacters);
  }, [allCharacters]);
  
  function reset() {
    setFilteredCharacters(characters);
  }


  useEffect(() => {
    if (!(search === "" || search === null)) {
      setFilteredCharacters(
        filteredCharacters.filter((character) =>
          character.name.includes(search)
        )
      );
    }
    if (!(characterCategory === "" || characterCategory === "All Categories")) {
      setFilteredCharacters(
        filteredCharacters.filter((character) =>
          character.category.includes(characterCategory)
        )
      );
    }
    if (rarityCategory !== "ALL") {
        setFilteredCharacters(
          filteredCharacters.filter(
            (character) => character.rarity === rarityCategory
          )
        );
    }
    // console.log("Length: " + typeCharacters.join().length);
    // if (typeCharacters.join().length !== 19) {
    //     setFilteredCharacters(
    //       filteredCharacters.filter(
    //         (character) =>  typeCharacters.some((test) => character.type.includes(test))
    //       )
    //     );
    // }
  }, [search, characterCategory, rarityCategory, typeCharacters]);
  

  const handleSearchChange = (e) => {
    e.preventDefault();

    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "characterName") {
      setFilteredCharacters(characters);
      setSearch(inputValue);
    }
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    const categoryType =
      categorySelect.options[categorySelect.selectedIndex].text;
    // console.log(target.selectedOptions[0])
    setFilteredCharacters(characters);
    setCharacterCategory(categoryType);
  };

  const handleRarityChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const rarityType = target.name;

    if (rarityType === "LR") {
      lrActive ? setLrActive(false) : setLrActive(true);
      console.log("Swapping LR Status");
    }
    if (rarityType === "UR") {
      urActive ? setUrActive(false) : setUrActive(true);
      console.log("Swapping UR Status");
    }


  };

  useEffect(() => {
    if (lrActive && urActive) {
      setFilteredCharacters(characters);
      setRarityCategory("ALL");
    } else if (lrActive) {
      setFilteredCharacters(characters);
      setRarityCategory("LR");
    } else if (urActive) {
      setFilteredCharacters(characters);
      setRarityCategory("UR");
    } else {
      setFilteredCharacters(characters);
      setRarityCategory("ALL");
    }
  }, [lrActive, urActive])

  const handleTypeChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const typeType = target.name;
    console.log(typeCharacters);

    if (typeType === "AGL") {
      if(aglActive === true) {
        const toRemove = typeCharacters.indexOf("AGL")
        typeCharacters.splice(toRemove, 1);
        setAglActive(false)
      } else {
        typeCharacters.push('AGL')
        setAglActive(true);
      }
    }
    if (typeType === "TEQ") {
      if(teqActive === true) {
        const toRemove = typeCharacters.indexOf("TEQ")
        typeCharacters.splice(toRemove, 1);
        setTeqActive(false)
      } else {
        typeCharacters.push('TEQ')
        setTeqActive(true);
      }
    }
    if (typeType === "INT") {
      if(intActive === true) {
        const toRemove = typeCharacters.indexOf("INT")
        typeCharacters.splice(toRemove, 1);
        setIntActive(false)
      } else {
        typeCharacters.push('INT')
        setIntActive(true);
      }
    }
    if (typeType === "STR") {
      if(strActive === true) {
        const toRemove = typeCharacters.indexOf("STR")
        typeCharacters.splice(toRemove, 1);
        setStrActive(false)
      } else {
        typeCharacters.push('STR')
        setStrActive(true);
      }
    }
    if (typeType === "PHY") {
      if(phyActive === true) {
        const toRemove = typeCharacters.indexOf("PHY")
        typeCharacters.splice(toRemove, 1);
        setPhyActive(false)
      } else {
        setPhyActive(true);
      }
    }
    setFilteredCharacters(characters);
    setTypeCharacters(typeCharacters);
  };

  let suggestionArr = [];

  function arraySuggestion(character) {
    suggestionArr.push(character.id);
    suggestionArr.push(character.link_skill);
    setSuggestion(suggestionArr);
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-3 bg-slate-800 min-h-fit">
      <div className="py-4 ml-4 mr-4 lg:mr-0 grid bg-slate-800 h-screen sm-h-96 gap-4 min-h-fit">
        <div className="bg-slate-700 rounded-md p-4 h-full">
          {/* collapse this div */}
          <div className="bg-slate-600 rounded-md mb-1 py-4 text-center relative">
            Search by Filters:
            <div>
              <form>
                <input
                  type="text"
                  name="characterName"
                  onChange={handleSearchChange}
                  value={search}
                />
              </form>
            </div>
            <select
              className="m-5 p-2.5 text-black bg-white border-2 border-blue-900 rounded-md shadow-sm outline-none appearance-none focus:border-blue-900 relative"
              id="categories"
              onChange={handleCategoryChange}
            >
              <option>All Categories</option>
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
            <div
              className="bg-orange-300 w-[60%] mx-5 p-2 relative rounded-md border-2 border-blue-900"
              id="box-1"
              onClick={handleRarityChange}
            >
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400"
                name="UR"
              >
                UR
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400"
                name="LR"
              >
                LR
              </button>
            </div>
            <div
              className="bg-orange-300 w-[85%] m-5 p-2 relative rounded-md border-2 border-blue-900"
              id="box-2" onClick = {handleTypeChange}
            >
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400" name= "AGL">
                AGL
              </button>
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400" name= "TEQ">
                TEQ
              </button>
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400" name= "INT">
                INT
              </button>
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400" name= "STR">
                STR
              </button>
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400" name= "PHY">
                PHY
              </button>
            </div>
            <div
              className="bg-orange-300 w-[80%] m-5 p-2 relative rounded-md border-2 border-blue-900"
              id="box-3"
            >
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">
                Super
              </button>
              <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">
                Extreme
              </button>
            </div>
          </div>
          <div className="bg-slate-600 rounded-md py-4 text-center h-2/3">
            <h2 className="pb-5">Main Character Selection</h2>
            <div className="rounded-md m-2 max-h-96">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="my-4 overflow-auto grid grid-cols-4 md:grid-cols-5 max-h-96 md:max-h-96 xl:max-h-96 2xl:max-h-128">
                  {filteredCharacters &&
                    filteredCharacters.map((character) => (
                      <div
                        key={character.id}
                        onClick={() => {
                          setCardDetails(character);
                          arraySuggestion(character);
                          console.log(character.artwork);
                        }}
                      >
                        <SingleCard
                          characterId={character.id}
                          characterLinks={character.link_skill}
                          characterThumb={character.thumb}
                          characterArt={character.art}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 ml-4 mr-4 lg:mr-0 lg:ml-0 grid grid-rows-6 bg-slate-800 h-screen gap-4 min-h-fit">
        <CardDetails cardDetails={cardDetails} />
      </div>
      <div className="py-4 mr-4 ml-4 lg:ml-0 bg-slate-800 h-screen gap-4 min-h-fit">
        <SuggestToWeb suggestion={suggestion} />
      </div>
    </div>
  );
}

export default AllComponents;
