import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import SuggestToWeb from "./SuggestToWeb";
import { handleRarityChange } from "../util/helpers";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_CHARACTERS, QUERY_ONECHARACTER, GET_USERDATA, GET_USERCHARACTERSBYID } from "../util/queries";
import CardDetails from "./CardDetails";

import Auth from "../util/auth";

function AllComponents() {
  const categorySelect = document.getElementById("categories");

  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [characterCategory, setCharacterCategory] = useState("");

  const [rarityCategory, setRarityCategory] = useState("ALL");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [typeCharacters, setTypeCharacters] = useState("ALL");
  const [cardDetails, setCardDetails] = useState({
    id: 1331,
    thumb: 1003310,
    art: null,
    name: "Buu (Kid)",
    category: ['Resurrected Warriors', 'Majin Buu Saga', 'Transformation Boost', 'Artificial Life Forms', 'Majin Power', 'Planetary Destruction', 'Storied Figures', 'Legendary Existence', 'Sworn Enemies', 'Accelerated Battle', 'Worldwide Chaos', 'Battle of Fate'],
    link_skill: ['Majin', 'Brutal Beatdown', 'More Than Meets the Eye', 'Big Bad Bosses', 'Infinite Regeneration', 'Fierce Battle', 'The Wall Standing Tall'],
    type: "EPHY",
    rarity: "UR",
    ls_description: `Allies’ ATK increases (MAX +50%) based on HP left`,
    sa_name: "Planet Burst",
    sa_description: "Causes immense damage to enemy and lowers DEF  <Lowers enemy's DEF by 40% for 3 turns>  ",
  });
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
  
  const [getUserData, { loading:loading3, data:data3 }] = useLazyQuery(GET_USERDATA);
  const [getUserCharactersById, { loading:loading4, data:data4 }] = useLazyQuery(GET_USERCHARACTERSBYID);

  const [onLoadGetUserCharacters, setOnLoadGetUserCharacters] = useState([]);
  const [userCharacters, setUserCharacters] = useState([]);
  
  useEffect(() => {
    console.log('Not sure if logged in')

    const auth = async () => {
      if (Auth.loggedIn()) {
        const username = await Auth.getProfile().data.username
        getUserData({
          variables: {
            username: username
          },
        }).then((result) => {
          setOnLoadGetUserCharacters(result.data.me.savedCharacters)
          console.log(result);
        });
        
      }
      
    }
    auth();
    // if(Auth.loggedIn()) {
    //   console.log("logged in")
    //   console.log(username);
    // }
  },[])

  useEffect(() => {
    getUserCharactersById({
      variables: {
        dokkanIds: onLoadGetUserCharacters
      },
    }).then((result) => {
      setUserCharacters(result.data.charactersWithIds)
    });
  },[onLoadGetUserCharacters])

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

  const handleDeckSelection = (e) => {
    e.preventDefault();
    const { target } = e;
    if(target.name === "DECK") {
      console.log("Filtered by Deck")
     setFilteredCharacters(userCharacters)
    }
  }

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
    // console.log(newToon);

    getOneCharacter({
      variables: {
        dokkanId: newToon
      },
    }).then((result) => {
      setCardDetails(result.data.character)
    })
    // console.log(cardDetails);
  }

  function addToTeam(character) {
    setWebOfTeam(prev => [...prev, character])
  }

  return (
    
    // stages formatting
    <div className="bg-slate-700 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 h-[96.64vh] w-screen max-w-screen">

      {/* //left column styling */}
      <div className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 rounded-md flex flex-col mr-2 my-2 border-2 border-slate-900 max-h-[94vh] ml-2 w-screen md:w-screen lg:w-[32vw] xl:w-[32vw]">

        <h1 className="text-center m-4">Search by Filters</h1>

        {/* //contains filters/buttons/search field/etc. */}
        <div className="flex flex-row flex-wrap justify-around mx-5">

          {/* //search field */}
          <form className="order-1 justify-start m-2">
            <input className="p-2.5 rounded-md border-2 border-black text-black"
              type="text"
              name="characterName"
              onChange={handleSearchChange}
              value={search}
            />
          </form>

          {/* //categories field */}
          <select className="order-2 m-2 p-2 text-black bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black" id="categories" onChange={handleCategoryChange}>
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

          {/* //type buttons */}
          <div
            className="grid grid-cols-3 order-3 bg-orange-300 rounded-md border-2 border-slate-900 flex my-5"
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

          {/* //rarity buttons */}
          <div
            className="order-4 bg-orange-300 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5"
            id="box-1"
            onClick={handleRarityChange}
          >
            <button
              className="relative hover:bg-orange-400 m-0.5 pr-10 pl-10 pt-2 pb-2"
              name="UR"
              style={urStyle}
            >
              UR
            </button>
            <button
              className="hover:bg-orange-400 m-0.5 pr-10 pl-10 pt-2 pb-2"
              name="LR"
              style={lrStyle}
            >
              LR
            </button>

          </div>

        <div className="order-5 bg-orange-300 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5" >
        <button
              className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5"
              name="DECK"
              onClick={handleDeckSelection}
            >
              My Deck
        </button>
        </div>

        </div>

          <h2 className="p-3 text-center mt-10">Main Character Selection</h2>
          
          {/* //character select box */}
          <div className="h-fit m-10 border-2 border-slate-900 overflow-y-auto bg-orange-200">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5, xl:grid-cols-5 justify-self-center h-full max-h-[60vh]">
                {filteredCharacters && filteredCharacters.map((character) => (
                  <div key={character.id} onClick={() => {
                    setCardDetails(character)
                    arraySuggestion(character)
                  }} onDoubleClick={() => { addToTeam(character) }}>
                    <SingleCard characterId={character.id} characterLinks={character.link_skill} characterThumb={character.thumb} characterArt={character.art} characterType={character.type} characterRarity={character.rarity} />
                  </div>
                ))}
              </div>
            )}
          </div>
        
      </div>
      {/* //middle column styling */}
      <div className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 rounded-md flex flex-col my-2 border-2 border-slate-900 max-h-[94vh] w-screen md:w-screen lg:w-[32vw] xl:w-[32vw]">
        <CardDetails cardDetails={cardDetails} 
        userCharacters={onLoadGetUserCharacters} 
        />
        {/* <Links links={links}/> */}
      </div>

      {/* //right column styling */}
      <div className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 rounded-md flex flex-col ml-2 my-2 border-2 border-slate-900 max-h-[94vh] w-screen md:w-screen lg:w-[32vw] xl:w-[32vw]">
        <SuggestToWeb suggestion={suggestion} webOfTeam={webOfTeam} handleNewDetails={newCardDetails} />
      </div>

    </div>
  );
}

export default AllComponents;
