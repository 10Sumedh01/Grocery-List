import apiRequest from "./apiRequest"
import Header from "./Header";
import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import SearchItem from "./SearchItem";

function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);

  const [newItems, setNewItems] = useState("")

  const [search,setSearch] = useState("")

  const [fetchErr, setFetchErr] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchData = async() => {
    try {
      const response = await fetch(API_URL)
      if(!response.ok) throw Error('Did not find the expected Data')
      const listItems = await response.json()
      setItems(listItems)
      console.log(listItems);
      setFetchErr(null)
    } catch (error) {
      console.log(error.message)
      setFetchErr(error.message) //if the api url gives the error  
    } finally{
      setIsLoading(false);
    }
  }  
  
  setTimeout(() => {
    (async () => await fetchData())();
  }, 1000);

  }, [])

  const addItems = async(item) => {
    const id = items.length ? items[items.length - 1 ].id + 1 : 1;
    const myNewItem = {id , checked:false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems);

    const postOptions = {
      method : "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions);
    if (result) setFetchErr(result);
  }

  const handleCheck = async(id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    
    const myListItems = listItems.filter((item) => item.id == id)
    const updateCheck = {
      method : "PATCH",
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({checked: myListItems[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,updateCheck)
    if (result) setFetchErr(result);
  };

  const handleDelete = async(id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    
    const deleteOptions = {method : "DELETE"}
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,deleteOptions)
    if (result) setFetchErr(result);
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
      <main>
      {isLoading && <p>Loading items...</p>}
      {fetchErr && <p style={{color:"red",textAlign:"center",marginTop:"40%"}}>{`Error Occured : ${fetchErr}`}</p>}
      {!fetchErr && !isLoading && 
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      }
      </main>
      <Footer listCount={items.length} />
    </div>
  );
}



export default App;
