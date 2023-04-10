// import React, { useState, useRef, useEffect, useMemo} from 'react'

// import {AdvancedImage, lazyload} from '@cloudinary/react';
// import {CloudinaryImage} from "@cloudinary/url-gen";
// import {URLConfig} from "@cloudinary/url-gen";
// import {CloudConfig} from "@cloudinary/url-gen";

// const leaderIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/leader-icon.png";
// const friendIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/friend-icon.png";
// const ezaIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/z.png";

// const ServerSideCharacterCard = ({ webOfTeam, individualCharacter, EZA, leaderOrSubLeader }) => {
//     const isInWeb = useMemo(() => webOfTeam.map((char) => char.id).includes(individualCharacter.id), [webOfTeam, individualCharacter.id]);

//     const isInSelectedDeck = useMemo(() => {
//       return deckTeams.flatMap((team) => team.individualCharacter.map((char) => char.id)).includes(individualCharacter.id);
//     }, [deckTeams, individualCharacter.id]);
  
//     //logic for card click...allows for div to close when click outside of card is made
//     const [isCardClicked, setIsCardClicked] = useState(false);
//     const ref = useRef(null);
  
//     const handleCardClick = (individualCharacter) => {
//       newCardDetails(individualCharacter.id)
//       setIsCardClicked(!isCardClicked);
//     };
  
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setIsCardClicked(false);
//       }
//     };
//     // this allows for an out of click from the suggestion card to bring it back to the regular card
//     useEffect(() => {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [ref]);

//     // Set the Cloud configuration and URL configuration
//     let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
//     let urlConfig = new URLConfig({secure: true});
//     let characterThumb = new CloudinaryImage(`Character Thumb/${individualCharacter.id}`, cloudConfig, urlConfig);
//     let characterRarity = new CloudinaryImage(`rarities-types/${individualCharacter.rarity}`, cloudConfig, urlConfig);
//     let characterTypeBadge = new CloudinaryImage(`rarities-types/${individualCharacter.type.toLowerCase()}`, cloudConfig, urlConfig);
//     let characterTypeBackground = new CloudinaryImage(`rarities-types/${individualCharacter.type.slice(1,4).toLowerCase()}-background`, cloudConfig, urlConfig);

//     return (
//             <div 
//             ref={ref}
//             className='flex w-fit justify-center items-center relative'>
//             <AdvancedImage
//                 className="w-[60px] card-sm:w-[95px] bottom-[5%] bg-no-repeat relative z-40"
//                 cldImg={characterThumb}
//                 alt={individualCharacter.name}
//             />
//             {leaderOrSubLeader === 'leader' ? <img src={leaderIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
//             {leaderOrSubLeader === 'subLeader' ? <img src={friendIcon} className='w-[80%] -top-[2%] right-[33%] absolute z-50'/> : null}
//             {EZA ? <img src={ezaIcon} className='w-[30%] bottom-[5%] right-[0%] absolute z-50'/> : null}
//             <AdvancedImage
//                 cldImg={characterRarity}
//                 className={individualCharacter.rarity === "UR"
//                     ? "h-[26.67%] card-sm:h-[27%] absolute bottom-[6%] card-sm:bottom-[6%] left-[-2%] card-sm:left-[-5%] z-50"
//                     : "h-[31.67%] card-sm:h-[32%] absolute bottom-[6%] card-sm:bottom-[5%] left-[0%] card-sm:left-[-1%] z-50"
//                 }
//             />
//             <AdvancedImage
//                 className="w-[80%] card-sm:w-[81%] absolute top-[13%] z-0"
//                 cldImg={characterTypeBackground}
//             />
//             <AdvancedImage
//                 className="w-[40%] card-sm:w-[40%] absolute top-[0%] card-sm:top-[0%] right-[-1%] card-sm:right-[-2%] z-50"
//                 cldImg={characterTypeBadge}
//             />
//             </div>
//     );
//     }

// export default ServerSideCharacterCard;