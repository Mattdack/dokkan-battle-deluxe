import React, { useEffect, useState, useContext } from "react";
import { EdgeProps, getStraightPath, EdgeLabelRenderer, useEdgesState } from "reactflow";
import * as linkSkillInfo from "../util/linkSkillInfo";

import { UserContext } from "../App"; 

const CustomEdge = (props) => {
  const {id,sourceX,sourceY,targetX,targetY,sourcePosition,targetPosition,data} = props;
  const [edgePath, labelX, labelY] = getStraightPath({sourceX,sourceY,sourcePosition,targetX,targetY,targetPosition,});
  
  const [showLinkInfo, setShowLinkInfo] = useState(false);
  const [edgeSelected, setEdgeSelected] = useState(false);
  const { showSummationLinks, setShowSummationLinks } = useContext(UserContext);

  useEffect(() => {
    setEdgeSelected(props.selected);
  }, [props.selected])
  
  const sourceNodeLinks = data.sourceNode.data.link_skill;
  const targetNodeLinks = data.targetNode.data.link_skill;
  const matchedLinks = linkSkillInfo.findMatchingLinks(sourceNodeLinks, targetNodeLinks);
  let matchedLinkInfo = [];
  for (let i = 0; i < matchedLinks.length; i++) {
    matchedLinkInfo.push(linkSkillInfo.getLvl1LinkSkillInfo(matchedLinks[i]));
  }
  // uses the linkSkillInfo function which only grabs the stats that were changed
  const summationLinkSkillStatsBoosted = linkSkillInfo.linkSkillStatBoosts(matchedLinkInfo)

  function handleShowLinkInfo (event) {
    setShowLinkInfo(!showLinkInfo)
  }

  if (!id) {
    return null;
  }

  return (
    <> 
      <path key={id} id={id} className="react-flow__edge-path" d={edgePath} style={{ stroke: edgeSelected?"orange":"white", strokeWidth: edgeSelected ? "7px" : "3px", zIndex: edgeSelected ? '10' : '1' }}/>

      <EdgeLabelRenderer>
      <div
      // styling for the label on top of the edge
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: edgeSelected?"#ffcc00": "white",
            padding: 5,
            borderWidth: edgeSelected ? "4px" : "",
            borderColor: edgeSelected ? "#000000" : "",
            borderStyle: edgeSelected ? "solid" : "",
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            zIndex: edgeSelected ? (showLinkInfo ? 3000 : 1001) : 1000,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onClick={() => handleShowLinkInfo()}
        >
          {!showLinkInfo ? 
            edgeSelected && showSummationLinks ?
              <div className="flex flex-col p-1 justify-center items-center">
                <p className="text-base">ATK: {summationLinkSkillStatsBoosted.ATK.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
                <p className="text-base">DEF: {summationLinkSkillStatsBoosted.DEF.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}%</p>
                <p className="text-base">Ki: {summationLinkSkillStatsBoosted.Ki.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
              </div>
              : 
              <div className="font-bold text-2xl z-[1005]"> {data.sharedLinks} </div>
          : 
          (matchedLinkInfo.map((linkSkillInfo) => {
              return (
                <div key={id} className="nodrag nopan p-1 w-20 text-md border-b border-black"> {linkSkillInfo} </div>
              );
            })
          )
          }
        </div>
      </EdgeLabelRenderer>
    </>
  );
};


export default CustomEdge;