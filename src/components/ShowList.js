import React, { useState, useEffect, useRef } from "react";

import ListItems from "./ListItems";
import AddItem from "./AddItem";
import Button from "./UI/Button";
import AddCategory from "./AddCategory";
import { BsPlusLg } from "react-icons/bs";
import style from "../css/Global.module.css";

const ShowList = (props) => {
    const [listData, setListData] = useState([]);
    const [addItemVisability, setAddItemVisability] = useState(false);
    const [addCategoryVisability, setAddCategoryVisability] = useState(false);
    const addItemButtonVisability = useRef(false);
    const [error, setError] = useState(null);
    
    const fetchListHandler = async function () {
        try{
        const response = await fetch(`http://localhost:8080/lists/${props.manage}`)
        const data = await response.json();
        setListData(data.list);
        } catch (error) {
            setError('No lists to show')
        }
    }

    function showAddItem () {
        setAddItemVisability(!addItemVisability);
    }

    function showAddCategory () {
        setAddCategoryVisability(!addCategoryVisability);
    }


    useEffect(() => {
        fetchListHandler();
    }, [props.manage, listData]);

    function transformDate (date) {
        const newDate = new Date(`${date}`)
        const formattedDate = newDate.toLocaleDateString('sr-sr')
        return formattedDate
    }


    let content = <p>Chose the list</p>;

    if (listData.items) {
        content = <ListItems passListData={listData} />
        addItemButtonVisability.current= true
    } else if (error) {
        content = <p>{error}</p>
    }

    
    

    return (
        <div className={style.inside}>
            {addItemVisability && <AddItem onConfirm={showAddItem} passData={props.manage} />}
            {addCategoryVisability && <AddCategory onConfirm={showAddCategory} />}
            <h2>{listData.name}</h2>
            <div className={style.listinfo}>
            {listData.items && <p><strong>List Created:</strong> {transformDate(listData.createdAt)}</p>}
            {listData.items && <p><strong>List Updated:</strong> {transformDate(listData.updatedAt)}</p>}
            </div>
            <div className={style.listinfo}>
            {listData.items && <p><strong>Shop:</strong> {listData.shop.name}</p>}
            {listData.items && <p><strong>Shop Address:</strong> {listData.shop.address}</p>}
            {listData.items && <p><strong>Shop City:</strong> {listData.shop.city}</p>}
            </div>
            {addItemButtonVisability.current && <Button onClick={showAddItem}><BsPlusLg /> Item</Button>}
            {addItemButtonVisability.current && <Button onClick={showAddCategory}><BsPlusLg /> Category</Button>}

            <div>
                {content}
            </div>
        </div>
    )
};

export default ShowList;