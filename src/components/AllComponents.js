import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import SuggestToWeb from "./SuggestToWeb";
import { handleRarityChange } from "../util/helpers";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_CHARACTERS, QUERY_ONECHARACTER } from "../util/queries";
import CardDetails from "./CardDetails";

function AllComponents() {
  const categorySelect = document.getElementById("categories");

  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [characterCategory, setCharacterCategory] = useState("");

  const [rarityCategory, setRarityCategory] = useState("ALL");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [typeCharacters, setTypeCharacters] = useState("ALL");
  const [cardDetails, setCardDetails] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const [webOfTeam, setWebOfTeam] = useState([]);

  const [urActive, setUrActive] = useState(false);
  const [lrActive, setLrActive] = useState(false);

  const [aglActive, setAglActive] = useState(false);
  const [teqActive, setTeqActive] = useState(false);
  const [intActive, setIntActive] = useState(false);
  const [strActive, setStrActive] = useState(false);
  const [phyActive, setPhyActive] = useState(false);
  const [allTypeActive, setAllTypeActive] = useState(true);

  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const allCharacters = data?.characters || [];

  useEffect(() => {
    setCharacters(allCharacters);
    setFilteredCharacters(allCharacters);
  }, [allCharacters]);

  useEffect(() => {
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
    if (typeCharacters !== "ALL") {
      setFilteredCharacters(
        filteredCharacters.filter((character) =>
          character.type.includes(typeCharacters)
        )
      );
    }
    if (!(search === "" || search === null)) {
      setFilteredCharacters(
        filteredCharacters.filter((character) =>
          character.name.includes(search)
        )
      );
    }
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
  }, [lrActive, urActive]);

  const handleTypeChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const typeType = target.name;

    if (typeType === "AGL") {
      setAglActive(true);
      setTeqActive(false);
      setStrActive(false);
      setIntActive(false);
      setPhyActive(false);
      setAllTypeActive(false);
      setFilteredCharacters(characters);
      setTypeCharacters("AGL");
    }
    if (typeType === "TEQ") {
      setAglActive(false);
      setTeqActive(true);
      setStrActive(false);
      setIntActive(false);
      setPhyActive(false);
      setAllTypeActive(false);
      setFilteredCharacters(characters);
      setTypeCharacters("TEQ");
    }
    if (typeType === "INT") {
      setAglActive(false);
      setTeqActive(false);
      setStrActive(false);
      setIntActive(true);
      setPhyActive(false);
      setAllTypeActive(false);
      setFilteredCharacters(characters);
      setTypeCharacters("INT");
    }
    if (typeType === "STR") {
      setAglActive(false);
      setTeqActive(false);
      setStrActive(true);
      setIntActive(false);
      setPhyActive(false);
      setAllTypeActive(false);
      setFilteredCharacters(characters);
      setTypeCharacters("STR");
    }
    if (typeType === "PHY") {
      setAglActive(false);
      setTeqActive(false);
      setStrActive(false);
      setIntActive(false);
      setPhyActive(true);
      setAllTypeActive(false);
      setFilteredCharacters(characters);
      setTypeCharacters("PHY");
    }
    if (typeType === "ALL") {
      setAglActive(false);
      setTeqActive(false);
      setStrActive(false);
      setIntActive(false);
      setPhyActive(false);
      setAllTypeActive(true);
      setFilteredCharacters(characters);
      setTypeCharacters("ALL");
    }
  };

  const lrStyle = {
    backgroundColor: lrActive ? "DarkOrange" : "Orange",
  };
  const urStyle = {
    backgroundColor: urActive ? "DarkOrange" : "Orange",
  };
  const aglStyle = {
    backgroundColor: aglActive ? "DarkOrange" : "Orange",
  };
  const teqStyle = {
    backgroundColor: teqActive ? "DarkOrange" : "Orange",
  };
  const intStyle = {
    backgroundColor: intActive ? "DarkOrange" : "Orange",
  };
  const strStyle = {
    backgroundColor: strActive ? "DarkOrange" : "Orange",
  };
  const phyStyle = {
    backgroundColor: phyActive ? "DarkOrange" : "Orange",
  };
  const allStyle = {
    backgroundColor: allTypeActive ? "DarkOrange" : "Orange",
  };

  let suggestionArr = [];

  function arraySuggestion(character) {
    suggestionArr.push(character.id);
    suggestionArr.push(character.link_skill);
    setSuggestion(suggestionArr);
  }

  const [getOneCharacter, { loading: loading2, data: data2 }] = useLazyQuery(QUERY_ONECHARACTER);



  function newCardDetails(character) {
    const newToon = character[0];
    console.log(newToon);

    getOneCharacter({
      variables: {
        dokkanId: newToon
      },
    }).then((result) => {
      setCardDetails(result.data.character)
    })
    console.log(cardDetails);
  }

  function addToTeam(character) {
    setWebOfTeam(prev => [...prev, character])
  }

  return (
    // Stages formatting/transitions based on windowsize
    <div className="bg-slate-700 xl:flex xl:flex-row lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-col xs:flex xs:flex-col h-screen w-screen">

      {/* //left column styling */}
      <div className="bg-gradient-radial from-orange-400 via-orange-600 to-orange-900 rounded-md flex-col mx-2 my-4 border-2 border-black max-w-2xl basis-1/3">

        <h1 className="text-center m-4">Search by Filters</h1>
        <div className="flex justify-evenly">
          <select className="p-2 text-black bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black" id="categories" onChange={handleCategoryChange}>
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
          <form>
            <input className="p-2 rounded-md border-2 border-black text-black"
              type="text"
              name="characterName"
              onChange={handleSearchChange}
              value={search}
            />
          </form>
        </div>

        <div className="flex m-4 justify-center">

          <div
              className="bg-orange-300 w-[60%] mx-5 p-2 relative rounded-md border-2 border-blue-900"
              id="box-1"
              onClick={handleRarityChange}
            >
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="UR"
                style={urStyle}
              >
                UR
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="LR"
                style={lrStyle}
              >
                LR
              </button>
            </div>
            <div
              className="bg-orange-300 w-[85%] m-5 p-2 relative rounded-md border-2 border-blue-900"
              id="box-2"
              onClick={handleTypeChange}
            >
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="AGL"
                style={aglStyle}
              >
                AGL
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="TEQ"
                style={teqStyle}
              >
                TEQ
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="INT"
                style={intStyle}
              >
                INT
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="STR"
                style={strStyle}
              >
                STR
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="PHY"
                style={phyStyle}
              >
                PHY
              </button>
              <button
                className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
                name="ALL"
                style={allStyle}
              >
                ALL
              </button>
            </div>
          <div className="bg-orange-300 w-[40%] m-5 p-2 relative rounded-md border-2 border-blue-900" id="box-3">
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">Super</button>
            <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">Extreme</button>
          </div>
        </div>
        <div className="bg-slate-600 rounded-md border-2 border-black text-center basis-1/2 m-2">
          <h2 className="p-3 mt-3">Main Character Selection</h2>
          <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="overflow-auto border-2 border-black flex flex-col flex-wrap justify-center max-h-96">
                {filteredCharacters && filteredCharacters.map((character) => (
                  <div key={character.id} onClick={() => {
                    setCardDetails(character)
                    arraySuggestion(character)
                  }} onDoubleClick = {() => {addToTeam(character)}}>
                    <SingleCard characterId={character.id} characterLinks={character.link_skill} characterThumb={character.thumb} characterArt={character.art} characterType={character.type} characterRarity={character.rarity}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* //middle column styling */}
      <div className="bg-gradient-radial from-purple-400 via-purple-600 to-purple-900 rounded-md mx-2 my-4 border-2 border-black max-w-2xl basis-1/3">
        <CardDetails cardDetails={cardDetails} />
        {/* <Links links={links}/> */}
      </div>

      {/* //right column styling */}
      <div className="bg-gradient-radial from-green-400 via-green-600 to-green-900 rounded-md mx-2 my-4 border-2 border-black max-w-2xl basis-1/3">
        <SuggestToWeb suggestion={suggestion} webOfTeam={webOfTeam} handleNewDetails={newCardDetails} />
      </div>

    </div>
  );
}

export default AllComponents;
