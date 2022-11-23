import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ItemList from './ItemList'

const ListOfOption = ['list1', 'list2'];

function App() {

  const [whichList, setOption] = useState("")
  const [items, SetItems] = useState([])
  

  const ItemNameRef = useRef()
  const ItemNumRef = useRef()
  const LOCAL_STORAGE_KEY = "app.items"

  useEffect( () => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedItems.length !== 0)
    {
      SetItems(storedItems) //if storedItems is not empty
    }
    
  }, [])

  
  useEffect( () => {
      console.log("Save", JSON.stringify(items))
      localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(items))
    }, [items])

  function Delete_Item(id) {
    const NewItems = items.filter(item => item.id !== id);
    for (let i = 0; i < NewItems.length; i++) NewItems[i].id = i
    SetItems(NewItems)
  }

  function Edit_Item(id) {
    const NewItems = [...items]
    const item = NewItems.find(item => item.id === id)

    if(ItemNameRef.current.value) item.name = ItemNameRef.current.value
    if(ItemNumRef.current.value) item.number = ItemNumRef.current.value;
    ItemNameRef.current.value = null
    ItemNumRef.current.value = null
    item.id = id
    SetItems(NewItems)
  }

  function Add_Item(e) {
    const name = ItemNameRef.current.value
    const num = ItemNumRef.current.value
    const len = items.length
    if(name === '' || num === '') return
    SetItems( prevItem => {
      return [...prevItem,{id:len, name: name,number: num}]
    })
    ItemNameRef.current.value = null
    ItemNumRef.current.value = null
  }


  const SetList = (e) => {
    setOption(e.value)

  }
  return (
    <div className='App'>
        <form>בחירה:
          <select
            id="lists"
            value={whichList}
            onChange={(e)=>{SetList(e)}}
          >
          <option>Select Option ... </option>

      	  {ListOfOption.map((tmp)=>(
            <option key={tmp}>{tmp}</option>
          ))}
          </select>
        </form>

        <h1>רשימת קניות</h1>
        <ItemList items={items} Edit_Item={Edit_Item} Delete_Item={Delete_Item} /> פריט:
        <input ref={ItemNameRef} type="testbox" /> <br/> כמות:
        <input ref={ItemNumRef} type="testbox" />
        <br/>
        <input value="הוסף פריט לרשימה" onClick={Add_Item} type="button" /> 
    </div>
  );
}

export default App;
