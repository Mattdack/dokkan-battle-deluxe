import React, { useState, useEffect, useRef } from "react";
import Auth from "../util/auth";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CHARACTERS, GET_EVENT_DATA, GET_ITEMS_DATA, GET_SUPPORT_MEMORY_DATA } from "../util/queries";
import {  } from "../util/mutations";

import CharacterCard from "../cards/CharacterCard";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";

function AllAPI() {
    const initialForm = useRef(null);
    const [initialOption, setInitialOption] = useState('')

    const [getCharacterData, { loading: allCharactersLoading, data: allCharactersData }] = useLazyQuery (QUERY_CHARACTERS, {
        onCompleted: (data) => {
            if(data){
                // console.log('character data run query run')
                setAllCharacters(data.characters)
            }
        },
    });
    const [allCharacters, setAllCharacters] = useState([])
    // console.log(allCharacters)

    const characterDictionary = Object.fromEntries(
      allCharacters.map((characterObj) => [characterObj.id, characterObj])
    )
    // console.log(characterDictionary)

    const [getEventData, { loading: allEventsLoading, data: allEventsData }] = useLazyQuery(GET_EVENT_DATA, {
        onCompleted: (data) => {
            if(data){
                // console.log('event query run')
                // setAllEvents(data.allEventsStagesTeams)
            }
        },
    });

    const [getItemData, { loading: allItemsLoading, data: allItemsData }] = useLazyQuery(GET_ITEMS_DATA);

    const [getMemoryData, { loading: allSupportMemoryoading, data: allSupperMemoryData }] = useLazyQuery(GET_SUPPORT_MEMORY_DATA);

    const handleSelection = (e) => {
        console.log(e.target.value)
        if(e.target.value === 'Edit Character'){
            console.log('we are in the edit character')
        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData(initialForm?.current);
    //     // console.log(formData)
    //     const formObject = Object.fromEntries(formData);
    //     console.log(formObject)
    // }

  return (
    <div className="flex flex-col w-1/3 border-2 border-black bg-gray-500">
        <div>
            What would you like to do?
            <label htmlFor='selectAPIChange' className="flex flex-col card-sm:flex-row w-full pt-4 pb-2 justify-center items-center font-bold">

                <select className="flex w-full card-sm:w-fit font-base text-base truncate border-2 border-black" 
                name='selectAPIChange' 
                id="selectAPIChange"
                onChange={(e) => handleSelection(e)}
                >
                    <option value=''>Nothing</option>
                    <option value='Add Character' >Add Character</option>
                    <option value='Edit Character'>Edit Character</option>
                    <option value='New Category Added'>New Category Added</option>
                    <option value='Add Event'>Add event</option>
                    <option value='Edit Event'>Edit event</option>
                    <option value='Add Stage'>Add stage</option>
                    <option value='Edit Stage'>Edit stage</option>
                </select>
            </label>
        </div>

        {initialOption === 'Edit Character' && 
            <div className="w-full bg-blue-500">
                <div 
                className="flex flex-wrap justify-center items-center p-1 mx-1 mb-14 card-sm:mb-16 lg:mx-2 lg:mt-3 lg:mb-6 border-2 border-slate-900 overflow-y-auto bg-orange-100">
                {allCharactersLoading ? (<div>Loading...</div>) 
                : allCharacters
                    .filter((character) => character.glb_date !== null)
                    .map((character) => (
                        <div
                        key={character.id}
                        onClick={() => {
                            
                        }}
                        >
                        <CharacterCard
                            individualCharacter={character}
                        />
                        </div>
                    ))}
                {/* {(viewableCharacters < charactersToDisplay.length) && 
                <div className="flex w-full justify-center items-center">
                    <button 
                    onClick={() => setViewableCharacters(viewableCharacters + 50)}
                    className="flex w-[70%] p-2 m-2 justify-center items-center text-mg lg:text-2xl font-bold bg-orange-300 border-2 border-black">
                        Load More Characters
                    </button>
                </div>
                } */}
                </div>
            </div>
        }
    </div>
)}

export default AllAPI;
