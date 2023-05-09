import React, { useState, useRef } from "react";
import ReactDom from "react-dom";
import ReactFlow, { Position } from "reactflow";
import 'reactflow/dist/style.css';

import html2canvas from "html2canvas";

import TeamAnalysisCard from "../components/TeamAnalysisCard";
import NodeStats from "../components/NodeStats"

const nodeTypes = {
  character: TeamAnalysisCard,
  stats: NodeStats
};

export default function TeamAnalysis( {team, open, onClose} ) {
  if(typeof team.characters === 'undefined'){
    return null
  }

  const teamArr = team?.characters || []
  const rotation1 = team?.info?.rotation1 || []
  const rotation2 = team?.info?.rotation2 || []

  let Rot1Char1 = teamArr.find((character) => character.id === rotation1[0])
  let Rot1Char2 = teamArr.find((character) => character.id === rotation1[1])
  let Rot2Char1 = teamArr.find((character) => character.id === rotation2[0])
  let Rot2Char2 = teamArr.find((character) => character.id === rotation2[1])
  let floatCharacters = teamArr.filter((character) => character.id !== rotation1[0] && character.id !== rotation1[1] && character.id !== rotation2[0] && character.id !== rotation2[1])
  let float1 = floatCharacters[0]
  let float2 = floatCharacters[1]
  let float3 = floatCharacters[2]

  if (teamArr.length === 6) {
    if (!rotation1.includes(team?.info?.leader) && !rotation2.includes(team?.info?.leader)) {
      let leaderChar = teamArr.find((character) => character.id === team?.info?.leader)
      float1 = leaderChar
      float3 = leaderChar
      float2 = teamArr.find((character) => character.id !== rotation1[0] && character.id !== rotation1[1] && character.id !== rotation2[0] && character.id !== rotation2[1] && character.id !== leaderChar.id)
    } else if ((rotation1.includes(team?.info?.leader) && !rotation2.includes(team?.info?.leader)) || (!rotation1.includes(team?.info?.leader) && rotation2.includes(team?.info?.leader))) {
      let leaderChar = teamArr.find((character) => character.id === team?.info?.leader)
      let remainingChars = teamArr.filter((character) => character !== Rot1Char1 && character !== Rot1Char2 && character !== Rot2Char1 && character !== Rot2Char2 && character !== leaderChar)
      float1 = remainingChars[0]
      float2 = remainingChars[1]
      float3 = leaderChar
    }
  }
  
  if(!open) {return null}

  return(
    <>
      <TeamAnalysisWeb Rot1Char1={Rot1Char1} Rot1Char2={Rot1Char2} Rot2Char1={Rot2Char1} Rot2Char2={Rot2Char2} float1={float1} float2={float2} float3={float3} onClose={onClose}/>
    </>
  )
}

