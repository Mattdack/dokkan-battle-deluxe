import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import ReactFlow, {applyNodeChanges,applyEdgeChanges,ReactFlowProvider} from "reactflow";
import { countBy, set } from "lodash";
import * as linkSkillInfo from "../util/linkSkillInfo";

import WebOptionsModal from '../modals/WebOptionsModal.js'
import WebCard from "../cards/WebCard";
import CustomEdge from "./CustomEdge";

import { UserContext } from "../App";

// TODO: there wasn't a way to just import the style.css for the reactflow so for now I am just placing it in the index.css
import "reactflow/dist/style.css";
import SuggestCard from "../cards/SuggestCard";

const rightArrowIcon = process.env.PUBLIC_URL + "/dokkanIcons/icons/right-arrow-icon.png";

const nodeTypes = {
  custom: WebCard,
};
const edgeTypes = {
  custom: CustomEdge,
};

let viewPort = {
  x: 0,
  y: 0,
  zoom: .55,
};

function Web({ webOfTeam, removeFromWebOfTeam, allCharactersLoading, selectedCharacter, handleNewDetails, addToWebOfTeam, statsSelectedOptions, showSuggestedCards, handleSetShowSuggestedCards }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const [existingNodes, setExistingNodes] = useState(buildAllNodes(webOfTeam));
  const [existingEdges, setExistingEdges] = useState(buildAllEdges(existingNodes));
  const [selectedNode, setSelectedNode] = useState(null);
  
  const { showMiddleDiv } = useContext(UserContext);

  const myDivRef = useRef(null);
  const [webWidth, setWebWidth] = useState(null)
  const [webHeight, setWebHeight] = useState(null)
  const [showRemoveFromTeam, setShowRemoveFromTeam] = useState(true)

  useEffect(() => {
    setWebWidth(myDivRef.current.offsetWidth)
    setWebHeight(myDivRef.current.offsetHeight)
  }, [allCharactersLoading, showSuggestedCards, showMiddleDiv, window.innerWidth]);
  
  const onNodesChange = useCallback(
    (changes) => {
      setExistingNodes((prevNodes) =>
        applyNodeChanges(changes, buildAllNodes(webOfTeam, prevNodes, webWidth, webHeight,))
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

  const combinedNodeData = buildAllNodes(webOfTeam, existingNodes, webWidth, webHeight,);
  const combinedEdgeData = buildAllEdges(combinedNodeData, existingEdges);


  //TODO: this needed the webOfTeam to ensure that new nodes added could have edges applied to them. I think the error was coming from new nodes being added and edgees couldn't be attached if they were in the selected mode, causing no edges to be made sense that node was selected on drag
  
  const onNodeClick = (event, node) => {
    setSelectedNode(node)
  };

  const onNodeDrag = (event, node, nodes) => {
    setSelectedNode(null)
    // console.log('node drag')
  }
  
  const onNodeDragStart = (event, node, nodes) => {
    setSelectedNode(null)
    // console.log('drag start')
  };

  const onNodeDragStop = (event, node, nodes) => {
    setSelectedNode(null)
    // console.log('drag stop')
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
    // console.log('use Effect being used')
    if (!selectedNode) {
      return;
    }
    setExistingEdges((prevEdges) => {
      const updatedEdges = combinedEdgeData.map((edge) => {
        if (edge.source === selectedNode.id || edge.target === selectedNode.id) {
          return { ...edge, zIndex: 1001, selected: true };
        } else {
          return { ...edge, zIndex: 1, selected: false };
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

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onLoad = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const handleTeamCenter = () => {
    if (reactFlowInstance) {
      reactFlowInstance.setViewport({ x: 0, y: 0, zoom: 0.55 });
      setExistingNodes((prevNode) => {
        let windowWidthToUse;
        let windowHeightToUse;
        if(window.innerWidth < 850){
          windowWidthToUse = window.innerWidth
          windowHeightToUse = window.innerHeight-30
        } else {
          windowWidthToUse = webWidth
          windowHeightToUse = webHeight+100
        }
        const numNodes = combinedNodeData.length;
        const minDimension = Math.min(windowWidthToUse, windowHeightToUse);
        
        let updatedNodes;
        if (numNodes === 5) {
          const squareDim = minDimension;
          const topLeft = { x: (windowWidthToUse - squareDim/1.4) , y: (windowHeightToUse - squareDim/1)};
          updatedNodes = [
            { ...combinedNodeData[0], position: { x: topLeft.x, y: topLeft.y } },
            { ...combinedNodeData[1], position: { x: topLeft.x + squareDim, y: topLeft.y } },
            { ...combinedNodeData[2], position: { x: topLeft.x + squareDim, y: topLeft.y + squareDim } },
            { ...combinedNodeData[3], position: { x: topLeft.x, y: topLeft.y + squareDim } },
            { ...combinedNodeData[4], position: { x: topLeft.x + squareDim / 2, y: topLeft.y + squareDim / 2 } },
          ];
        } else {
          const radius = (minDimension * 1.4 / 2)
          const center = { x: windowWidthToUse / 1.33, y: windowHeightToUse / 1.33 }
          const angleBetweenNodes = (2 * Math.PI) / numNodes;
  
          updatedNodes = combinedNodeData.map((node, index) => {
            const angle = index * angleBetweenNodes + Math.PI / 2 + 33;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
  
            return { ...node, position: { x, y } };
          });
        }
        return updatedNodes;
      });
    }
  };

  return (
    <ReactFlowProvider>
      <WebOptionsModal open={hamburgerOpen} onClose={() => setHamburgerOpen(false)}/>
      <div ref={myDivRef} className={`h-full relative`}>
        <div className={`flex flex-1 ${showRemoveFromTeam ? 'w-full' : ''} absolute z-[995]`}>
          <div className={`flex flex-wrap items-center grow-0 w-full ${showRemoveFromTeam ? 'px-2 max-w-[92.5%] card-sm:max-w-[95%]' : 'max-w-[0px]'} h-[85px] card-sm:h-[89px] border-b-2 border-black bg-gray-500/[.3] overflow-auto`}>
            {webOfTeam.length > 0 && 
            <button 
            className="flex w-[80px] h-[80px] card-sm:mr-2 text-sm card-sm:text-base font-bold items-center rounded-lg border-4 border-black text-black bg-white hover:bg-gray-300 z-40"
            onClick={handleTeamCenter}>Center Team</button>}
            {webOfTeam.map(character => 
              <div
              key={'web'+character.id.toString()}
              className="card-sm:min-w-[60px]"
              >
                <SuggestCard
                character={character}
                webOfTeam={webOfTeam}
                selectedCharacter={selectedCharacter}
                handleNewDetails={handleNewDetails}
                removeFromWebOfTeam={removeFromWebOfTeam}
                addToWebOfTeam={addToWebOfTeam}
                statsSelectedOptions={statsSelectedOptions}
              />  
              </div>
            )}
          </div>
          <img 
            src={rightArrowIcon}
            onClick={() => setShowRemoveFromTeam(!showRemoveFromTeam)}
            className={`${showRemoveFromTeam ? 'transform scale-x-[-1] border-x-2 w-[7.5%] card-sm:w-[7%] ' : 'border-r-2 w-3/4'} border-b-2 border-black bg-slate-800 cursor-pointer`}
            title={`${showRemoveFromTeam ? 'click to hide team' : 'click to show team' }`}
          />
        </div>
        <div className="h-full bg-slate-700 row-span-6 relative">
          <div className="flex flex-row w-full justify-between items-between absolute bottom-0">  
            <button
            className="p-2 text-sm card-sm:text-base border-t-2 border-r-2 border-b-2 border-black text-black bg-white rounded-tr-lg z-40"
            onClick={() => handleResetTeam(webOfTeam)}
            >Reset Team</button>
            <button
            className="p-2 text-sm card-sm:text-base border-t-2 border-l-2 border-b-2 border-black text-black bg-white rounded-tl-lg z-40"
            onClick={() => handleSetShowSuggestedCards()}
            >{showSuggestedCards ? 'Hide Suggested Cards' : 'Show Suggested Cards'}</button>
          </div>
          {/* hamburger button */}
          <div className="flex absolute top-[88px] card-sm:top-[92px] right-[3px]">
              <button
              className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group relative bg-white z-50"
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
              >
                <div
                  onClick={() => setHamburgerOpen(!hamburgerOpen)}
                  className={`h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 z-50 ${
                    hamburgerOpen
                    ? "rotate-45 translate-y-3 group-hover:opacity-100"
                    : "group-hover:opacity-100"
                  }`}
                  />
                <div
                  onClick={() => setHamburgerOpen(!hamburgerOpen)}
                  className={`h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 z-50 ${
                    hamburgerOpen ? "opacity-0" : "group-hover:opacity-100"
                  }`}
                  />
                <div
                  onClick={() => setHamburgerOpen(!hamburgerOpen)}
                  className={`h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 z-50 ${
                    hamburgerOpen
                    ? "-rotate-45 -translate-y-3 group-hover:opacity-100"
                    : "group-hover:opacity-100"
                  }`}
                  />
                  <div
                  onClick={() => setHamburgerOpen(!hamburgerOpen)}
                  className="absolute w-full h-full p-2 top-0 right-0"
                  />
              </button>
            </div>
          <ReactFlow
            onInit={onLoad}
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
            zoomOnDoubleClick={false}
            className="bg-gradient-radial from-slate-500 via-slate-600 to-slate-900 border-b-2 border-r-2 border-black"
          >
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

const buildAllNodes = (team, nodes = [], webWidth, webHeight,) => {
  const nodeDictionary = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );
  const midpoint = computeMidpoint(team, nodeDictionary, webWidth, webHeight);
  return team.map((character) =>
    toNode(character, midpoint, nodeDictionary[character.id], webWidth, webHeight)
  );
};

const startingPosition = (webWidth, webHeight) => {
  //this is for mobile when selecting character, webWidth doesn't exist because the div is hidden
  if (webWidth === 0 || webHeight === null || typeof webWidth === undefined){
    return {x: window.innerWidth-125, y:window.innerHeight-200}
  } else {
    //this is for mobile so when the suggested card is shown, it doesn't place it out of click range
    if(window.innerWidth < 850){
      return {x: window.innerWidth-125, y: window.innerHeight-200}
    }else{
      //this is for desktop placement (subtract card dimensions)
      return {x: webWidth-125, y: webHeight-125}
    }
  }
};

const toNode = (character, midpoint, existingNode = {}, webWidth, webHeight) => ({
  id: character.id.toString(),
  type: "custom",
  data: { midpoint, ...character },
  position: startingPosition(webWidth, webHeight),
  style: {
    visibility: "visible",
  },
  zIndex: 1003,
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
      {style: {zIndex:1}},
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
