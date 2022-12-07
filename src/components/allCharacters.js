import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS } from "../util/queries";

function AllCharacters() {
  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const characters = data?.characters || [];

  return (
    <div className="bg-slate-700 rounded-md p-4 ">
      <h2 className="bg-slate-600 rounded-md mb-2 py-4 h-1/3 text-center">
        Search by Filters:
      </h2>
      <div className="bg-slate-600 rounded-md py-4 h-2/3 text-center">
        <h2 className="pb-5">Main Character Selection</h2>
        <div className="bg-slate-500 rounded-md m-2 h-[91%]">
        <p >Character Cards</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex-row justify-space-between my-4">
            {characters &&
              characters.map((character) => (
                <div key={character.id} className="col-12 col-xl-6">
                  <div className="card // {}">
                    <h4 className="">{character.id}</h4>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
            
        </div>
    </div>
  );
}

export default AllCharacters;
