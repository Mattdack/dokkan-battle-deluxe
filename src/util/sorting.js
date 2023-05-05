import { useMemo } from "react";

export function useSortedCharacters(allCharacters, filteredCharacters, filterByGame) {
  const sortedCharacters = useMemo(() => {
    const typeOrder = ["EAGL", "SAGL", "ETEQ", "STEQ", "EINT", "SINT", "ESTR", "SSTR", "EPHY", "SPHY"];
    const rarityOrder = ["SSR", "UR", "LR"];

    const URandLRCharacters = filteredCharacters?.length > 0 ? filteredCharacters.filter(c => c.rarity === 'LR' || c.rarity === 'UR') : allCharacters.filter(c => c.rarity === 'LR' || c.rarity === 'UR')

    const SSRCharacters = filteredCharacters?.length > 0 ? filteredCharacters.filter(c => c.rarity === 'SSR') : allCharacters.filter(c => c.rarity === 'SSR')

    function swap(arr, xp, yp) {
      var temp = arr[xp];
      arr[xp] = arr[yp];
      arr[yp] = temp;
    }

    function bubbleSortDates(arr, n) {
      var i, j;
      for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
          const date1 = new Date(arr[j].jp_date);
          const date2 = new Date(arr[j + 1].jp_date);

          // Check for null or "N/A"
          if (!date1.getTime() || !date2.getTime()) {
            if (!date1.getTime()) {
              swap(arr, j, j + 1);
            }
          } else if (date1 > date2) {
            swap(arr, j, j + 1);
          }
        }
      }
      return arr;
    }

    return (filteredCharacters === null || filteredCharacters.length === 0) ?
      (filterByGame ?
        (allCharacters.slice().sort((a, b) => {
          const rarityA = rarityOrder.indexOf(a.rarity);
          const rarityB = rarityOrder.indexOf(b.rarity);
          if (rarityA === rarityB) {
            const typeA = typeOrder.indexOf(a.type);
            const typeB = typeOrder.indexOf(b.type);
            if (typeA === typeB) {
              return b.id - a.id;
            }
            return typeB - typeA;
          }
          return rarityB - rarityA;
        })
        )
        :
        bubbleSortDates(URandLRCharacters, URandLRCharacters.length).reverse().concat(bubbleSortDates(SSRCharacters, SSRCharacters.length).reverse())
      )
      :
      (filterByGame ?
        (filteredCharacters.slice().sort((a, b) => {
          const rarityA = rarityOrder.indexOf(a.rarity);
          const rarityB = rarityOrder.indexOf(b.rarity);
          if (rarityA === rarityB) {
            const typeA = typeOrder.indexOf(a.type);
            const typeB = typeOrder.indexOf(b.type);
            if (typeA === typeB) {
              return b.id - a.id;
            }
            return typeB - typeA;
          }
          return rarityB - rarityA;
        })
        )
        :
        bubbleSortDates(URandLRCharacters, URandLRCharacters.length).reverse().concat(bubbleSortDates(SSRCharacters, SSRCharacters.length).reverse())
      )
  }, [allCharacters, filteredCharacters, filterByGame]);

  return sortedCharacters;
}
