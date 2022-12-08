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
        <div className="rounded-md m-2 max-h-96">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="my-4 overflow-auto grid grid-cols-4 md:grid-cols-5 max-h-96 md:max-h-96 xl:max-h-96 2xl:max-h-128">
              {characters &&
                characters.map((character) => (
                  <div key={character.id} className="h-12 md:h-28 lg:h-14 w-12 md:w-28 lg:w-14 m-2 gap-4 bg-no-repeat" style = {{backgroundImage: `url("https://placedog.net/50/50?random")`, backgroundSize: `100%`}}>
                    <div className="">
                      <h4 className=""  >{character.id}</h4>
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
