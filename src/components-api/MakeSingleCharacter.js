import React, { useState, useEffect, useMemo } from "react";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { ADD_CHARACTER } from "../util/mutations";

import getCharacterInfo from "../util/grabCharacterInfo";

export default function MakeSingleCharacter({}) {
  const [addCharacter, { error: addCharacterError, data: addCharacterData }] =
    useMutation(ADD_CHARACTER);
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

  async function handleAddCharacter(e) {
    e.preventDefault();
    // Convert the required values to integers
    const formattedCharacter = {
      ...characterClean,
      id: parseInt(characterClean.id) || null,
      art: parseInt(characterClean.art) || null,
      thumb: parseInt(characterClean.thumb),
      cost: parseInt(characterClean.cost),
      link_skill: characterClean.link_skill.split(","),
      category: characterClean.category.split(","),
    };

    console.log(formattedCharacter);
    console.log(formattedCharacter.link_skill);
    console.log(formattedCharacter.category);
    console.log("---------------");

    turnOnMutation
      ? await addCharacter({
          variables: {
            character: {
              wiki_link: formattedCharacter?.wiki_link,
              id: formattedCharacter?.id,
              thumb: formattedCharacter?.thumb,
              art: formattedCharacter?.art,
              name: formattedCharacter?.name,
              title: formattedCharacter?.title,
              rarity: formattedCharacter?.rarity,
              type: formattedCharacter?.type,
              cost: formattedCharacter?.cost,
              ls_description: formattedCharacter?.ls_description,
              ls_description_eza: formattedCharacter?.ls_description_eza,
              sa_type: formattedCharacter?.sa_type,
              sa_name: formattedCharacter?.sa_name,
              sa_description: formattedCharacter?.sa_description,
              sa_description_eza: formattedCharacter?.sa_description_eza,
              ultra_sa_type: formattedCharacter?.ultra_sa_type,
              ultra_sa_name: formattedCharacter?.ultra_sa_name,
              ultra_sa_description: formattedCharacter?.ultra_sa_description,
              ultra_sa_description_eza: formattedCharacter?.ultra_sa_description_eza,
              ps_name: formattedCharacter?.ps_name,
              ps_description: formattedCharacter?.ps_description,
              ps_description_eza: formattedCharacter?.ps_description_eza,
              sa_type_active: formattedCharacter?.sa_type_active,
              active_skill_name: formattedCharacter?.active_skill_name,
              active_skill: formattedCharacter?.active_skill,
              active_skill_condition: formattedCharacter?.active_skill_condition,
              active_skill_condition_eza: formattedCharacter?.active_skill_condition_eza,
              transform_type: formattedCharacter?.transform_type,
              transform_condition: formattedCharacter?.transform_condition,
              transform_condition_eza: formattedCharacter?.transform_condition_eza,
              link_skill: formattedCharacter?.link_skill,
              category: formattedCharacter?.category,
              jp_date: formattedCharacter?.jp_date,
              glb_date: formattedCharacter?.glb_date,
              jp_date_eza: formattedCharacter?.jp_date_eza,
              glb_date_eza: formattedCharacter?.glb_date_eza,
            },
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
      <form onSubmit={(e) => handleAddCharacter(e)} className="w-full">
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
          wiki_link
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="wiki_link"
            value={characterClean?.wiki_link}
            required
          />
        </label>
        <label className="flex p-2">
          thumb
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="thumb"
            value={characterClean?.thumb}
          />
        </label>
        <label className="flex p-2">
          art
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="art"
            value={characterClean?.art}
          />
        </label>
        <label className="flex p-2">
          title
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="title"
            value={characterClean?.title}
          />
        </label>
        <label className="flex p-2">
          name
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="name"
            value={characterClean?.name}
          />
        </label>
        <label className="flex p-2">
          rarity
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="rarity"
            value={characterClean?.rarity}
          />
        </label>
        <label className="flex p-2">
          type
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="type"
            value={characterClean?.type}
          />
        </label>
        <label className="flex p-2">
          cost
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="cost"
            value={characterClean?.cost}
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
          sa_type
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="sa_type"
            value={characterClean?.sa_type}
          />
        </label>
        <label className="flex p-2">
          sa_name
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="sa_name"
            value={characterClean?.sa_name}
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
          ultra_sa_name
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ultra_sa_name"
            value={characterClean?.ultra_sa_name}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_type
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ultra_sa_type"
            value={characterClean?.ultra_sa_type}
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
          ps_name
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="ps_name"
            value={characterClean?.ps_name}
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
          sa_type_active
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="sa_type_active"
            value={characterClean?.sa_type_active}
          />
        </label>
        <label className="flex p-2">
          active_skill_name
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="active_skill_name"
            value={characterClean?.active_skill_name}
          />
        </label>
        <label className="flex p-2">
          active_skill
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="active_skill"
            value={characterClean?.active_skill}
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
          transform_type
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="transform_type"
            value={characterClean?.transform_type}
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
          link_skill
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="link_skill"
            value={characterClean?.link_skill}
          />
        </label>
        <label className="flex p-2">
          category
          <textarea
            className="w-full h-fit p-1 border border-black"
            placeholder="null"
            onChange={(e) => handleCharacterInputChange(e)}
            name="category"
            value={characterClean?.category}
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
