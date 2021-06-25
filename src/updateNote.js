import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  updateEdge,
  isNode,
} from "react-flow-renderer";
import Form from "./add-todo-form";
import AddNode from "./AddNode";
import "./updateNode.css";
import DisplayElements from "./DisplayElements";
const initialElements = [
  { id: "1", data: { label: "-" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } },
  { id: "e1-2", source: "1", target: "2" },
];

const UpdateNode = () => {
  //control whether to show add node form
  const [showAddNode, setShowAddNode] = useState(false);

  const [elements, setElements] = useState(initialElements);
  const [nodeName, setNodeName] = useState("node 1 ");
  const [nodeBg, setNodeBg] = useState("#eee");
  const [nodeHidden, setNodeHidden] = useState(false);

  //reactflow offical remove
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const deleteEle = (id) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  //
  //reactflow example add, hardcode data
  const [addNodeId, setAddNodeId] = useState("added node");
  const getNodeId = () => `randomnode_${+new Date()}`;
  const onAdd = (newNode) => {
    console.log(newNode.nodeId)
    setAddNodeId(newNode);
    const addedNode = {
      id: (newNode.nodeId && newNode.nodeId !=undefined 
        && !elements.find(elem => elem.id == newNode.nodeId)) 
        ? newNode.nodeId : getNodeId(),
      data: { label: newNode.data },
      // position: {
      //   x: Math.random() * window.innerWidth - 100,
      //   y: Math.random() * window.innerHeight,
      // },
      position: newNode.position,
    };
    console.log(addedNode.nodeId)
    setElements((els) => els.concat(addedNode));
  };

  // //add edge
  // const delEdge = (id) => {
  //   setElements(elements.filter((el) => el.id != id));
  // }

  //called when user connects two nodes
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  //called when the end of an edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  useEffect(() => {
    setAddNodeId(addNodeId);
  }, [addNodeId, setAddNodeId]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "1") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }

        return el;
      })
    );
  }, [nodeName, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "1") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.style = { ...el.style, backgroundColor: nodeBg };
        }

        return el;
      })
    );
  }, [nodeBg, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === "1" || el.id === "e1-2") {
          // when you update a simple type you can just update the value
          el.isHidden = nodeHidden;
        }

        return el;
      })
    );
  }, [nodeHidden, setElements]);

  return (
    <ReactFlow
      elements={elements}
      defaultZoom={1.5}
      minZoom={0.2}
      maxZoom={4}
      onEdgeUpdate={onEdgeUpdate}
      onConnect={onConnect}
      onElementsRemove={onElementsRemove}
    >
      <div className="add_new_node">
        <Form
          onAdd={() => setShowAddNode(!showAddNode)}
          showAdd={showAddNode}
        />
      </div>
      <div className="updatenode__controls">
        {/* form to show input */}
        <div className="display_node">
          {showAddNode && <AddNode onAdd={onAdd} />}
          {/* form to show list of node value */}
          {elements.length > 0 ? (
            <DisplayElements elements={elements} onDelete={deleteEle} />
          ) : (
            "No Node To Show"
          )}
        </div>

        {/* <label>label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label className="updatenode__bglabel">background:</label>
        <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

        <div className="updatenode__checkboxwrapper">
          <label>hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div> */}
      </div>
    </ReactFlow>
  );
};

export default UpdateNode;
