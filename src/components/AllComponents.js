import React, { useState, useEffect, useRef, useContext } from "react";
import AllComponentsCard from "../cards/AllComponentsCard";
import SearchForm from "./SearchForm";
import SuggestToWeb from "./SuggestToWeb";
import ServerSideCharacterCard from '../cards/ServerSideCharacterCard';

import { useQuery, useLazyQuery } from "@apollo/client";

import {GET_USERDATA,GET_USERCHARACTERSBYID} from "../util/queries";

import { useMutation } from "@apollo/client";
import { UPDATE_SAVED_CHARACTERS, ADD_TEAM_TO_DECK } from "../util/mutations";
import CardDetails from "./CardDetails";
import DeckSelection from "./DeckSelection.js";
import Auth from "../util/auth";

import * as sort from "../util/sorting";
import Announcement from "../modals/Announcement";

import { UserContext } from '../App';

function AllComponents({ allCharacters, allCharactersLoading, characterDictionary }) {
  const { showMiddleDiv, setShowMiddleDiv } = useContext(UserContext);

  const [cardDetails, setCardDetails] = useState({
    id: 1331,
    thumb: 1003310,
    art: null,
    title: "Heartless Destruction",
    name: "Buu (Kid)",
    rarity: "UR",
    type: "EPHY",
    cost: "42",
    ls_description: "Allies’ ATK increases (MAX +50%) based on HP left",
    ls_description_eza:
      "All Types Ki +3 and HP & DEF +50%, raises ATK by up to 80% (the more HP remaining, the greater the ATK boost)",
    sa_type: "Ki ",
    sa_name: "Planet Burst",
    sa_description:
      "Causes supreme damage and lowers DEF <Lowers enemy's DEF by 40% for 3 turns>  ",
    sa_description_eza:
      "Causes immense damage to enemy and lowers DEF<Lowers enemy's DEF by 40% for 3 turns>  ",
    ultra_sa_type: null,
    ultra_sa_name: null,
    ultra_sa_description: null,
    ultra_sa_description_eza: null,
    ps_name: "Planetary Destruction",
    ps_description: "ATK & DEF +50% for all allies when HP is 80% or above",
    ps_description_eza:
      "All allies' Ki +2 and ATK & DEF +50% when HP is 80% or above; all allies' ATK & DEF +30% when HP is 79% or below",
    sa_type_active: null,
    active_skill_name: null,
    active_skill: null,
    active_skill_condition: null,
    active_skill_condition_eza: null,
    transform_type: null,
    transform_condition: null,
    transform_condition_eza: null,
    link_skill: [
      "Majin",
      "Brutal Beatdown",
      "More Than Meets the Eye",
      "Big Bad Bosses",
      "Infinite Regeneration",
      "Fierce Battle",
      "The Wall Standing Tall",
    ],
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
    jp_date: "1 Dec 2015",
    glb_date: "6 Apr 2016",
    jp_date_eza: "11 Oct 2018",
    glb_date_eza: "22 Jan 2019",
  });

  //setting a state of webOfTeam for characeters in graph
  const [webOfTeam, setWebOfTeam] = useState([]);

  // These are both needed to edit the teams, this logic is what is also passed to SuggestToWeb for editing the Web there too
  function addToWebOfTeam(character) {
    setWebOfTeam((prev) => {
      if (prev.includes(character)) {
        return prev;
      } else {
        return [...prev, character];
      }
    });
  }
  function removeFromWebOfTeam(character) {
    setWebOfTeam((prev) => prev.filter((c) => c.id !== character.id));
  }

  // call initial query to find savedCharacters (array of IDs from user) the onComplete allows the saved characters to be set to the deck (important for adding and removing characters)
  const profileData = Auth.getProfile() || [];
  const { loading: isUserDataLoading, data: userData } = useQuery(
    GET_USERDATA,
    {
      variables: {
        profileId: profileData?.data?._id || "",
      },
      onCompleted: (data) => {
        setSavedToMyCharacterDeck(data.findOneUser.savedCharacters);
      },
    }
  );
  const userDeckData = userData?.findOneUser?.decks || [];
  const userCharacterIds = userData?.findOneUser?.savedCharacters || [];

  // lazyQuery which is called in a useEffect to find the character objects from their IDs (results in an array of the character objects saved to the user) this is used for finding characters in My Deck
  const [getUserCharacterObjects,{ loading: isUserCharactersLoading, data: userCharacterData }] = useLazyQuery(GET_USERCHARACTERSBYID, {
    variables: {
      dokkanIds: userCharacterIds,
    },
    skip: userCharacterIds.length === 0,
  });
  const userCharacters = userCharacterData?.charactersWithIds || [];

  // this allows the lazyQuery to load on page load, putting characters into the My Deck filter
  useEffect(() => {
    getUserCharacterObjects();
  }, []);

  // this useEffect renders selected card based on which cards are in the persons deck already
  useEffect(() => {
    if (userCharacters) {
      setSavedToMyCharacterDeck(userCharacters.map((c) => c.id));
    }
  }, []);

  //adding state for saved to deck...initially composed of userCharacterIds
  const [savedToMyCharacterDeck, setSavedToMyCharacterDeck] = useState(userCharacterIds);
  //adds or remove characters from the state deck
  function changeDeck(characterId) {
    setSavedToMyCharacterDeck((prev) => {
      if (prev.includes(characterId)) {
        return prev.filter((id) => id !== characterId);
      } else {
        return [...prev, characterId];
      }
    });
  }

  const [multiCardSelection, setMultiCardSelection] = useState(false);

  const [updateSavedCharacters,{ error: updateSavedCharactersError, data: updatedSavedCharacters }] = useMutation(UPDATE_SAVED_CHARACTERS);
  //this runs on the save button click
  async function handleUpdateSavedCharacters() {
    const profileData = Auth.getProfile();
    await updateSavedCharacters({
      variables: {
        profileId: profileData.data._id,
        newSavedCharacters: savedToMyCharacterDeck,
      },
    });
    // closes out card selection for deck building
    setMultiCardSelection(false);
    //TODO: pretty sure this is unecessary // the savedToMyCharacterDeck is updated to the most recent array of ids
    // setSavedToMyCharacterDeck(savedToMyCharacterDeck);
    // After mutation is completed, re-run the lazy query to get the updated userCharacters
    await getUserCharacterObjects({
      variables: { dokkanIds: savedToMyCharacterDeck },
    });
  }

  function newCardDetails(characterId) {setCardDetails(characterDictionary[characterId]);}

  //scroll ability through buttons on mobile
  const scrollToSingleCardStats = () => {
    const middleColumn = document.getElementById("SingleCardDetails");
    middleColumn.scrollIntoView({ top: 0, left: 0 });
  };
  const scrollToCharacterSelection = () => {
    const middleColumn = document.getElementById("CardSelection");
    middleColumn.scrollIntoView({ top: 0, left: 0 });
  };
  const scrollToTeam = () => {
    const middleColumn = document.getElementById("Team");
    middleColumn.scrollIntoView({ top: 0, left: 0 });
  };

  const [showCardDetails, setShowCardDetails] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState("");

  const handleSelectedDeck = (deckId) => {
    if (deckId === 'No Deck'){
      setShowCardDetails(true)
      setSelectedDeck('Decks')
    }else {
      setShowCardDetails(false);
      setSelectedDeck(deckId);
    }
  };

  const [showCharactersInSelectedDeck, setShowCharactersInSelectedDeck] = useState(false)

  function handleShowCharactersInSelectedDeck() {
    setShowCharactersInSelectedDeck(!showCharactersInSelectedDeck);
  }

  
  const [announcementOpen, setAnnouncementOpen] = useState(false)
  
  const announcementSeen = localStorage.getItem('announcementSeen')
  const timestamp = localStorage.getItem('announcementSeenTimestamp')
  if (!announcementSeen || (timestamp && Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000)) {
    setAnnouncementOpen(true);
    localStorage.setItem('announcementSeen', 'true');
    localStorage.setItem('announcementSeenTimestamp', Date.now());
  }

  const [selectedCategories, setSelectedCategories] = useState([])
  const [newFilterData, setNewFilterData] = useState({})
  const [filteredCharacters, setFilteredCharacters] = useState(null)
  
  // this function allows for filtered characters to be set to the reults of the getFilteredCharacters (which is extracted from the search form)
  const filterAndSetCharacters = (filterData) => [setFilteredCharacters(getFilteredCharacters(allCharacters, userCharacters, filterData, selectedCategories)),setNewFilterData(filterData)]
  
  const [filterByGame, setFilterByGame] = useState(true);
  let charactersToDisplay = (filteredCharacters === null || filteredCharacters.length === 0) ? filterByGame ? allCharacters.slice().sort((a, b) => {
    const typeOrder = ["EAGL", "SAGL", "ETEQ", "STEQ", "EINT", "SINT", "ESTR", "SSTR", "EPHY", "SPHY",]
    const rarityOrder = ["UR", "LR"];
    
    const rarityA = rarityOrder.indexOf(a.rarity);
    const rarityB = rarityOrder.indexOf(b.rarity);
    if (rarityA === rarityB) {
      const typeA = typeOrder.indexOf(a.type);
      const typeB = typeOrder.indexOf(b.type);
      if (typeA === typeB) {
        const dateA = new Date(a.glb_date).getTime();
        const dateB = new Date(b.glb_date).getTime();
        return dateB - dateA;
      }
      return typeB - typeA;
    }
    return rarityB - rarityA;
  })
  : allCharacters.slice().sort((a, b) => {
    if (
      new Date(b.glb_date).getTime() -
      new Date(a.glb_date).getTime() ===
      0
      ) {
        return b.id - a.id;
      }
      return (
        new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime()
        );
      })
      : // This is now starting the FILTERED characters (if filter form is filled out)
      filterByGame
      ? filteredCharacters.slice().sort((a, b) => {
        const typeOrder = ["EAGL", "SAGL", "ETEQ", "STEQ", "EINT", "SINT", "ESTR", "SSTR", "EPHY", "SPHY",];
        const rarityOrder = ["UR", "LR"];

          const rarityA = rarityOrder.indexOf(a.rarity);
          const rarityB = rarityOrder.indexOf(b.rarity);
          if (rarityA === rarityB) {
            const typeA = typeOrder.indexOf(a.type);
            const typeB = typeOrder.indexOf(b.type);
            if (typeA === typeB) {
              const dateA = new Date(a.glb_date).getTime();
              const dateB = new Date(b.glb_date).getTime();
              return dateB - dateA;
            }
            return typeB - typeA;
          }
          return rarityB - rarityA;
        })
        : filteredCharacters.slice().sort((a, b) => {
          if (
            new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime() ===
            0
            ) {
              return b.id - a.id;
          }
          return (
            new Date(b.glb_date).getTime() - new Date(a.glb_date).getTime()
            );
          });

    if(newFilterData?.characterCategory?.length > 0 && filteredCharacters?.length === 0){
      charactersToDisplay = []
    }

  const [viewableCharacters, setViewableCharacters] = useState(50);
  const cardContainerRef = useRef(null);

  const handleNewCategorySelected = (e) => {
    setViewableCharacters(50)
    if(e.target.value === ''){
      cardContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
      return setSelectedCategories([])
    }else if(selectedCategories.includes(e.target.value)){
      return selectedCategories
    }else{
      cardContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
      return setSelectedCategories([...selectedCategories, e.target.value])
    }
  }
  
  const handleSelectedCategoryRemoval = (categoryToRemove) => {
    setSelectedCategories(selectedCategories.filter(singleCategory => singleCategory !== categoryToRemove))
  }
  
  useEffect(() => {
    const filteredChars = getFilteredCharacters(allCharacters, userCharacters, newFilterData, selectedCategories);
    setFilteredCharacters(filteredChars);
  }, [selectedCategories]); 

  // this useEffect is for automatically loading characters by increasing the viewableCharacters
  useEffect(() => {
    if(cardContainerRef.current !== null){
      const cardContainer = cardContainerRef.current;
  
      const handleScroll = () => {
        if ((cardContainer.scrollTop + cardContainer.clientHeight) >= (cardContainer.scrollHeight - 240)) {
          setViewableCharacters(viewableCharacters + 50);
        }
      };
  
      cardContainer.addEventListener("scroll", handleScroll);
  
      return () => {
        cardContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [allCharactersLoading, viewableCharacters]);


  // this allows the screen to change sizes and auto update revealing/hiding the middle column
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // stages formatting
    <div className="flex flex-row lg:flex-wrap bg-slate-900 overflow-hidden">
      {/* TODO: for important information to announce on page load */}
      <Announcement open={announcementOpen} onClose={() => setAnnouncementOpen(false)}/>

      {!showMiddleDiv && <div className="w-[10%] bg-slate-900"></div>}

      {/* //left column styling */}
      <div
        id="CardSelection"
        className={`noZoom h-[100vh] lg:h-[90vh] w-screen ${!showMiddleDiv ? 'lg:w-[40%]' : 'lg:w-1/3'} bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-black rounded-lg`}
      >
        <div className="flex lg:hidden h-[5vh] w-screen lg:w-1/3 pr-2">
          <button
            className="flex font-header text-lg card-sm:text-2xl w-1/2 h-full bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-l-lg"
            onClick={() => scrollToSingleCardStats()}
          >
            Details & Decks
          </button>
          <button
            className="flex font-header text-lg card-sm:text-2xl w-1/2 h-full bg-orange-200 border-2 border-slate-900 justify-center text-center items-center rounded-r-lg"
            onClick={() => scrollToTeam()}
          >
            Build Team
          </button>
        </div>

        {/* <h1 className="font-header text-2xl text-center lg:m-4">Search by Filters</h1> */}

        <div className="flex pt-4 pb-2 items-center justify-center">
          <span className="mr-4 font-header flex h-fit items-center justify-center text-center text-base card-sm:text-xl font-bold">
            Game Filter
          </span>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!filterByGame}
              readOnly
            />
            <div
              onClick={() => {setFilterByGame(!filterByGame)}}
              className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[24%] card-sm:after:top-[15%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
            ></div>
            <div className="ml-4 font-header flex h-fit items-center justify-center text-center text-base card-sm:text-xl font-bold">
              Release Date
            </div>
          </label>
        </div>

        {/* //contains filters/buttons/search field/etc. */}

        <SearchForm
          isDisabled={allCharactersLoading}
          onFormChange={filterAndSetCharacters}
          selectedCategories={selectedCategories}
          handleNewCategorySelected={handleNewCategorySelected}
          handleSelectedCategoryRemoval={handleSelectedCategoryRemoval}
        />

        <div className="flex w-full pb-2 items-center justify-center">
          {Auth.loggedIn() ? (
            <>
              <h2 className="pr-3 card-sm:p-3 text-sm card-sm:text-base text-center font-bold">
                Save Characters
              </h2>
              <div className="flex items-center">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={multiCardSelection}
                    readOnly
                  />
                  <div
                    onClick={() => {
                      setMultiCardSelection(!multiCardSelection);
                    }}
                    className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[18%] card-sm:after:top-[8%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                  ></div>
                  <span className="ml-2 text-sm card-sm:text-base font-bold text-gray-900">
                    ON
                  </span>
                </label>
              </div>
              <div className="flex space-x-2 justify-center">
                <button
                  disabled={!multiCardSelection || allCharactersLoading}
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="disabled:bg-gray-500 inline-block px-4 card-sm:px-6 py-1.5 card-sm:py-2.5 bg-blue-600 text-white font-medium text-sm card-sm:text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => handleUpdateSavedCharacters()}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <h2 className="p-2 text-sm lg:text-base font-bold">
              Please log in to add players
            </h2>
          )}
        </div>

        {/* //character select box */}
        <div 
        ref={cardContainerRef}
        className="noZoom flex flex-wrap justify-center items-center p-1 mx-1 mb-14 card-sm:mb-16 lg:mx-2 lg:mt-3 lg:mb-6 border-2 border-slate-900 overflow-y-auto bg-orange-100">
          {allCharactersLoading ? (<div>Loading...</div>) 
          : charactersToDisplay
              .filter((character) => character.glb_date !== null)
              .slice(0, viewableCharacters)
              .map((character) => (
                <div
                  id="CharacterCard"
                  className={`
                  ${webOfTeam.map((char) => char.id).includes(character.id) && 'bg-slate-900/[.4]'}
                  
                  `}
                  key={character.id}
                  onClick={() => {
                    if (multiCardSelection) {
                      changeDeck(character.id);
                    }
                  }}
                >
                  <AllComponentsCard
                    character={character}
                    userDeckData={userDeckData}
                    selectedDeck={selectedDeck}
                    showCharactersInSelectedDeck={showCharactersInSelectedDeck}
                    savedToMyCharacterDeck={multiCardSelection ? savedToMyCharacterDeck : undefined}
                    webOfTeam={!multiCardSelection ? webOfTeam : undefined}
                    addToWebOfTeam={addToWebOfTeam}
                    removeFromWebOfTeam={removeFromWebOfTeam}
                    newCardDetails={newCardDetails}
                  />
                </div>
              ))}
          {/* {(viewableCharacters < charactersToDisplay.length) && 
          <div className="flex w-full justify-center items-center">
            <button 
              onClick={() => setViewableCharacters(viewableCharacters + 50)}
              className="flex w-[70%] p-2 m-2 justify-center items-center text-mg lg:text-2xl font-bold bg-orange-300 border-2 border-black">
                Load More Characters
            </button>
          </div>
          } */}
        </div>
      </div>

      {/* //middle column styling */}
      <div
        id="SingleCardDetails"
        className={`${!showMiddleDiv ? windowWidth < 1000 ? '' : 'hidden' : ''} h-[100vh] lg:h-[90vh] w-screen lg:w-1/3 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-black rounded-lg`}
      >
        <div className="lg:hidden h-[5vh] w-screen lg:w-1/3 pr-2">
          <button
            className="flex font-header text-lg card-sm:text-2xl w-full h-full bg-orange-200 justify-center text-center items-center rounded-lg"
            onClick={() => scrollToCharacterSelection()}
          >
            Character Selection
          </button>
        </div>

        <div className="flex flex-row w-full px-2 mt-2">
          <div className="w-1/2">
            <div
              onClick={() => [setShowCardDetails(true), setSelectedDeck("")]}
              className={`flex py-2 px-4 w-full border-black card-sm:text-lg font-bold rounded-l-lg justify-center items-center text-center cursor-pointer ${
                showCardDetails
                  ? "border-4 bg-orange-400"
                  : "border-2 bg-orange-200"
              }`}
            >
              Card Details
            </div>
          </div>
          <div className="w-1/2 h-full border-black card-sm:text-lg font-bold">
            {Auth.loggedIn() ? (
              <select
                className={`disabled:bg-gray-500 flex w-full h-full border-black bg-orange-200 rounded-r-lg justify-center items-center text-center cursor-pointer ${showCardDetails? "border-2 bg-orange-200" : "border-4 bg-orange-400"}`}
                id="deckSelect"
                value={selectedDeck}
                onChange={(e) => handleSelectedDeck(e.target.value)}
                disabled={allCharactersLoading}
              >
                <option className="font-bold" value='No Deck'>Decks</option>
                {userDeckData.map((deck) => (
                  <option className="font-bold" key={deck._id} value={deck._id}>
                    {deck.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex w-full h-full border-black border-2 bg-gray-600 rounded-r-lg justify-center items-center text-center">
                Log In To See Decks
              </div>
            )}
          </div>
        </div>

        {showCardDetails ? (
          <CardDetails
            cardDetails={cardDetails}
            userCharacterIds={userCharacterIds}
          />
        ) : (
          <DeckSelection
            characterDictionary={characterDictionary}
            webOfTeam={webOfTeam}
            userDeckData={userDeckData}
            selectedDeck={selectedDeck}
            showCharactersInSelectedDeck={showCharactersInSelectedDeck}
            handleShowCharactersInSelectedDeck={handleShowCharactersInSelectedDeck}
          />
        )}
      </div>
      

      {/* //right column styling */}
      <div
        id="Team"
        className={`h-[100vh] lg:h-[90vh] w-screen ${!showMiddleDiv ? 'lg:w-[40%]' : 'lg:w-1/3'} bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 flex flex-col border-4 border-black rounded-lg `}
      >
        <div className="lg:hidden h-[5vh] w-screen lg:w-1/3 pr-2 border-b-4 border-black">
          <button
            className="flex font-header text-lg card-sm:text-2xl w-full h-full bg-orange-200 justify-center text-center items-center rounded-lg"
            onClick={() => scrollToCharacterSelection()}
          >
            Character Selection
          </button>
        </div>
        <SuggestToWeb
          selectedCharacter={cardDetails}
          userCharacters={userCharacters}
          handleNewDetails={newCardDetails}
          addToWebOfTeam={addToWebOfTeam}
          webOfTeam={webOfTeam}
          removeFromWebOfTeam={removeFromWebOfTeam}
          allCharactersLoading={allCharactersLoading}
          selectedDeck={selectedDeck}
          showCharactersInSelectedDeck={showCharactersInSelectedDeck}
          userDeckData={userDeckData}
        />
      </div>

      {!showMiddleDiv ? <div className="w-[10%] bg-slate-900"></div>: null}
    </div>
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters based on the criteria in filterData
const getFilteredCharacters = (allCharacters, userCharacters, filterData, selectedCategories) => {
  const baseChars = filterData.isUserDeck ? userCharacters : allCharacters;
  return baseChars.filter((character) => {
    return (
      (!selectedCategories.length || (filterData.matchAllCategories
        ? selectedCategories.every(category => character.category.includes(category))
        : selectedCategories.some(category => character.category.includes(category))
      )) &&
      (!filterData.searchTerm || character.name.toLowerCase().includes(filterData.searchTerm.toLowerCase())) &&
      (!filterData.characterType || character.type.includes(filterData.characterType)) &&
      (!filterData.characterSuperOrExtreme || character.type.slice(0, 1).includes(filterData.characterSuperOrExtreme)) &&
      (!filterData.characterRarity ||filterData.characterRarity === character.rarity)
    );
  });
};

export default AllComponents;
