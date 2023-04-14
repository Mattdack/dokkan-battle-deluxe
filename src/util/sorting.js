export function sortCharacters(allCharacters, filteredCharacters, filterByGame) {
  const typeOrder = ["EAGL", "SAGL", "ETEQ", "STEQ", "EINT", "SINT", "ESTR", "SSTR", "EPHY", "SPHY"];
  const rarityOrder = ["UR", "LR"];

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
      (allCharacters.slice().sort((a, b) => {
        return b.id - a.id;
      }))
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
      (filteredCharacters.slice().sort((a, b) => {
        return b.id - a.id;
      }))
    )
}
