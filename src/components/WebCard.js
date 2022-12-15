import React, { useState, useEffect, useRef, memo } from "react";

function WebCard({ data }) {

  let prevCharacterId = useRef(data.characterId);

  const [characterThumb, setCharacterThumb] = useState([]);
  const [characterRarity, setCharacterRarity] = useState('');
  const [characterRarityPosition, setCharacterRarityPosition] = useState('');

  const [characterType, setCharacterType] = useState('');
  const [characterSuperOrExtreme, setCharacterSuperOrExtreme] = useState('');

  useEffect(() => {
    // Only run the query if the "characterId" value changes.
    // Run the query and update the "data" state.
    if (data.characterThumb === null) {
      setCharacterThumb(data.characterArt);
    } else {
      setCharacterThumb(data.characterThumb);
    }

    if (data.characterRarity === 'UR' || data.characterRarity === 'UR '){
      setCharacterRarityPosition('h-[28px] absolute top-[80px] right-[68px] z-50')
      setCharacterRarity(process.env.PUBLIC_URL + '/dokkanIcons/rarities/UR.png')
    }else{
      setCharacterRarityPosition('h-[35px] absolute top-[72px] right-[70px] z-50')
      setCharacterRarity(process.env.PUBLIC_URL + '/dokkanIcons/rarities/LR.png')
    }

    if (data.characterType === 'EPHY' || data.characterType === 'EPHY ' || data.characterType === 'PHY-E'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/phy-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/ephy.png')
    } else if (data.characterType === 'SPHY' || data.characterType === 'SPHY ' || data.characterType === 'PHY-S'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/phy-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/sphy.png')
    } else if (data.characterType === 'EAGL' || data.characterType === 'SPHY ' || data.characterType === 'AGL-E'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/agl-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/eagl.png')
    } else if (data.characterType === 'SAGL' || data.characterType === 'SAGL ' || data.characterType === 'AGL-S'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/agl-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/sagl.png')
    } else if (data.characterType === 'ESTR' || data.characterType === 'ESTR ' || data.characterType === 'STR-E'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/str-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/estr.png')
    } else if (data.characterType === 'SSTR' || data.characterType === 'SSTR ' || data.characterType === 'STR-S'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/str-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/sstr.png')
    } else if (data.characterType === 'EINT' || data.characterType === 'EINT ' || data.characterType === 'INT-E'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/int-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/eint.png')
    } else if (data.characterType === 'SINT' || data.characterType === 'SINT ' || data.characterType === 'INT-S'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/int-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/sint.png')
    } else if (data.characterType === 'ETEQ' || data.characterType === 'ETEQ ' || data.characterType === 'PHY-E'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/teq-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/eteq.png')
    } else if (data.characterType === 'STEQ' || data.characterType === 'STEQ ' || data.characterType === 'TEQ-S'){
      setCharacterType(process.env.PUBLIC_URL + '/dokkanIcons/types/teq-background.png')
      setCharacterSuperOrExtreme(process.env.PUBLIC_URL + '/dokkanIcons/types/steq.png')
    } 
    // Update the "prevCharacter" variable with the current data
    prevCharacterId = data.characterId;
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

export default memo(WebCard);