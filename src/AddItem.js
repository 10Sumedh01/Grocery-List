import {FaPlus} from 'react-icons/fa'
import React from "react";

const AddItem = ({newItems, setNewItems, handleSubmit}) => {
  return (
    <>
      <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input
          autoFocus
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
        >
            <FaPlus />
        </button>
      </form>
    </>
  );
};

export default AddItem;
