import React, { useEffect, useRef, useState } from "react";
import { RiEdit2Line,RiDeleteBin6Line } from "react-icons/ri";
import { IoCaretUp } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
import Swal from 'sweetalert2'
import "./todo.css";

const TodoList = () => {
  const [task, setTaks] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [isedit, setIsEdite] = useState(false);
  const [editeIndex, setEditeIndex] = useState([]);

  const handleAdd = (e) => {
    if (task.trim() !== "") {
      if (isedit) {
        const taksMainList = [...tasklist];
        taksMainList[editeIndex] = task;
        setTaskList(taksMainList);
        setIsEdite(false);
        setEditeIndex(null);
        Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Your Task has been Updated",
            showConfirmButton: false,
            timer: 1500
          });
      } else {

        setTaskList([...tasklist, task]);
        Swal.fire({
           
            icon: "success",
            title: "Your Task has been added",
            showConfirmButton: false,
            timer: 1500
          });
      }
      setTaks("");
    }
  };

  const deleteTask = (index) => {
    const updated = tasklist.filter((_, i) => i !== index);
    setTaskList(updated);
    
      Swal.fire({
        // position: "top-end",
        icon: "error",
        title: `Your  ${tasklist[index]} is Deleted!`,
        showConfirmButton: false,
        timer: 2500
      });
  };

  const Upper = (index) => {
    if (index > 0) {
      const updatedTask = [...tasklist];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTaskList(updatedTask);
    }
  };
  const Lower = (index) => {
    if (index < tasklist.length - 1) {
      const updatedTask = [...tasklist];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTaskList(updatedTask);
    }
  };

  const inputref = useRef(null);
  useEffect(() => {
    inputref.current.focus();
  });

  const editeTask = (index) => {
    setTaks(tasklist[index]);
    setIsEdite(true);
    setEditeIndex(index);
  };

  return (
    <div className="Todolist">
      <div className="tudo">
        <h1>Todo List</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter the todo list"
          value={task}
          ref={inputref}
          onChange={(e) => setTaks(e.target.value)}
        />
        <button onClick={handleAdd} className="add">
          {isedit ? "Update" : "Add"}
        </button>

        <ol>
          {tasklist.length > 0 ? (
            tasklist.map((item, index) => (
              <li key={index}>
                <div className="span">
                  <span>{item}</span>
                </div>
                <div className="btn">
                  <h3
                    onClick={() => editeTask(index)}
                    className="edit"
                  >
                    <RiEdit2Line />
                  </h3>
                  <h3 onClick={() => deleteTask(index)} className="delete">
                  <RiDeleteBin6Line />

                  </h3>
                  <h3 onClick={() => Upper(index)} className="move">
                  <IoCaretUp />

                  </h3>
                  <h3 onClick={() => Lower(index)} className="move" ><FaCaretDown />
                  </h3>
                </div>
              </li>
            ))
          ) : (
            <h3 style={{marginLeft:400}} className="h3-tag" >Not Task Added</h3>
          )}
        </ol>
      </div>
    </div>
  );
};

export default TodoList;
