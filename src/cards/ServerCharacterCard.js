import React from 'react'

import {Cloudinary} from "@cloudinary/url-gen";

import {AdvancedImage, lazyload, accessibility, responsive, placeholder} from '@cloudinary/react';

const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";
const ezaIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/z.png";

const CharacterCard = ({ individualCharacter, mobileSize, desktopSize, EZA, leaderOrSubLeader }) => {
    const characterThumb = process.env.PUBLIC_URL + `/characterArt/${individualCharacter.id}.png`;
    const characterRarity = process.env.PUBLIC_URL + `/dokkanIcons/rarity/${individualCharacter.rarity.toLowerCase()}.png`;
    const characterTypeBackground = `/dokkanIcons/types/${individualCharacter.type.slice(1,4).toLowerCase()}-background.png`
    let characterTypeBadge = '';
    if (individualCharacter.jp_date && !individualCharacter.glb_date){
        characterTypeBadge = process.env.PUBLIC_URL + `/dokkanIcons/types/j${individualCharacter.type.toLowerCase()}.png`;
    } else {
        characterTypeBadge = process.env.PUBLIC_URL + `/dokkanIcons/types/${individualCharacter.type.toLowerCase()}.png`;
    }
    return (
            <div 
            className='flex w-fit justify-center items-center relative'>
                <img
                    src={characterThumb}
                    // loading='lazy'
                    className={`w-[${mobileSize}] card-sm:w-[${desktopSize}] bottom-[5%] bg-no-repeat relative z-40`}
                    alt={individualCharacter.name}
                />
                {leaderOrSubLeader === 'leader' ? <img src={leaderIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
                {leaderOrSubLeader === 'subLeader' ? <img src={friendIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
                {EZA ? <img src={ezaIcon} className='w-[30%] bottom-[5%] right-[0%] absolute z-50'/> : null}
                <img
                    src={characterRarity}
                    // loading='lazy'
                    className={individualCharacter.rarity === "UR"
                        ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                        : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
                    }
                />
                <img
                    src={characterTypeBackground}
                    // loading='lazy'
                    className="w-[80%] card-sm:w-[81%] absolute top-[13%] z-0"
                />
                <img
                    src={characterTypeBadge}
                    // loading='lazy'
                    className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
                />
            </div>
    );
    }

export default CharacterCard;