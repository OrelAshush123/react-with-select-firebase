import React from 'react'

export default function Item( {item, Edit_Item, Delete_Item} ) {

    function Edit_this() {
      Edit_Item(item.id)
    }

    function DEL() {
      Delete_Item(item.id)
    }


  return (
    <div className="iteM">
      - {item.name} x{item.number}  <button type="button" onClick={DEL}> 

      <img src="https://www.m-yehuda.org.il/uploads/n/1610875699.2914.png" height ="15" width="15" />
      </button>

      <button type="button" onClick={Edit_this}> 
      <img src="https://img.lovepik.com/free-png/20220110/lovepik-pencil-png-image_401390894_wh300.png" height ="15" width="15" />
      </button>

      
    </div>
  )
}