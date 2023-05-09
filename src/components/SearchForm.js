import React, { useContext } from "react";

import { allCategoryOptions } from '../util/allCategories'

import { UserContext } from '../App';

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/circular-close-icon.png"

const SearchForm = ({ onFormChange, selectedCategories, handleNewCategorySelected, handleSelectedCategoryRemoval }) => {
  const { showMiddleDiv } = useContext(UserContext);
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
          className="flex flex-col w-full items-center"
        >
          {/* input and category selection */}
          <div className="flex w-full justify-between items-center">
            <input
              className="flex w-1/2 p-1 card-sm:p-2.5 mr-1 show-middle-div-text rounded-md border-2 border-black text-black font-bold"
              type="text"
              placeholder="Character Name"
              name="searchTerm"
            />

            <select
              className="flex w-1/2 p-1 order-2 card-sm:p-2.5 ml-1 show-middle-div-text text-black font-bold bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black"
              id="categories"
              name="characterCategory"
              onChange={(e) => handleNewCategorySelected(e)}
            >
              <option value='' key='all-categories'>All Categories</option>
              {allCategoryOptions()}
            </select>
          </div>


          {/* selected category bar */}
          <div className="flex flex-row grow-0 max-w-[90%] mt-2 justify-center items-center">
            <div className="flex flex-row h-fit min-w-[100px] max-w-[250px] card-sm:h-10 px-2 mr-2 bg-white items-center text-center rounded-full border-2 border-gray-400 overflow-x-scroll whitespace-nowrap"
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
                    left: containerScrollPosition - (dx),
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
              <div className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } flex flex-shrink-0 w-full h-fit pl-1 pr-2 mx-1 text-gray-500 justify-center items-center text-center`} 
              key={'no category selection'}>
                no selected categories
              </div>
              }
              {selectedCategories.map((category) => (
                <div className="flex flex-shrink-0 w-fit h-fit pl-1 pr-2 mx-1 bg-gray-200/[.75] justify-center items-center text-center rounded-full" key={category}>
                  <img className="w-1/4 card-sm:w-full cursor-pointer" src={closeIcon} onClick={() => handleSelectedCategoryRemoval(category)} />
                  <p className="show-middle-div-text">{category}</p>
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
                  className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } py-1 card-sm:py-2 px-2 card-sm:px-5  m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500 whitespace-nowrap`}
                >
                  Full Match
                </div>
              </label>
            </div>
          </div>

         <div className="flex w-full mt-2 card-sm:mt-2 justify-between items-center">
          {/* type buttons */}
            <div className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } pl-2 bg-orange-300 border-2 border-black rounded-md font-bold`}>
              Type:
              <select
                name="characterType"
                id="characterType"
                className="w-fit p-2 ml-2 bg-orange-300 rounded-r-md font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
              >
                <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
                value="">
                  ALL
                </option>
                <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
                value="AGL">
                  AGL
                </option>
                <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
                value="TEQ">
                  TEQ
                </option>
                <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
                value="INT">
                  INT
                </option>
                <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
                value="STR">
                  STR
                </option>
                <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
                value="PHY">
                  PHY
                </option>
              </select>
            </div>

          {/* rarity buttons */}
          <div className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } pl-2 bg-orange-300 border-2 border-black rounded-md font-bold`}>
            <label htmlFor="characterRarity">Rarity:
            <select
              name="characterRarity"
              id="characterRarity"
              className="w-fit p-2 ml-2 bg-orange-300 rounded-r-md font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
              >
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" value="">
                All
              </option>
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" value="LR">
                LR
              </option>
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" value="UR">
                UR
              </option>
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" value="SSR">
                SSR
              </option>
            </select>
              </label>
          </div>
          </div>

          <div className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } my-2 pl-2 bg-orange-300 border-2 border-black rounded-md font-bold`}>
            Super/Extreme:
            <select
              name="characterSuperOrExtreme"
              id="characterSuperOrExtreme"
              className="w-fit p-2 ml-2 bg-orange-300 rounded-r-md font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]"
            >
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
              value="">
                ALL
              </option>
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
              value="S">
                Super
              </option>
              <option className="text-[.6rem] card-sm:text-[.72rem] lg:text-[.6rem] xl:text-[.7rem]" 
              value="E">
                Extreme
              </option>
            </select>
          </div>

          <div className="flex w-full justify-between order-5">
            <div className="flex w-fit justify-center bg-orange-300 rounded-md border-2 border-slate-900">
              <label htmlFor="isCommonLeader">
                <input
                  type="checkbox"
                  name="isCommonLeader"
                  id="isCommonLeader"
                  className="hidden peer"
                  value={true}
                />
                <div
                  style={{ cursor: "pointer" }}
                  className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } py-1 card-sm:py-2 px-2 card-sm:px-4 m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500 whitespace-nowrap`}
                >
                  {selectedCategories.length > 0 ? 'Selected Category Leaders' : 'Common Leaders'}
                </div>
              </label>
            </div>

            <div className="flex w-fit justify-center bg-orange-300 rounded-md border-2 border-slate-900">
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
                  className={`${showMiddleDiv ? 'show-middle-div-text' : 'hide-middle-div-text' } py-1 card-sm:py-2 px-2 card-sm:px-6 m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500`}
                >
                  Characters Saved
                </div>
              </label>
            </div>
          </div>


        </fieldset>
      </form>
    </div>
  );
};

// const CharacterSelectButton = ({ name, label, ...inputProps }) => {
//   return (
//     <label htmlFor={`${name}-${label}`}>
//       <input
//         type="radio"
//         name={name}
//         id={`${name}-${label}`}
//         className="hidden peer"
//         value={label}
//         {...inputProps}
//       />
//       <div
//         style={{ cursor: "pointer" }}
//         className="flex w-full justify-center py-1 px-2 card-sm:py-2 card-sm:px-2 relative show-middle-div-text lg:hover:bg-orange-400 m-0.5 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500"
//       >
//         {label}
//       </div>
//     </label>
//   );
// };

export default SearchForm;
