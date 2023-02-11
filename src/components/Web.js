import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "reactflow";
import { countBy } from "lodash";
import * as linkSkillInfo from "../util/linkSkillInfo";

import WebCard from "./WebCard";
import CustomEdge from "./CustomEdge";

// TODO: there wasn't a way to just import the style.css for the reactflow so for now I am just placing it in the index.css
import "reactflow/dist/style.css";

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
  // let webWidth = null
  // let webHeight = null
  const [webWidth, setWebWidth] = useState(null)
  const [webHeight, setWebHeight] = useState(null)

  useEffect(() => {
    // webWidth = myDivRef.current.offsetWidth
    // webHeight = myDivRef.current.offsetHeight
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
    setSelectedNode(null)
    setSelectedNode(node);
  };
  
  const onNodeDragStart = (event, node) => {
    setSelectedNode(null);
  };

  const onNodeDragStop = (event, node) => {
    setSelectedNode(null)
  }
  
  // this function launches the function removeFromWebOfTeam which was passed from AllComponents>SuggestToWeb>Web
  const onNodeDoubleClick = (event, node) => {
    removeFromWebOfTeam(node.data);
  };

  const onEdgeClick = () => {
    // this is literally just needed for the useeffect to keep the edge selected when the label is clicked
  }

  const onPaneClick = () => {
    setSelectedNode(null)
  }

  // this is where the web can get a little touchy. This can definitely be optimized on the dependency side, currently it reaches maximum update depth, but still works great. Allows for the edges to be selected on node click and certain drag capabilities. 
  useEffect(() => {
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
  }, [selectedNode, webOfTeam, onEdgesChange, onEdgeClick]);

  const handleResetTeam = (webOfTeam) => {
    for (let i = 0; i < webOfTeam.length; i++) {
      removeFromWebOfTeam(webOfTeam[i])      
    }
  }
  
  // console.log("The width of the div is: " + webWidth + "px");
  // console.log("The height of the div is: " + webHeight + "px");

  return (
    <div className="h-[45vh] lg:h-[40vh]">
      <div 
      ref={myDivRef}
      className="h-full bg-slate-700 row-span-6 rounded-md relative">
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
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          defaultViewport={viewPort}
          className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900"
        ></ReactFlow>
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
  return {x: webWidth, y: webHeight}
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
