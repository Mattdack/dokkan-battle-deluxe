import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "reactflow";
import { countBy, set } from "lodash";
import * as linkSkillInfo from "../util/linkSkillInfo";

import WebCard from "./WebCard";
import CustomEdge from "./CustomEdge";

// TODO: there wasn't a way to just import the style.css for the reactflow so for now I am just placing it in the index.css
import "reactflow/dist/style.css";
import { none } from "@cloudinary/transformation-builder-sdk/qualifiers/progressive";
import { color } from "d3-color";

const nodeTypes = {
  custom: WebCard,
};
const edgeTypes = {
  custom: CustomEdge,
};

const viewPort = {
  x: 0,
  y: 0,
  zoom: .5,
};

function Web({ webOfTeam, removeFromWebOfTeam, allCharactersLoading }) {
  const [existingNodes, setExistingNodes] = useState(buildAllNodes(webOfTeam));
  const [existingEdges, setExistingEdges] = useState(buildAllEdges(existingNodes));
  const [selectedNode, setSelectedNode] = useState(null);

  const myDivRef = useRef(null);
  const [webWidth, setWebWidth] = useState(null)
  const [webHeight, setWebHeight] = useState(null)

  useEffect(() => {
    setWebWidth(myDivRef.current.offsetWidth)
    setWebHeight(myDivRef.current.offsetHeight)
  }, [allCharactersLoading]);
  

  const onNodesChange = useCallback(
    (changes) => {
      setExistingNodes((prevNodes) =>
        applyNodeChanges(changes, buildAllNodes(webOfTeam, prevNodes, webWidth, webHeight))
      );
    },
    [setExistingNodes, setExistingEdges, webOfTeam]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setExistingEdges((prevEdges) =>
        applyEdgeChanges(changes, buildAllEdges(webOfTeam, prevEdges))
      );
    },
    [setExistingEdges, webOfTeam]
  );

  const combinedNodeData = buildAllNodes(webOfTeam, existingNodes, webWidth, webHeight);
  const combinedEdgeData = buildAllEdges(combinedNodeData, existingEdges);

  //TODO: this needed the webOfTeam to ensure that new nodes added could have edges applied to them. I think the error was coming from new nodes being added and edgees couldn't be attached if they were in the selected mode, causing no edges to be made sense that node was selected on drag
  
  const onNodeClick = (event, node) => {
    setSelectedNode(node)
  };

  const onNodeDrag = (event, node) => {
    setSelectedNode(null)
    console.log('node drag')
  }
  
  const onNodeDragStart = (event, node) => {
    setSelectedNode(null)
    console.log('drag start')
  };

  const onNodeDragStop = (event, node) => {
    setSelectedNode(null)
    console.log('drag stop')
  }
  
  // this function launches the function removeFromWebOfTeam which was passed from AllComponents>SuggestToWeb>Web
  const onNodeDoubleClick = (event, node) => {
    setSelectedNode(null)
    removeFromWebOfTeam(node.data);
  };

  const onEdgeClick = (event, edge) => {
    // this checks to see if a selectedNode is present. If it is, then it just sets the selected edges to what ever the node is. This allows for the edges to remain orange even after a label click
    if(selectedNode){
      if(!edge.selected){
        return
      }
      setExistingEdges((prevEdges) => {
        const updatedEdges = combinedEdgeData.map((edge) => {
          if (edge.source === selectedNode.id || edge.target === selectedNode.id) {
            return { ...edge, selected: true };
          } else {
            return { ...edge, selected: false };
          }
        });
        return updatedEdges;
      });
    }
  }

  const onPaneClick = () => {
    setSelectedNode(null)
  }

  // this useEffect updates the edges to selected if the node connected to them is clicked
  useEffect(() => {
    console.log('use Effect being used')
    if (!selectedNode) {
      return;
    }
    setExistingEdges((prevEdges) => {
      const updatedEdges = combinedEdgeData.map((edge) => {
        if (edge.source === selectedNode.id || edge.target === selectedNode.id) {
          return { ...edge, selected: true };
        } else {
          return { ...edge, selected: false };
        }
      });
      return updatedEdges;
    });
  }, [selectedNode]);

  const handleResetTeam = (webOfTeam) => {
    for (let i = 0; i < webOfTeam.length; i++) {
      removeFromWebOfTeam(webOfTeam[i])      
    }
  }

  return (
    <div ref={myDivRef} className="h-[45vh] lg:h-[40vh]">
      <div className="h-full bg-slate-700 row-span-6 rounded-md relative">
        <div className="absolute top-0 right-0 bg-red-500 w-20 h-20"></div>
        <button
        className="p-2 text-sm card-sm:text-lg text-black bg-white rounded-lg absolute bottom-2 left-2 z-50"
        onClick={() => handleResetTeam(webOfTeam)}
        >Reset Team</button>
        <ReactFlow
          nodes={combinedNodeData}
          edges={combinedEdgeData}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeDrag={onNodeDrag}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          defaultViewport={viewPort}
          className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900"
        >
        </ReactFlow>
      </div>
    </div>
  );
}

