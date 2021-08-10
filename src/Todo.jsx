import React, { useState, useEffect } from "react";
import "./Todo.css";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";

const getLocalData = () => {
  const lists = localStorage.getItem("MyTodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [todoData, setTodoData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEdit, setEdit] = useState();
  const [toggle, setToggle] = useState(false);

  //adding item functionality
  const addItem = (e) => {
    e.preventDefault();
    if (!todoData) {
      alert("Don't Try to That!!!!");
    } else if (todoData && toggle) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEdit) {
            return { ...curElem, name: todoData };
          }
          return curElem;
        })
      );
      setTodoData("");
      setEdit(null);
      setToggle(false);
    } else {
      const uniqueIdData = {
        id: new Date().getTime().toString(),
        name: todoData,
      };
      setItems([...items, uniqueIdData]);
    }
    setTodoData("");
  };
  // update functionality
  const editItem = (id) => {
    const EditedTodo = items.find((curElem) => {
      return curElem.id === id;
    });
    setTodoData(EditedTodo.name);
    setEdit(id);
    setToggle(true);
  };

  // deleting Item functionality
  const deleteItem = (id) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItem);
  };

  // deleting all itemsss
  const deleteAll = () => {
    setItems([]);
  };

  // event fire onkeyPress of enter
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      addItem();
      console.log("pressed");
    }
  };

  // addtoLocalStorage
  useEffect(() => {
    localStorage.setItem("MyTodoList", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <h1>Todo App😎 </h1>
            <h2>Add Your Todo's Here 😉</h2>
          </figure>

          {/* inputbox */}
          <form>
            <div className="addItems">
              <input
                type="text"
                placeholder="✍ Add your Todo"
                className="form-control"
                onKeyPress={handleKeypress}
                value={todoData}
                onChange={(e) => setTodoData(e.target.value)}
              />
              {toggle ? (
                <button className="btn" onClick={addItem}>
                  Update
                </button>
              ) : (
                <button className="btn" onClick={addItem}>
                  Add Todo➕
                </button>
              )}
            </div>
          </form>

          {/* show your items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <img
                      src="https://img.icons8.com/material-outlined/24/000000/edit.png"
                      className="fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    />
                    <img
                      src="https://img.icons8.com/material-sharp/24/000000/delete-forever.png"
                      className="fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all buttons */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Delete All"
              onClick={deleteAll}
            >
              <span>Your Todo List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
