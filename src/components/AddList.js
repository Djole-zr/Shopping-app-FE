import React, { useRef, useState } from 'react';

import Shops from './Shops';
import AddShop from './AddShop';
import Button from './UI/Button';
import { BsPlusLg } from "react-icons/bs";
import style from '../css/Global.module.css';

function AddList(props) {
  const nameRef = useRef('');
  const [shopId, setShopId] = useState('');
  const [shopVisability, setShopVisability] = useState(false);


  function submitHandler(event) {
    event.preventDefault();

    const list = {
      name: nameRef.current.value,
      shop: shopId,
    };

    props.onAddList(list); 
  }
  

  function showAddShop () {
    setShopVisability(!shopVisability);
  }

  function fetchShopId (data) {
    setShopId(data);
  }



  return (
    <React.Fragment>
    <div>
    {shopVisability && <AddShop onConfirm={showAddShop} />}
    </div>
    <form onSubmit={submitHandler}>
      <div className={style.control}>
        <label htmlFor='listname'>Name:</label>
        <input type='text' id='listname' className={style.listnameinput} required ref={nameRef} />
        <label htmlFor='shop'>Shop:</label>
          <Shops passShopId={fetchShopId} />
        <Button type='button' onClick={showAddShop}><BsPlusLg /> Shop</Button>
      </div>
      <Button>Add List</Button>
    </form>
    </React.Fragment>
  );
}

export default AddList;