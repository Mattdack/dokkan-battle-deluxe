export const getChracterThumbNail = (cardDetails) => {
  if (!cardDetails.thumb) {
    return cardDetails.art;
  } else {
    return cardDetails.thumb;
  }
};

export const getCharacterRarityBackground = (cardDetails) => {
  if (cardDetails.rarity.trim() === "UR") {
    return process.env.PUBLIC_URL + "/dokkanIcons/rarities/UR.png";
  } else {
    return process.env.PUBLIC_URL + "/dokkanIcons/rarities/LR.png";
  }
};

export const getCharacterTypeBackground = (cardDetails) => {
  if (cardDetails.type.includes("PHY")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/agl-background.png";
  } else if (cardDetails.type.includes("AGL")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/agl-background.png";
  } else if (cardDetails.type.includes("STR")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/str-background.png";
  } else if (cardDetails.type.includes("INT")) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/int-background.png";
  } else {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/teq-background.png";
  }
};

export const getCharacterTypeText = (cardDetails) => {
  if (cardDetails.type.trim() === "EPHY" || cardDetails.type === "PHY-E") {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/ephy.png";
  } else if (
    cardDetails.type.trim() === "SPHY" ||
    cardDetails.type === "PHY-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sphy.png";
  } else if (
    cardDetails.type.trim() === "EAGL" ||
    cardDetails.type === "AGL-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eagl.png";
  } else if (
    cardDetails.type.trim() === "SAGL" ||
    cardDetails.type === "AGL-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sagl.png";
  } else if (
    cardDetails.type.trim() === "ESTR" ||
    cardDetails.type === "STR-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/estr.png";
  } else if (
    cardDetails.type.trim() === "SSTR" ||
    cardDetails.type === "STR-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sstr.png";
  } else if (
    cardDetails.type.trim() === "EINT" ||
    cardDetails.type === "INT-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eint.png";
  } else if (
    cardDetails.type.trim() === "SINT" ||
    cardDetails.type === "INT-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/sint.png";
  } else if (
    cardDetails.type.trim() === "EINT" ||
    cardDetails.type === "INT-E"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eint.png";
  } else if (
    cardDetails.type.trim() === "STEQ" ||
    cardDetails.type === "TEQ-S"
  ) {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/steq.png";
  } else {
    return process.env.PUBLIC_URL + "/dokkanIcons/types/eteq.png";
  }
};
