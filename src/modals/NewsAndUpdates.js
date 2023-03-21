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
                  <NewsDiv date={'MAR/21/2023'} information={<>
                    <p className="px-4 py-2 text-base font-bold indent-4">We have made a <a className='text-blue-500' href={`${process.env.PUBLIC_URL}/help`}>Help page</a> which can be accessed in the drop-down menu at the top right of the page. We have also establish a News & Update pages to give our users information on what we have built, what we are working on, and what is coming next. Lastly, we have sucessfully added in the Team Posts. With this new update we are allowing users to post teams to specific stages. Over time, we will keep adding more stages and also be updating them if more stages are added to events.</p>
                    {/* <li className="py-2 px-4"></li> */}
                    </>} 
                    key={1}
                  />
                </div>
              </div>
              <div className="lg:w-2/5 border-2 border-black">
              <p className="font-header w-full h-fit border-b-4 border-black text-4xl text-center bg-orange-300">Upcoming Updates</p>
                <li className="px-4 py-2 text-lg font-bold">Multi-category search</li>
                <li className="px-4 py-2 text-lg font-bold">Adding a Remove From Team option to character cards in the main container</li>
                <li className="px-4 py-2 text-lg font-bold">Adding in transformed characters</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">New strategy page</li>
                <li className="px-4 py-2 text-lg font-bold line-through decoration-2">New help page</li>
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
    <div className="w-[90%] max-h-[300px] mt-4 mx-4 border-4 border-black rounded-lg bg-orange-300 overflow-y-auto">
      <p className="w-full h-fit p-2 border-b-2 border-black text-xl font-bold text-center bg-orange-400">{date}</p>
      <p className="">{information}</p>
    </div>
  )
}