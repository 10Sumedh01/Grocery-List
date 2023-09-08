import {FaPlus} from 'react-icons/fa'
import { useRef } from 'react';  // toggle to the input box after clicking the btn
import React from "react";

const AddItem = ({newItems, setNewItems, handleSubmit}) => {
  const inputRef = useRef();
  return (
    <>
      <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input
          autoFocus
          ref={inputRef}  // get cursor from btn to this box
          id="addItem"
          type="text"
          placeholder="Items here"
          required
          value={newItems}
          onChange={(e)=> setNewItems(e.target.value)}
        />
        <button 
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()} // get curson to the input box -->[inputref]
        >
            <FaPlus />
        </button>
      </form>
    </>
  );
};

// AddItem.defaultProps = {setNewItems: "items"}

export default AddItem;
