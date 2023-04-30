import React, { useState, useEffect, useMemo } from 'react'

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { GET_CHARACTER_WIKI_LINK } from "../util/queries";

import getCharacterInfo from '../util/grabCharacterInfo';

export default function SingleCharacterSearch({ selectedCharacterId }) {
  const [newCharacterInput, setNewCharacterInput] = useState('')
  const [characterClean, setCharacterClean] = useState({
    id: '',
    wiki_link: '',
    thumb: '',
    art: '',
    title: '',
    name: '',
    rarity: '',
    type: '',
    cost: '',
    ls_description: '',
    ls_description_eza: '',
    sa_type: '',
    sa_name: '',
    sa_description: '',
    sa_description_eza: '',
    ultra_sa_type: '',
    ultra_sa_name: '',
    ultra_sa_description: '',
    ultra_sa_description_eza: '',
    ps_name: '',
    ps_description: '',
    ps_description_eza: '',
    sa_type_active: '',
    active_skill_name: '',
    active_skill: '',
    active_skill_condition: '',
    active_skill_condition_eza: '',
    transform_type: '',
    transform_condition: '',
    transform_condition_eza: '',
    link_skill: '',
    category: '',
    jp_date: '',
    glb_date: '',
    jp_date_eza: '',
    glb_date_eza: '',
})

    function handleNewCharacterSubmit (e) {
      e.preventDefault()
      console.log(newCharacterInput)
      setCharacterClean(getCharacterInfo(newCharacterInput))
    }

  return (
    <div className='flex flex-col w-full'>
        <p>CHARACTER INFO FROM WIKI</p>
        <form 
        onSubmit={(e) => handleNewCharacterSubmit(e)}
        className='w-full p-2'>
          <textarea
          className='w-full border border-black' 
          value={newCharacterInput}
          onChange={(e) => setNewCharacterInput(e.target.value)}
          rows={25}
          />
          <button>SUBMIT</button>
        </form>
        <form 
            className="w-full">
                <label className="flex p-2">
                id
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='id'
                  value={characterClean?.id}
                  />
                </label>
                <label className="flex p-2">
                  thumb
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='thumb'
                  value={characterClean?.thumb}
                  />
                </label>
                <label className="flex p-2">
                  art
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='art'
                  value={characterClean?.art}
                  />
                </label>
                <label className="flex p-2">
                  title
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='title'
                  value={characterClean?.title}
                  />
                </label>
                <label className="flex p-2">
                  name
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='name'
                  value={characterClean?.name}
                  />
                </label>
                <label className="flex p-2">
                  rarity
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='rarity'
                  value={characterClean?.rarity}
                  />
                </label>
                <label className="flex p-2">
                  type
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='type'
                  value={characterClean?.type}
                  />
                </label>
                <label className="flex p-2">
                  cost
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='cost'
                  value={characterClean?.cost}
                  />
                </label>
                <label className="flex p-2">
                  ls_description
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ls_description'
                  value={characterClean?.ls_description}
                  />
                </label>
                <label className="flex p-2">
                  ls_description_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ls_description_eza'
                  value={characterClean?.ls_description_eza}
                  />
                </label>
                <label className="flex p-2">
                  sa_type
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='sa_type'
                  value={characterClean?.sa_type}
                  />
                </label>
                <label className="flex p-2">
                  sa_name
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='sa_name'
                  value={characterClean?.sa_name}
                  />
                </label>
                <label className="flex p-2">
                  sa_description
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='sa_description'
                  value={characterClean?.sa_description}
                  />
                </label>
                <label className="flex p-2">
                  sa_description_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='sa_description_eza'
                  value={characterClean?.sa_description_eza}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_name
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ultra_sa_name'
                  value={characterClean?.ultra_sa_name}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_type
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ultra_sa_type'
                  value={characterClean?.ultra_sa_type}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_description
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ultra_sa_description'
                  value={characterClean?.ultra_sa_description}
                  />
                </label>
                <label className="flex p-2">
                  ultra_sa_description_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ultra_sa_description_eza'
                  value={characterClean?.ultra_sa_description_eza}
                  />
                </label>
                <label className="flex p-2">
                  ps_name
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ps_name'
                  value={characterClean?.ps_name}
                  />
                </label>
                <label className="flex p-2">
                  ps_description
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ps_description'
                  value={characterClean?.ps_description}
                  />
                </label>
                <label className="flex p-2">
                  ps_description_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='ps_description_eza'
                  value={characterClean?.ps_description_eza}
                  />
                </label>
                <label className="flex p-2">
                  sa_type_active
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='sa_type_active'
                  value={characterClean?.sa_type_active}
                  />
                </label>
                <label className="flex p-2">
                  active_skill_name
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='active_skill_name'
                  value={characterClean?.active_skill_name}
                  />
                </label>
                <label className="flex p-2">
                  active_skill
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='active_skill'
                  value={characterClean?.active_skill}
                  />
                </label>
                <label className="flex p-2">
                  active_skill_condition
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='active_skill_condition'
                  value={characterClean?.active_skill_condition}
                  />
                </label>
                <label className="flex p-2">
                  active_skill_condition_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='active_skill_condition_eza'
                  value={characterClean?.active_skill_condition_eza}
                  />
                </label>
                <label className="flex p-2">
                  transform_type
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='transform_type'
                  value={characterClean?.transform_type}
                  />
                </label>
                <label className="flex p-2">
                  transform_condition
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='transform_condition'
                  value={characterClean?.transform_condition}
                  />
                </label>
                <label className="flex p-2">
                  transform_condition_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='transform_condition_eza'
                  value={characterClean?.transform_condition_eza}
                  />
                </label>
                <label className="flex p-2">
                  link_skill
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='link_skill'
                  value={characterClean?.link_skill}
                  />
                </label>
                <label className="flex p-2">
                  category
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='category'
                  value={characterClean?.category}
                  />
                </label>
                <label className="flex p-2">
                  jp_date
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='jp_date'
                  value={characterClean?.jp_date}
                  />
                </label>
                <label className="flex p-2">
                  glb_date
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='glb_date'
                  value={characterClean?.glb_date}
                  />
                </label>
                <label className="flex p-2">
                  jp_date_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='jp_date_eza'
                  value={characterClean?.jp_date_eza}
                  />
                </label>
                <label className="flex p-2">
                  glb_date_eza
                  <textarea 
                  className="w-full h-fit p-1 border border-black"
                  type='readOnly'
                  placeholder='null'
                  name='glb_date_eza'
                  value={characterClean?.glb_date_eza}
                  />
                </label>
            </form>
    </div>
  )
}
