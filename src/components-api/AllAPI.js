import React, { useState, useEffect, useRef } from "react";
import Auth from "../util/auth";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CHARACTERS, GET_EVENT_DATA, GET_ITEMS_DATA, GET_SUPPORT_MEMORY_DATA } from "../util/queries";
import {  } from "../util/mutations";


import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";

function AllAPI() {
    const initialForm = useRef(null);

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


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(initialForm?.current);
        // console.log(formData)
        const formObject = Object.fromEntries(formData);
        // console.log(formObject)
    }

    // useEffect(() => {
    //   console.log('')
    //   getCharacterData()
    // },[])

  return (
    <div>
        <form ref={initialForm} onSubmit={handleSubmit}>
            What would you like to do?
            <label htmlFor='selectAPIChange' className="flex flex-col card-sm:flex-row w-full pt-4 pb-2 justify-center items-center font-bold">

                <select className="flex w-full card-sm:w-fit font-base text-base truncate border-2 border-black" 
                name='selectAPIChange' 
                id="selectAPIChange">
                    <option value=''>Nothing</option>
                    <option value='Add Character' >Add Character</option>
                    <option value=''>Edit Character</option>
                    <option value=''>Add stage</option>
                    <option value=''>Edit stage</option>
                </select>
            </label>
            <button type='submit' className="flex w-fit p-2 mt-4 justify-center border-4 border-black text-2xl font-bold items-center text-center bg-orange-400 hover:bg-orange-500 transition ease-in-out">Submit</button>
            {/* {formToShow === 'Add Character' &&
            <div>Add Character</div>
            } */}
        </form>
    </div>
)}

export default AllAPI;
