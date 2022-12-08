import React from "react";

function Details() {
    return (
        <div className="row-span-2 bg-yellow-400 border-4 border-blue-900 rounded-md m-1 relative">
            <div className="bg-yellow-200 border-2 border-yellow-300 m-2 h-[96%] relative">
                <div className="bg-yellow-100 border-2 border-yellow-200 m-2 h-[96%] columns-2 grid grid-rows-3 grid-flow-col gap-4">
                    <h2 className="bg-orange-600">Photo</h2>
                </div>
            </div>
        </div>
    );
}

export default Details;