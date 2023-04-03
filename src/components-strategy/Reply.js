import React, { useState } from 'react'

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

const trashIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/trash-icon.png";

export default function Reply({ characterDictionary, reply, comment, profileData, handleRemoveReply }) {
  const [showDeleteReplyToolTip, setShowDeleteReplyToolTip] = useState(false)
  
  return (
    <div key={reply._id} className='p-2 pl-6 mt-4 border-l-4 border-gray-500'>
    <span className="flex justify-between">
      <div className='flex flex-row'>
        <p className="pr-4">{reply.creator.username.replace(/(.+)@.+\..+/, "$1")}</p>
        <div>|</div>
        <p className="pl-4">{new Date(parseInt(reply.createdAt)).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</p>
      </div>

      {profileData?.data?._id === reply.creator._id &&
      <div className="relative">
        <img src={trashIcon} 
        onClick={() => handleRemoveReply(comment, reply)}
        onMouseEnter={() => setShowDeleteReplyToolTip(true)}
        onMouseLeave={() => setShowDeleteReplyToolTip(false)} 
        className="w-8 h-8 p-1 mb-1 mr-1 hover:bg-gray-500/[.75] transition ease-in-out rounded-lg z-50 cursor-pointer relative z-[1000]"/>
        <div className={`absolute bottom-[110%] left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white rounded-lg text-center ${showDeleteReplyToolTip ? 'opacity-100 z-[1000]' : 'opacity-0 z-0'} transition-opacity`}>
          delete this reply
        </div>
      </div>
      }
    </span>
    <p className="my-2">{reply.content}</p>
    {reply.selectedCharacters && reply.selectedCharacters.length > 0 &&
      <div className="flex flex-wrap w-fit p-2 border-2 border-black justify-center">
        <p className="w-full text-center text-lg font-bold underline decoration-2">Characters Suggested</p>
        {reply.selectedCharacters.map(singleCharacter => 
          <div>
            <CharacterCard individualCharacter={characterDictionary[singleCharacter]}/>
          </div>
        )}
      </div>
    }
  </div>  
  )
}


const CharacterCard = ({individualCharacter}) => {
    // Set the Cloud configuration and URL configuration
    let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
  
    let urlConfig = new URLConfig({secure: true});
    // Instantiate and configure a CloudinaryImage object.
    let characterThumb = new CloudinaryImage(`Character Thumb/${individualCharacter.id}`, cloudConfig, urlConfig);
    let characterRarity = new CloudinaryImage(`rarities-types/${individualCharacter.rarity}`, cloudConfig, urlConfig);
    let characterTypeBadge = new CloudinaryImage(`rarities-types/${individualCharacter.type.toLowerCase()}`, cloudConfig, urlConfig);
    let characterTypeBackground = new CloudinaryImage(`rarities-types/${individualCharacter.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);
   
    return (
      <>
          <div className='w-fit relative'>
            <AdvancedImage
              className="h-[60px] card-sm:h-[75px] w-[60px] card-sm:w-[75px] bg-no-repeat relative z-50 top-[1%] card-sm:top-[.5%] right-[0%] card-sm:right-[0%] z-40"
              cldImg={characterThumb}
              alt={individualCharacter.name}
              // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
              />
            <AdvancedImage
              cldImg={characterRarity}
              className={individualCharacter.rarity === "UR"
                  ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
                  : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
              }
              // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
            <AdvancedImage
              className="w-[80%] card-sm:w-[83%] absolute top-[14%] card-sm:top-[11.5%] right-[12%] card-sm:right-[8%] z-0"
              cldImg={characterTypeBackground}
              // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
            <AdvancedImage
              className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-6%] z-50"
              cldImg={characterTypeBadge}
              // plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.05})]}
            />
          </div>
      </>
    );
  }