const buildAllNodes = (team, nodes = [], webWidth, webHeight) => {
  const nodeDictionary = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );
  const midpoint = computeMidpoint(team, nodeDictionary, webWidth, webHeight);
  return team.map((character) =>
    toNode(character, midpoint, nodeDictionary[character.id], webWidth, webHeight)
  );
};

const startingPosition = (webWidth, webHeight) => {
  if (webHeight === null || typeof webWidth === 'undefined'){
    // console.log('no width rendered')
    return {x: 0, y:0}
  }
  return {x: webWidth-100, y: webHeight-100}
};

const toNode = (character, midpoint, existingNode = {}, webWidth, webHeight) => ({
  id: character.id.toString(),
  type: "custom",
  data: { midpoint, ...character },
  position: startingPosition(webWidth, webHeight),
  style: {
    visibility: "visible",
  },
  zIndex: 1,
  ...existingNode,
});

const toEdge = (source, target, existingEdge = {}) => {
  //for some reason, the source or target can be just the character object instead of the node object. This catches that and returns nothing
  if (!source.hasOwnProperty('data') || !target.hasOwnProperty('data')) {
    return {};
  }
  // this checks if the character has the same name, id, or no shared links and returns nothing
  if (source.data.id === target.data.id || source.data.name === target.data.name || countSharedLinks(source, target)===0) {
    return {};
  }
    return {
      id: toEdgeId(source, target),
      type: "custom",
      data: {
        sharedLinks: countSharedLinks(source, target),
        sourceNode: source,
        targetNode: target,
      },
      labelStyle:
      {style: {zIndex:1000}},
      source: source.id,
      target: target.id,
      interactionWidth: 0,
      selected:false,
      ...existingEdge,
    }
};

const countSharedLinks = (source, target) => {
  // this first instance is on node addition to ensure that source.data and source.data.link_skill exist
  if (source.data && source.data.link_skill) {
    const result = countBy(source.data.link_skill, (link_skill) =>
      target.data.link_skill.includes(link_skill)
    );
    // the ternarys allows the calculation to return a 0....if else it returns and undefined
    return (typeof result.true === 'undefined') ? 0 : result.true;
    // this second statement is on node click (for some reason source/target change) but ensures that the link_skill exist
  } else if (source && source.link_skill) {
    const result = countBy(source.link_skill, (link_skill) =>
      target.link_skill.includes(link_skill)
    );
    return (typeof result.true === 'undefined') ? 0 : result.true;
  } else {
    return 0
  }
};

const buildAllEdges = (nodes, edges = []) => {
  const edgeDictionary = Object.fromEntries(
    edges.map((edge) => [edge.id, edge])
  );
  const newEdges = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // the node object (not character directly)
      // console.log(nodes[i], nodes[j])
      newEdges.push(
        toEdge(nodes[i], nodes[j], edgeDictionary[toEdgeId(nodes[i], nodes[j])])
      );
    }
  }
  return newEdges;
};

const toEdgeId = (source, target) => `${source.id}-${target.id}`;

const computeMidpoint = (team, nodeDictionary, webWidth, webHeight) => {
  if (!team.length) {
    return startingPosition(webWidth, webHeight);
  }
  const { x: xSum, y: ySum } = team.reduce(
    (aggregate, currentCharacter) => {
      const { x, y } =
        nodeDictionary[currentCharacter.id]?.position || startingPosition(webWidth, webHeight);
      return {
        x: aggregate.x + x,
        y: aggregate.y + y,
      };
    },
    { x: 0, y: 0 }
  );
  return { x: xSum / team.length, y: ySum / team.length };
};

export default Web;
