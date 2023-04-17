import React, { useState, useEffect, useRef } from "react";
import Auth from "../util/auth";
import * as sort from "../util/sorting";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  QUERY_CHARACTERS,
  GET_EVENT_DATA,
  GET_ITEMS_DATA,
  GET_SUPPORT_MEMORY_DATA,
} from "../util/queries";
import {} from "../util/mutations";

import SearchForm from "../components/SearchForm";
import CharacterCard from "../cards/CharacterCard";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";
const arrow =
  process.env.PUBLIC_URL + "/dokkanIcons/icons/right-arrow-icon.png";

function AllAPI() {
  const initialForm = useRef(null);
  const [initialOption, setInitialOption] = useState("");

  const [
    getCharacterData,
    { loading: allCharactersLoading, data: allCharactersData },
  ] = useLazyQuery(QUERY_CHARACTERS, {
    onCompleted: (data) => {
      if (data) {
        console.log("character data run query run");
        setAllCharacters(data.characters);
      }
    },
  });
  const [allCharacters, setAllCharacters] = useState([]);

  const characterDictionary = Object.fromEntries(
    allCharacters.map((characterObj) => [characterObj.id, characterObj])
  );
  // console.log(characterDictionary)

  const [getEventData, { loading: allEventsLoading, data: allEventsData }] =
    useLazyQuery(GET_EVENT_DATA, {
      onCompleted: (data) => {
        if (data) {
          // console.log('event query run')
          // setAllEvents(data.allEventsStagesTeams)
        }
      },
    });

  const [getItemData, { loading: allItemsLoading, data: allItemsData }] =
    useLazyQuery(GET_ITEMS_DATA);

  const [
    getMemoryData,
    { loading: allSupportMemoryoading, data: allSupperMemoryData },
  ] = useLazyQuery(GET_SUPPORT_MEMORY_DATA);

  const handleSelection = (e) => {
    if (e.target.value === "Edit Character") {
      console.log("we are in the edit character");
      setInitialOption(e.target.value);
      getCharacterData();
    }
  };
  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     const formData = new FormData(initialForm?.current);
  //     // console.log(formData)
  //     const formObject = Object.fromEntries(formData);
  //     console.log(formObject)
  // }

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newFilterData, setNewFilterData] = useState({});
  const [filteredCharacters, setFilteredCharacters] = useState(null);
  const userCharacters = [];

  // this function allows for filtered characters to be set to the reults of the getFilteredCharacters (which is extracted from the search form)
  const filterAndSetCharacters = (filterData) => [
    setFilteredCharacters(
      getFilteredCharacters(
        allCharacters,
        userCharacters,
        filterData,
        selectedCategories
      )
    ),
    setNewFilterData(filterData),
  ];

  const [filterByGame, setFilterByGame] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  let charactersToDisplay = sort.sortCharacters(
    allCharacters,
    filteredCharacters,
    filterByGame
  );

  if (
    newFilterData?.characterCategory?.length > 0 &&
    filteredCharacters?.length === 0
  ) {
    charactersToDisplay = [];
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const cardContainerRef = useRef(null);
  const handleNewCategorySelected = (e) => {
    // setViewableCharacters(100)
    if (e.target.value === "") {
      cardContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return setSelectedCategories([]);
    } else if (selectedCategories.includes(e.target.value)) {
      return selectedCategories;
    } else {
      cardContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return setSelectedCategories([...selectedCategories, e.target.value]);
    }
  };

  const handleSelectedCategoryRemoval = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories.filter(
        (singleCategory) => singleCategory !== categoryToRemove
      )
    );
  };

  return (
    <div className="fixed flex flex-col h-full bg-slate-900">
        <div className="flex w-screen bg-white">
          <p>What would you like to do?</p>
          <label
            htmlFor="selectAPIChange"
            className="pt-4 pb-2 justify-center items-center font-bold"
          >
            <select
              className="font-base text-base truncate border-2 border-black"
              name="selectAPIChange"
              id="selectAPIChange"
              onChange={(e) => handleSelection(e)}
            >
              <option value="">Nothing</option>
              <option value="Add Character">Add Character</option>
              <option value="Edit Character">Edit Character</option>
              <option value="New Category Added">New Category Added</option>
              <option value="Add Event">Add event</option>
              <option value="Edit Event">Edit event</option>
              <option value="Add Stage">Add stage</option>
              <option value="Edit Stage">Edit stage</option>
            </select>
          </label>
        </div>

      <div className={`flex flex-1 h-0 relative`}>
        <div className="flex flex-1 flex-col border-2 border-black bg-gray-500">
          {initialOption === "Edit Character" && (
            <div
              id="CardSelection"
              className={`
              flex flex-1 flex-col bg-gradient-radial overflow-y-auto
              `}
              //   ${windowWidth > 850 ? "" : "hidden"}
            >
              {/* <h1 className="font-header text-2xl text-center lg:m-4">Search by Filters</h1> */}

              <div
                className={`bg-orange-200 border-b-4 border-x-4 border-black`}
              >
                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex flex h-fit pt-1 items-center justify-center"
                  title={
                    showFilters
                      ? "click to hide filters"
                      : "click to show filters"
                  }
                >
                  <p className="font-header text-2xl font-light cursor-pointer">
                    Filters
                  </p>
                  <img
                    src={arrow}
                    className={`w-[7.5%] card-sm:w-[4%] ml-4 mb-1 cursor-pointer transform rotate-90 transition-transform duration-300 ${
                      showFilters ? "scale-y-[-1] scale-x-[-1]" : "scale-y-[-1]"
                    }`}
                  />
                </div>

                <div
                  className={`max-h-0 overflow-hidden transition-all duration-500 ${
                    showFilters ? "max-h-[100vh] ease-in-out" : ""
                  }`}
                >
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
                        onClick={() => {
                          setFilterByGame(!filterByGame);
                        }}
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
                    handleSelectedCategoryRemoval={
                      handleSelectedCategoryRemoval
                    }
                  />
                </div>
              </div>

              {/* //character select box */}
              <div
                ref={cardContainerRef}
                id={"characterContainer"}
                className="characterContainer flex flex-wrap justify-center items-center p-1 border-2 border-black min-h-0 relative bg-orange-100 overflow-y-auto"
              >
                {allCharactersLoading ? (
                  <div>Loading...</div>
                ) : (
                  charactersToDisplay.map((character) => (
                    <div
                      key={character.id}
                      className={`
                        cursor-pointer relative hover:bg-slate-900/[.3]
                        `}
                      onClick={() => {}}
                    >
                      <CharacterCard
                        individualCharacter={character}
                        mobileSize={"60px"}
                        desktopSize={"85px"}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters based on the criteria in filterData
const getFilteredCharacters = (
  allCharacters,
  userCharacters,
  filterData,
  selectedCategories
) => {
  const baseChars = filterData.isUserDeck ? userCharacters : allCharacters;
  return baseChars.filter((character) => {
    const leaderNumbers = character.ls_description.match(/\d+/g);
    return (
      (!selectedCategories.length ||
        (filterData.matchAllCategories
          ? selectedCategories.every((category) =>
              character.category.includes(category)
            )
          : selectedCategories.some((category) =>
              character.category.includes(category)
            ))) &&
      (!filterData.isCommonLeader ||
        (leaderNumbers
          ? leaderNumbers
              .map((string) => parseInt(string))
              .some((num) => num >= 150 && num <= 200)
          : false)) &&
      (!filterData.searchTerm ||
        character.name
          .toLowerCase()
          .includes(filterData.searchTerm.toLowerCase())) &&
      (!filterData.characterType ||
        character.type.includes(filterData.characterType)) &&
      (!filterData.characterSuperOrExtreme ||
        character.type
          .slice(0, 1)
          .includes(filterData.characterSuperOrExtreme)) &&
      (!filterData.characterRarity ||
        filterData.characterRarity === character.rarity)
    );
  });
};

export default AllAPI;
