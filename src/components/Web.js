import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, { applyNodeChanges, applyEdgeChanges } from "reactflow";
import { countBy } from "lodash";
import * as linkSkillInfo from "../util/linkSkillInfo";

import WebCard from "./WebCard";
import CustomEdge from "./CustomEdge";

// TODO: there wasn't a way to just import the style.css for the reactflow so for now I am just placing it in the index.css
import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: WebCard,
};
const edgeTypes = {
  custom: CustomEdge,
};

function Web({ webOfTeam }) {
  const [existingNodes, setExistingNodes] = useState(buildAllNodes(webOfTeam));
  const [existingEdges, setExistingEdges] = useState(buildAllEdges(existingNodes));

  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => {
      setExistingNodes((prevNodes) =>
        applyNodeChanges(changes, buildAllNodes(webOfTeam, prevNodes))
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

  const combinedNodeData = buildAllNodes(webOfTeam, existingNodes);
  const combinedEdgeData = buildAllEdges(combinedNodeData, existingEdges);

  //TODO: this needed the webOfTeam to ensure that new nodes added could have edges applied to them. I think the error was coming from new nodes being added and edgees couldn't be attached if they were in the selected mode, causing no edges to be made sense that node was selected on drag
  useEffect(() => {
    if (!selectedNode) {
      return;
    }
    setExistingEdges((prevEdges) => {
      const updatedEdges = combinedEdgeData.map((edge) => {
        if (
          edge.source === selectedNode.id ||
          edge.target === selectedNode.id
        ) {
          return { ...edge, selected: true };
        } else {
          return { ...edge, selected: false };
        }
      });
      return updatedEdges;
    });
  }, [selectedNode, setSelectedNode, webOfTeam]);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const onNodeDragStart = (event, node) => {
    setSelectedNode(node);
  };

  const onNodeDragStop = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <div className="h-[45vh]">
      <div className="h-full bg-slate-700 row-span-6 rounded-md">
        <ReactFlow
          nodes={combinedNodeData}
          edges={combinedEdgeData}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          fitView
          onNodeClick={onNodeClick}
          className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900"
        ></ReactFlow>
      </div>
    </div>
  );
}

const buildAllNodes = (team, nodes = []) => {
  const nodeDictionary = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );
  const midpoint = computeMidpoint(team, nodeDictionary);
  return team.map((character) =>
    toNode(character, midpoint, nodeDictionary[character.id])
  );
};

const startingPosition = { x: 10, y: 10 };

const toNode = (character, midpoint, existingNode = {}) => ({
  id: character.id.toString(),
  type: "custom",
  data: { midpoint, ...character },
  position: startingPosition,
  style: {
    visibility: "visible",
  },
  ...existingNode,
});

const toEdge = (source, target, existingEdge = {}) => ({
  id: toEdgeId(source, target),
  type: "custom",
  data: {
    sharedLinks: countSharedLinks(source, target),
    sourceNode: source,
    targetNode: target,
  },
  source: source.id,
  target: target.id,
  interactionWidth: 0,
  ...existingEdge,
});

const countSharedLinks = (source, target) => {
  // this first instance is on node addition
  if (source.data && source.data.link_skill) {
    const result = countBy(source.data.link_skill, (link_skill) =>
      target.data.link_skill.includes(link_skill)
    );
    return result.true;
    // this second statement is on node click (for some reason source/target change)
  } else if (source && source.link_skill) {
    const result = countBy(source.link_skill, (link_skill) =>
      target.link_skill.includes(link_skill)
    );
    return result.true;
  } else {
    console.log("idk dawg");
  }
};

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

const computeMidpoint = (team, nodeDictionary) => {
  if (!team.length) {
    return startingPosition;
  }
  const { x: xSum, y: ySum } = team.reduce(
    (aggregate, currentCharacter) => {
      const { x, y } =
        nodeDictionary[currentCharacter.id]?.position || startingPosition;
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
