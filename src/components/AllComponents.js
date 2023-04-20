import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Navbar from "../components/Navbar"
import CharacterCard from "../cards/CharacterCard";
import AllComponentsCard from "../cards/AllComponentsCard";
import SearchForm from "./SearchForm";
import SuggestToWeb from "./SuggestToWeb";

import { useQuery, useLazyQuery } from "@apollo/client";

import {GET_USERDATA,GET_USERCHARACTERSBYID} from "../util/queries";

import { useMutation } from "@apollo/client";
import { UPDATE_SAVED_CHARACTERS, ADD_TEAM_TO_DECK } from "../util/mutations";
import CardDetails from "./CardDetails";
import DeckSelection from "./DeckSelection.js";
import Auth from "../util/auth";
import NewsAndUpdatesModal from "../modals/NewsAndUpdates";
import Announcement from "../modals/Announcement";

import * as sort from "../util/sorting";
import { findCharacterLeaderCategories } from "../util/allCategories";

import { UserContext } from '../App';

const arrow = process.env.PUBLIC_URL + "/dokkanIcons/icons/right-arrow-icon.png"

function AllComponents({ allCharacters, allCharactersLoading, characterDictionary }) {

  const { showMiddleDiv, setShowMiddleDiv, grayCharactersInSelectedDeck, setGrayCharactersInSelectedDeck, allCharacterIDsInDeck, setAllCharacterIDsInDeck } = useContext(UserContext);

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
        return [...prev, character];
    })
  }
  function removeFromWebOfTeam(character) {
    setWebOfTeam((prev) => prev.filter((c) => c.id !== character.id))
  }
  
  // useEffect(() => {
    // // setWebOfTeam();
  // }, [addToWebOfTeam, removeFromWebOfTeam]);

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

  function newCardDetails(characterId) {
    setCardDetails(characterDictionary[characterId])
  }

  const [showCardDetails, setShowCardDetails] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState("");
  const handleSelectedDeckOptionClick = (deckId) => {
    if (deckId === ''){
      return
    } else if(deckId === selectedDeck){
      setShowCardDetails(false)
    }
  }
  const handleSelectedDeck = (deckId) => {
    if (deckId === ''){
      setShowCardDetails(true)
      setSelectedDeck('')
    }else if (deckId === selectedDeck){
      setShowCardDetails(false);
    }else{
      setShowCardDetails(false);
      setSelectedDeck(deckId)
    }
  }

  const [selectedCategories, setSelectedCategories] = useState([])
  const [newFilterData, setNewFilterData] = useState({})
  const [filteredCharacters, setFilteredCharacters] = useState(null)
  
  // this function allows for filtered characters to be set to the reults of the getFilteredCharacters (which is extracted from the search form)
  const filterAndSetCharacters = (filterData) => [setFilteredCharacters(getFilteredCharacters(allCharacters, userCharacters, filterData, selectedCategories)),setNewFilterData(filterData)]
  
  const [filterByGame, setFilterByGame] = useState(true);

  let charactersToDisplay = sort.sortCharacters(allCharacters, filteredCharacters, filterByGame)

  if(newFilterData?.characterCategory?.length > 0 && filteredCharacters?.length === 0){
    charactersToDisplay = []
  }
  
  const cardContainerRef = useRef(null);
  const handleNewCategorySelected = (e) => {
    // setViewableCharacters(100)
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
  }, [window.innerWidth]);

  const [showCardSelection, setShowCardSelection] = useState(true)
  const [showTeamWeb, setShowTeamWeb] = useState(false)
  const [showCardStats, setShowCardStats] = useState(false)

    //scroll ability through buttons on mobile
    const handleShowSingleCardStats = () => {
      setShowCardSelection(false)
      setShowTeamWeb(false)
      setShowCardStats(true)
      const middleColumn = document.getElementById("SingleCardDetails");
      middleColumn.scrollIntoView({ top: 0, left: 0 });
    };
    const handleShowCharacterSelection = () => {
      setShowCardSelection(true)
      setShowTeamWeb(false)
      setShowCardStats(false)
      const middleColumn = document.getElementById("CardSelection");
      middleColumn.scrollIntoView({ top: 0, left: 0 });
    };
    const handleShowTeam = () => {
      setShowCardSelection(false)
      setShowTeamWeb(true)
      setShowCardStats(false)
      const middleColumn = document.getElementById("Team");
      middleColumn.scrollIntoView({ top: 0, left: 0 });
    };
  
    const [showFilters, setShowFilters] = useState(true)

    const [announcementOpen, setAnnouncementOpen] = useState(false)
    const [openNewsModal, setOpenNewsModal] = useState(false)
    const firstLogInNewShow = localStorage.getItem('firstLogInNewShow')
    const timestamp = localStorage.getItem('firstLogInNewShowTimestamp')
    if (!firstLogInNewShow || (timestamp && Date.now() - timestamp > 30 * 24 * 60 * 60 * 1000)) {
      setOpenNewsModal(true);
      localStorage.setItem('firstLogInNewShow', 'true');
      localStorage.setItem('firstLogInNewShowTimestamp', Date.now());
    }

    function handleCharacterSelection(character){
      const existingCharacter = webOfTeam.find(webCharacter => webCharacter.id === character.id)
      if (existingCharacter) {
        removeFromWebOfTeam(existingCharacter)
        setCardDetails(character)
      } else {
        addToWebOfTeam(character)
        setCardDetails(character)
      }
    }

    useEffect(() => {
      const newIDs = userDeckData.find(deck => deck._id === selectedDeck)?.teams.flatMap(team => team.characters.map(character => character.id)) || [];
      setAllCharacterIDsInDeck(newIDs);
    }, [selectedDeck]);

  return (
    <div className="fixed flex flex-col h-full bg-slate-900">
      {/* TODO: for important information to announce on page load */}
      {/* <Announcement open={announcementOpen} onClose={() => setAnnouncementOpen(false)}/> */}
      <NewsAndUpdatesModal open={openNewsModal} onClose={() => setOpenNewsModal(false)}/>
      <Navbar handleShowSingleCardStats={handleShowSingleCardStats} handleShowCharacterSelection={handleShowCharacterSelection} handleShowTeam={handleShowTeam} showCardSelection={showCardSelection} showTeamWeb={showTeamWeb} showCardStats={showCardStats}/>

      {/* TODO: contains all the cardseoection stuff. h is set to zero with a flex-1 because it allows for expansion to fill rest of space */}
      <div className={`flex flex-1 h-0 ${showMiddleDiv ? '' : 'lg:px-10 xl:px-20'} relative`}>

        {(!showMiddleDiv && (windowWidth > 850)) && <button 
          onClick={()=> setShowMiddleDiv(!showMiddleDiv)}
          className="flex p-2 font-bold border-t-2 border-r-2 border-black bg-orange-200 hover:bg-orange-300 transform rotate-90 origin-bottom-left absolute left-0 -top-10">
            Show Cards and Decks
          </button>
        }

        {/* TODO: card detail styling */}
        <div
          id="SingleCardDetails"
          className={`${showCardStats || (showMiddleDiv && (windowWidth > 850)) ? '' : 'hidden'} flex flex-col w-screen lg:w-1/4 bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 overflow-y-auto`}
          >

          <div className="w-full p-2">
            {(showMiddleDiv && (window.innerWidth > 850)) &&
            <button
            onClick={() => setShowMiddleDiv(false)}
            className="flex py-2 px-4 w-full text-md font-bold justify-center items-center text-center cursor-pointer border-2 border-black bg-orange-200 hover:bg-orange-300"
            >
              Hide Character Details
            </button>
            }
          </div>

          <div className="flex flex-row w-full px-2 mt-2">
            <div className="w-1/2">
              <div
                onClick={() => setShowCardDetails(true)}
                className={`flex py-2 px-4 w-full border-black card-sm:text-lg font-bold rounded-l-lg justify-center items-center text-center cursor-pointer ${showCardDetails ? "border-4 bg-orange-400" : "border-2 bg-orange-200"}`}
              >
                Card Details
              </div>
            </div>
            <div className="w-1/2 h-full border-black card-sm:text-lg font-bold">
              {Auth.loggedIn() ? (
                <select
                  className={`disabled:bg-gray-500 flex w-full h-full border-black rounded-r-lg justify-center items-center text-center cursor-pointer ${showCardDetails? "border-2 bg-orange-200" : "border-4 bg-orange-400"}`}
                  id="deckSelect"
                  value={selectedDeck}
                  onChange={(e) => handleSelectedDeck(e.target.value)}
                  onClick={(e) => handleSelectedDeckOptionClick(e.target.value)}
                  disabled={allCharactersLoading}
                >
                  <option className="font-bold" value=''>Decks</option>
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
              addToWebOfTeam={addToWebOfTeam}
              removeFromWebOfTeam={removeFromWebOfTeam}
            />
          )}
        </div>

        {/* TODO: Card selection styling */}
        <div
          id="CardSelection"
          className={`${(showCardSelection || (windowWidth > 850)) ? '' : 'hidden'} flex flex-1 flex-col w-screen lg:w-[45%] bg-gradient-radial overflow-y-auto`}
        >

          {/* <h1 className="font-header text-2xl text-center lg:m-4">Search by Filters</h1> */}


          <div className={`bg-orange-200 border-b-4 border-x-4 border-black`}>
            <div 
            onClick={() => setShowFilters(!showFilters)}
            className="flex flex h-fit pt-1 items-center justify-center"
            title={showFilters ? 'click to hide filters' : 'click to show filters'}>
              <p
              className="font-header text-2xl font-light cursor-pointer">Filters</p>
              <img
              src={arrow}
              className={`w-[7.5%] card-sm:w-[4%] ml-4 mb-1 cursor-pointer transform rotate-90 transition-transform duration-300 ${showFilters ? "scale-y-[-1] scale-x-[-1]" : "scale-y-[-1]"}`}
              />
            </div>

            <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showFilters ? 'max-h-[100vh] ease-in-out' : ''}`}>
              <div className="flex pb-2 items-center justify-center">
                <span className="mr-4 flex h-fit items-center justify-center text-center text-md card-sm:text-md font-bold">
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
                    className="border border-black w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[24%] card-sm:after:top-[10%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                  ></div>
                  <div className="ml-4 flex h-fit items-center justify-center text-center text-md card-sm:text-md font-bold">
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
            
              <div className="flex w-full py-1 items-center justify-center">
                {Auth.loggedIn() ? (
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <h2 className="pr-3 card-sm:p-2 text-sm card-sm:text-base text-center font-bold">
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
                            onClick={() => {setMultiCardSelection(!multiCardSelection)}}
                            className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[18%] card-sm:after:top-[8%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                          ></div>
                          <span className="ml-2 text-sm card-sm:text-base font-bold text-gray-900">
                            ON
                          </span>
                        </label>
                      </div>
                      <div>
                        <button
                          disabled={!multiCardSelection || allCharactersLoading}
                          type="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          className="disabled:bg-gray-500 inline-block px-3 card-sm:px-3 py-2 card-sm:py-2 bg-blue-600 text-white font-medium text-sm card-sm:text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => handleUpdateSavedCharacters()}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    {selectedDeck !== '' &&
                    <div className="flex p-2 justify-center items-center">
                        <h2 className="pr-3 text-sm card-sm:text-base font-bold">
                          Gray Characters In Deck
                        </h2>
                        <div className="flex items-center">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={grayCharactersInSelectedDeck}
                              readOnly
                            />
                            <div
                              onClick={() => setGrayCharactersInSelectedDeck(!grayCharactersInSelectedDeck)}
                              className="w-6 card-sm:w-11 h-3 card-sm:h-6 bg-orange-100 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[21%] card-sm:after:top-[8%] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 card-sm:after:h-5 after:w-3 card-sm:after:w-5 after:transition-all peer-checked:bg-orange-500"
                            ></div>
                            <span className="ml-2 text-sm card-sm:text-base font-bold text-gray-900">
                              ON
                            </span>
                          </label>
                        </div>
                    </div>
                    }
                  </div>
                ) : (
                  <h2 className="p-2 text-sm lg:text-base font-bold">
                    Please log in to add players
                  </h2>
                )}
              </div>
            </div>

          </div>

          {/* //character select box */}
          <div 
          ref={cardContainerRef}
          id={'characterContainer'}
          className="characterContainer flex flex-wrap justify-center items-center p-1 border-2 border-black min-h-0 relative bg-orange-100 overflow-y-auto">
            {allCharactersLoading ? (<div>Loading...</div>) 
            : charactersToDisplay
                // .filter((character) => character.glb_date !== null)
                // .slice(0, viewableCharacters)
                .map((character) => (
                  <div
                  key={character.id}
                  className={`
                    cursor-pointer relative
                    ${!multiCardSelection && webOfTeam.map((char) => char.id).includes(character.id) ? "bg-slate-900/[.7] hover:bg-slate-900/[.9]" : "hover:bg-slate-900/[.3]"}
                    ${multiCardSelection && savedToMyCharacterDeck.includes(character.id) ? 'bg-amber-900/[.75] hover:bg-amber-900/[.9]' : multiCardSelection ? 'hover:bg-amber-900/[.4]' : ''}
                    `}
                  onClick={() => {
                    if (multiCardSelection) {
                      changeDeck(character.id);
                    } else {
                      handleCharacterSelection(character)
                    }
                  }}
                  >
                    <div className={`
                    absolute h-[60px] card-sm:h-[85px] w-[60px] card-sm:w-[85px] bg-gray-900 z-[60] opacity-70
                    ${(grayCharactersInSelectedDeck && allCharacterIDsInDeck.includes(character.id)) ? "" : "hidden"}
                    `}></div>
                    <CharacterCard 
                    individualCharacter={character} 
                    mobileSize={'60px'} 
                    desktopSize={'85px'}
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* TODO: team web styling */}
        <div
          id="Team"
          className={`${showTeamWeb || (windowWidth > 850) ? '' : 'hidden'} flex flex-1 flex-col w-screen lg:w-[45%] bg-gradient-radial from-slate-500 via-slate-600 to-slate-900`}
        >
          <SuggestToWeb
            selectedCharacter={cardDetails}
            userCharacters={userCharacters}
            handleNewDetails={newCardDetails}
            addToWebOfTeam={addToWebOfTeam}
            webOfTeam={webOfTeam}
            removeFromWebOfTeam={removeFromWebOfTeam}
            allCharacters={allCharacters}
            allCharactersLoading={allCharactersLoading}
          />
        </div>
      </div>

    </div>
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters based on the criteria in filterData
const getFilteredCharacters = (allCharacters, userCharacters, filterData, selectedCategories) => {
  const baseChars = filterData.isUserDeck ? userCharacters : allCharacters
  return baseChars.filter((character) => {
    
    const leaderNumbers = character.ls_description.match(/\d+/g) || []
    let characterLeadCategories
    if(selectedCategories.length > 0 && leaderNumbers.length > 0 && leaderNumbers.some(num => num >= 150) && leaderNumbers.some(num => num <= 200)){
      characterLeadCategories = (findCharacterLeaderCategories(character))
    }
    
    return (
      (!selectedCategories.length || (filterData.matchAllCategories
        ? selectedCategories.every(category => character.category.includes(category))
        : selectedCategories.some(category => character.category.includes(category))
      )) &&
      (!filterData.isCommonLeader || (selectedCategories.length > 0 ?
        selectedCategories.some(category => characterLeadCategories?.includes(category))
        :
        (leaderNumbers ? leaderNumbers.map(string => parseInt(string)).some(num => num >= 150 && num <= 200) : false))) &&      
      (!filterData.searchTerm || character.name.toLowerCase().includes(filterData.searchTerm.toLowerCase())) &&
      (!filterData.characterType || character.type.includes(filterData.characterType)) &&
      (!filterData.characterSuperOrExtreme || character.type.slice(0, 1).includes(filterData.characterSuperOrExtreme)) &&
      (!filterData.characterRarity ||filterData.characterRarity === character.rarity)
    );
  });
};

export default AllComponents;
