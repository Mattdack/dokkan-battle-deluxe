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
import { EDIT_CHARACTER } from "../util/mutations";

import SearchForm from "../components/SearchForm";
import CharacterCard from "../cards/CharacterCard";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";
const arrows = process.env.PUBLIC_URL + "/dokkanIcons/icons/right-arrow-icon.png";

function AllAPI() {
  const profileData = Auth.getProfile() || [];

  const [initialOption, setInitialOption] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const initialForm = useRef(null);

  const [editCharacter,{ error: updatedCharacterError, data: updatedCharacterData }] = useMutation(EDIT_CHARACTER);

  const [getCharacterData, { loading: allCharactersLoading, data: allCharactersData }] = useLazyQuery(QUERY_CHARACTERS, {
    onCompleted: (data) => {
      if (data) {
        setAllCharacters(data.characters);
      }
    },
  });
  const [allCharacters, setAllCharacters] = useState([]);

  const characterDictionary = Object.fromEntries(
    allCharacters.map((characterObj) => [characterObj.id, characterObj])
  );

  const [getEventData, { loading: allEventsLoading, data: allEventsData }] = useLazyQuery(GET_EVENT_DATA, {
      onCompleted: (data) => {
        if (data) {
          // console.log('event query run')
        }
      },
    });

  const [getItemData, { loading: allItemsLoading, data: allItemsData }] = useLazyQuery(GET_ITEMS_DATA);

  const [getMemoryData, { loading: allSupportMemoryoading, data: allSupperMemoryData }] = useLazyQuery(GET_SUPPORT_MEMORY_DATA);

  const handleSelection = (e) => {
    if (e.target.value === "Edit Character") {
      setInitialOption(e.target.value);
      getCharacterData();
    }
  };

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

  let charactersToDisplay = sort.sortCharacters(allCharacters,filteredCharacters,filterByGame);

  if (newFilterData?.characterCategory?.length > 0 && filteredCharacters?.length === 0) {
    charactersToDisplay = [];
  }

  useEffect(() => {
    const filteredChars = getFilteredCharacters(allCharacters, userCharacters, newFilterData, selectedCategories);
    setFilteredCharacters(filteredChars);
  }, [selectedCategories]); 


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

  const [editCharacterForm, setEditCharacterForm] = useState({
    id: '',
    thumb: '',
    art: '',
    title: '',
    name: '',
    rarity: '',
    type: '',
    cost: '',
    ls_description: '',
    ls_description_eza: '',
    sa_type: '',
    sa_name: '',
    sa_description: '',
    sa_description_eza: '',
    ultra_sa_type: '',
    ultra_sa_name: '',
    ultra_sa_description: '',
    ultra_sa_description_eza: '',
    ps_name: '',
    ps_description: '',
    ps_description_eza: '',
    sa_type_active: '',
    active_skill_name: '',
    active_skill: '',
    active_skill_condition: '',
    active_skill_condition_eza: '',
    transform_type: '',
    transform_condition: '',
    transform_condition_eza: '',
    link_skill: '',
    category: '',
    jp_date: '',
    glb_date: '',
    jp_date_eza: '',
    glb_date_eza: '',
  });
  function handleCharacterClick(character) {
    setSelectedCharacter(character);
    setEditCharacterForm({
      id:character.id || '',
      thumb:character.thumb || '',
      art:character.art || '',
      title:character.title || '',
      name:character.name || '',
      rarity:character.rarity || '',
      type:character.type || '',
      cost:character.cost || '',
      ls_description:character.ls_description || '',
      ls_description_eza:character.ls_description_eza || '',
      sa_type:character.sa_type || '',
      sa_name:character.sa_name || '',
      sa_description:character.sa_description || '',
      sa_description_eza:character.sa_description_eza || '',
      ultra_sa_type:character.ultra_sa_type || '',
      ultra_sa_name:character.ultra_sa_name || '',
      ultra_sa_description:character.ultra_sa_description || '',
      ultra_sa_description_eza:character.ultra_sa_description_eza || '',
      ps_name:character.ps_name || '',
      ps_description:character.ps_description || '',
      ps_description_eza:character.ps_description_eza || '',
      sa_type_active:character.sa_type_active || '',
      active_skill_name:character.active_skill_name || '',
      active_skill:character.active_skill || '',
      active_skill_condition:character.active_skill_condition || '',
      active_skill_condition_eza:character.active_skill_condition_eza || '',
      transform_type:character.transform_type || '',
      transform_condition:character.transform_condition || '',
      transform_condition_eza:character.transform_condition_eza || '',
      link_skill:character.link_skill || '',
      category:character.category || '',
      jp_date:character.jp_date || '',
      glb_date:character.glb_date || '',
      jp_date_eza:character.jp_date_eza || '',
      glb_date_eza:character.glb_date_eza || ''
    });
  }

  function handleCharacterEditInputChange(e) {
    let value = e.target.value
    if (value === ''){
      value = null
    }
    setEditCharacterForm({
      ...editCharacterForm,
      [e.target.name]: value,
    });
  }

  async function editCharacterSubmit(e) {
    e.preventDefault()
    // Check if any values are empty strings and replace them with null
    const updatedCharacter = {};
    Object.entries(editCharacterForm).forEach(([key, value]) => {
      updatedCharacter[key] = value === '' ? null : value;
    });
  
    await editCharacter({
      variables: {
        updatedCharacter: updatedCharacter,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    profileData?.data?._id === '6421c61a20c82f8fc6338e24' && 
    (<div className="fixed flex flex-col h-full bg-slate-900">
        <div className="flex w-screen bg-slate-700">
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
                    src={arrows}
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
                    handleSelectedCategoryRemoval={handleSelectedCategoryRemoval}
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
                      ${selectedCharacter?.id === character.id && 'bg-slate-900/[.7] hover:bg-slate-900/[.9]'}
                      `}
                      onClick={() => handleCharacterClick(character)}
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

        <div className="flex flex-1 bg-white overflow-y-auto">
          {(initialOption === "Edit Character") &&
            <form 
            onSubmit={(e) => editCharacterSubmit(e)}
            className="w-full">
                <label className="flex p-2">
                id
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='id'
                  value={editCharacterForm?.id}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  thumb
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='thumb'
                  value={editCharacterForm?.thumb}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  art
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='art'
                  value={editCharacterForm?.art}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  title
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='title'
                  value={editCharacterForm?.title}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  name
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='name'
                  value={editCharacterForm?.name}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  rarity
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='rarity'
                  value={editCharacterForm?.rarity}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  type
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='type'
                  value={editCharacterForm?.type}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  cost
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='cost'
                  value={editCharacterForm?.cost}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ls_description
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ls_description'
                  value={editCharacterForm?.ls_description}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ls_description_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ls_description_eza'
                  value={editCharacterForm?.ls_description_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  sa_type
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='sa_type'
                  value={editCharacterForm?.sa_type}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  sa_name
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='sa_name'
                  value={editCharacterForm?.sa_name}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  sa_description
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='sa_description'
                  value={editCharacterForm?.sa_description}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  sa_description_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='sa_description_eza'
                  value={editCharacterForm?.sa_description_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_name
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ultra_sa_name'
                  value={editCharacterForm?.ultra_sa_name}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_type
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ultra_sa_type'
                  value={editCharacterForm?.ultra_sa_type}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_description
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ultra_sa_description'
                  value={editCharacterForm?.ultra_sa_description}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_description_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ultra_sa_description_eza'
                  value={editCharacterForm?.ultra_sa_description_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ps_name
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ps_name'
                  value={editCharacterForm?.ps_name}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ps_description
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ps_description'
                  value={editCharacterForm?.ps_description}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  ps_description_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='ps_description_eza'
                  value={editCharacterForm?.ps_description_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  sa_type_active
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='sa_type_active'
                  value={editCharacterForm?.sa_type_active}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  active_skill_name
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='active_skill_name'
                  value={editCharacterForm?.active_skill_name}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  active_skill
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='active_skill'
                  value={editCharacterForm?.active_skill}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  active_skill_condition
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='active_skill_condition'
                  value={editCharacterForm?.active_skill_condition}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  active_skill_condition_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='active_skill_condition_eza'
                  value={editCharacterForm?.active_skill_condition_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  transform_type
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='transform_type'
                  value={editCharacterForm?.transform_type}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  transform_condition
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='transform_condition'
                  value={editCharacterForm?.transform_condition}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  transform_condition_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='transform_condition_eza'
                  value={editCharacterForm?.transform_condition_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  link_skill
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='link_skill'
                  value={editCharacterForm?.link_skill}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  category
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='category'
                  value={editCharacterForm?.category}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  jp_date
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='jp_date'
                  value={editCharacterForm?.jp_date}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  glb_date
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='glb_date'
                  value={editCharacterForm?.glb_date}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  jp_date_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='jp_date_eza'
                  value={editCharacterForm?.jp_date_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <label className="flex p-2">
                  glb_date_eza
                  <textarea 
                  className="w-full p-1 border border-black"
                  rows={6}
                  placeholder='null'
                  name='glb_date_eza'
                  value={editCharacterForm?.glb_date_eza}
                  onChange={(e) => handleCharacterEditInputChange(e)}
                  />
                </label>
                <button>SUBMIT</button>
            </form>
          }
        </div>
      </div>
    </div>
    )
  );
}

// returns a new array of characters derived from either allCharacters or userCharacters based on the criteria in filterData
const getFilteredCharacters = ( allCharacters, userCharacters, filterData, selectedCategories) => {
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
