import React, { useState } from "react";

import CategoriesFilter from "./CategoriesFilter";
import Button from "./UI/Button";
import EditItem from "./EditItem"
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import style from '../css/Global.module.css'

const ListItems = (props) => {
    const [itemData, setItemData] = useState('');
    const [editItemVisability, setEditItemVisability] = useState(false);
    const [categoryId, setCategoryId] = useState('');


    function deleteItem(id) {
        fetch(`http://localhost:8080/items/${id}`, {
            method: 'DELETE'
        })
    }

    function showEditItem() {
        setEditItemVisability(!editItemVisability);
    }

    function editItem(data) {
        showEditItem();
        setItemData(data)
    }

    function fetchCategoryId (data) {
        setCategoryId(data);
      }
      
      const fileterItems = props.passListData.items.filter (item => {
        if (categoryId) {
          return item.category._id === categoryId;
        } else {
          return item
        }
        
      })


    return (
        <div className={style.itemslist}>
            {editItemVisability && <EditItem onConfirm={showEditItem} passData={itemData} />}
            <div className={style.shopfilter}>
                <label>Filter by category:</label>
                <CategoriesFilter passCategoryId={fetchCategoryId} />
            </div>
            <table className={style.itemstable}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                    <tbody>
                {fileterItems.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category.name}</td>
                        <td><Button onClick={() => editItem(item)}><AiOutlineEdit /></Button></td>
                        <td><Button onClick={() => deleteItem(item._id)}><BsTrash /></Button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListItems;