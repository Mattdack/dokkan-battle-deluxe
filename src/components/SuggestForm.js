import React, { useState, useEffect } from "react";

import { allCategoryOptions } from '../util/allCategories'

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/circular-close-icon.png"

const SuggestForm = ({ onFormChange, selectedCategories, handleNewCategorySelected, handleSelectedCategoryRemoval, statsSelectedOptions, handleStatsSelectedOptions, allCharactersLoading, }) => {
  function handleFormChange(e) {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    onFormChange(formData);
  }

  // this useEffect allows for characters to be loaded in on render (waits for everycharacter to be loaded in)
  useEffect(() => {
    handleFormChange({ currentTarget: document.querySelector("#form") });
  }, [allCharactersLoading]);
  
  return (
    <div className="h-fit flex flex-col justify-center items-center ">
      {/* //search field */}
      <form
        onSubmit={(e) => e.preventDefault()}
        onChange={(e) => handleFormChange(e)}
        id="form"
      >
        <fieldset
          disabled={allCharactersLoading}
          className="flex flex-col w-full p-1 items-center"
        >
        {/* input and category selection */}
        <div className="flex w-full pt-2 justify-between items-center">

          {/* selected category bar */}
              <div className="flex flex-row h-fit min-w-[50px] max-w-[150px] w-1/3 card-sm:h-10 px-2 mr-2 items-center bg-white rounded-full border-2 border-gray-400 whitespace-nowrap"
              >
                {selectedCategories.length === 0 ?
                <select
                className="w-full py-1 text-sm"
                >
                  <option value={'Remove All Categories'} className="text-red-400">No Categories Selected</option>
                </select>
                :
                <select
                className="w-full py-1 text-sm"
                onChange={(e)=>handleSelectedCategoryRemoval(e.target.value)}>
                  <option className="truncate" value={'Selected Categories'} key={'Suggested Selected Categories'}>Selected Categories</option>
                  {selectedCategories.map((category) => (
                    <option className="truncate" value={category} key={category}>
                      {category}
                    </option>
                  ))}
                  <option value={'Remove All Categories'} className="text-red-400">Remove All Categories</option>
                </select>
                }
              </div>
              
              <div className="flex w-1/3 justify-center order-2 bg-orange-300 rounded-md border-2 border-slate-900">
                <label 
                className="w-full p-1"
                htmlFor="suggestMatchAllCategories">
                  <input
                    type="checkbox"
                    name="suggestMatchAllCategories"
                    id="suggestMatchAllCategories"
                    className="hidden peer"
                    value={true}
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    className="w-full py-1 card-sm:py-2 px-1 card-sm:px-2 text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem] font-bold relative text-center lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500 whitespace-nowrap"
                  >
                    Full Match
                  </div>
                </label>
              </div>
          

            <select
              className="flex w-1/3 p-1.5 order-2 card-sm:p-2.5 ml-1 text-xsm card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem] text-black font-bold bg-white hover:bg-gray-300 border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black"
              id="categories"
              name="characterCategory"
              onChange={(e) => handleNewCategorySelected(e)}
            >
              <option value='' key='all-categories'>All Categories</option>
              {allCategoryOptions()}
            </select>
          </div>

          {/* type and My Deck buttons*/}
          <div className="flex h-fit w-full justify-between items-center">
            <div
              className="flex w-full my-1 grid grid-cols-6 order-3 bg-orange-300 rounded-md border-2 border-slate-900 font-bold"
              id="box-2"
            >
              <CharacterSelectButton name="characterTypeSuggest" label="AGL" />
              <CharacterSelectButton name="characterTypeSuggest" label="TEQ" />
              <CharacterSelectButton name="characterTypeSuggest" label="INT" />
              <CharacterSelectButton name="characterTypeSuggest" label="STR" />
              <CharacterSelectButton name="characterTypeSuggest" label="PHY" />
              <CharacterSelectButton
                name="characterTypeSuggest"
                label="ALL"
                value=""
                defaultChecked
              />
            </div>
            <div className="flex justify-center items-center order-5 bg-orange-300 rounded-md border-2 border-slate-900">
              <label htmlFor="isUserDeckSuggest">
                <input
                  type="checkbox"
                  name="isUserDeckSuggest"
                  id="isUserDeckSuggest"
                  className="hidden peer"
                  value={true}
                />
                <div
                  style={{ cursor: "pointer" }}
                  className="m-0.5 py-1 px-4 card-sm:px-10 lg:px-5 xl:px-10 card-sm:py-2 relative text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem] text-center font-bold lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500"
                >
                  Saved
                </div>
              </label>
            </div>
          </div>
        </fieldset>
      </form>

      <div className="pt-1 pb-2 flex justify-center items-center">
        <p className="text-sm card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem] mr-4 font-bold text-center">stats filter:</p>
        <div className="">
          <input
            className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="None"
            id="inlineRadio1"
            value="None"
            checked={statsSelectedOptions === "None"}
            onChange={handleStatsSelectedOptions}
          />
          <label
            className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
            htmlFor="inlineRadio10"
          >
            None
          </label>
        </div>
        <div className="">
          <input
            className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="ATK"
            id="inlineRadio1"
            value="ATK"
            checked={statsSelectedOptions === "ATK"}
            onChange={handleStatsSelectedOptions}
          />
          <label
            className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
            htmlFor="inlineRadio10"
          >
            ATK
          </label>
        </div>
        <div className="">
          <input
            className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="DEF"
            id="inlineRadio2"
            value="DEF"
            checked={statsSelectedOptions === "DEF"}
            onChange={handleStatsSelectedOptions}
          />
          <label
            className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
            htmlFor="inlineRadio20"
          >
            DEF
          </label>
        </div>
        <div className="">
          <input
            className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="Ki"
            id="inlineRadio3"
            value="Ki"
            checked={statsSelectedOptions === "Ki"}
            onChange={handleStatsSelectedOptions}
          />
          <label
            className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
            htmlFor="inlineRadio30"
          >
            Ki
          </label>
        </div>
      </div>
    </div>
  );
};

const CharacterSelectButton = ({ name, label, ...inputProps }) => {
  return (
    <label htmlFor={`${name}-${label}`}>
      <input
        type="radio"
        name={name}
        id={`${name}-${label}`}
        className="hidden peer"
        value={label}
        {...inputProps}
      />
      <div
        style={{ cursor: "pointer" }}
        className="flex justify-center m-0.5 py-1 px-2 card-sm:py-2 card-sm:px-4 relative text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem] lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500"
      >
        {label}
      </div>
    </label>
  );
};

export default SuggestForm;
