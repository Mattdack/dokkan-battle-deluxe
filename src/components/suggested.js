import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LINKS } from "../util/queries";

function Suggested() {
    const { loading, data } = useQuery(QUERY_LINKS);
    const charactersLink = data?.charactersLink || [];

    return (
        <div>
        <h2 className= "row-span-3 bg-slate-700 rounded-md">This is the Suggested Div</h2>
        {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex-row justify-space-between my-4">
              {charactersLink &&
                charactersLink.map((charactersLink) => (
                  <div key={charactersLink.id} className="col-12 col-xl-6">
                    <div className="card // {}">
                      <h4 className="">{charactersLink.id}</h4>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
    );
}

export default Suggested;