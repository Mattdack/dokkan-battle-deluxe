import { data } from "autoprefixer";
import { all } from "axios";
import React, { useEffect, useState } from "react";
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from "reactflow";
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
  
  const sourceNode = data.sourceNode.data.link_skill;
  const targetNode = data.targetNode.data.link_skill;
  const matchedLinks = linkSkillInfo.findMatchingLinks(sourceNode, targetNode);
  let matchedLinkInfo = [];
  for (let i = 0; i < matchedLinks.length; i++) {
    matchedLinkInfo.push(linkSkillInfo.getLvl1LinkSkillInfo(matchedLinks[i]));
  }
  
  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: edgeSelected ? "orange" : "white",
          strokeWidth: edgeSelected ? "3px" : "1px",
          zIndex: edgeSelected ? "800" : "1",
        }}
      />

      <EdgeLabelRenderer>
      <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#ffcc00",
            padding: 10,
            borderWidth: 2,
            borderWidth: edgeSelected ? "4px" : "0px",
            borderColor: "#000000",
            borderStyle: "solid",
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            zIndex: edgeSelected ? 1000 : 1, 
            pointerEvents: "all",
          }}
          className="nodrag nopan test1"
          onClick={() => setShowLinkInfo(!showLinkInfo)}
        >
          {!showLinkInfo ? (
            <div
            style={{zIndex:900}}
            >{data.sharedLinks}</div>
          ) : (
            matchedLinkInfo.map((linkSkillInfo) => {
              return (
                <div
                style={{zIndex:1000}}
                  className="nodrag nopan w-20 border-b border-black p-1"
                >
                  {linkSkillInfo}
                </div>
              );
            })
          )}
        </div>

      </EdgeLabelRenderer>
    </>
  );
};


export default CustomEdge;