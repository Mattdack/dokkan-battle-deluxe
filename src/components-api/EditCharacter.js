import React, { useState } from 'react'
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { EDIT_CHARACTER } from "../util/mutations";
import { update } from 'lodash';
import { updateEdge } from 'reactflow';


export default function EditCharacter({ characterForm, setCharacterForm }) {
    const [editCharacter,{ error: editCharacterError, data: editCharacterData }] = useMutation(EDIT_CHARACTER);
    const [turnOnMutation, setTurnOnMutation] = useState(false)
    
      function handleCharacterEditInputChange(e) {
        let value = e.target.value
        if (value === ''){
          value = null
        }
        setCharacterForm({
          ...characterForm,
          [e.target.name]: value,
        });
      }
      async function editCharacterSubmit(e) {
        e.preventDefault();
        // Check if any values are empty strings and replace them with null
        const updatedCharacter = {};
        Object.entries(characterForm).forEach(([key, value]) => {
          updatedCharacter[key] = value === '' ? null : value;
        });
        
        const formattedCharacter = {
          ...updatedCharacter,
          link_skill:updatedCharacter.link_skill.split(','),
          category: updatedCharacter.category.split(',')
        }

        console.log(formattedCharacter)
        console.log(formattedCharacter.link_skill)
        console.log(formattedCharacter.category)
        console.log('------------------')
        
        turnOnMutation ?
          await editCharacter({
            variables: {
              updatedCharacter: updatedCharacter,
            },
          })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          })
        :
          console.log('mutation is turned off')
      }
      

  return (
    <div className='flex flex-col w-full'>
      <form onSubmit={(e) => editCharacterSubmit(e)} className="w-full">
        <label className="flex p-2">
          id
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="id"
            value={characterForm?.id}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          wiki_link
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="wiki_link"
            required
            value={characterForm?.wiki_link}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          thumb
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="thumb"
            value={characterForm?.thumb}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          art
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="art"
            value={characterForm?.art}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          title
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="title"
            value={characterForm?.title}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          name
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="name"
            value={characterForm?.name}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          rarity
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="rarity"
            value={characterForm?.rarity}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          type
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="type"
            value={characterForm?.type}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          cost
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="cost"
            value={characterForm?.cost}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ls_description
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ls_description"
            value={characterForm?.ls_description}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ls_description_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ls_description_eza"
            value={characterForm?.ls_description_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          sa_type
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="sa_type"
            value={characterForm?.sa_type}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          sa_name
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="sa_name"
            value={characterForm?.sa_name}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          sa_description
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="sa_description"
            value={characterForm?.sa_description}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          sa_description_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="sa_description_eza"
            value={characterForm?.sa_description_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_name
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ultra_sa_name"
            value={characterForm?.ultra_sa_name}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_type
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ultra_sa_type"
            value={characterForm?.ultra_sa_type}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_description
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ultra_sa_description"
            value={characterForm?.ultra_sa_description}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ultra_sa_description_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ultra_sa_description_eza"
            value={characterForm?.ultra_sa_description_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ps_name
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ps_name"
            value={characterForm?.ps_name}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ps_description
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ps_description"
            value={characterForm?.ps_description}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          ps_description_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="ps_description_eza"
            value={characterForm?.ps_description_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          sa_type_active
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="sa_type_active"
            value={characterForm?.sa_type_active}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          active_skill_name
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="active_skill_name"
            value={characterForm?.active_skill_name}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          active_skill
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="active_skill"
            value={characterForm?.active_skill}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          active_skill_condition
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="active_skill_condition"
            value={characterForm?.active_skill_condition}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          active_skill_condition_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="active_skill_condition_eza"
            value={characterForm?.active_skill_condition_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          transform_type
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="transform_type"
            value={characterForm?.transform_type}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          transform_condition
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="transform_condition"
            value={characterForm?.transform_condition}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          transform_condition_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="transform_condition_eza"
            value={characterForm?.transform_condition_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          link_skill
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="link_skill"
            value={characterForm?.link_skill}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          category
          <textarea
            className="w-full p-1 border border-black"
            rows={6}
            placeholder="null"
            name="category"
            value={characterForm?.category}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          jp_date
          <textarea
            className="w-full p-1 border border-black"
            rows={1}
            placeholder="null"
            name="jp_date"
            value={characterForm?.jp_date}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          glb_date
          <textarea
            className="w-full p-1 border border-black"
            rows={1}
            placeholder="null"
            name="glb_date"
            value={characterForm?.glb_date}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          jp_date_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={1}
            placeholder="null"
            name="jp_date_eza"
            value={characterForm?.jp_date_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <label className="flex p-2">
          glb_date_eza
          <textarea
            className="w-full p-1 border border-black"
            rows={1}
            placeholder="null"
            name="glb_date_eza"
            value={characterForm?.glb_date_eza}
            onChange={(e) => handleCharacterEditInputChange(e)}
          />
        </label>
        <button
        className='w-full my-2 bg-orange-200 border-2 border-black'
        >SUBMIT</button>
      </form>
      <button 
      onClick={() => setTurnOnMutation(!turnOnMutation)}
      className={`p-5 ${turnOnMutation ? 'bg-green-400' : 'bg-red-200'}`}>{turnOnMutation ? 'MUTATION IS CURRENTLY ON' : 'MUTATION IS CURRENTLY OFF'}</button>
    </div>
  );
}