function TeamAnalysisWeb ( {Rot1Char1, Rot1Char2, Rot2Char1, Rot2Char2, float1, float2, float3, onClose} ){
  const rotation1StatsPosition = {x:440, y:40}
  const floatRow1Stats = {y:260}
  const floatRow2Stats = {y:630}

  const initialNodes = [
    //rotation 1 characters
    {
      id: 'rotation1-1',
      type: 'character',
      data: {
        character: Rot1Char1, 
        handlePositionBottom: Position.Bottom,
        handlePositionRight: Position.Right,
        color: 'black'
      },
      style: {width: 125, height: 125},
      position: { x: 260, y: 100 },
    },
    {
      id: 'rotation1-2',
      type: 'character',
      data: {
        character: Rot1Char2, 
        handlePositionBottom: Position.Bottom,
        handlePositionLeft: Position.Left,
      },
      position: { x: 670, y: 100 },
    },
    //floating characters
    {
      id: 'float-1',
      type: 'character',
      data: {
        character: float1, 
        handlePositionTop: Position.Top,
        handlePositionBottom: Position.Bottom,
      },
      position: { x: 157, y: 465 },
    },
    {
      id: 'float-2',
      type: 'character',
      data: {
        character: float2, 
        handlePositionTop: Position.Top,
        handlePositionBottom: Position.Bottom,
      },
      position: { x: 475, y: 465 },
    },
    {
      id: 'float-3',
      type: 'character',
      data: {
        character: float3, 
        handlePositionTop: Position.Top,
        handlePositionBottom: Position.Bottom,
      },
      position: { x: 778, y: 465 },
    },
    //rotation 2 characters
    {
      id: 'rotation2-1',
      type: 'character',
      data: {
        character: Rot2Char1, 
        handlePositionTop: Position.Top,
        handlePositionRight: Position.Right,
      },
      position: { x: 260, y: 830 },
    },
    {
      id: 'rotation2-2',
      type: 'character',
      data: {
        character: Rot2Char2, 
        handlePositionTop: Position.Top,
        handlePositionLeft: Position.Left,
      },
      position: { x: 670, y: 830 },
    },
    //rotation 1 stats buffed
    {
      id: 'rotation1-stats',
      type: 'stats',
      data: {
        nodeType: 'RotationNodeBuffs1',
        team: {Rot1Char1, Rot1Char2},
        handlePositionLeft: Position.Left,
        handlePositionRight: Position.Right,
        color:'black',
      },
      position: { x: rotation1StatsPosition.x, y: rotation1StatsPosition.y },
    },
    //float1-1 stats buffed
    {
      id: 'float-stats1-1',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot1Char1, rot2:Rot1Char2, float:float1}
      },
      position: { x: 60, y:floatRow1Stats.y },
    },
    {
      id: 'float-stats1-2',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot1Char1, rot2:Rot1Char2, float:float2}
      },
      position: { x: 210, y:floatRow1Stats.y },
    },
    {
      id: 'float-stats1-3',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot1Char1, rot2:Rot1Char2, float:float3}
      },
      position: { x: 360, y:floatRow1Stats.y },
    },
    //float1-2 stats buffed
    {
      id: 'float-stats1-4',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot1Char2, rot2:Rot1Char1, float:float1}
      },
      position: { x: 570, y:floatRow1Stats.y },
    },
    {
      id: 'float-stats1-5',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot1Char2, rot2:Rot1Char1, float:float2}
      },
      position: { x: 720, y:floatRow1Stats.y },
    },
    {
      id: 'float-stats1-6',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot1Char2, rot2:Rot1Char1, float:float3}
      },
      position: { x: 870, y:floatRow1Stats.y },
    },
    //float2-1 stats buffed
    {
      id: 'float-stats2-1',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot2Char1, rot2:Rot2Char2, float:float1}
      },
      position: { x: 60, y:floatRow2Stats.y },
    },
    {
      id: 'float-stats2-2',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot2Char1, rot2:Rot2Char2, float:float2}
      },
      position: { x: 210, y:floatRow2Stats.y },
    },
    {
      id: 'float-stats2-3',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot2Char1, rot2:Rot2Char2, float:float3}
      },
      position: { x: 360, y:floatRow2Stats.y },
    },
    {
      id: 'float-stats2-4',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot2Char2, rot2:Rot2Char1, float:float1}
      },
      position: { x: 570, y:floatRow2Stats.y },
    },
    {
      id: 'float-stats2-5',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot2Char2, rot2:Rot2Char1, float:float2}
      },
      position: { x: 720, y:floatRow2Stats.y },
    },
    {
      id: 'float-stats2-6',
      type: 'stats',
      data: {
        nodeType: 'floatNodeBuffs',
        team: {rot1:Rot2Char2, rot2:Rot2Char1, float:float3}
      },
      position: { x: 870, y:floatRow2Stats.y },
      filter: function() {
        if (this.data.team.rot1.name === this.data.team.float.name) {
          return null;
        }
        return this;
      }
    },
    //rotation 2 stats buffed
    {
      id: 'rotation2-stats',
      type: 'stats',
      data: {
        nodeType: 'RotationNodeBuffs2',
        team: {Rot2Char1, Rot2Char2},
        handlePositionLeft: Position.Left,
        handlePositionRight: Position.Right,
      },
      style:{ width: 100, height: 100},
      position: { x: rotation1StatsPosition.x, y: 900 },
    },
  ];

  const initialEdges = [
    //rotation 1 edges
    { id: 'rotation1-1>rotation1-stats', source: 'rotation1-1', target: 'rotation1-stats', targetHandle: 'left', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},
    { id: 'rotation1-2>rotation1-stats', source: 'rotation1-2', target: 'rotation1-stats', targetHandle: 'right', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},
    //all float edges for top left side
    { id: 'float-stats1-1>rotation1-1', source: 'float-stats1-1', target: 'rotation1-1', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 } },
    { id: 'float-stats1-2>rotation1-1', source: 'float-stats1-2', target: 'rotation1-1', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 } },
    { id: 'float-stats1-3>rotation1-1', source: 'float-stats1-3', target: 'rotation1-1', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},

    { id: 'float-stats1-1>float-1', source: 'float-1', target: 'float-stats1-1', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 } },
    { id: 'float-stats1-2>float-2', source: 'float-2', target: 'float-stats1-2', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 } },
    { id: 'float-stats1-3>float-3', source: 'float-3', target: 'float-stats1-3', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},
    //all float edges for top right side
    { id: 'float-stats1-4>rotation1-2', source: 'float-stats1-4', target: 'rotation1-2', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},
    { id: 'float-stats1-5>rotation1-2', source: 'float-stats1-5', target: 'rotation1-2', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 }},
    { id: 'float-stats1-6>rotation1-2', source: 'float-stats1-6', target: 'rotation1-2', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},

    { id: 'float-stats1-4>float-1', source: 'float-1', target: 'float-stats1-4', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},
    { id: 'float-stats1-5>float-2', source: 'float-2', target: 'float-stats1-5', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 }},
    { id: 'float-stats1-6>float-3', source: 'float-3', target: 'float-stats1-6', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},
    // all float edges for bottom left side
    { id: 'float-stats2-1>float-1', target: 'float-1', source: 'float-stats2-1', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},
    { id: 'float-stats2-2>float-2', target: 'float-2', source: 'float-stats2-2', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 }},
    { id: 'float-stats2-3>float-3', target: 'float-3', source: 'float-stats2-3', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},

    { id: 'float-stats2-1>rotation2-1', target: 'float-stats2-1', source: 'rotation2-1', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},
    { id: 'float-stats2-2>rotation2-2', target: 'float-stats2-2', source: 'rotation2-1', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 }},
    { id: 'float-stats2-3>rotation2-3', target: 'float-stats2-3', source: 'rotation2-1', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},
    //all float edges for bottom right side
    { id: 'float-stats2-4>float-1', target: 'float-1', source: 'float-stats2-4', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},
    { id: 'float-stats2-5>float-2', target: 'float-2', source: 'float-stats2-5', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 }},
    { id: 'float-stats2-6>float-3', target: 'float-3', source: 'float-stats2-6', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},

    { id: 'float-stats2-4>rotation2-1', target: 'float-stats2-4', source: 'rotation2-2', type: 'straight', style:{ stroke: 'orange', strokeWidth: 7 }},
    { id: 'float-stats2-5>rotation2-2', target: 'float-stats2-5', source: 'rotation2-2', type: 'straight', style:{ stroke: '#1c4595', strokeWidth: 7 }},
    { id: 'float-stats2-6>rotation2-3', target: 'float-stats2-6', source: 'rotation2-2', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 }},

    { id: 'rotation2-1>rotation2-stats', target: 'rotation2-1', source: 'rotation2-stats', sourceHandle: 'left', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 } },
    { id: 'rotation2-2>rotation2-stats', target: 'rotation2-2', source: 'rotation2-stats', sourceHandle: 'right', type: 'straight', style:{ stroke: 'black', strokeWidth: 7 } },
  ];

  //filters out characters with same name so no stats are shown and no connection is made
  const filteredNodes = initialNodes.filter(node => {
    if(node.type && node.data.nodeType === 'floatNodeBuffs') {
      const team = node.data.team;
      return team.rot1.name !== team.float.name;
    }
    if(node.type && node.data.nodeType === 'RotationNodeBuffs1') {
      const team = node.data.team;
      return team.Rot1Char1.name !== team.Rot1Char2.name;
    }
    if(node.type && node.data.nodeType === 'RotationNodeBuffs2') {
      const team = node.data.team;
      return team.Rot2Char1.name !== team.Rot2Char2.name;
    }
    return true;
  });
  

  const [nodes, setNodes] = useState(filteredNodes);
  const [edges, setEdges] = useState(initialEdges);

  //TODO: DON'T DELETE. Will be used to save te webs

  // const printRef = useRef();
  // const handleDownloadImage = async () => {
  //   const element = printRef.current;
  //   const canvas = await html2canvas(element, {
  //     useCORS: true, // use CORS Anywhere to bypass CORS restrictions
  //     proxy: 'https://cors-anywhere.herokuapp.com/' // URL of the CORS Anywhere proxy
  //   });
  
  //   const data = canvas.toDataURL('image/png');
  //   const link = document.createElement('a');
  
  //   if (typeof link.download === 'string') {
  //     link.href = data;
  //     link.download = 'image.png';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     window.open(data);
  //   }
  // };


  return ReactDom.createPortal(
    <>
      <div onClick={onClose} className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[1000]">
        <div className="w-3/4 lg:w-[1080px] h-[1080px] rounded-lg shadow-lg fixed top-[30%] right-[13%] lg:top-[5%] lg:right-[25%] bg-white z-[1000]">
        {/* <button type="button" onClick={handleDownloadImage}>Download as Image</button> */}
        <ReactFlow 
        nodes={nodes} 
        edges={edges}
        nodeTypes={nodeTypes}
        preventScrolling={true}
        zoomOnScroll={false}
        panOnDrag={false}
        className="w-full h-full bg-gradient-radial from-slate-300 to-slate-700"
        // ref={printRef}
        />
        </div>
      </div>
    </>,
    document.getElementById("TeamAnalysis")
  );
}