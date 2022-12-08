import React from "react";

function allCharacters() {
    return (
        <div className="flex flex-col relative">
            <div className="bg-orange-600 border-4 border-blue-900 rounded-md h-[45%] m-2 relative" id="filters">
                <select className="m-5 p-2.5 text-black bg-white border-2 border-blue-900 rounded-md shadow-sm outline-none appearance-none focus:border-blue-900 relative" id="categories">
                    <option>Categories:</option>
                    <option>Fusion</option>
                    <option>Shadow Dragon Saga</option>
                    <option>World Tournament</option>
                    <option>Peppy Gals</option>
                    <option>Hybrid Saiyans</option>
                    <option>Universe Survival Saga</option>
                    <option>Resurrected Warriors</option>
                    <option>Realm of Gods</option>
                    <option>Majin Buu Saga</option>
                    <option>Potara</option>
                    <option>Low-Class Warrior</option>
                    <option>Super Saiyan 3</option>
                    <option>Giant Form</option>
                    <option>Planet Namek Saga</option>
                    <option>Ginyu Force</option>
                    <option>Movie Bosses</option>
                    <option>Pure Saiyans</option>
                    <option>Namekians</option>
                    <option>Future Saga</option>
                    <option>Full Power</option>
                    <option>Androids</option>
                    <option>Representatives of Universe 7</option>
                    <option>Transformation Boost</option>
                    <option>Wicked Bloodline</option>
                    <option>Dragon Ball Seekers</option>
                    <option>Time Travelers</option>
                    <option>Universe 6</option>
                    <option>Joined Forces</option>
                    <option>Movie Heroes</option>
                    <option>Goku's Family</option>
                    <option>Vegeta's Family</option>
                    <option>Artificial Life Forms</option>
                    <option>Youth</option>
                    <option>DB Saga</option>
                    <option>Siblings' Bond</option>
                    <option>Super Saiyans</option>
                    <option>Worthy Rivals</option>
                    <option>Androids/Cell Saga</option>
                    <option>Kamehameha</option>
                    <option>Bond of Master and Disciple</option>
                    <option>Terrifying Conquerors</option>
                    <option>Dragon Ball Heroes</option>
                    <option>Target: Goku</option>
                    <option>Otherworld Warriors</option>
                    <option>Super Saiyan 2</option>
                    <option>Final Trump Card</option>
                    <option>Exploding Rage</option>
                    <option>Revenge</option>
                    <option>Team Bardock</option>
                    <option>Inhuman Deeds</option>
                    <option>Earthlings</option>
                    <option>Special Pose</option>
                    <option>Majin Power</option>
                    <option>Rapid Growth</option>
                    <option>All-Out Struggle</option>
                    <option>Universe 11</option>
                    <option>Saviors</option>
                    <option>Battle of Wits</option>
                    <option>Power Absorption</option>
                    <option>Giant Ape Power</option>
                    <option>Crossover</option>
                    <option>Space-Traveling Warriors</option>
                    <option>Connected Hope</option>
                    <option>Corroded Body and Mind</option>
                    <option>Turtle School</option>
                    <option>Miraculous Awakening</option>
                    <option>Powerful Comeback</option>
                    <option>Gifted Warriors</option>
                    <option>Planetary Destruction</option>
                    <option>Defenders of Justice</option>
                    <option>Storied Figures</option>
                    <option>GT Heroes</option>
                    <option>GT Bosses</option>
                    <option>Heavenly Events</option>
                    <option>Time Limit</option>
                    <option>Mastered Evolution</option>
                    <option>Legendary Existence</option>
                    <option>Sowrn Enemies</option>
                    <option>Bond of Friendship</option>
                    <option>Accelerated Battle</option>
                    <option>Entrusted Will</option>
                    <option>Worldwide Chaos</option>
                    <option>Battle of Fate</option>
                    <option>Power Beyond Super Saiyan</option>
                    <option>Fused Fighters</option>
                    <option>Saiyan Saga</option>
                    <option>Bond of Parent and Child</option>
                    <option>Warriors Raised on Earth</option>
                </select>
                <div className="bg-orange-300 w-[75%] m-5 p-2 relative rounded-md border-2 border-orange-400" id="box-1">
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">N</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">R</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">SR</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">SSR</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">UR</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">LR</button>
                </div>
                <div className="bg-orange-300 w-[70%] m-5 p-2 relative rounded-md border-2 border-blue-900" id="box-2">
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">AGL</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">TEQ</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">INT</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">STR</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">PHY</button>
                </div>
                <div className="bg-orange-300 w-[40%] m-5 p-2 relative rounded-md border-2 border-blue-900" id="box-3">
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">Super</button>
                    <button className="pr-10 pl-10 pt-2 pb-2 relative hover:bg-orange-400">Extreme</button>
                </div>
            </div>
            <div className="bg-fuchsia-700 border-4 border-blue-900 rounded-md m-2 p-2 h-[100%] text-center relative">
                <h2 className="p-5">Main Character Selection</h2>
                <div className="bg-fuchsia-400 border-2 border-fuchsia-500 rounded-md m-2 h-[89%]">
                    <div className="bg-fuchsia-200 border-2 border-fuchsia-300 rounded-md m-2 h-[98%]">    
                    asdflkj                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default allCharacters;