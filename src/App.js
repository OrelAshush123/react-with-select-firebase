import React, { useState, useEffect, useRef } from 'react';
import {firestore} from "./firebase";
import { doc, setDoc, getDocs, collection} from "@firebase/firestore" // import firebase
import './App.css';
import ItemList from './ItemList'

var ListOfOption = ["Select Option ... ",'רשימה מספר 1', 'רשימה מספר 2'];

function App() {
  
  
  const ItemNameRef = useRef()
  const ItemNumRef = useRef()
  const collectionRef = collection(firestore, "CollectionOfLists") // firebase collection
  const whichList = useRef()
  const [items_1, SetItems_1] = useState([])
  const [items_2, SetItems_2] = useState([])
  const [ActiveList, SetActiveList] = useState([])

  //functions

  const sleep = ms => new Promise( resolve => setTimeout(resolve, ms) ); //sleep func


  const check = async () => { // לעדכן את הרשימה לפי הפייר-בייס כל כמה שניות
    while (true) {
      for (let i = 0; i < 2; i++) {
        let data = await getDocs(collectionRef); let DOCdata = data.docs.map((doc) => ({...doc.data()}));
        try { 
          let t = DOCdata[i].myList.length;// לנסות לגשת לאורך הרשימה הראשונה
        } catch (e) { //if the database is empty
          await setDoc(doc(firestore, "CollectionOfLists", ("Item List " + ((i).toString())) ), { myList: [] }) 
        } 
      }
      const dataForC = await getDocs(collectionRef); //ליבא את האוסף איטם
      try{
        const DOCdataR = dataForC.docs.map((doc) => ({...doc.data()})) //והוציא מהאוסף את הדוקומנטים
        if(whichList.current.value === "רשימה מספר 1") {
          SetActive(DOCdataR[0].myList) // לעדכן את הרשימה
        } else if(whichList.current.value === "רשימה מספר 2") {
          SetActive(DOCdataR[1].myList) // לעדכן את הרשימה
        }
        
      } catch (e) {
        window.location.reload(); // אם לא עבד לבצע רינון של הדף.
      }  // כדי שהפעולה לא תיתבצע בשגיאה, או כאשר אין אינטרט שידעו את זה
      await sleep(3500)
    }
  }



  useEffect( () => { //כשיש פעולה על הרשימה רוצים לעדכן את זה הפייר-בייס
    async function saveData() {
      let data = {
        myList: ActiveList 
      }; // <-מה ששומרים

      if(whichList.current.value === "רשימה מספר 1") {
        await setDoc(doc(firestore, "CollectionOfLists", ("Item List " + ((0).toString())) ), data) // פעולת השמירה
      } else if(whichList.current.value === "רשימה מספר 2") {
        await setDoc(doc(firestore, "CollectionOfLists", ("Item List " + ((1).toString())) ), data) // פעולת השמירה
      }  
    }
    if (ActiveList.length !== 0) {
      try { 
        saveData()
      } catch (e) { window.location.reload();} // אותו רעיון
    }
  }, [ActiveList])

  function SetActive(l)
  {
    if(ListOfOption[0] === "Select Option ... ") {
      ListOfOption = ListOfOption.filter(item => item !== "Select Option ... ");
      check()    }

    SetActiveList(l)
    if(whichList.current.value === "רשימה מספר 1") {
      SetItems_1(l)
    } else if(whichList.current.value === "רשימה מספר 2") {
      SetItems_2(l)
    }
  }

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
    if(e.target.value === "רשימה מספר 1") 
    {
      SetActive(items_1)
    } else if(e.target.value === "רשימה מספר 2") {
      SetActive(items_2)
    } else {
      SetActive([])
    }

  }

  return (
    <div className='App'>
        <form>בחירה:
          <select id="lists" ref={whichList} onChange={(e)=>{SetList(e)}}>
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
