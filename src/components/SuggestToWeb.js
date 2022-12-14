import React, { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_7LINKS } from "../util/queries";
import SingleCard from "./SingleCard";
import Web from "./Web";

function SuggestToWeb(props) {
  const [charactersWith3Matches, setCharactersWith3Matches] = useState([]);
  const [charactersWith4Matches, setCharactersWith4Matches] = useState([]);
  const [charactersWith5Matches, setCharactersWith5Matches] = useState([]);
  const [charactersWith6Matches, setCharactersWith6Matches] = useState([]);
  const [charactersWith7Matches, setCharactersWith7Matches] = useState([]);

  let characterId = props.suggestion.shift();
  let characterLink = props.suggestion[0];

  let prevCharacterId = useRef(characterId);

  // const handleSuggestionClick = (e) => {
  //   //console.log("clicked");
  //   const { target } = e;
  //   // Updated the character link array
  //   characterId = target.characterId;
  //   //console.log(target);
  //   characterLink = [];
  //   const characterArray = target.entirecharacter;
  //   //console.log(characterArray);
  //   for (let index = 3 ; index < characterArray.length; index++) {
  //     characterLink.push(characterArray[index])
  //   }
  // }
  
function newArraySuggestion(character) {
  //console.log(character);
  // Updated the character link array
  characterId = character[0]
  characterLink = [];
  const characterArray = character;

  for (let index = 3 ; index < characterArray.length; index++) {
    characterLink.push(characterArray[index])
  }
  qeuryAllCharacters();
}

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    if (
      characterId !== prevCharacterId &&
      typeof characterLink !== "undefined"
    ) {
      // Run the query and update the "data" state.
      // //console.log("change detected");
      qeuryAllCharacters();
    }
    // Update the "prevCharacter" variable with the current props
    prevCharacterId = characterId;
  }, [characterId]);

  const [getAllCharacters, { loading, data }] = useLazyQuery(QUERY_7LINKS);

  const qeuryAllCharacters = () => {
    getAllCharacters({
      variables: {
        link1: characterLink[0],
        link2: characterLink[1],
        link3: characterLink[2],
        link4: characterLink[3],
        link5: characterLink[4],
        link6: characterLink[5],
        link7: characterLink[6],
      },
    }).then((result) => {
      // Print the data when the query is executed
      // //console.log(characterLink);
      comparisonTime(result.data.characters7Link, characterLink);
    });
  };

  function comparisonTime(arrays, compareArray) {
    // //console.log(arrays);
    // //console.log(compareArray);

    let combineCharacterInfo = [];

    // Loop over the elements in `arrays`
    for (const array of arrays) {
      // Create a copy of the `link_skill` array
      let linkSkills = array.link_skill.slice();
      // Use the `unshift()` method to add the `id` at the beginning of the `link_skill` array
      linkSkills.unshift(array.rarity)
      linkSkills.unshift(array.type)
      linkSkills.unshift(array.art);
      linkSkills.unshift(array.thumb);
      linkSkills.unshift(array.id);

      // Use the `push()` method to add the modified `link_skill` array to `combineCharacterInfo`
      combineCharacterInfo.push(linkSkills);
    }
    // Print `combineCharacterInfo`
    // //console.log(combineCharacterInfo);

    // makes a variable matchers that maps over the new array of JUST linkskills, then iterates over the comparison array to see if there are any matching elemets
    let matches = combineCharacterInfo.map((otherArray) => {
      let count = 0;
      for (const element of otherArray) {
        if (compareArray.includes(element)) {
          count++;
        }
      }
      return count;
    });

    //TODO: This is where we can get the if statement to pass into suggestions for links into separate divs. The id of the character is the first in the array, allowing us to pass the id through the props
    let arrayOfAll7Matches = [];
    let arrayOfAll6Matches = [];
    let arrayOfAll5Matches = [];
    let arrayOfAll4Matches = [];
    let arrayOfAll3Matches = [];
    matches.forEach((match, index) => {
      if (match === 7) {
        // //console.log(`This array: ${combineCharacterInfo[index]} matches this many times: ${match}`);
        arrayOfAll7Matches.push(combineCharacterInfo[index]);
      } else if (match === 6) {
        // //console.log(`This array: ${combineCharacterInfo[index]} matches this many times: ${match}`);
        arrayOfAll6Matches.push(combineCharacterInfo[index]);
      } else if (match === 5) {
        // //console.log(`This array: ${combineCharacterInfo[index]} matches this many times: ${match}`);
        arrayOfAll5Matches.push(combineCharacterInfo[index]);
      } else if (match === 4) {
        // //console.log(`This array: ${combineCharacterInfo[index]} matches this many times: ${match}`);
        arrayOfAll4Matches.push(combineCharacterInfo[index]);
      } else if (match === 3) {
        // //console.log(`This array: ${combineCharacterInfo[index]} matches this many times: ${match}`);
        arrayOfAll3Matches.push(combineCharacterInfo[index]);
      } else {
        // //console.log(`This array: ${combineCharacterInfo[index]} matches this many times: ${match} :(`)
      }
    });
    setCharactersWith7Matches(arrayOfAll7Matches);
    setCharactersWith6Matches(arrayOfAll6Matches);
    setCharactersWith5Matches(arrayOfAll5Matches);
    setCharactersWith4Matches(arrayOfAll4Matches);
    setCharactersWith3Matches(arrayOfAll3Matches);
  }
  return (
    <div className="h-full my-2">

      <Web webOfTeam = {props.webOfTeam}/>

      <div className="h-[60vh]row-span-2 p-2">
        <div className="flex flex-col h-full justify-end">
          {/* <h3>Characters with 7 Links:</h3>
          <div className="grid grid-cols-5 max-w-full h-[120px] bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto">
            {charactersWith7Matches &&
              charactersWith7Matches.map((character) => (
                <div key={character} onClick= {() => {
                  newArraySuggestion(character);
                  props.handleNewDetails(character)
                  console.log(character);
                }}>
                  <SingleCard characterId={character[0]} characterThumb = {character[1]} characterArt = {character[2]} characterType={character[3]} characterRarity={character[4]}/>
                </div>
              ))}
          </div> */}
          <h3>Characters with 6 Links:</h3>
          <div className="grid grid-cols-5 h-[120px] max-w-full bg-gradient-radial from-purple-200 via-purple-100 to-purple-50  m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto">
            {charactersWith6Matches &&
              charactersWith6Matches.map((character) => (
                <div key={character} onClick= {() => {
                  newArraySuggestion(character)
                  props.handleNewDetails(character);
                }}>
                  <SingleCard characterId={character[0]} characterThumb = {character[1]} characterArt = {character[2]} characterType={character[3]} characterRarity={character[4]}/>
                </div>
              ))}
          </div>
          <h3>Characters with 5 Links:</h3>
          <div className="grid grid-cols-5 max-w-full h-[120px] bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto">
            {charactersWith5Matches &&
              charactersWith5Matches.map((character) => (
                <div key={character} onClick= {() => {
                  newArraySuggestion(character)
                  props.handleNewDetails(character);
                  //console.log(character)
                }}>
                  <SingleCard characterId={character[0]} characterThumb = {character[1]} characterArt = {character[2]} characterType={character[3]} characterRarity={character[4]}/>
                </div>
              ))}
          </div>
          <h3>Characters with 4 Links:</h3>
          <div className="grid grid-cols-5 max-w-full h-[120px] bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto">
            {charactersWith4Matches &&
              charactersWith4Matches.map((character) => (
                <div key={character} onClick= {() => {
                  newArraySuggestion(character)
                  props.handleNewDetails(character);
                }}>
                  <SingleCard characterId={character[0]} characterThumb = {character[1]} characterArt = {character[2]} characterType={character[3]} characterRarity={character[4]}/>
                </div>
              ))}
          </div>
          <h3>Characters with 3 Links:</h3>
          <div className="grid grid-cols-5 max-w-full h-[120px] bg-gradient-radial from-purple-200 via-purple-100 to-purple-50  m-1 p-2 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] border-2 border-slate-900 overflow-auto">
            {charactersWith3Matches &&
              charactersWith3Matches.map((character) => (
                <div key={character} onClick= {() => {
                  newArraySuggestion(character)
                  props.handleNewDetails(character);
                }}>
                  <SingleCard characterId={character[0]} characterThumb = {character[1]} characterArt = {character[2]} characterType={character[3]} characterRarity={character[4]}/>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestToWeb;
