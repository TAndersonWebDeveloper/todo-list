import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [nameText, setNameText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const nameTextHandler = (e) => {
    setNameText(e.target.value);
  };

  //Add new item to list
  const addToList = () => {
    if (nameText == "") {
      return;
    }
    Axios.post("https://todo-listv3.herokuapp.com/", {
      name: nameText,
    });
    window.location.reload();
  };
  //Retrieve list from database
  useEffect(() => {
    setLoading(true);
    Axios.get("https://todo-listv3.herokuapp.com/get-list").then((response) => {
      setTodoList(response.data);
    });
    setLoading(false);
  }, []);
  //Delete item from list
  const deleteItem = (id) => {
    Axios.delete(`https://todo-listv3.herokuapp.com/delete-item/${id}`);
    window.location.reload(true);
  };
  //Update Item
  const updateItem = (id) => {
    Axios.put(`https://todo-listv3.herokuapp.com/update/${id}`);
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
      {loading && <p>Loading todos...</p>}
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
            <button
              onClick={() => {
                updateItem(item._id);
              }}
            >
              Change
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
