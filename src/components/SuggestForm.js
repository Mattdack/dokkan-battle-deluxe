import React from "react";

const SuggestForm = ({ onFormChange, isDisabled }) => {
  return (
    <div className="h-[12vh] flex flex-row flex-wrap justify-center items-center ">
      {/* //search field */}
      <form
        onSubmit={(e) => e.preventDefault()}
        onChange={(e) => {
          const formData = Object.fromEntries(new FormData(e.currentTarget));
          onFormChange(formData);
        }}
      >
        <fieldset
          disabled={isDisabled}
          className="flex flex-col w-full p-1 items-center"
        >
          {/* input and category selection */}
          <div className="flex w-full justify-between items-center">
            <input
              className="flex w-1/2 p-1 card-sm:p-2.5 mr-1 rounded-md border-2 border-black text-xsm card-sm:text-base text-black font-bold"
              type="text"
              placeholder="Character Name"
              name="searchTermSuggest"
            />

            <select
              className="flex w-1/2 order-2 p-1 card-sm:p-2.5 ml-1 text-xsm card-sm:text-base text-black font-bold bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black"
              id="categories"
              name="characterCategorySuggest"
            >
              <option value="">All Categories</option>
              <option>Accelerated Battle</option>
              <option>All-Out Struggle</option>
              <option>Androids</option>
              <option>Androids-Cell Saga</option>
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
              <CharacterSelectButton name="characterTypeSuggest" value="" label="ALL" defaultChecked/>
            </div>
            <div className="flex w-2/5 justify-center items-center order-5 bg-orange-300 rounded-md border-2 border-slate-900">
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
                  className="m-0.5 py-1 px-2 card-sm:py-2 relative text-[.6rem] card-sm:text-base font-bold hover:bg-orange-400 peer-checked:bg-orange-400"
                >
                  My Deck
                </div>
              </label>
            </div>
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
        className="flex justify-center m-0.5 py-1 px-2 card-sm:py-2 card-sm:px-4 relative text-[.6rem] card-sm:text-base hover:bg-orange-400 peer-checked:bg-orange-400"
      >
        {label}
      </div>
    </label>
  );
};

export default SuggestForm;
