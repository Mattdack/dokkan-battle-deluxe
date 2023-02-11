export const sortCharactersByGame = (allCharacters) => {
    allCharacters.slice().sort((a, b) => {
    const typeOrder = ['EAGL', 'SAGL', 'ETEQ', 'STEQ', 'EINT', 'SINT', 'ESTR', 'SSTR', 'EPHY', 'SPHY'];
    const rarityOrder = ['UR', 'LR'];
    
    const rarityA = rarityOrder.indexOf(a.rarity);
    const rarityB = rarityOrder.indexOf(b.rarity);
    if (rarityA === rarityB) {
        const typeA = typeOrder.indexOf(a.type);
        const typeB = typeOrder.indexOf(b.type);
        if (typeA === typeB) {
        const dateA = new Date(a.glb_date).getTime();
        const dateB = new Date(b.glb_date).getTime();
        return dateB - dateA;
        }
        return typeB - typeA;
    }
    return rarityB - rarityA;
    }) 
}