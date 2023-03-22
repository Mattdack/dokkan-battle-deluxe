import React, { useState, useEffect, useRef } from "react";
import Auth from "../util/auth";

import {  } from "@apollo/client";
import {  } from "../util/queries";
import {  } from "../util/mutations";

import {AdvancedImage, lazyload} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {CloudConfig} from "@cloudinary/url-gen";

let cloudConfig = new CloudConfig({cloudName: process.env.REACT_APP_CLOUD_NAME});
let urlConfig = new URLConfig({secure: true});

let teamOf6 = new CloudinaryImage(`Misc/teamOf6`, cloudConfig, urlConfig);
let teamOf7 = new CloudinaryImage(`Misc/teamOf7`, cloudConfig, urlConfig);


const addIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/add-icon.png";

function Help() {
    const [showTeamBuildHelp, setShowTeamBuildHelp] = useState(true)

  return (
    <div className="flex flex-col w-full h-[90vh] card-sm:px-20 items-center bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 overflow-y-auto">
        <p className="font-header w-full text-5xl text-center">Welcome to Dokkan Battle Helper!</p>
        <div className="p-4 m-4 bg-orange-200 border-4 border-black">
            <p className="font-header text-3xl">Why Dokkan Battle Helper?</p>
            <p className="card-sm:text-xl font-bold indent-10">The biggest reason we wanted to make this web app was to help players make effect teams when playing Dokkan Battle. Whether you are a beginer looking for a team that can complete an event or a long time veteran looking for an easy place to post teams, we believe this app can be used by everyone. We offer a wide range of uses, from initially loading into a page and seeing what characters pair well with others, to logging in to make teams with characters that you have saved to easily complete Ultimate Clash. The team building page can be accessed at <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/`}>www.dokkanbattlehelper.com</a> while the team strategies and team postings can be found at <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/strategy`}>www.dokkanbattlehelper.com/strategy</a>. We hope you enjoy this app. If there is any information missing or is incorrect, please fill out the information in this <a className='text-blue-500' href={'https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link'} target={'_blank'}>form</a>.</p>
        </div>
        <div className="flex flex-row w-full p-4">
            <div onClick={() => setShowTeamBuildHelp(true)} className={`font-header flex w-1/2 h-20 text-lg card-sm:text-2xl ${showTeamBuildHelp ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-200 hover:bg-orange-400'} border-4 border-black justify-center items-center text-center`}>
                Team Building Help
            </div>
            <div onClick={() => setShowTeamBuildHelp(false)} className={`font-header flex w-1/2 h-20 text-lg card-sm:text-2xl ${showTeamBuildHelp ? 'bg-orange-200 hover:bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} border-4 border-black justify-center items-center text-center`}>
                Strategic and Team Posting
            </div>
        </div>
        {showTeamBuildHelp ? 
        <div className="p-4 m-4 bg-orange-200 border-4 border-black">
            <p className="font-header card-sm:text-3xl">Building a Team</p>
            <p className="card-sm:text-xl font-bold indent-10">Starting at the <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/`}>home page</a>, you can see an asortment of characters. When scrolled, the next batch of character automatically loads. You can choose to filter these characters by the 'Game Filter' (how the game orients characters) or by the character release date. Each time you click on a character, the middle column will update with that characters information. In the information, you may see some orange asteriks (<span className="text-orange-500 indent-0">*</span>) after some character information, you can click on these to see the exact percentages of stats changed. If a character has an Extreme Awakening, you can click the yellow EZA to show the stats after their Extreme Awakening. After a character is selected, you can also see the characters they link well with at the bottom right of the screen.</p>
            {/* ADD VIDEO */}
            <p className="card-sm:text-xl font-bold indent-10">Now, to start forming teams, you need to click on a character and a 'Add to Team' box will appear. Click this box and you will see the character appears in the right column (essentially double clicking a character adds them to the team). Once the character is added to the team, their background will become darker. Characters with matched links at the bottom right can be clicked and either added to your team, or show the details/characters that link well with the clicked character. As you add mutliple characters, each character can be moved by clicking onto them (holding down the click) and dragging the mouse to the desired location. You will begin to see paths being formed between the characters. Paths will not form if a character shares the same name (just like the game). In the middle of each path is a number which represents each link skill those characters share. These numbers can be clicked to reveal a detailed list of stats that are improved. You can also single click a character on the team to hightlight their paths orange. To remove a character, simply double-click the character in the team web twice. Just a note, the same character cannot be placed in a team web twice. Therefore, when a team shares a leader and sub-leader, there will only be 6 characters in it. Feel free to play with the graph and see what you like. Here is how we liked formulating team:</p>
            <div className="flex flex-col <1000px>:flex-row border-4 border-black bg-orange-300">
                <div className="flex flex-col px-4 border-b-4 <1000px>:border-r-4 <1000px>:border-b-0 border-black justify-center items-center">
                    <p className="font-header text-2xl text-center">Team of 6</p>
                    <p className="font-bold">In this team, the Super Saiyan God Duo would be the leader and sub-leader. The first rotation would be the Super Saiyan God Duo with Super Saiyan Gohan and the second rotation would be Super Saiyan God Duo with Super Saiyan God Goku [PHY]. Then the Super Saiyan 4 Duo, Super Saiyan God Goku [INT], and Super Saiyan Gogeta would be the float characters.</p>
                    <AdvancedImage cldImg={teamOf6} />
                </div>
                <div className="flex flex-col px-4 border-black justify-center items-center">
                    <p className="font-header text-2xl text-center">Team of 7</p>
                    <p className="font-bold">Teams of 7 are a bit more straight up. In this team, Goku (Youth) [INT] is the leader and Goku (Youth) [PHY] is the sub-leader. Goku (Youth) [PHY] will rotate with Chi-Chi (Youth) while Goku (Youth) [INT] will rotate with Goku (Youth) & Bulma (Youth). Hacchan, Jacki Chun, and Yamcha are the floating characters.</p>
                    <AdvancedImage cldImg={teamOf7} />
                </div>
            </div>
            {/* ADD PHOTOS AND CAPTIONS */}
            <p className="font-header pt-4 text-3xl">Saving Characters</p>
            <p className="card-sm:text-xl font-bold indent-10">Now if you desire to login to be able to save characters and also saved specific teams, you need to create an accound in the sign up form. Fill out the information. On initial account creation,a user will be logged in. Once logged in, you can see that two options are now available: Save Characters and Decks. To save characters to an account, click on the slider to the 'ON' position. After the feature is ON, simply click on the characters you want to save. The background or the characters to be saved will turn orange. Once the character/characters have been selected, hit the 'SAVE' button to save them to your account. You can now filter every character in the game with character you have saved by selecting the 'Characters Saved' button. Also, when you go to add a character that you have recently collected in Dokkan Battle, you can click on the 'Save Characters' mode to 'ON' again and you should see that previously saved characters will have an orange background.</p>
            {/* ADD VIDEO */}
            <p className="font-header pt-4 text-3xl">Saving A Team</p>
            <p className="card-sm:text-xl font-bold indent-10">The next option you have available is to save teams to your deck. To access you decks, click the Decks: option in the middle column and select a Deck. You have 3 preset Decks: Deck 1, Deck 2, and Deck 3. These decks can be renamed by selecting a deck, filling out the New Deck Name input, and selecting the blue checkmark at the end of the input. After a deck is selected, you will see a grayed out 'ADD TO TEAM' button and an info box under it stating 'team must have 6 to 7 characters in it to add it to a deck. So in order to enable it, we must place 6 characters (one character is the same leader and sub-leader/friend) or 7 characters (two different leaders on one team). Once you have a team formed, click the 'ADD TEAM TO DECK'. A form should pop up to show how you want the team to be formatted. Select the leader, sub-leader, and rotations. A strategy is not required for personal team building but will be for posting a team to a stage. There are obviously some limitations on what you can and cannot do when making a team, treat the team building like forming a team in Dokkan, however we will place some of the rules below:</p>
            <div className="flex flex-col <1000px>:flex-row p-2">
                <div className="flex flex-col p-2 m-2 border-4 border-black bg-orange-300">
                    <p className="font-header w-full text-center text-3xl border-b-4 border-black font-bold">Team of 6</p>
                    <li className="card-sm:text-xl font-bold">The leader and sub-leader must be the same character. This is a limitation due to the team web only allowing for one unique character.</li>
                    <li className="card-sm:text-xl font-bold">Rotation 1 and rotation 2 can have the same character in them as long as that character is the leader and sub-leader.</li>
                    <li className="card-sm:text-xl font-bold">Rotation 1 and rotation 2 cannot be the same characters.</li>
                </div>
                <div className="flex flex-col p-2 m-2 border-4 border-black bg-orange-300">
                    <p className="font-header w-full text-center text-3xl border-b-4 border-black font-bold">Team of 7</p>
                    <li className="w-full card-sm:text-xl font-bold">The leader and sub-leader must be different characters (a team of 7 is basically bringing in a friend leader that differs from your leader).</li>
                    <li className="w-full card-sm:text-xl font-bold">The rotations made cannot contain ANY of the same characters as the other rotation.</li>
                </div>
            </div>
            {/* ADD VIDEO */}
            <p className="card-sm:text-xl font-bold indent-10">After a form is filled in and submitted, you should now see the team in the deck. You can turn the 'Show Characters In Deck' to 'ON'. This will gray out the characters that are already in your deck and on a team. This makes it so that making teams for Ultimate Clash can be seemless. Each deck allows for up to 16 teams. After that, a team needs to be deleted in order for a new team to be added. You can delete a team by hitting the trash can in the bottom right corner of the team. To edit a teams leader, sub-leader, or rotations, you can hit the pencil in the uper-right hand corner of the team box.</p>
            {/* ADD VIDEO */}
        </div>
        :
        <div className="p-4 m-4 bg-orange-200 border-4 border-black">
            <p className="font-header text-3xl">Showing Teams Posted</p>
            <p className="card-sm:text-xl font-bold indent-10">Starting at the <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/strategy`}>strategy page</a>, you can see the available events in the upper left hand corner. Clicking on an event will populate the stages in that event. To see the teams posted on the stage, you click on the events and the middle column will populate with the teams posted to that stage. If no teams are posted, a propmt will appear to state that there have been no teams posted for the stage yet. If a team is posted, you may click on the team to show the details of how that user completed the stage with that team.</p>
            {/* ADD VIDEO */}
            <p className="font-header text-3xl pt-4">Posting a Team To a Stage</p>
            <p className="card-sm:text-xl font-bold indent-10">Once a stage has been selected you can see the option 'ADD TEAM TO STAGE'. In order to add a team to a stage, you need to have built a team at the <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/`}>home page</a>. Once the 'ADD TEAM TO STAGE' has been clicked, you can see a prompt which asks you to select a deck you wish to choose a team from. Select which ever deck you saved your team. You will see a list of teams populate in this area.</p>
            {/* ADD VIDEO */}
            <p className="card-sm:text-xl font-bold indent-10">Once a team has been clicked, a form should appear. The first thing you should see is the team layout: leader, sub-leader, first rotation, second rotation, and the float characters. If this is not how you want to orient the team, please got back to your deck at the <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/`}>home page</a> to edit your team accordingly. Below the team layout is the Team Information. This is where you fill out the information for the team used to clear the stage. Starting from the top, you can re-input a different team name. Also, if there are missions on that stage (besides just clearing the stage) these will appear under the team name. If your team accomplished any of the missions, feel free to tag select it. Going down further, you can see each character has three separate inputs: EZA, Hidden Potential, and Character Strategy. If a character is EZA'd, you can select the box. The Hidden Potential orbs can be selected to highlight them, showing that path has been unlocked. Then the character strategy is for any other information you want players to know.</p>
            {/* ADD VIDEO HERE */}
            <p className="card-sm:text-xl font-bold indent-10">After the character information is selected, you may select your items and support memory (if none are selected, the team will post these items as just empty). Once everything is filled out, click the submit button. If everything is filled out correctly, the team will be posted to the stage and your page will refresh. You can navigate back to the stage you posted in an see your team.</p>
            {/* ADD VIDEO */}
        </div>
        }
    </div>
)}

export default Help;
