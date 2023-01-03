import React, { useState, useEffect, useRef } from "react";

function SingleCard(props) {
  let characterId = props.characterId;
  let prevCharacterId = useRef(characterId);
  let characterLinks = props.link_skill;

  const [characterThumb, setCharacterThumb] = useState([]);
  const [characterRarity, setCharacterRarity] = useState('');
  const [characterRarityPosition, setCharacterRarityPosition] = useState('');

  const [characterType, setCharacterType] = useState('');
  const [characterSuperOrExtreme, setCharacterSuperOrExtreme] = useState('');



  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    // Run the query and update the "data" state.
    if (props.characterThumb === null) {
      setCharacterThumb(props.characterArt);
    } else {
      setCharacterThumb(props.characterThumb);
    }

    if (props.characterRarity === 'UR' || props.characterRarity === 'UR '){
      setCharacterRarityPosition('h-[28px] absolute top-[80px] right-[68px] z-50')
      setCharacterRarity('/dokkanIcons/rarities/UR.png')
    }else{
      setCharacterRarityPosition('h-[35px] absolute top-[72px] right-[70px] z-50')
      setCharacterRarity('/dokkanIcons/rarities/LR.png')
    }

    if (props.characterType === 'EPHY' || props.characterType === 'EPHY ' || props.characterType === 'PHY-E'){
      setCharacterType('/dokkanIcons/types/phy-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/ephy.png')
    } else if (props.characterType === 'SPHY' || props.characterType === 'SPHY ' || props.characterType === 'PHY-S'){
      setCharacterType('/dokkanIcons/types/phy-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/sphy.png')
    } else if (props.characterType === 'EAGL' || props.characterType === 'SPHY ' || props.characterType === 'AGL-E'){
      setCharacterType('/dokkanIcons/types/agl-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/eagl.png')
    } else if (props.characterType === 'SAGL' || props.characterType === 'SAGL ' || props.characterType === 'AGL-S'){
      setCharacterType('/dokkanIcons/types/agl-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/sagl.png')
    } else if (props.characterType === 'ESTR' || props.characterType === 'ESTR ' || props.characterType === 'STR-E'){
      setCharacterType('/dokkanIcons/types/str-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/estr.png')
    } else if (props.characterType === 'SSTR' || props.characterType === 'SSTR ' || props.characterType === 'STR-S'){
      setCharacterType('/dokkanIcons/types/str-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/sstr.png')
    } else if (props.characterType === 'EINT' || props.characterType === 'EINT ' || props.characterType === 'INT-E'){
      setCharacterType('/dokkanIcons/types/int-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/eint.png')
    } else if (props.characterType === 'SINT' || props.characterType === 'SINT ' || props.characterType === 'INT-S'){
      setCharacterType('/dokkanIcons/types/int-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/sint.png')
    } else if (props.characterType === 'ETEQ' || props.characterType === 'ETEQ ' || props.characterType === 'PHY-E'){
      setCharacterType('/dokkanIcons/types/teq-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/eteq.png')
    } else if (props.characterType === 'STEQ' || props.characterType === 'STEQ ' || props.characterType === 'TEQ-S'){
      setCharacterType('/dokkanIcons/types/teq-background.png')
      setCharacterSuperOrExtreme('/dokkanIcons/types/steq.png')
    } 
    // Update the "prevCharacter" variable with the current props
    prevCharacterId = characterId;
  }, []);

  return (
    <div className="w-[120px] h-[120px] relative">
      <div
        onClick={() => {}}
        //TODO: old styling
        // className="h-20 md:h-28 lg:h-20 w-20 md:w-28 lg:w-20 m-2 gap-4 bg-no-repeat"
        className="h-[100px] w-[100px] m-2 gap-4 bg-no-repeat absolute right-[8px] top-[-1px] z-10"
        style={{
          backgroundImage: `url("https://dokkan.wiki/assets/global/en/character/thumb/card_${characterThumb}_thumb.png")`,
          backgroundSize: `100%`,
        }}
      >
      </div>
      <img src={characterRarity} className={characterRarityPosition}/>
      <img className="w-[80px] absolute top-[20px] right-[25px] z-0" src={characterType}/>
      <img className="w-[40px] h-[40px] absolute top-[6px] right-[11px] z-50" src={characterSuperOrExtreme}/>
    </div>
  );
}

export default SingleCard;
