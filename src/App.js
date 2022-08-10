import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [nameText, setNameText] = useState("");
  const [todoList, setTodoList] = useState([]);

  const nameTextHandler = (e) => {
    setNameText(e.target.value);
    console.log(nameText);
  };

  //Add new item to list
  const addToList = () => {
    Axios.post("https://todo-listv3.herokuapp.com/", {
      name: nameText,
    });
    window.location.reload();
  };
  //Retrieve list from database
  useEffect(() => {
    Axios.get("https://todo-listv3.herokuapp.com/get-list").then((response) => {
      setTodoList(response.data);
    });
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
      <input type="text" onChange={nameTextHandler} />
      <button onClick={addToList}>Submit</button>
      {todoList.map((item) => {
        return (
          <div>
            <h2>{item.name}</h2>
            <button
              onClick={() => {
                deleteItem(item._id);
              }}
            >
              Completed
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
