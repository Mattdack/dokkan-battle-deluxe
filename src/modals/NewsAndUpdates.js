import React, { useState } from "react";
import ReactDom from "react-dom";


export default function NewsAndUpdatesModal( {open, onClose} ) {
   
  if (!open) return null;
  
  return ReactDom.createPortal(
    <>
     <div 
      onClick={() => onClose()} 
      className="flex fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[999] justify-center items-center">
        <div className="flex flex-col w-3/4 lg:w-3/4 h-[90vh] lg:max-h-3/4 border-4 border-black rounded-lg shadow-lg fixed bg-gray-100 z-[1000] overflow-y-auto">
          <div className="flex flex-col lg:flex-row w-full h-full bg-orange-200 overflow-y-auto">
              <div className="lg:w-3/5 border-2 border-black">
                <p className="font-header w-full h-fit border-b-4 border-black text-4xl text-center bg-orange-300">Updates</p>
                <div className="flex flex-wrap justify-around overflow-y-auto">
                  <NewsDiv date={'APR/10/2023'} information={<>
                    <p className="px-4 py-2 text-base font-bold indent-4">Finally got to looking over all the responses. We fixed one large error that wouldn't allow people to post a team onto a stage if the team contained a friend which was not also their leader (but still on the team). The algo we have tracks characters selected for leader and friend and then provides the option to select Leader or Friend on that specific character in the rotation. We also only allow people to submit a team with one leader and one friend. This caused an issue because there would be three characters that could be tagged Leader or Friend, causing the team to not be submitted. We fixed the issue by allowing a third option of 'Neither'. This will allow people to post teams in which their Leader and Friend do not match.</p>
                    <p className="px-4 py-2 text-base font-bold indent-4">Also a very exciting update, we changed the team web format. It is now centered on characters, instead of the edges. We think this makes a better and more seemless design. Next on the list is to add Japan units. This will take a bit longer just because we need to gather all the data and make sure everything checks out.</p>
                    {/* <li className="py-2 px-4"></li> */}
                    </>}
                    key={1}
                  />
                </div>
                <div className="flex flex-wrap justify-around overflow-y-auto">
                  <NewsDiv date={'APR/4/2023'} information={<>
                    <p className="px-4 py-2 text-base font-bold indent-4">Welcome to this week's update! We are pretty excited about our new update: commenting on stages! Not only can users comment on stages, but they can also comment on their saved characters in order to receive help from other people. People can reply with characters that they have selected from your saved characters.</p>
                    <p className="px-4 py-2 text-base font-bold indent-4">We have decided to reorient the page a bit due to some user input on the page being too cluttered. We really wanted to make this page highly focused on the ability to form and generate teams. So with that, we decided to keep the page format to a two-column layout on both pages. On the main team generating page, we allow users to select the option "Show Card Details and Decks" to reveal the middle column (this column is automatically viewable on a mobile device). Then, the strategy section is also split into two sections. The team specifics/info are now viewable in a pop-up and can be accessed by clicking on them. Again, for any feedback (positive or negative) or any errors to report, please fill out this <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>google form</a>.</p>
                    {/* <li className="py-2 px-4"></li> */}
                    </>}
                    key={1}
                  />
                </div>
                <div className="flex flex-wrap justify-around overflow-y-auto">
                  <NewsDiv date={'MAR/21/2023'} information={<>
                    <p className="px-4 py-2 text-base font-bold indent-4">The strategy section is now available! You can access it <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/strategy`}>here</a>. With this new update we are allowing users to post teams to specific stages. Over time, we will keep adding more stages and also be updating them as more stages are added to events and more events are added to the game. We also made a <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/help`}>help page</a> which can be accessed in the drop-down menu at the top right of the page. Also, the new News & Update pages to give our users information on what we have built, what we are working on, and what is coming next. We Hope you continue to enjoy our app! If you have any input (positive or negative) please go to the help page and fill out the <a className='text-blue-500' href="https://docs.google.com/forms/d/e/1FAIpQLSdmglG-bsdZL1R41EYEsfrnN5tgJyK-CPfs1D4cNwNBpcxfxg/viewform?usp=sf_link" target={'_blank'}>google form</a>.</p>
                    {/* <li className="py-2 px-4"></li> */}
                    </>} 
                    key={1}
                  />
                </div>
              </div>
              <div className="lg:w-2/5 border-2 border-black overflow-y-auto">
                <p className="font-header w-full h-fit border-b-4 border-black text-4xl text-center bg-orange-300">Upcoming Updates</p>
                <li className="px-4 py-2 text-lg font-bold">Adding in Japan units</li>
                <li className="px-4 py-2 text-lg font-bold">Team analysis button on posted teams to see how well characters link with each other on the team</li>
                <li className="px-4 py-2 text-lg font-bold">Adding in transformed characters</li>
                <li className="px-4 py-2 text-lg font-bold">Filtering team posted to stages depending on users saved characters</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">Allowing people to comment on stages their saved characters in order for others to help formulate a team for them</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">Adding a remove from team option to character cards in the main container</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">Click logo to jump between home and strategy</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">Fixing categroy selected size increase off screen</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">New strategy page</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">New help page</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">Multi-category search</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">Allowing make from scratch team post, making it so that people don't have to make a team at the home page but can construct one from scratch in the strategy page</li>
              </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("NewsAndUpdatesPortal")
  );
}

function NewsDiv ({ date, information }) {

  return (
    <div className="w-[90%] max-h-[350px] mt-4 mx-4 border-4 border-black rounded-lg bg-orange-300 overflow-y-auto">
      <p className="w-full h-fit p-2 border-b-2 border-black text-xl font-bold text-center bg-orange-400">{date}</p>
      <p className="">{information}</p>
    </div>
  )
}