import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Controls,
} from "reactflow";
import WebCard from "./WebCard";

import "reactflow/dist/base.css";

const initialEdges = []
const initialNodes = []
const nodeTypes = {
  custom: WebCard,
};

function Web(props) {
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   []
  // );
  
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );


  useEffect(() => {
    props.webOfTeam.forEach((character) => {
      setNodes((prev) => [
        ...prev,
        {
          id: character.id,
          type: "custom",
          data: {
            characterId: character.id,
            characterArt: character.art,
            characterThumb: character.thumb,
            characterType: character.type,
            characterRarity: character.rarity
          },
          position: { x: 0, y: 50 },
          style: {visibility: "visible"}
        },
      ]);
    });

    for (let i = 0; i < props.webOfTeam.length; i++) {
      for (let j = 0; j < props.webOfTeam.length; j++) {
        if(i !== j) {
          console.log("We should be making edges")
          setEdges((prev) => [
            ...prev,
            {
              id: `e${props.webOfTeam[i].id}-${props.webOfTeam[j].id}`,
              source: props.webOfTeam[i].id,
              target: props.webOfTeam[j].id,
            }
          ])
        } 
      }
    }

  }, [props.webOfTeam]);

  return (
    <div className="h-80">
      <div className="h-full bg-slate-700 row-span-6 rounded-md">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-teal-50"
          border = "parent"
        ></ReactFlow>
      </div>
    </div>
  );
}
// }

export default Web;
