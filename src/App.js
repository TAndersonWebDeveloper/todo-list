import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [nameText, setNameText] = useState("");
  const [todoList, setTodoList] = useState([]);

  const nameTextHandler = (e) => {
    setNameText(e.target.value);
  };

  //Add new item to list
  const addToList = () => {
    if (nameText == "") {
      return;
    }
    Axios.post("http://localhost:8080/", {
      name: nameText,
    });
    window.location.reload();
  };
  //Retrieve list from database
  useEffect(() => {
    Axios.get("http://localhost:8080/get-list").then((response) => {
      setTodoList(response.data);
    });
  }, []);
  //Delete item from list
  const deleteItem = (id) => {
    Axios.delete(`http://localhost:8080/delete-item/${id}`);
    window.location.reload(true);
  };
  //Update Item
  const updateItem = (id) => {
    Axios.put(`http://localhost:8080/update/${id}`);
  };
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="new-todo-container">
        <input
          placeholder="Add New Todo"
          type="text"
          onChange={nameTextHandler}
        />
        <button onClick={addToList}>Submit</button>
      </div>
      {todoList.map((item) => {
        return (
          <div className="todo-item">
            <h2>{item.name}</h2>
            <button
              onClick={() => {
                deleteItem(item._id);
              }}
              className="completed-btn"
            >
              Done
            </button>
            {/* <button
              onClick={() => {
                updateItem(item._id);
              }}
            >
              Change
            </button> */}
          </div>
        );
      })}
    </div>
  );
}

export default App;
