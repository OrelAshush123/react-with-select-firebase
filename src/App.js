import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ItemList from './ItemList'

var ListOfOption = ["Select Option ... ",'רשימה מספר 1', 'רשימה מספר 2'];

function App() {
  
  const whichList = useRef()
  const [items_1, SetItems_1] = useState([])
  const [items_2, SetItems_2] = useState([])
  const [ActiveList, SetActiveList] = useState([])

  function SetActive(l)
  {
    if(ListOfOption[0] === "Select Option ... ") 
      ListOfOption = ListOfOption.filter(item => item !== "Select Option ... ");
    SetActiveList(l)
    if(whichList.current.value == "רשימה מספר 1") {
      SetItems_1(l)
    } else if(whichList.current.value == "רשימה מספר 2") {
      SetItems_2(l)
    }
  }

  const ItemNameRef = useRef()
  const ItemNumRef = useRef()
  //const LOCAL_STORAGE_KEY_NUM_ONE = "app.items"
  //const LOCAL_STORAGE_KEY_NUM_TWO = "app.items2"
/*
  useEffect( () => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NUM_ONE))
    if(storedItems.length !== 0)
    {
      console.log("SET",storedItems)
      SetItems(storedItems) //if storedItems is not empty
    }
    
  }, [])

  
  useEffect( () => {
    if(JSON.stringify(items) !== '[]')
    {
      console.log("Save", JSON.stringify(items))
      localStorage.setItem(LOCAL_STORAGE_KEY_NUM_ONE , JSON.stringify(items))
    }
    }, [items])
*/
  function Delete_Item(id) {
    const NewItems = ActiveList.filter(item => item.id !== id);
    for (let i = 0; i < NewItems.length; i++) NewItems[i].id = i
    SetActive(NewItems)
  }

  function Edit_Item(id) {
    const NewItems = [...ActiveList]
    const item = NewItems.find(item => item.id === id)

    if(ItemNameRef.current.value) item.name = ItemNameRef.current.value
    if(ItemNumRef.current.value) item.number = ItemNumRef.current.value;
    ItemNameRef.current.value = null
    ItemNumRef.current.value = null
    item.id = id
    SetActive(NewItems)
  }

  function Add_Item(e) {
    const name = ItemNameRef.current.value
    const num = ItemNumRef.current.value
    const len = ActiveList.length
    if(name === '' || num === '') return
    const list = ( prevItem => {
      return [...prevItem,{id:len, name: name,number: num}]
    })
    SetActive(list)
    ItemNameRef.current.value = null
    ItemNumRef.current.value = null
  }


  const SetList = (e) => {
    whichList.current.value = e.target.value
    if(e.target.value == "רשימה מספר 1") 
    {
      SetActive(items_1)
    } else if(e.target.value == "רשימה מספר 2") {
      SetActive(items_2)
    } else {
      SetActive([])
    }

  }

  return (
    <div className='App'>
        <form>בחירה:
          <select
            id="lists"
            ref={whichList}
            onChange={(e)=>{SetList(e)}}
          >


      	  {ListOfOption.map((tmp)=>(
            <option key={tmp}>{tmp}</option>
          ))}
          </select>
        </form>

        <h1>רשימת קניות</h1>
        <ItemList items={ActiveList} Edit_Item={Edit_Item} Delete_Item={Delete_Item} /> פריט:
        <input ref={ItemNameRef} type="testbox" /> <br/> כמות:
        <input ref={ItemNumRef} type="testbox" />
        <br/>
        <input value="הוסף פריט לרשימה" onClick={Add_Item} type="button" /> 
    </div>
  );
}

export default App;
