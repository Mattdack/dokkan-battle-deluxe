import { data } from "autoprefixer";
import { all } from "axios";
import React, { useEffect, useState } from "react";
import { EdgeProps, getBezierPath, EdgeLabelRenderer, useEdgesState } from "reactflow";
import * as linkSkillInfo from "../util/linkSkillInfo";

const CustomEdge = (props) => {
  const {id,sourceX,sourceY,targetX,targetY,sourcePosition,targetPosition,data} = props;
  const [edgePath, labelX, labelY] = getBezierPath({sourceX,sourceY,sourcePosition,targetX,targetY,targetPosition,});
  
  const [showLinkInfo, setShowLinkInfo] = useState(false);
  const [edgeSelected, setEdgeSelected] = useState(false);

  useEffect(() => {
    setEdgeSelected(props.selected);
  }, [props.selected])

  if (!id) {
    return null;
  }
  
  const sourceNodeLinks = data.sourceNode.data.link_skill;
  const targetNodeLinks = data.targetNode.data.link_skill;
  const matchedLinks = linkSkillInfo.findMatchingLinks(sourceNodeLinks, targetNodeLinks);
  let matchedLinkInfo = [];
  for (let i = 0; i < matchedLinks.length; i++) {
    matchedLinkInfo.push(linkSkillInfo.getLvl1LinkSkillInfo(matchedLinks[i]));
  }

  function handleShowLinkInfo (event) {
    setShowLinkInfo(!showLinkInfo)
  }

  return (
    <> 
      <path key={id} id={id} className="react-flow__edge-path" d={edgePath} style={{ stroke: edgeSelected?"orange":"white", strokeWidth: edgeSelected?"5px":"1px" }}/>

      <EdgeLabelRenderer>
      <div
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
            zIndex: edgeSelected ? (showLinkInfo ? 1000 : 100) : 1,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onClick={() => handleShowLinkInfo()}
        >
          {!showLinkInfo ? (<div className="font-bold text-2xl"> {data.sharedLinks} </div>) 
          : 
          (matchedLinkInfo.map((linkSkillInfo) => {
              return (
                <div className="nodrag nopan p-1 w-20 text-md border-b border-black"> {linkSkillInfo} </div>
              );
            })
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};


export default CustomEdge;