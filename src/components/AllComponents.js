import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import SearchForm from "./SearchForm";
import SuggestToWeb from "./SuggestToWeb";
import { handleRarityChange } from "../util/helpers";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_CHARACTERS, QUERY_ONECHARACTER, GET_USERDATA, GET_USERCHARACTERSBYID } from "../util/queries";
import CardDetails from "./CardDetails";

import Auth from "../util/auth";

function AllComponents() {
  
  const [searchFormData, setSearchFormData] = useState({});

  const [characters, setCharacters] = useState([]);
  
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

  // useEffect(() => {
  //   if (!(characterCategory === "" || characterCategory === "All Categories")) {
  //     setFilteredCharacters(
  //       filteredCharacters.filter((character) =>
  //         character.category.includes(characterCategory)
  //       )
  //     );
  //   }
  //   if (rarityCategory !== "ALL") {
  //     setFilteredCharacters(
  //       filteredCharacters.filter(
  //         (character) => character.rarity === rarityCategory
  //       )
  //     );
  //   }
  //   if (typeCharacters !== "ALL") {
  //     setFilteredCharacters(
  //       filteredCharacters.filter((character) =>
  //         character.type.includes(typeCharacters)
  //       )
  //     );
  //   }
  //   if (!(search === "" || search === null)) {
  //     setFilteredCharacters(
  //       filteredCharacters.filter((character) =>
  //         character.name.includes(search)
  //       )
  //     );
  //   }
  // }, [search, characterCategory, rarityCategory, typeCharacters]);





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
        
          <SearchForm onFormChange={(newFormData) => {
            setSearchFormData(newFormData);
            console.log(newFormData)
          }}/>

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
