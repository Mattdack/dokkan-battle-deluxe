import React, { useState, useCallback } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import WebCard from "./WebCard";
import { countBy } from "lodash";
import "reactflow/dist/base.css";

const nodeTypes = {
  custom: WebCard,
};

function Web({ webOfTeam }) {
  const [existingNodes, setExistingNodes] = useState(buildAllNodes(webOfTeam));
  const [existingEdges, setExistingEdges] = useState(
    buildAllEdges(existingNodes)
  );
  const onNodesChange = useCallback(
    (changes) => {
      setExistingNodes((prevNodes) =>
        applyNodeChanges(changes, buildAllNodes(webOfTeam, prevNodes))
      );
    },
    [setExistingNodes, webOfTeam]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      setExistingEdges((prevEdges) =>
        applyEdgeChanges(changes, buildAllEdges(webOfTeam, prevEdges))
      );
    },
    [setExistingEdges, webOfTeam]
  );

  const combinedNodeData = buildAllNodes(webOfTeam, existingNodes);
  const combinedEdgeData = buildAllEdges(combinedNodeData, existingEdges);

  return (
    <div className="h-72">
      <div className="h-full bg-slate-700 row-span-6 rounded-md">
        <ReactFlow
          nodes={combinedNodeData}
          edges={combinedEdgeData}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900"
        ></ReactFlow>
      </div>
    </div>
  );
}

const startingPosition = {x: 10, y: 10};

const toNode = (character, midpoint, existingNode = {}) => ({
  id: character.id.toString(),
  type: "custom",
  data: {midpoint, ...character},
  position: startingPosition,
  style: {

    visibility: "visible",

  },
  ...existingNode,
});

const buildAllNodes = (team, nodes = []) => {
  const nodeDictionary = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );
  const midpoint = computeMidpoint(team, nodeDictionary);
  return team.map((character) =>
    toNode(character, midpoint, nodeDictionary[character.id])
  );
};

const toEdge = (source, target, existingEdge = {}) => ({
  id: toEdgeId(source, target),
  source: source.id,
  target: target.id,
  label: countSharedLinks(source, target),
  ...existingEdge,
});

const buildAllEdges = (nodes, edges = []) => {
  const edgeDictionary = Object.fromEntries(
    edges.map((edge) => [edge.id, edge])
  );
  const newEdges = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      newEdges.push(
        toEdge(nodes[i], nodes[j], edgeDictionary[toEdgeId(nodes[i], nodes[j])])
      );
    }
  }

  return newEdges;
};

const toEdgeId = (source, target) => `${source.id}-${target.id}`;

const countSharedLinks = (source, target) => {
  // result = { true: count of matching, false: count of missing }
  const result = countBy(source.data.link_skill, (link_skill) =>
    target.data.link_skill.includes(link_skill)
  );
  return result.true;
};

const computeMidpoint = (team, nodeDictionary ) => {
  if(!team.length) {
    return startingPosition;
  }
  const {x:xSum,y:ySum} = team.reduce((aggregate, currentCharacter) => {
    const { x, y } = nodeDictionary[currentCharacter.id]?.position || startingPosition
    return {
      x: aggregate.x + x,
      y: aggregate.y + y,
    }
  }, { x: 0, y: 0 })
    return { x: (xSum / team.length), y: (ySum / team.length) }
}

export default Web;
