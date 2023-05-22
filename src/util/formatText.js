export const formatText = (text) => {
    if(!text){
        return null
    }
    //formats the text to replace < and > with an * then we make the left over text into an array
    const formattedText = text.replace(/<(.*?)>/g, '*');
    const descriptionArray = formattedText.split('*');
  
    // grabs everything from < to >
    const textBetweenBrackets = text.match(/<(.*?)>/g);
    let hoverTextArray = [];
  
    // removes the < and > from the text 
    if (textBetweenBrackets) {
      hoverTextArray = textBetweenBrackets.map(t => t.slice(1, -1));
    }

    console.log(textBetweenBrackets)
} 

export const findAttackPercentageGainAndTurns = (superDescription) => {
    const description = superDescription?.toLowerCase();
    
    const regexPatterns = [
      /raises atk by (\d+)% for (\d+) turn/,
      /raises super attack by (\d+)% for (\d+) turn/,
      /raises atk & def by (\d+)% for (\d+) turn/,
      /raises atk and def by (\d+)% for (\d+) turn/,
      /raises super attack & def by (\d+)% for (\d+) turn/,
      /raises super attack and def by (\d+)% for (\d+) turn/
    ];
  
    let matchFound = false;
    let ATKpercentage, turns;
  
    for (const regex of regexPatterns) {
      const matches = description?.match(regex);
      if (matches) {
        ATKpercentage = parseInt(matches[1]);
        turns = parseInt(matches[2]);
        matchFound = true;
        break;
      }
    }
  
    if (matchFound) {
      // console.log(`ATK percentage gained = ${ATKpercentage}%, amount of turns = ${turns}`);
      return {attackPercentage: ATKpercentage, turns: turns}
    } else {
      // console.log("No match found.");
      return {attackPercentage: 0, turns: 0}
    }
}

export const findDefensePercentageGainAndTurns = (superDescription) => {
  const description = superDescription?.toLowerCase();
  
  const regexPatterns = [
    /raises def by (\d+)% for (\d+) turn/,
    /raises atk & def by (\d+)% for (\d+) turn/,
    /raises atk and def by (\d+)% for (\d+) turn/,
    /raises super attack & def by (\d+)% for (\d+) turn/,
    /raises super attack and def by (\d+)% for (\d+) turn/
  ];

  const superAttackAndDefenseRegexPatterns = [
    /raises super attack by (\d+)% and def by (\d+)% for (\d+) turn/,
    /raises super attack by (\d+)% & def by (\d+)% for (\d+) turn/,
  ];

  let matchFound = false;
  let DEFPercentage, turns;

  for (const regex of regexPatterns) {
    const matches = description?.match(regex);
    if (matches) {
      DEFPercentage = parseInt(matches[1]);
      turns = parseInt(matches[2]);
      matchFound = true;
      break;
    }
  }

  //this is to account for people who super and raise attack and defense on the same line
  for (const regex of superAttackAndDefenseRegexPatterns) {
    const matches = description?.match(regex);
    if (matches) {
      DEFPercentage = parseInt(matches[2]);
      turns = parseInt(matches[3]);
      matchFound = true;
      break;
    }
  }

  if (matchFound) {
    // console.log(`ATK percentage gained = ${DEFPercentage}%, amount of turns = ${turns}`);
    return {defensePercentage: DEFPercentage, turns: turns}
  } else {
    // console.log("No match found.");
    return {defensePercentage: 0, turns: 0}
  }
}

export const filterForATKPerKiSphere = (passiveSkillDescription) => {
  if (!passiveSkillDescription){
    return null
  }
  let descriptionArray
  if (passiveSkillDescription?.includes(';')){
    descriptionArray = passiveSkillDescription?.toLowerCase()?.split('; ')
  } else {
    descriptionArray = [passiveSkillDescription]
  }

  const regexPatterns = [
    /atk & def \+(\d+)% per ki sphere/,
    /atk \+(\d+)% per ki sphere/,
  ];

  let matchFound = false;
  let ATKpercentage

  for (const regex of regexPatterns) {
    // console.log(regex)
    for (const oneDescription of descriptionArray){
      console.log(oneDescription)
      const matches = oneDescription?.match(regex);
      if (matches) {
        ATKpercentage = parseInt(matches[1]);
        matchFound = true;
        break;
      }
    }
  }

  if (matchFound) {
    // console.log(`ATK percentage gained = ${ATKpercentage}% per ki sphere`);
    return {attackPercentage: ATKpercentage}
  } else {
    // console.log("No match found.");
    return {attackPercentage: 0,}
  }
}

export const filterForATKStatsAfterAction = (passiveSkillDescription) => {
  if (!passiveSkillDescription){
    return null
  }
  let descriptionArray
  if (passiveSkillDescription?.includes(';')){
    descriptionArray = passiveSkillDescription?.toLowerCase()?.split('; ')
  } else {
    descriptionArray = [passiveSkillDescription]
  }

  const regexPatterns = [
    /atk & def \+(\d+)% when performing a super attack/,
    /atk \+(\d+)% when performing a super attack/,
    /atk & def \+(\d+)% when performing a super attack/,
    /atk \+(\d+)% when performing a super attack/,
  ];

  let matchFound = false;
  let ATKpercentage

  for (const regex of regexPatterns) {
    console.log(regex)
    for (const oneDescription of descriptionArray){
      console.log(oneDescription)
      const matches = oneDescription?.match(regex);
      if (matches) {
        ATKpercentage = parseInt(matches[1]);
        matchFound = true;
        break;
      }
    }
  }

  if (matchFound) {
    console.log(`ATK percentage gained = ${ATKpercentage}% per ki sphere`);
    return {attackPercentage: ATKpercentage}
  } else {
    // console.log("No match found.");
    return {attackPercentage: 0,}
  }
}