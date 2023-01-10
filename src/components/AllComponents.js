import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import SearchForm from "./SearchForm";
import SuggestToWeb from "./SuggestToWeb";
import { handleRarityChange } from "../util/helpers";

import { useQuery, useLazyQuery } from "@apollo/client";
import {
  QUERY_CHARACTERS,
  QUERY_ONECHARACTER,
  GET_USERDATA,
  GET_USERCHARACTERSBYID,
} from "../util/queries";
import CardDetails from "./CardDetails";

import Auth from "../util/auth";

function AllComponents() {
  const { loading: allCharactersLoading, data: allCharactersData } =
    useQuery(QUERY_CHARACTERS);
  const allCharacters = allCharactersData?.characters || [];
  const characterDictionary = Object.fromEntries(
    allCharacters.map((characterObj) => [characterObj.id, characterObj])
  );

  const [filteredCharacters, setFilteredCharacters] = useState(allCharacters);

  const [cardDetails, setCardDetails] = useState({
    id: 1331,
    thumb: 1003310,
    art: null,
    name: "Buu (Kid)",
    category: [
      "Resurrected Warriors",
      "Majin Buu Saga",
      "Transformation Boost",
      "Artificial Life Forms",
      "Majin Power",
      "Planetary Destruction",
      "Storied Figures",
      "Legendary Existence",
      "Sworn Enemies",
      "Accelerated Battle",
      "Worldwide Chaos",
      "Battle of Fate",
    ],
    link_skill: [
      "Majin",
      "Brutal Beatdown",
      "More Than Meets the Eye",
      "Big Bad Bosses",
      "Infinite Regeneration",
      "Fierce Battle",
      "The Wall Standing Tall",
    ],
    type: "EPHY",
    rarity: "UR",
    ls_description: `Allies’ ATK increases (MAX +50%) based on HP left`,
    sa_name: "Planet Burst",
    sa_description:
      "Causes immense damage to enemy and lowers DEF  <Lowers enemy's DEF by 40% for 3 turns>  ",
  });

  const [webOfTeam, setWebOfTeam] = useState([]);

  const { loading: isUserDataLoading, data: userData } = useQuery(
    GET_USERDATA,
    {
      variables: {
        username: Auth.getProfile()?.data?.username,
      },
    }
  );
  const userCharacterIds = userData?.me?.savedCharacters || [];

  const { loading: isUserCharactersLoading, data: userCharacterData } =
    useQuery(GET_USERCHARACTERSBYID, {
      variables: {
        dokkanIds: userCharacterIds,
      },
    });

  const userCharacters = userCharacterData?.charactersWithIds || [];

  function newCardDetails(characterId) {
    setCardDetails(characterDictionary[characterId]);
  }

  function addToTeam(character) {
    setWebOfTeam((prev) => [...prev, character]);
  }

  const filterAndSetCharacters = (filterData) =>
    setFilteredCharacters(
      getFilteredCharacters(allCharacters, userCharacters, filterData)
    );

  return (
    // stages formatting
    <div className="bg-slate-700 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 h-[96.64vh] w-screen max-w-screen">
      {/* //left column styling */}
      <div className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 rounded-md flex flex-col mr-2 my-2 border-2 border-slate-900 max-h-[94vh] ml-2 w-screen md:w-screen lg:w-[32vw] xl:w-[32vw]">
        <h1 className="text-center m-4">Search by Filters</h1>

        {/* //contains filters/buttons/search field/etc. */}

        <SearchForm
          onFormChange={filterAndSetCharacters}
          isDisabled={allCharactersLoading}
        />

        <h2 className="p-3 text-center mt-10">Main Character Selection</h2>

        {/* //character select box */}
        <div className="h-fit m-10 border-2 border-slate-900 overflow-y-auto bg-orange-200">
          {allCharactersLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5, xl:grid-cols-5 justify-self-center h-full max-h-[60vh]">
              {filteredCharacters &&
                filteredCharacters.map((character) => (
                  <div
                    key={character.id}
                    onClick={() => {
                      setCardDetails(character.id);
                    }}
                    onDoubleClick={() => {
                      addToTeam(character);
                    }}
                  >
                    <SingleCard
                      characterId={character.id}
                      characterLinks={character.link_skill}
                      characterThumb={character.thumb}
                      characterArt={character.art}
                      characterType={character.type}
                      characterRarity={character.rarity}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {/* //middle column styling */}
      <div className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 rounded-md flex flex-col my-2 border-2 border-slate-900 max-h-[94vh] w-screen md:w-screen lg:w-[32vw] xl:w-[32vw]">
        <CardDetails
          cardDetails={cardDetails}
          userCharacters={userCharacterIds}
        />
        {/* <Links links={links}/> */}
      </div>

      {/* //right column styling */}
      <div className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 rounded-md flex flex-col ml-2 my-2 border-2 border-slate-900 max-h-[94vh] w-screen md:w-screen lg:w-[32vw] xl:w-[32vw]">
        <SuggestToWeb
          selectedCharacter={cardDetails}
          webOfTeam={webOfTeam}
          handleNewDetails={newCardDetails}
        />
      </div>
    </div>
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters
// based on the criteria in filterData
const getFilteredCharacters = (allCharacters, userCharacters, filterData) => {
  const baseChars = filterData.isUserDeck ? userCharacters : allCharacters;

  return baseChars.filter((character) => {
    return (
      (!filterData.searchTerm ||
        character.name
          .toLowerCase()
          .includes(filterData.searchTerm.toLowerCase())) &&
      (!filterData.characterCategory ||
        character.category.includes(filterData.characterCategory)) &&
      (!filterData.characterType ||
        character.type.includes(filterData.characterType)) &&
      (!filterData.characterRarity ||
        filterData.characterRarity === character.rarity)
    );
  });
};

export default AllComponents;
