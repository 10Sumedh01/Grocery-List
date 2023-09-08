import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import SearchItem from "./SearchItem";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

  const [newItems, setNewItems] = useState("")

  const [search,setSearch] = useState("")
  
  const addItems = (item) => {
    const id = items.length ? items[items.length - 1 ].id + 1 : 1;
    const myNewItem = {id , checked:false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItems) return;
    // console.log(newItems);
    addItems(newItems);
    setNewItems('');
  }

  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem newItems={newItems} setNewItems={setNewItems} handleSubmit={handleSubmit}/>
      <SearchItem search={search} setSearch={setSearch}/>
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer listCount={items.length} />
    </div>
  );
}



export default App;
