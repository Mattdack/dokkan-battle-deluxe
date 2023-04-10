import React from "react";

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
              className="flex w-1/2 p-1 card-sm:p-2.5 mr-1 text-xsm card-sm:text-base rounded-md border-2 border-black text-black font-bold"
              type="text"
              placeholder="Character Name"
              name="searchTerm"
            />

            <select
              className="flex w-1/2 order-2 p-1 card-sm:p-2.5 ml-1 text-xsm card-sm:text-base text-black font-bold bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black"
              id="categories"
              name="characterCategory"
              onChange={(e) => handleNewCategorySelected(e)}
            >
              <option value="">All Categories</option>
              <option>Accelerated Battle</option>
              <option>All-Out Struggle</option>
              <option>Androids</option>
              <option>Androids/Cell Saga</option>
              <option>Artificial Life Forms</option>
              <option>Battle of Fate</option>
              <option>Battle of Wits</option>
              <option>Bond of Friendship</option>
              <option>Bond of Master and Disciple</option>
              <option>Bond of Parent and Child</option>
              <option>Connected Hope</option>
              <option>Corroded Body and Mind</option>
              <option>Crossover</option>
              <option>DB Saga</option>
              <option>Defenders of Justice</option>
              <option>Dragon Ball Heroes</option>
              <option>Dragon Ball Seekers</option>
              <option>Earthlings</option>
              <option>Entrusted Will</option>
              <option>Exploding Rage</option>
              <option>Final Trump Card</option>
              <option>Full Power</option>
              <option>Fused Fighters</option>
              <option>Fusion</option>
              <option>Future Saga</option>
              <option>GT Bosses</option>
              <option>GT Heroes</option>
              <option>Giant Ape Power</option>
              <option>Giant Form</option>
              <option>Gifted Warriors</option>
              <option>Ginyu Force</option>
              <option>Goku's Family</option>
              <option>Heavenly Events</option>
              <option>Hybrid Saiyans</option>
              <option>Inhuman Deeds</option>
              <option>Joined Forces</option>
              <option>Kamehameha</option>
              <option>Legendary Existence</option>
              <option>Low-Class Warrior</option>
              <option>Majin Buu Saga</option>
              <option>Majin Power</option>
              <option>Mastered Evolution</option>
              <option>Miraculous Awakening</option>
              <option>Movie Bosses</option>
              <option>Movie Heroes</option>
              <option>Namekians</option>
              <option>Otherworld Warriors</option>
              <option>Peppy Gals</option>
              <option>Planet Namek Saga</option>
              <option>Planetary Destruction</option>
              <option>Potara</option>
              <option>Power Absorption</option>
              <option>Power Beyond Super Saiyan</option>
              <option>Powerful Comeback</option>
              <option>Pure Saiyans</option>
              <option>Rapid Growth</option>
              <option>Realm of Gods</option>
              <option>Representatives of Universe 7</option>
              <option>Resurrected Warriors</option>
              <option>Revenge</option>
              <option>Saiyan Saga</option>
              <option>Saviors</option>
              <option>Shadow Dragon Saga</option>
              <option>Siblings' Bond</option>
              <option>Space-Traveling Warriors</option>
              <option>Special Pose</option>
              <option>Storied Figures</option>
              <option>Super Heroes</option>
              <option>Super Saiyan 2</option>
              <option>Super Saiyan 3</option>
              <option>Super Saiyans</option>
              <option>Sworn Enemies</option>
              <option>Target Goku</option>
              <option>Team Bardock</option>
              <option>Terrifying Conquerors</option>
              <option>Time Limit</option>
              <option>Time Travelers</option>
              <option>Transformation Boost</option>
              <option>Turtle School</option>
              <option>Universe 11</option>
              <option>Universe 6</option>
              <option>Universe Survival Saga</option>
              <option>Vegeta's Family</option>
              <option>Wicked Bloodline</option>
              <option>World Tournament</option>
              <option>Worldwide Chaos</option>
              <option>Worthy Rivals</option>
              <option>Youth</option>
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
              <div className="flex flex-shrink-0 w-full h-fit pl-1 pr-2 mx-1 text-gray-500 text-sm card-sm:text-base justify-center items-center text-center" key={'no category selection'}>
                selected categories here
              </div>
              }
              {selectedCategories.map((category) => (
                <div className="flex flex-shrink-0 w-fit h-fit pl-1 pr-2 mx-1 bg-gray-200/[.75] justify-center items-center text-center rounded-full" key={category}>
                  <img className="w-1/4 card-sm:w-full p-1 cursor-pointer" src={closeIcon} onClick={() => handleSelectedCategoryRemoval(category)} />
                  <p className="text-sm card-sm:text-base">{category}</p>
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
                  className="py-1 card-sm:py-2 px-2 card-sm:px-5 text-sm card-sm:text-base m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500 whitespace-nowrap"
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
          <div className="flex w-full mt-2 card-sm:mt-2 justify-between items-center">
            <div
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
            </div>
          
          {/* super and extreme buttons */}
            <div
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
          </div>

          <div className="flex w-fit justify-center order-5 bg-orange-300 rounded-md border-2 border-slate-900">
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
                className="py-1 card-sm:py-2 px-2 card-sm:px-10 text-sm card-sm:text-base m-0.5 font-bold relative lg:hover:bg-orange-400 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500"
              >
                Characters Saved
              </div>
            </label>
          </div>


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
        className="flex w-full justify-center py-1 px-2 card-sm:py-2 card-sm:px-2 relative text-sm card-sm:text-base lg:hover:bg-orange-400 m-0.5 peer-checked:bg-orange-400 peer-checked:hover:bg-orange-500"
      >
        {label}
      </div>
    </label>
  );
};

export default SearchForm;
