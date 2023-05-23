import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import CharacterCard from "../cards/CharacterCard";

import * as linkSkillInfo from "../util/linkSkillInfo";
import * as formatText from '../util/formatText'
import superAttackMultipliers from '../util/superAttackMultipliers'
import kiMultiplierPercentages from "../util/kiMultipliers";

import { UserContext } from "../App";

const closeIcon = process.env.PUBLIC_URL + '/dokkanIcons/icons/x-webcard-icon.png'
const swapIcon = process.env.PUBLIC_URL + '/dokkanIcons/icons/swap-icon.png'

export default function CalculatorDEF({ setShowCalculator, characterComparisonForCalculator, setCharacterComparisonForCalculator, handleCharacterComparisonSelection, setCardDetails}) {
    const { turnOnEZAStats, setTurnOnEZAStats, showDEFCalculator, setShowDEFCalculator } = useContext(UserContext)

    const [baseDefenseStat, setBaseDefenseStat] = useState(0)
    const [leaderSkillIncrease, setLeaderSkillIncrease] = useState(0)
    const [subLeaderSkillIncrease, setSubLeaderSkillIncrease] = useState(0)
    const [passiveSkillIncrease, setPassiveSkillIncrease] = useState(0)
    const [itemStats, setItemStats] = useState(0)
    const [passiveSkillOnAttackOrSuperOrActionIncrease, setPassiveSkillOnAttackOrSuperOrActionIncrease] = useState(0)
    const [linkSkillPercentage, setLinkSkillPercentage] = useState(0)
    const [noLinkAllyPassiveBoost, setNoLinkAllyPassiveBoost] = useState(0)
    const [kiCollected, setKiCollected] = useState(0)
    const [kiMultiplier, setKiMultiplier] = useState(0)
    const [superAttackHiddenPotentialBoostLevel, setSuperAttackHiddenPotentialBoostLevel] = useState(0)
    const [raiseDefenseOnSuper, setRaiseDefenseOnSuper] = useState(0)
    const [superAttackMultiplier, setSuperAttackMultiplier] = useState(0)
    const [results, setResults] = useState(0)
    
    const [boostAfterSuper, setBoostAfterSuper] = useState(0)
    const [numberOfSupers, setNumbersOfSupers] = useState(0)
    const [linkSkillsToFindSummation, setLinkSkillsToFindSummation] = useState([])

    const [levelOfLinks, setLevelOfLinks] = useState(1)

    const characterToCompare1 = characterComparisonForCalculator[0]?.link_skill
    const characterToCompare2 = characterComparisonForCalculator[1]?.link_skill

    const matchedLinks = characterComparisonForCalculator.length === 2 && (linkSkillInfo.findMatchingLinks(characterToCompare1, characterToCompare2)) || []

    let matchedLinkInfo = [];
    for (let i = 0; i < matchedLinks.length; i++) {
        matchedLinkInfo.push(linkSkillInfo.getLinkSkillInfoObject(matchedLinks[i]))
    }

    const level1LinkSkillsToFindSummation = matchedLinkInfo.map(singleLinkInfo => singleLinkInfo.lvl1)
    const level10LinkSkillsToFindSummation = matchedLinkInfo.map(singleLinkInfo => singleLinkInfo.lvl10)

    const summationLevel1LinkSkillStatsBoosted = linkSkillInfo.linkSkillStatBoosts(level1LinkSkillsToFindSummation)
    const summationLevel10LinkSkillStatsBoosted = linkSkillInfo.linkSkillStatBoosts(level10LinkSkillsToFindSummation)

    // set percentage gain by links to calculated stats when new characters are selected or level of links changes
    useEffect (() => {
        if(levelOfLinks === 1){
            setLinkSkillPercentage(summationLevel1LinkSkillStatsBoosted?.DEF?.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        } else {
            setLinkSkillPercentage(summationLevel10LinkSkillStatsBoosted?.DEF?.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        }
    },[characterComparisonForCalculator, levelOfLinks, setLevelOfLinks])

    //calculate SA multiplier based on super description....if LR or EZA then update stats
    useEffect (() => {
        let defenseGainedFromSuperAttack = null
        if (characterComparisonForCalculator[0]?.rarity === 'UR'){
            // calculate the attack gained from super
            defenseGainedFromSuperAttack = characterComparisonForCalculator[0]?.sa_description
        } else if (characterComparisonForCalculator[0]?.rarity === 'LR'){
            if ((kiCollected >= 12 && kiCollected < 16)){
                // calculate the attack gained from super
                if(turnOnEZAStats){
                    defenseGainedFromSuperAttack = characterComparisonForCalculator[0]?.sa_description_eza
                } else {
                    defenseGainedFromSuperAttack = characterComparisonForCalculator[0]?.sa_description
                }
            } else if ((kiCollected >= 16 && kiCollected < 25)){
                // calculate the attack gained from super
                if(turnOnEZAStats){
                    defenseGainedFromSuperAttack = characterComparisonForCalculator[0]?.ultra_sa_description_eza
                } else {
                    defenseGainedFromSuperAttack = characterComparisonForCalculator[0]?.ultra_sa_description
                }
            }
        }
        // setting the raise atk on super percentage to the found attack percentage in the exported function
        setRaiseDefenseOnSuper(formatText.findDefensePercentageGainAndTurns(defenseGainedFromSuperAttack)?.defensePercentage)

    },[characterComparisonForCalculator[0], turnOnEZAStats, kiCollected])

    // on character selection set Ki multiplier for UR/LR....no character then set everything to 0
    useEffect (() => {
        if(!characterComparisonForCalculator[0] || characterComparisonForCalculator[0]?.id === 0){
            setKiMultiplier(0)
            setBaseDefenseStat(0)
            setLeaderSkillIncrease(0)
            setSubLeaderSkillIncrease(0)
            setPassiveSkillIncrease(0)
            setItemStats(0)
            setNoLinkAllyPassiveBoost(0)
            setSuperAttackHiddenPotentialBoostLevel(0)
            setRaiseDefenseOnSuper(0)
        } else if(characterComparisonForCalculator[0]?.rarity === 'LR'){
            setKiCollected(24)
            handleKiCollected(24)
        } else {
            setKiMultiplier(characterComparisonForCalculator[0]?.Ki12)
        }
    },[characterComparisonForCalculator[0]])

    // when Ki collected is changed, set the Ki Multiplier to value, then set KiMultiplier to value in KiPercentages 
    const handleKiCollected = (value) => {
        if(value > 24){
            setKiCollected(24)
        } else if (value < 12){
            setKiCollected(12)
        } else{
            setKiCollected(value)
            const character12Ki = characterComparisonForCalculator[0]?.Ki12
            setKiMultiplier(kiMultiplierPercentages[character12Ki][value]*100)
        }
    }

    //handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('start')
        console.log('base DEF stat: ' + baseDefenseStat)

        let leaderSkillPlusBase = Math.round(baseDefenseStat * (1 + (leaderSkillIncrease/100) + (subLeaderSkillIncrease/100)))
        console.log('leader skill multiple used: ' + (1 + (leaderSkillIncrease/100) + (subLeaderSkillIncrease/100)))
        console.log('DEF stat after leader skill added: ' + leaderSkillPlusBase)
        console.log('')
        
        let passiveAndSupportCalc = Math.round(leaderSkillPlusBase * (1 + ((passiveSkillIncrease/100)+(noLinkAllyPassiveBoost/100))))
        console.log('passive skill + ally support multiple used: ' + (1 + (passiveSkillIncrease/100)))
        console.log('DEF stat after passive skill + ally support calculated: ' + passiveAndSupportCalc)
        console.log('')

        let buildUpPassiveCalc = Math.round(passiveAndSupportCalc * (1 + (passiveSkillOnAttackOrSuperOrActionIncrease/100)));
        console.log('build up passive skill multiple used: ' + (1 + (passiveSkillOnAttackOrSuperOrActionIncrease/100)))
        console.log('DEF stat after build up passive calculated: ' + buildUpPassiveCalc)
        console.log('')

        let itemCalc = Math.round(buildUpPassiveCalc * (1 + (itemStats/100)))
        console.log('item multiple used: ' + (1 + (itemStats/100)))
        console.log('DEF stat after item calculated: ' + itemCalc)
        console.log('')

        let linkSkillCalc = Math.round(itemCalc * (1 + (linkSkillPercentage/100)))
        console.log('linkskill multiple used: ' + (1 + (linkSkillPercentage/100)))
        console.log('DEF stat after link skills calculated: ' + linkSkillCalc)
        console.log('')

        let raiseDefenseOnSuperCalc = Math.round(linkSkillCalc * (1 + (raiseDefenseOnSuper/100)))
        console.log('raise defense on super multiple: ' + (1 + (raiseDefenseOnSuper/100)))
        console.log('DEF stat after allies active/passive calculated: ' + raiseDefenseOnSuperCalc)
        console.log('')

        // let kiMultiplierCalc = Math.round(noLinkAllyPassiveBoostCalc * (kiMultiplier/100))
        // console.log('Ki multiple used: ' + (kiMultiplier/100))
        // console.log('DEF stat after Ki multiplier calculated: ' + kiMultiplierCalc)
        // console.log('')

        // let saMultiplierCalc = Math.round(kiMultiplierCalc * ((superAttackMultiplier/100) + (superAttackHiddenPotentialBoostLevel * .05) + (raiseDefenseOnSuper/100)))
        // console.log(superAttackMultiplier)
        // console.log(superAttackHiddenPotentialBoostLevel)
        // console.log(raiseDefenseOnSuper)
        // console.log('super attack multiple used: ' + ((superAttackMultiplier/100) + (superAttackHiddenPotentialBoostLevel * .05) + (raiseDefenseOnSuper/100)))
        // console.log('DEF stat after super attack calculated: ' + saMultiplierCalc)

        setResults(raiseDefenseOnSuperCalc)
    }

  return (
    <div className='flex flex-col flex-1 px-2 border-2 border-black from-slate-500 via-slate-600 to-slate-900 overflow-y-auto'>
        {/* {window.innerWidth < 900 &&
            <div 
            onClick={() => setShowCalculator(false)}
            className='flex py-2 px-4 mt-2 w-full text-md font-bold justify-center items-center text-center cursor-pointer border-2 border-black bg-orange-200 hover:bg-orange-300'>Show Team Web</div>
        } */}
        <div className="flex p-2 flex-col justify-between items-center relative">
            <div className="flex flex-row flex-shrink-0 justify-center items-center">
                <div
                className="relative cursor-pointer"
                title='click for card details'
                onClick={() => setCardDetails(characterComparisonForCalculator[0])}>
                    {characterComparisonForCalculator[0] && characterComparisonForCalculator[0].id !== 0 &&
                    <>
                        <img 
                        src={closeIcon} 
                        title='remove character'
                        className="w-8 card-sm:w-10 h-8 card-sm:h-10 absolute -top-1 -left-1 z-[100] hover:z-[102]"
                        onClick={() => handleCharacterComparisonSelection(characterComparisonForCalculator[0])}
                        />
                        <div className='w-[20px] card-sm:w-[25px] h-[20px] card-sm:h-[25px] border-2 border-black rounded-full bg-green-500 absolute bottom-[5%] right-[7%] z-50'></div>
                    </>
                    }
                    {/* <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[99] hover:z-[101] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">Click for Card Details</div> */}
                    <CharacterCard individualCharacter={characterComparisonForCalculator[0] || {id:0, rarity:null, type:null}} mobileSize={'80px'} desktopSize={'100px'} EZA={characterComparisonForCalculator[0] && characterComparisonForCalculator[0]?.id !==0  && turnOnEZAStats}/>
                </div>
                    
                <img 
                src={swapIcon} 
                className="w-10 card-sm:w-12 h-10 card-sm:h-12 p-1 my-2 border-2 border-black rounded-lg bg-gray-200 cursor-pointer"
                onClick={() => setCharacterComparisonForCalculator([characterComparisonForCalculator[1], characterComparisonForCalculator[0]])}
                />

                <div
                className="relative cursor-pointer"
                title='click for card details'
                onClick={() => setCardDetails(characterComparisonForCalculator[1])}>
                    {characterComparisonForCalculator[1] && characterComparisonForCalculator[1].id !== 0 &&
                        <img 
                        src={closeIcon} 
                        title='remove character'
                        className="w-8 card-sm:w-10 h-8 card-sm:h-10 absolute -top-1 -left-1 z-[100] hover:z-[102]"
                        onClick={() => handleCharacterComparisonSelection(characterComparisonForCalculator[1])}
                        />
                    }
                    {/* <div className="flex w-full h-full bg-black/[.9] border-2 border-black text-white font-bold justify-center items-center text-center absolute top-0 left-0 z-[99] hover:z-[101] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">Click for Card Details</div> */}
                    <CharacterCard individualCharacter={characterComparisonForCalculator[1] || {id:0, rarity:null, type:null}} mobileSize={'80px'} desktopSize={'100px'}/>
                </div>
            </div>

            <div 
            className="flex flex-col w-[90%] h-full mt-2 border-2 border-black bg-white card-sm:justify-around z-40">
                <p className="font-header text-2xl lg:text-lg xl:text-2xl underline decoration-2 underline-offset-4 self-center">Link Skills Shared</p>
                <div className="h-1/2 lg:h-full lg:max-h-[225px] overflow-y-auto">
                    {matchedLinkInfo && matchedLinkInfo.map(singleLink =>
                    <div>
                        <span className="flex flex-row px-1 border-t-2 border-black">
                            <p className="pr-4 font-bold text-md lg:text-base">{singleLink.name}:</p>
                            <p className="text-md lg:text-base">{levelOfLinks === 1 ? singleLink.lvl1 : singleLink.lvl10}</p>
                        </span>
                    </div>
                    )}
                </div>
                <div className="flex md:flex-row lg:flex-col <1000px>:flex-row p-1 border-t-2 border-black justify-center items-center">
                    <p className="pr-4 font-bold">Total:</p>
                    <p className="pr-2">ATK:</p>
                    <p className="pr-4 text-base"> 
                    {levelOfLinks === 1 ?
                    summationLevel1LinkSkillStatsBoosted.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    :
                    summationLevel10LinkSkillStatsBoosted.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    }%
                    </p>
                    <p className="pr-2">DEF: </p>
                    <p className="pr-4 text-base">
                    {levelOfLinks === 1 ?
                    summationLevel1LinkSkillStatsBoosted.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    :
                    summationLevel10LinkSkillStatsBoosted.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    }%
                    </p>
                    <p className="pr-2">Ki: </p>
                    <p className="text-base"> 
                    {levelOfLinks === 1 ?
                    summationLevel1LinkSkillStatsBoosted.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    :
                    summationLevel10LinkSkillStatsBoosted.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    }
                    </p>
                </div>
            </div>

        </div>
        
        <div className="flex lg:flex-col xl:flex-row h-fit justify-around items-center">

            <label className="flex justify-center items-center font-bold">
            EZA:
            <input
                type="checkbox"
                defaultChecked={turnOnEZAStats}
                onChange={() => setTurnOnEZAStats(!turnOnEZAStats)}
                className="ml-2 w-4 h-4"
            />
            </label>

            <div className="flex flex-row p-2">
                <div className="">
                    <input
                        className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="Link Level Radio"
                        id="linkLevelRadio1"
                        value={1}
                        checked={levelOfLinks === 1}
                        onChange={(e) => setLevelOfLinks(parseInt(e.target.value))}
                    />
                    <label
                        className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.8rem] xl:text-[1rem]"
                        htmlFor="linkLevelRadio1"
                    >
                        Level 1 Links
                    </label>
                </div>

                <div className="">
                    <input
                        className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white checked:border-2 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="Link Level Radio"
                        id="linkLevelRadio10"
                        value={10}
                        checked={levelOfLinks === 10}
                        onChange={(e) => setLevelOfLinks(parseInt(e.target.value))}
                    />
                    <label
                        className="form-check-label mr-2 inline-block text-black font-bold text-[.6rem] card-sm:text-[.72rem] lg:text-[.8rem] xl:text-[1rem]"
                        htmlFor="linkLevelRadio10"
                    >
                        Level 10 Links
                    </label>
                </div>
            </div>
        </div>
        
        {/* begin form inputs */}
        <form className='flex flex-col pb-14 overflow-y-auto'>
            <div className='flex flex-col w-full p-2 border-2 border-black bg-orange-200'>
                <div className="flex flex-row justify-around items-center">
                    <p 
                    className={`${showDEFCalculator === true && 'grayscale'} font-header lg:text-lg xl:text-2xl text-center cursor-pointer`}
                    onClick={() => setShowDEFCalculator(false)}
                    >Attack Calculation</p>
                    <p 
                    className={`${showDEFCalculator === false && 'grayscale'} font-header lg:text-lg xl:text-2xl text-center cursor-pointer`}
                    onClick={() => setShowDEFCalculator(true)}
                    >Defense Calculation</p>
                </div>
                <p>Enter the total base defense stat of the unit (including the additions from the hidden potential):</p>
                <input
                value={baseDefenseStat} 
                onChange={(e) => setBaseDefenseStat(e.target.value)}
                onWheel={(e) => e.preventDefault()}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>DEF % Increase from Leader:</p>
                <input
                value={leaderSkillIncrease}
                onChange={(e) => setLeaderSkillIncrease(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>DEF % Increase from Friend/Sub-Leader:</p>
                <input
                value={subLeaderSkillIncrease}
                onChange={(e) => setSubLeaderSkillIncrease(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>Start of turn Passive Skill DEF % Gained:</p>
                <input
                value={passiveSkillIncrease}
                onChange={(e) => setPassiveSkillIncrease(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>Item + Support Memory DEF % Increase: </p>
                <input
                value={itemStats}
                onChange={(e) => setItemStats(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>DEF % gain after action (after super, attack, evasion, etc...):: </p>
                <input
                value={passiveSkillOnAttackOrSuperOrActionIncrease}
                onChange={(e) => setPassiveSkillOnAttackOrSuperOrActionIncrease(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>Link Skill DEF % Gained:</p>
                <input
                value={linkSkillPercentage}
                onChange={(e) => setLinkSkillPercentage(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                <p>Ally support raise DEF% (any ally who has a support passive skill):</p>
                <input
                value={noLinkAllyPassiveBoost}
                onChange={(e) => setNoLinkAllyPassiveBoost(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                {characterComparisonForCalculator[0] && characterComparisonForCalculator[0]?.rarity === 'LR' ?
                <div className="flex flex-col card-sm:flex-row w-full card-sm:items-end">
                    <div className="card-sm:w-1/5 pr-4">
                        <p>Ki Collected:</p>
                        <input
                        value={kiCollected}
                        onChange={(e) => handleKiCollected(e.target.value)}
                        placeholder='0' 
                        type='number'
                        className='w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                    </div>
                    {/* <div className="card-sm:w-4/5">
                        <p>Ki Multiplier %:</p>
                        <input
                        value={kiMultiplier}
                        onChange={(e) => setKiMultiplier(e.target.value)}
                        placeholder='0' 
                        type='number'
                        className='w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                    </div> */}
                </div>
                :
                <>
                    {/* <p>Ki Multiplier %:</p>
                    <input
                    value={kiMultiplier}
                    onChange={(e) => setKiMultiplier(e.target.value)}
                    placeholder='0' 
                    type='number'
                    className='w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/> */}
                </>
                }
                {/* <p>Enter 'Super Attack Boost' level from the hidden potential system:</p>
                <input
                value={superAttackHiddenPotentialBoostLevel}
                onChange={(e) => setSuperAttackHiddenPotentialBoostLevel(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/> */}
                <p>DEF Boost % from Super Attack (raise DEF by ??? for ??? turns):</p>
                <input
                value={raiseDefenseOnSuper}
                onChange={(e) => setRaiseDefenseOnSuper(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/>
                {/* <p>Super Attack Multiplier %:</p>
                <input
                value={superAttackMultiplier}
                onChange={(e) => setSuperAttackMultiplier(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/> */}
                {/* <p># of Super Attacks:</p>
                <p>*this is to calculate how many super attacks are launched*</p>
                <input
                value={numberOfSupers}
                onChange={(e) => setNumbersOfSupers(e.target.value)}
                placeholder='0' 
                type='number'
                className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 inset-shadow-md focus:outline-none focus:shadow-outline-gray'/> */}
                <div className="flex flex-row items-center">
                    <p className="font-header text-2xl py-4 pr-4">Results: </p><p className="text-xl font-bold">{results}</p>
                </div>
                <button 
                className='w-full p-2 bg-orange-300 hover:bg-orange-400 border-2 border-black font-bold'
                onClick={(e) => handleSubmit(e)}
                >SUBMIT</button>
            </div>
        </form>
    </div>
  )
}
