import React from "react";

function Web(props) {

    
    return (
        <div>
            <div className="bg-gradient-radial from-gray-400 to via-gray-600 to-gray-800 border-2 border-black m-2 rounded-md">
                <div>
                    <h1 className="text-center mt-5">Team Web</h1>
                    <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 border-2 border-black shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] my-10 mx-10">asdf
                    </div>
                </div>
            </div>
            <div className="bg-gradient-radial from-gray-400 to via-gray-600 to-gray-800 border-2 border-black m-2 rounded-md grid grid-cols-9">
                <h1 className="mt-4 mb-4 ml-4 col-span-1">Your Team</h1>
                <div className="bg-gradient-radial from-purple-200 via-purple-100 to-purple-50 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.6)] my-2 mr-4 border-2 border-black col-span-8">Heroes Go Here</div>
            </div>
        </div>
    );
}

export default Web;
