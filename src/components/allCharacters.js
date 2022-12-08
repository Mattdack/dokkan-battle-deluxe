import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHARACTERS } from "../util/queries";

function AllCharacters() {
  const { loading, data } = useQuery(QUERY_CHARACTERS);
  const characters = data?.characters || [];

  return (
    <div className="bg-slate-700 rounded-md p-4 h-full">
      <h2 className="bg-slate-600 rounded-md mb-2 py-4 text-center h-1/3">
        Search by Filters:
      </h2>
      <div className="bg-slate-600 rounded-md py-4 text-center h-2/3">
        <h2 className="pb-5">Main Character Selection</h2>
        <div className="bg-slate-500 rounded-md m-2 max-h-96">
          <p>Character Cards</p>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="my-4 overflow-auto grid grid-cols-5 max-h-80">
              {characters &&
                characters.map((character) => (
                  <div key={character.id} className="h-50 w-50">
                    <div className="">
                      <h4 className="" style = {{backgroundImage: `url("https://placedog.net/50/50?random")`}} >{character.id}</h4>
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
