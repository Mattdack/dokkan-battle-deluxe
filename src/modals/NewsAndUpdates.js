import React, { useState } from "react";
import ReactDom from "react-dom";

const closeIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/close-icon.png";

export default function NewsAndUpdatesModal( {open, onClose} ) {
   
  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
     <div 
      onClick={() => onClose()} 
      className="flex fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999] justify-center items-center">
        <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-3/4 lg:w-3/5 h-[70vh] lg:max-h-3/4 border-4 border-black rounded-lg shadow-lg fixed bg-gray-100 z-[1000] overflow-y-auto">
          {/* <img onClick={() => onClose()} src={closeIcon} className="absolute top-2 right-2 rounded-lg transition ease-in-out hover:bg-gray-400/[.6] cursor-pointer"/> */}
          <h1 className="font-header w-full h-fit px-14 border-b-4 border-black text-2xl lg:text-4xl <1000px>:text-5xl text-center bg-orange-300">WELCOME TO DOKKAN BATTLE HELPER!</h1>
          <div className="flex flex-row">
          </div>
          
          <div className="flex flex-col w-full bg-orange-200">
              <div className="pb-4">
                <h1 className="font-header pt-2 text-xl card-sm:text-2xl lg:text-4xl font-light text-center underline underline-offset-8 decoration-2">The Best Dokkan Link Helper</h1>
                <p className="px-4 pt-2 text-base border-r-4 card-sm:text-lg font-bold indent-10">The biggest reason we wanted to make this web app was to help players build effect teams that link well. Whether you are a beginer looking for a team that can complete an event or a long time veteran looking for an easy place to post teams on our strategy page, we believe this app can be used by everyone. A couple of use cases for the app include seeing what characters link well with others, saving teams to a deck (great feature to help those looking to make teams to complete Ultimate Clash), and seeing/posting teams on specific stages for others to see. The team building page can be accessed at <a className='text-blue-500' href={`https://dokkan.team/`}>dokkan.team</a> while the team strategies and team postings can be found at <a className='text-blue-500' href={`https://dokkan.team/strategy`}>dokkan.team/strategy</a>. We hope you enjoy this app. If there is any information missing or is incorrect, please fill out the information in this <a className='text-blue-500' href={'https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link'} target={'_blank'}>form</a>.</p>
              </div>

              <div className="pb-14">
                <p className="font-header pt-2 text-xl card-sm:text-2xl lg:text-4xl font-light text-center underline underline-offset-8 decoration-2">Updates</p>

                <div className="h-full">
                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'MAY/21/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold">TLDR:</p>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">Beta DEF Calculator added</li>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">After a long break I am here with a tiny update, the defense calculator! Sorry for those that came from reddit and didn't have access to it, only the attack calculator was up. Next will be calculating damage done/taken....if you know how to calculate an enemies attack, damage reduction, etc, please contact me on reddit or fill out the form below with your email or @. </p> 
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">I have not played with the calculator on mobile a lot, so apologies if it is hard to use on a phone. As always, if you find any other errors, missing characters, or incorrect information please fill out this <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>Google Form</a>. We hope you continue to enjoy using this app!</p> 
                      </>}
                      key={'Update 5'}
                    />
                  </div> 

                <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'MAY/9/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold">TLDR:</p>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">Beta ATK Calculator</li>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">Styling issues fixed: search form update</li>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Back with another smaller update! After a couple of requiests, we are implimenting calculators now just as a fun little addition to the site. Currently we only have the ATK calculator, DEF will be coming next. The fun aspects of the calculator is the link ATK % gain, Ki multiplier, and SA multiplier are all automatically populated when two characters are selected. Also, if a LR character is selected you can vary the Ki collected which will automatically change the Ki multiplier and also the SA multiplier (depending on a super attack or ultra super attack). The left character (with the green dot) is the one being calculated for. We are still working on conditional statements for populating data, so all the information may not be 100% accurate yet. However, when I tested it, I found it to be on average 97-99% accurate. Also you mayhave noticed the styling changes of the search form. I condensed it because when the screen size was below 1000 pixels and the character card details were showing, it was causing everything to be pushed off the screen.</p> 
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4"> I have not played with the calculator on mobile a lot, so apologies if it is hard to use on a phone. As always, if you find any other errors, missing characters, or incorrect information please fill out this <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>Google Form</a>. We hope you continue to enjoy using this app!</p> 
                      </>}
                      key={'Update 5'}
                    />
                  </div> 

                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'MAY/1/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold">TLDR:</p>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">new primary domain</li>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">added SSR characters</li>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">level 10 link stats</li>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">suggested card/link options added</li>
                      <li className="px-2 card-sm:px-4 text-md card-sm:text-base font-bold">allow users to select order suggested characters by number of links or by stats gained</li>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">After many requests for SSR characters, they are now available! It took some time to download all of them to the database and ensure that there were no errors. With this new update we also added an "infinite scroll" to the character selection. This just allows for smoother UI and doesn't force a ton of processing on page load when it queries for 1,700 characters. I also will need to comb over some character data, as it is not perfect yet. Additionally, level 10 links are now available! I have implemented an options menu for the team formation to start freeing up some space (you can access it in the top right-hand corner of the team web page). Also, I had some requests to keep the suggested cards back to the previous version of sorting by the number of links. I enabled a setting to allow people to switch between the two. Also, you may have noticed that our primary domain has changed! We are keeping the name Dokkan Battle Helper but if you search for <a className='text-blue-500' href="https://dokkanbattlehelper.com/">https://dokkanbattlehelper.com/</a>, you will be redirected to <a className='text-blue-500' href="https://dokkan.team/">https://dokkan.team/</a>. Both domains work, and we will be working on having all cases of dokkanbattlehelper.com redirect to dokkan.team. We are working hard to ensure our search engine optimization (SEO) is at its best so that we can reach as many users as possible, and we believe that dokkan.team will help us. Also, it's a much easier website name to remember! Both domains go to the same site, so in the end it doesn't matter which one is used.</p> 
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Currently, there is a styling issue on the team web page when character details are shown for screen sizes ranging from 851 to 940 pixels. I need to fine-tune the suggested section to ensure that it fits onto the screen for these sizes, but I wanted to get this update out in the meantime. If you find any other errors, missing characters, or incorrect information please fill out this <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>Google Form</a>.</p>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Next on the list is transforming characters and adding the ability to edit teams posted on the strategy section. I'm also working on an auto-generate team option, although this will take some time as the algorithm is proving to be difficult. We hope you are still enjoying the app!</p> 
                      </>}
                      key={'Update 5'}
                    />
                  </div>

                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'APR/20/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Another update coming at ya! The goal of this one is to make team building that much easier. When you load in, characters can be filtered by 'Common Leaders'. These are all category leaders that add more than 150% to any stat (felt like that covered more bases and making a search for sub-leaders was just too much). Then, if a category is selected, the 'Common Leaders' actually switches to 'Selected Category Leaders'. Now these characters are leader for ONLY the selected category.</p>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Also, we totally reconstructed the suggested characters. They can now be sorted by ATK, DEF, or Ki gained through links. Organizing the characters by amount of links to each character was nice, but it was unorganized/hard to find the best linker sense they weren't organized by stats gained. Not only that, but we also added the ability to have multiple categories searched in this too. This will make forming teams a breeze, especially when you're looking to build a team that has both categories in a 200% leader. For this weekend and next week I'll be taking it somewhat easy. I'll be working on backend and also PR stuff (trying to get the word out on this app so feel free to share with others!). After the little break, I'll be trying to incorporate transforming and SSRs characters and then working on a switch to show level 10 link stats.</p>
                      {/* <li className="py-2 px-2 card-sm:px-4"></li> */}
                      </>}
                      key={'Update 5'}
                    />
                  </div>

                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'APR/16/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Just a little style and processing update. Was making ultimate clash teams in one of my decks on my phone and realized once I had too many teams in a deck, my browser would crash when I tried to 'Gray Characters in Deck'. The issue was that just enough processing power was needed to filter through the characters and add a grayscale effect on them that a computer could do it easily, but on a phone it would crash the browser. I found a quick solution to simply just gray out the entire character when the mode is switched to on. Doesn't look as cool, but works perfectly. Taking a little break this week and then off to add the ability for people to edit team posts (debating adding the ability to edit comments and replies), work on transoforming characters, and then maybe adding SSRs. There is also some back end stuff I want to attend to. Until then, enjoy the app!</p>
                      {/* <li className="py-2 px-2 card-sm:px-4"></li> */}
                      </>}
                      key={'Update 5'}
                    />
                  </div>

                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'APR/13/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">SUPER PUMPED for this update.....Japan units are now supported! We also did a ton of more styling changes, mostly optimizing mobile settings so the app is easier to use on a phone. We have added in smooth scrolling through all characters (this has been an issue we have been trying to tackle for 2 months now and finally got it!), single tap character addition to teams (it seems like this is the best way to go), and allowing for players to suggest characters that are already in their team web, and lastly a way better mobile design to allow functionality on all platforms/browsers. We have been working tirelessly to have the mobile version be easy to use, and we can proudly say we are happy with where it is at now.</p>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">We still have some styling changes to do (deciding whether to put the card details on the page or have it as a pop-up option). Next on the list of updates is filtering characters on the home page and teams on the strategy page by GLB or JPN units and then we will add transforming characters and then hopefully SSRs after.</p>
                      {/* <li className="py-2 px-2 card-sm:px-4"></li> */}
                      </>}
                      key={'Update 4'}
                    />
                  </div>

                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'APR/10/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Finally got to looking over all the responses. We fixed one large error that wouldn't allow people to post a team onto a stage if the team contained a friend which was not also their leader (but still on the team). The algo we have tracks characters selected for leader and friend and then provides the option to select Leader or Friend on that specific character in the rotation. We also only allow people to submit a team with one leader and one friend. This caused an issue because there would be three characters that could be tagged Leader or Friend, causing the team to not be submitted. We fixed the issue by allowing a third option of 'Neither'. This will allow people to post teams in which their Leader and Friend do not match.</p>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Also a very exciting update, we changed the team web format. It is now centered on characters, instead of the edges. We think this makes a better and more seemless design. Next on the list is to add Japan units. This will take a bit longer just because we need to gather all the data and make sure everything checks out.</p>
                      {/* <li className="py-2 px-2 card-sm:px-4"></li> */}
                      </>}
                      key={'Update 3'}
                    />
                  </div>

                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'APR/4/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">Welcome to this week's update! We are pretty excited about our new update: commenting on stages! Not only can users comment on stages, but they can also comment on their saved characters in order to receive help from other people. People can reply with characters that they have selected from your saved characters.</p>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">We have decided to reorient the page a bit due to some user input on the page being too cluttered. We really wanted to make this page highly focused on the ability to form and generate teams. So with that, we decided to keep the page format to a two-column layout on both pages. On the main team generating page, we allow users to select the option "Show Card Details and Decks" to reveal the middle column (this column is automatically viewable on a mobile device). Then, the strategy section is also split into two sections. The team specifics/info are now viewable in a pop-up and can be accessed by clicking on them. Again, for any feedback (positive or negative) or any errors to report, please fill out this <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>google form</a>.</p>
                      {/* <li className="py-2 px-2 card-sm:px-4"></li> */}
                      </>}
                      key={'Update 2'}
                    />
                  </div>
                  <div className="flex flex-wrap justify-around">
                    <NewsDiv date={'MAR/21/2023'} information={<>
                      <p className="px-2 card-sm:px-4 py-2 text-md card-sm:text-base font-bold indent-4">The strategy section is now available! You can access it <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/strategy`}>here</a>. With this new update we are allowing users to post teams to specific stages. Over time, we will keep adding more stages and also be updating them as more stages are added to events and more events are added to the game. We also made a <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/help`}>help page</a> which can be accessed in the drop-down menu at the top right of the page. Also, the new News & Update pages to give our users information on what we have built, what we are working on, and what is coming next. We Hope you continue to enjoy our app! If you have any input (positive or negative) please go to the help page and fill out the <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>google form</a>.</p>
                      {/* <li className="py-2 px-2 card-sm:px-4"></li> */}
                      </>} 
                      key={'Update 1'}
                    />
                  </div>

                </div>
              </div>
              {/* <div className="h-1/4 lg:h-full lg:w-2/5 pb-14 border-2 border-black overflow-y-auto">
                <p className="font-header w-full h-fit border-b-4 border-black text-2xl card-sm:text-4xl text-center bg-orange-300">Upcoming Updates</p>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold">Adding in transformed characters</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold">Team analysis button on posted teams to see how well characters link with each other on the team</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold">Filtering team posted to stages depending on users saved characters</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Adding in SSR units</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Adding in Japan units</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Allowing people to comment on stages their saved characters in order for others to help formulate a team for them</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Adding a remove from team option to character cards in the main container</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Click logo to jump between home and strategy</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Fixing categroy selected size increase off screen</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">New strategy page</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">New help page</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Multi-category search</li>
                <li className="px-2 card-sm:px-4 py-2 text-base card-sm:text-lg font-bold line-through decoration-2">Allowing make from scratch team post, making it so that people don't have to make a team at the home page but can construct one from scratch in the strategy page</li>
              </div> */}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("NewsAndUpdatesPortal")
  );
}

function NewsDiv ({ date, information }) {

  return (
    <div className="w-[90%] mt-4 mx-4 border-4 border-black rounded-lg bg-orange-300 overflow-y-auto">
      <p className="w-full h-fit p-2 border-b-2 border-black text-xl font-bold text-center bg-orange-400">{date}</p>
      <p className="">{information}</p>
    </div>
  )
}