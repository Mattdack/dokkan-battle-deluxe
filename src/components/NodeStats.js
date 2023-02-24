import React, { useState } from "react";
import { Handle, Position } from "reactflow";

import * as linkSkillInfo from "../util/linkSkillInfo"


function NodeStats({ id, data }) {
  if(data.nodeType === 'floatNodeBuffs'){
    return <FloatNodeBuffs data={data} />
  } else if(data.nodeType === 'RotationNodeBuffs1') {
    return <RotationNodeBuffs1 data={data}/>
  } else {
    return <RotationNodeBuffs2 data={data}/>
  }
};

function RotationNodeBuffs1({ id, data}) {
  // const [showAccumulation, setShowAccumulation] = useState('Link Skill Names')
  // const [showAccumulation, setShowAccumulation] = useState('Link Skill Stats')
  const [showAccumulation, setShowAccumulation] = useState('Link Skill Accumulation')

  const result = linkSkillInfo.linkSkillStatsBoostedFor2Characters_lvl_1(data.team.Rot1Char1, data.team.Rot1Char2)
  // console.log(result)
   return (
     <div className={`w-[180px] h-max-[200px] border-4 border-${data.color} text-base font-bold p-2 bg-white`}>
      <Handle type="target" id='left' position={data.handlePositionLeft} style={{ position:'absolute', left:4, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: 'white', borderColor: 'white'}}/>
      <Handle type="target" id='right' position={data.handlePositionRight} style={{ position:'absolute', right:4, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: 'white', borderColor: 'white'}}/>
      
      {showAccumulation === 'Link Skill Stats' && (
        <>
          {result.linkStats.map((linkSkillName) => (
            <p className="text-sm" key={linkSkillName}>{linkSkillName}</p>
          ))}
        </>
      )}

      {showAccumulation === 'Link Skill Names' && (
        <>
          {result.linkNames.map((linkSkillName) => (
            <p className="text-sm" key={linkSkillName}>{linkSkillName}</p>
          ))}
        </>
      )}

      {showAccumulation === 'Link Skill Accumulation' && (
        <>
          {result.linkAccumulation.ATK !== undefined && result.linkAccumulation.ATK.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>ATK: {result.linkAccumulation.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.DEF !== undefined && result.linkAccumulation.DEF.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>DEF: {result.linkAccumulation.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.Ki !== undefined && result.linkAccumulation.Ki.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>Ki: {result.linkAccumulation.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
          ) : null}
        </>
      )}
      
     </div>
   );
 };

function RotationNodeBuffs2({ id, data}) {
  // const [showAccumulation, setShowAccumulation] = useState('Link Skill Names')
  // const [showAccumulation, setShowAccumulation] = useState('Link Skill Stats')
  const [showAccumulation, setShowAccumulation] = useState('Link Skill Accumulation')

  const result = linkSkillInfo.linkSkillStatsBoostedFor2Characters_lvl_1(data.team.Rot2Char1, data.team.Rot2Char2)
  // console.log(result)
  return (
    <div className={`w-[180px] h-max-[200px] border-4 border-black text-base font-bold p-2 bg-white`}>
      <Handle type="source" id='left' position={data.handlePositionLeft} style={{ position:'absolute', left:4, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: 'white', borderColor: 'white'}}/>
      <Handle type="source" id='right' position={data.handlePositionRight} style={{ position:'absolute', right:4, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: 'white', borderColor: 'white'}}/>
      {showAccumulation === 'Link Skill Stats' && (
        <>
          {result.linkStats.map((linkSkillName) => (
            <p className="text-sm" key={linkSkillName}>{linkSkillName}</p>
          ))}
        </>
      )}

      {showAccumulation === 'Link Skill Names' && (
        <>
          {result.linkNames.map((linkSkillName) => (
            <p className="text-sm" key={linkSkillName}>{linkSkillName}</p>
          ))}
        </>
      )}

      {showAccumulation === 'Link Skill Accumulation' && (
        <>
          {result.linkAccumulation.ATK !== undefined && result.linkAccumulation.ATK.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>ATK: {result.linkAccumulation.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.DEF !== undefined && result.linkAccumulation.DEF.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>DEF: {result.linkAccumulation.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.Ki !== undefined && result.linkAccumulation.Ki.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>Ki: {result.linkAccumulation.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
          ) : null}
        </>
      )}
    </div>
  );
};


function FloatNodeBuffs({ id, data}) {
  // const [showAccumulation, setShowAccumulation] = useState('Link Skill Names')
  // const [showAccumulation, setShowAccumulation] = useState('Link Skill Stats')
  const [showAccumulation, setShowAccumulation] = useState('Link Skill Accumulation')
  if(!data.team){
    return null
  }
  const result = linkSkillInfo.linkSkillStatsBoostedForFloatCharacter(data.team.rot1, data.team.rot2, data.team.float)
  if (!result) {
    return null;
  }
  return (
    <div className={`w-[150px] h-[160px] border-4 border-black text-base font-bold p-2 bg-white`}>
      <Handle type="source" position={Position.Top} style={{ position:'absolute', top:4, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: 'white', borderColor: 'white'}}/>
      <Handle type="target" position={Position.Bottom} style={{ position:'absolute', bottom:4, minWidth: 0, width:0, minHeight:0, height:0, backgroundColor: 'white', borderColor: 'white'}}/>

      {showAccumulation === 'Link Skill Names' && (
        <>
          {result.linkNames.uNusedLinks.map((linkSkillName) => (
            <p className="text-sm" key={linkSkillName}>{linkSkillName}</p>
          ))}

          <div className="w-full h-[1px] border border-black"></div>

          {result.linkNames.usedLinks.map((linkSkillName) => (
            <p className="text-sm text-gray-400" key={linkSkillName}>{linkSkillName}</p>
          ))}
        </>
      )}

      {showAccumulation === 'Link Skill Stats' && (
        <>
          {result.linkStats.uNusedLinkStats.map((linkSkillName) => (
            <p className="text-sm" key={linkSkillName}>{linkSkillName}</p>
          ))}

          <div className="w-full h-[1px] border border-black"></div>


          {result.linkStats.usedLinkStats.map((linkSkillName) => (
            <p className="text-sm text-gray-400" key={linkSkillName}>{linkSkillName}</p>
          ))}
        </>
      )}

      {showAccumulation === 'Link Skill Accumulation' && (
        <>
          {result.linkAccumulation.uNusedLinksStatsBoost.ATK !== undefined && result.linkAccumulation.uNusedLinksStatsBoost.ATK.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>ATK: {result.linkAccumulation.uNusedLinksStatsBoost.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.uNusedLinksStatsBoost.DEF !== undefined && result.linkAccumulation.uNusedLinksStatsBoost.DEF.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>DEF: {result.linkAccumulation.uNusedLinksStatsBoost.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.uNusedLinksStatsBoost.Ki !== undefined && result.linkAccumulation.uNusedLinksStatsBoost.Ki.reduce((a, b) => a + b, 0) !== 0 ? (
            <p>Ki: {result.linkAccumulation.uNusedLinksStatsBoost.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
          ) : null}

          <div className="w-full h-[1px] border border-black"></div>

          {result.linkAccumulation.usedLinksStatsBoost.ATK !== undefined && result.linkAccumulation.usedLinksStatsBoost.ATK.reduce((a, b) => a + b, 0) !== 0 ? (
            <p className="text-gray-400">ATK: {result.linkAccumulation.usedLinksStatsBoost.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.usedLinksStatsBoost.DEF !== undefined && result.linkAccumulation.usedLinksStatsBoost.DEF.reduce((a, b) => a + b, 0) !== 0 ? (
            <p className="text-gray-400">DEF: {result.linkAccumulation.usedLinksStatsBoost.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
          ) : null}
          {result.linkAccumulation.usedLinksStatsBoost.Ki !== undefined && result.linkAccumulation.usedLinksStatsBoost.Ki.reduce((a, b) => a + b, 0) !== 0 ? (
            <p className="text-gray-400">Ki: {result.linkAccumulation.usedLinksStatsBoost.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default NodeStats;
