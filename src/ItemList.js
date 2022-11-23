import React from 'react'
import Item from './Item'

export default function ItemList( { items, Edit_Item, Delete_Item } ) {
  return (
      items.map(item => {
        return <Item key={item.id} item = {item} Edit_Item={Edit_Item} Delete_Item={Delete_Item} /> 
      })
  ) 
}

