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

import 'reactflow/dist/base.css';

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
          data:character, 
          position: { x: 10, y: 10 },
          style: {visibility: "visible"}
        },
      ]);
    });

    
  }, [props.webOfTeam]);

  useEffect(() => {
    for (let i = 0; i < props.webOfTeam.length; i++) {
      for (let j = 0; j < props.webOfTeam.length; j++) {
        if(i !== j) {
          console.log("We should be making edges");
          console.log(props.webOfTeam[i].id)
          console.log(props.webOfTeam[j].id)
          console.log(props.webOfTeam[i].id + props.webOfTeam[j].id)
          console.log("===================================")
          setEdges((prev) => [
            ...prev,
            {
              id: props.webOfTeam[i].id + props.webOfTeam[j].id,
              source: props.webOfTeam[i].id,
              target: props.webOfTeam[j].id,
              type: "smoothstep",
              style: {visibility: "visible"}
            },
          ])
        } 
      }
    }

  }, [nodes])

  return (
    <div className="h-72">
      <div className="h-full bg-slate-700 row-span-6 rounded-md">
        <ReactFlow
          nodes={nodes}
          edges={edges}
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
// }

export default Web;
