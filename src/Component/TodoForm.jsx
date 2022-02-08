import React, { useState } from "react";

// To get data from Local Storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const TodoForm = () => {
  let [inputData, setInputData] = useState("");
  let [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  // Add Items
  let addItem = () => {
    if (!inputData) {
      alert("Please Fill the Data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map(elem => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      let allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  // Delete Items
  let deleteItem = index => {
    let updateitems = items.filter(elem => {
      return index != elem.id;
    });
    setItems(updateitems);
  };

  // Edit Items
  const editItem = id => {
    let newEditItem = items.find(elem => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="heading ">
        <h2>TO-DO LIST</h2>
      </div>
      <div className="todo-form">
        <form>
          <div className="addItems">
            <input
              type="text"
              placeholder=" Add a To Do List"
              name="text"
              value={inputData}
              className="todo-input"
              onChange={e => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItem">
            {items.map(elem => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(elem.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(elem.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </>
  );
};

export default TodoForm;
