import React, { useState } from "react";

const SearchForm = ({onFormChange}) => {
  return (
    <div className="flex flex-row flex-wrap justify-around mx-5">
      {/* //search field */}
      <form
        onSubmit={(e) => e.preventDefault()}
        // calls onFormChange with formData. Schema:
        // {
        //   searchTerm: string (empty string if not present),
        //   characterCategory: string (empty string if ALL)
        //   characterType: string (empty string if ALL)
        //   characterRarity: string (empty string if ALL)
        //   isUserDeck: true or else this key is not present
        // }
        onChange={(e) => {
          const formData = Object.fromEntries(new FormData(e.currentTarget));
          onFormChange(formData);
        }}
      >
        <input
          className="p-2.5 rounded-md border-2 border-black text-black"
          type="text"
          name="searchTerm"
        />

        {/* //categories field */}
        <select
          className="order-2 m-2 p-2 text-black bg-white border-2 border-black rounded-md shadow-sm outline-none appearance-none focus:border-black"
          id="categories"
          name="characterCategory"
        >
          <option value="">Categories:</option>
          <option>Fusion</option>
          <option>Shadow Dragon Saga</option>
          <option>World Tournament</option>
          <option>Peppy Gals</option>
          <option>Hybrid Saiyans</option>
          <option>Universe Survival Saga</option>
          <option>Resurrected Warriors</option>
          <option>Realm of Gods</option>
          <option>Majin Buu Saga</option>
          <option>Potara</option>
          <option>Low-Class Warrior</option>
          <option>Super Saiyan 3</option>
          <option>Giant Form</option>
          <option>Planet Namek Saga</option>
          <option>Ginyu Force</option>
          <option>Movie Bosses</option>
          <option>Pure Saiyans</option>
          <option>Namekians</option>
          <option>Future Saga</option>
          <option>Full Power</option>
          <option>Androids</option>
          <option>Representatives of Universe 7</option>
          <option>Transformation Boost</option>
          <option>Wicked Bloodline</option>
          <option>Dragon Ball Seekers</option>
          <option>Time Travelers</option>
          <option>Universe 6</option>
          <option>Joined Forces</option>
          <option>Movie Heroes</option>
          <option>Goku's Family</option>
          <option>Vegeta's Family</option>
          <option>Artificial Life Forms</option>
          <option>Youth</option>
          <option>DB Saga</option>
          <option>Siblings' Bond</option>
          <option>Super Saiyans</option>
          <option>Worthy Rivals</option>
          <option>Androids/Cell Saga</option>
          <option>Kamehameha</option>
          <option>Bond of Master and Disciple</option>
          <option>Terrifying Conquerors</option>
          <option>Dragon Ball Heroes</option>
          <option>Target: Goku</option>
          <option>Otherworld Warriors</option>
          <option>Super Saiyan 2</option>
          <option>Final Trump Card</option>
          <option>Exploding Rage</option>
          <option>Revenge</option>
          <option>Team Bardock</option>
          <option>Inhuman Deeds</option>
          <option>Earthlings</option>
          <option>Special Pose</option>
          <option>Majin Power</option>
          <option>Rapid Growth</option>
          <option>All-Out Struggle</option>
          <option>Universe 11</option>
          <option>Saviors</option>
          <option>Battle of Wits</option>
          <option>Power Absorption</option>
          <option>Giant Ape Power</option>
          <option>Crossover</option>
          <option>Space-Traveling Warriors</option>
          <option>Connected Hope</option>
          <option>Corroded Body and Mind</option>
          <option>Turtle School</option>
          <option>Miraculous Awakening</option>
          <option>Powerful Comeback</option>
          <option>Gifted Warriors</option>
          <option>Planetary Destruction</option>
          <option>Defenders of Justice</option>
          <option>Storied Figures</option>
          <option>GT Heroes</option>
          <option>GT Bosses</option>
          <option>Heavenly Events</option>
          <option>Time Limit</option>
          <option>Mastered Evolution</option>
          <option>Legendary Existence</option>
          <option>Sowrn Enemies</option>
          <option>Bond of Friendship</option>
          <option>Accelerated Battle</option>
          <option>Entrusted Will</option>
          <option>Worldwide Chaos</option>
          <option>Battle of Fate</option>
          <option>Power Beyond Super Saiyan</option>
          <option>Fused Fighters</option>
          <option>Saiyan Saga</option>
          <option>Bond of Parent and Child</option>
          <option>Warriors Raised on Earth</option>
        </select>

        {/* //type buttons */}
        <div
          className="grid grid-cols-3 order-3 bg-orange-300 rounded-md border-2 border-slate-900 flex my-5"
          id="box-2"
        >
          <CharacterSelectButton
            name="characterType"
            label="AGL"
          />
          <CharacterSelectButton
            name="characterType"
            label="TEQ"
          />
          <CharacterSelectButton
            name="characterType"
            label="INT"
          />
          <CharacterSelectButton
            name="characterType"
            label="STR"
          />
          <CharacterSelectButton
            name="characterType"
            label="PHY"
          />
          <CharacterSelectButton
            name="characterType"
            value=""
            label="ALL"
            defaultChecked
          />
        </div>

        {/* //rarity buttons */}
        <div
          className="order-4 bg-orange-300 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5"
          id="box-1"
        >
          <CharacterSelectButton
            name="characterRarity"
            label="UR"
          />
          <CharacterSelectButton
            name="characterRarity"
            label="LR"
          />
          <CharacterSelectButton
            name="characterRarity"
            value=""
            label="ALL"
            defaultChecked
          />
        </div>

        <div className="order-5 bg-orange-300 rounded-md border-2 border-slate-900 flex 2xl:h-12 2xl:mt-5">
        <label
          for="isUserDeck"
        >
          <input
            type="checkbox"
            name="isUserDeck"
            id="isUserDeck"
            className="hidden peer"
            value={true}
          />
          <div 
            style={{cursor: "pointer"}}
            className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5 peer-checked:bg-orange-400"
          >
              My Deck
            </div>
        </label>
        </div>
      </form>
    </div>
  );
};

const CharacterSelectButton = ({ name, label, ...inputProps}) => {
  return (
    <label
      for={`${name}-${label}`}
    >
      <input
        type="radio"
        name={name}
        id={`${name}-${label}`}
        className="hidden peer"
        value={label}
        {...inputProps}
      />
      <div 
        style={{cursor: "pointer"}}
        className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400 m-0.5 peer-checked:bg-orange-400"
      >
          {label}
        </div>
    </label>
  );
};

export default SearchForm;
