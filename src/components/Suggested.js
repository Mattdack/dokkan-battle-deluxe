import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ONECHARACTER, QUERY_LINKS } from "../util/queries";

function Suggested() {
  // //TODO: try finding characters with two specific linkskills
  const characterList1 = useQuery(QUERY_LINKS, {
    variables : { linkskill: "Patrol"}
  });
  const charactersLink1 = characterList1.data?.charactersLink || [];
  console.log(charactersLink1)

  // const characterList2 = useQuery(QUERY_LINKS, {
  //   variables : { linkskill: "Signature Pose"}
  // });
  // const charactersLink2 = characterList2.data?.charactersLink || [];
  // console.log(charactersLink2)

  // const charactersLink2Ids = charactersLink2.map(item => item.id)
  // const charactersMatched = charactersLink1.filter(item => charactersLink2Ids.includes(item.id))
  // console.log(charactersMatched)

  const findCharacterById = useQuery(QUERY_LINKS, {
    variables : { dokkanId: 1331}
  });
  const characterFound = findCharacterById.data?.charactersLink || [];
  console.log(characterFound)

  //TODO: Query variable
  // const { loadingOne, dataOne } = useQuery(QUERY_ONECHARACTER, {
  //   variables : { dokkanId: 1331}
  // });
  // console.log(dataOne)
  // const oneCharacter = dataOne?.character || [];
  // console.log(oneCharacter)

  //TODO: find how many characters match with others depending on links array
// Sample arrays
let array1 = ["hello", "world", "foo", "bar", "baz", "qux", "quux"];
let array2 = ["hello", "world", "foo", "bar", "baz", "qux", "corge"];
let array3 = ["world", "hello", "foo", "bar", "baz", "qux", "grault"];
let array4 = ["hello", "world", "foo", "bar", "baz", "qux", "garply"];
let array5 = ["hello", "foo", "world", "bar", "baz", "qux", "waldo"];
// Array of arrays
let arrays = [array1, array2, array3, array4, array5];
// The array to compare with the other arrays
let compareArray = ["hello", "world", "foo", "bar", "baz", "qux", "quux"];
// Use map() to compare the array with each of the other arrays and determine the number of matching elements
let matches = arrays.map((otherArray) => {
  let count = 0;
  // Iterate over the elements in the otherArray
  for (let element of otherArray) {
    // If the compareArray includes the element, increment the count
    if (compareArray.includes(element)) {
      count++;
    }
  }
  return count;
});

// Print the number of matches for the compareArray for each of the other arrays
// console.log(`Array ${compareArray} has the following number of matching elements with the other arrays:`);
matches.forEach((match, index) => {
  // console.log(`Array ${arrays[index]}: ${match}`);
});


    return (
        <div>
        {/* <h2 className= "row-span-3 bg-slate-700 rounded-md">This is the Suggested Div</h2>
        {loadingOne ? (
            <div>Loading...</div>
          ) : (
            <div className="flex-row justify-space-between my-4">
              {oneCharacter &&
                oneCharacter.map((character) => (
                  <div key={character.id} className="col-12 col-xl-6">
                    <div className="card // {}">
                      <h4 className="">{character.id}</h4>
                    </div>
                  </div>
                ))}
            </div>
          )} */}
        </div>
    );
}

export default Suggested;
