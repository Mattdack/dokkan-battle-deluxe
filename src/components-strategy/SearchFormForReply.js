import React from "react";

import allCategoryOptions from '../util/allCategoryOptions'

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/circular-close-icon.png"

const SearchForm = ({ onFormChange, selectedCategories, handleNewCategorySelected, handleSelectedCategoryRemoval }) => {

  return (
    <div className="flex flex-row flex-wrap justify-around lg:mx-5">
      {/* //search field */}
      <form
        onSubmit={(e) => e.preventDefault()}
        onChange={(e) => {
          const formData = Object.fromEntries(new FormData(e.currentTarget));
          onFormChange(formData);
        }}
      >
        <fieldset
          className="flex flex-col w-full p-1 items-center"
        >
          {/* input and category selection */}
          <div className="flex w-full justify-between items-center">
            <input
              className="flex w-1/2 p-1 card-sm:p-2.5 mr-1 text-xsm card-sm:text-md rounded-md border-2 border-black text-black font-bold"
              type="text"
              placeholder="Character Name"
              name="searchTerm"
            />

            <select
              className="flex w-1/2 order-2 p-1 card-sm:p-2.5 ml-1 text-xsm card-sm:text-md text-black font-bold bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black"
              id="categories"
              name="characterCategory"
              onChange={(e) => handleNewCategorySelected(e)}
            >
              {allCategoryOptions.map(category => category)}
            </select>
          </div>


          {/* selected category bar */}
          <div className="flex flex-row grow-0 max-w-[85%] mt-2 justify-center items-center">
          <div 
            className="flex flex-row h-fit min-w-[100px] max-w-[180px] card-sm:h-10 px-2 mr-2 bg-white items-center text-center rounded-full border-2 border-gray-400 overflow-x-scroll whitespace-nowrap"
            onMouseDown={(e) => {
              if (e.button !== 0) { // Only start dragging on left mouse button
                return;
              }
              e.preventDefault();
              const container = e.currentTarget;
              const containerScrollPosition = container.scrollLeft;
              const mouseX = e.clientX;
              let mouseDown = true;
              container.style.cursor = 'grabbing';
              container.addEventListener('mousemove', onMouseMove);
              container.addEventListener('mouseup', onMouseUp);
              container.addEventListener('mouseleave', onMouseLeave);

              function onMouseMove(e) {
                if (!mouseDown) {
                  return;
                }
                const dx = e.clientX - mouseX;
                container.scrollTo({
                  top: 0,
                  left: containerScrollPosition - dx,
                  behavior: "auto"
                });
              }

              function onMouseUp() {
                mouseDown = false;
                container.style.cursor = 'grab';
                container.removeEventListener('mousemove', onMouseMove);
                container.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('mouseleave', onMouseLeave);
              }

              function onMouseLeave() {
                mouseDown = false;
                container.style.cursor = 'grab';
                container.removeEventListener('mousemove', onMouseMove);
                container.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('mouseleave', onMouseLeave);
              }
            }}
          >
              {selectedCategories.length === 0 &&
              <div className="flex flex-shrink-0 w-full h-fit pl-1 pr-2 mx-1 text-gray-500 text-sm card-sm:text-md justify-center items-center text-center" key={'no category selection'}>
                selected categories here
              </div>
              }
              {selectedCategories.map((category) => (
                <div className="flex shrink-0 w-fit h-fit pl-1 pr-2 mx-1 bg-gray-200/[.75] justify-center items-center text-center rounded-full" key={category}>
                  <img className="w-6 card-sm:w-8 p-1 cursor-pointer" src={closeIcon} onClick={() => handleSelectedCategoryRemoval(category)} />
                  <p className="text-xsm card-sm:text-sm">{category}</p>
                </div>
              ))}
            </div>
            <div className="flex w-fit justify-center order-2 bg-orange-300 rounded-md border-2 border-slate-900">
              <label htmlFor="matchAllCategories">
                <input
                  type="checkbox"
                  name="matchAllCategories"
                  id="matchAllCategories"
                  className="hidden peer"
                  value={true}
                />
                <div
                  style={{ cursor: "pointer" }}
                  className="py-1 card-sm:py-2 px-2 card-sm:px-5 text-sm card-sm:text-md m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400 whitespace-nowrap"
                >
                  Full Match
                </div>
              </label>
            </div>
          </div>


          {/* type buttons */}
          <div
            className="flex w-full pl-1 pr-2 my-1 card-sm:my-2 grid grid-cols-6 order-3 bg-orange-300 rounded-md border-2 border-slate-900 font-bold"
            id="box-2"
          >
            <CharacterSelectButton name="characterType" label="AGL" />
            <CharacterSelectButton name="characterType" label="TEQ" />
            <CharacterSelectButton name="characterType" label="INT" />
            <CharacterSelectButton name="characterType" label="STR" />
            <CharacterSelectButton name="characterType" label="PHY" />
            <CharacterSelectButton
              name="characterType"
              value=""
              label="ALL"
              defaultChecked
            />
          </div>

          {/* rarity buttons */}
          {/* <div className="flex w-full mt-2 card-sm:mt-2 justify-between items-center"> */}
            {/* <div
              className="flex w-1/2 justify-around pr-2 mb-1 order-4 bg-orange-300 rounded-md border-2 border-slate-900 font-bold mr-1"
              id="box-1"
            >
              <CharacterSelectButton name="characterRarity" label="UR" />
              <CharacterSelectButton name="characterRarity" label="LR" />
              <CharacterSelectButton
                name="characterRarity"
                value=""
                label="ALL"
                defaultChecked
              />
            </div> */}
          
          {/* super and extreme buttons */}
            {/* <div
              className="flex w-full justify-around mb-1 order-4 bg-orange-300 rounded-md border-2 border-slate-900 font-bold ml-1"
              id="box-1"
            >
              <CharacterSelectButton name="characterSuperOrExtreme" value="S" label="Super"/>
              <CharacterSelectButton name="characterSuperOrExtreme" value="E" label="Extreme"/>
              <CharacterSelectButton
                name="characterSuperOrExtreme"
                value=""
                label="ALL"
                defaultChecked
              />
            </div>
          </div> */}

          {/* <div className="flex w-fit justify-center order-5 bg-orange-300 rounded-md border-2 border-slate-900">
            <label htmlFor="isUserDeck">
              <input
                type="checkbox"
                name="isUserDeck"
                id="isUserDeck"
                className="hidden peer"
                value={true}
              />
              <div
                style={{ cursor: "pointer" }}
                className="py-1 card-sm:py-2 px-2 card-sm:px-10 text-sm card-sm:text-md m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400"
              >
                Characters Saved
              </div>
            </label>
          </div> */}


        </fieldset>
      </form>
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
        className="flex w-full justify-center py-1 px-2 card-sm:py-2 card-sm:px-2 relative text-sm card-sm:text-md lg:hover:bg-orange-400 m-0.5 peer-checked:bg-orange-400"
      >
        {label}
      </div>
    </label>
  );
};

export default SearchForm;
