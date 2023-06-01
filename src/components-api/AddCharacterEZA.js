import React, { useState, useEffect, useMemo } from "react";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { ADD_EZA_TO_CHARACTER } from "../util/mutations";

import getCharacterInfo from "../util/grabCharacterInfo";

export default function AddEZAtoCharacter({}) {
  const [addEZAtoCharacter, { error: addEZAtoCharacterError, data: addEZAtoCharacterData }] =
    useMutation(ADD_EZA_TO_CHARACTER);
  const [turnOnMutation, setTurnOnMutation] = useState(false);

  const [newCharacterInput, setNewCharacterInput] = useState("");
  const [characterClean, setCharacterClean] = useState({
    id: "",
    wiki_link: "",
    thumb: "",
    art: "",
    title: "",
    name: "",
    rarity: "",
    type: "",
    cost: "",
    ls_description: "",
    ls_description_eza: "",
    sa_type: "",
    sa_name: "",
    sa_description: "",
    sa_description_eza: "",
    ultra_sa_type: "",
    ultra_sa_name: "",
    ultra_sa_description: "",
    ultra_sa_description_eza: "",
    ps_name: "",
    ps_description: "",
    ps_description_eza: "",
    sa_type_active: "",
    active_skill_name: "",
    active_skill: "",
    active_skill_condition: "",
    active_skill_condition_eza: "",
    transform_type: "",
    transform_condition: "",
    transform_condition_eza: "",
    link_skill: "",
    category: "",
    jp_date: "",
    glb_date: "",
    jp_date_eza: "",
    glb_date_eza: "",
  });

  function characterFormChange(e) {
    e.preventDefault();
    console.log(newCharacterInput);
    setCharacterClean(getCharacterInfo(newCharacterInput));
  }

  function handleCharacterInputChange(e) {
    let value = e.target.value;
    if (value === "") {
      value = null;
    }
    setCharacterClean({
      ...characterClean,
      [e.target.name]: value,
    });
  }

  async function handleaddEZAtoCharacter(e) {
    e.preventDefault();
    // Convert the required values to integers
    const formattedCharacter = {
      ...characterClean,
      id: parseInt(characterClean.id) || null,
    };

    console.log(formattedCharacter.id);
    console.log(formattedCharacter.ls_description_eza);
    console.log(formattedCharacter.ps_description_eza);
    console.log(formattedCharacter.sa_description_eza);
    console.log(formattedCharacter.ultra_sa_description_eza);
    console.log(formattedCharacter.transform_condition_eza);
    console.log(formattedCharacter.active_skill_condition_eza);
    console.log(formattedCharacter.jp_date_eza);
    console.log(formattedCharacter.glb_date_eza);
    console.log("---------------");

    turnOnMutation
      ? await addEZAtoCharacter({
          variables: {
            formattedCharacter
          },
        })
          .then((results) => {
            console.log(results);
          })
          .catch((error) => {
            console.log(error);
          })
      : console.log("mutation is off");
  }

  return (
    <div className="flex flex-col w-full">
      <p>CHARACTER INFO FROM WIKI</p>
      <form onChange={(e) => characterFormChange(e)} className="w-full p-2">
        <textarea
          className="w-full border border-black"
          value={newCharacterInput}
          onChange={(e) => setNewCharacterInput(e.target.value)}
          rows={25}
        />
      </form>
      <form onSubmit={(e) => handleaddEZAtoCharacter(e)} className="w-full">
        <label className="flex p-2">
          id
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="id"
            value={characterClean?.id}
            required
          />
        </label>
        <label className="flex p-2">
          ls_description
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ls_description"
            value={characterClean?.ls_description}
          />
        </label>
        <label className="flex p-2">
          ls_description_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ls_description_eza"
            value={characterClean?.ls_description_eza}
          />
        </label>
        <label className="flex p-2">
          sa_description
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="sa_description"
            value={characterClean?.sa_description}
          />
        </label>
        <label className="flex p-2">
          sa_description_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="sa_description_eza"
            value={characterClean?.sa_description_eza}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_description
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ultra_sa_description"
            value={characterClean?.ultra_sa_description}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_description_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ultra_sa_description_eza"
            value={characterClean?.ultra_sa_description_eza}
          />
        </label>
        <label className="flex p-2">
          ps_description
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ps_description"
            value={characterClean?.ps_description}
          />
        </label>
        <label className="flex p-2">
          ps_description_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ps_description_eza"
            value={characterClean?.ps_description_eza}
          />
        </label>
        <label className="flex p-2">
          active_skill_condition
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="active_skill_condition"
            value={characterClean?.active_skill_condition}
          />
        </label>
        <label className="flex p-2">
          active_skill_condition_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="active_skill_condition_eza"
            value={characterClean?.active_skill_condition_eza}
          />
        </label>
        <label className="flex p-2">
          transform_condition
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="transform_condition"
            value={characterClean?.transform_condition}
          />
        </label>
        <label className="flex p-2">
          transform_condition_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="transform_condition_eza"
            value={characterClean?.transform_condition_eza}
          />
        </label>
        <label className="flex p-2">
          jp_date
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="jp_date"
            value={characterClean?.jp_date}
          />
        </label>
        <label className="flex p-2">
          glb_date
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="glb_date"
            value={characterClean?.glb_date}
          />
        </label>
        <label className="flex p-2">
          jp_date_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="jp_date_eza"
            value={characterClean?.jp_date_eza}
          />
        </label>
        <label className="flex p-2">
          glb_date_eza
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="glb_date_eza"
            value={characterClean?.glb_date_eza}
          />
        </label>
        <button className="w-full my-2 bg-orange-200 border-2 border-black">SUBMIT</button>
      </form>
      <button
        onClick={() => setTurnOnMutation(!turnOnMutation)}
        className={`p-5 ${turnOnMutation ? "bg-green-400" : "bg-red-200"}`}
      >
        {turnOnMutation
          ? "MUTATION IS CURRENTLY ON"
          : "MUTATION IS CURRENTLY OFF"}
      </button>
    </div>
  );
}
