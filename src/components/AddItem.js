import React, { useRef, useState } from 'react';

import Card from './UI/Card';
import Button from './UI/Button';
import NewItemCategories from './NewItemCategories'
import style from '../css/Modal.module.css';

const AddItem = (props) => {
  const nameRef = useRef('');
  const quantityRef = useRef('');
  const [categoryId, setCategoryId] = useState('');

  function submitHandler(event) {
    event.preventDefault();

    const item = {
      name: nameRef.current.value,
      quantity: quantityRef.current.value,
      category: categoryId,
    };

    fetch(`http://localhost:8080/lists/${props.passData}`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  props.onConfirm();
  }

  function fetchCategoryId (data) {
    setCategoryId(data);
  }


  return (
    <div>
      <div className={style.backdrop} onClick={props.onConfirm} />
      <Card className={style.modal}>
        <header className={style.header}>
          <h2>Add New Item</h2>
        </header>
        <form onSubmit={submitHandler} className={style.content}>
          <label htmlFor='name'>Name:</label>
          <input type='text' required ref={nameRef}/>
          <label htmlFor='quantity'>Quantity:</label>
          <input type='number' required min="1" ref={quantityRef}/>
          <label htmlFor='category'>Category:</label>
          <NewItemCategories passCategoryId={fetchCategoryId} />
          <button>Submit</button>
        </form>
        <footer className={style.actions}>
          <Button onClick={props.onConfirm}>Cancel</Button> 
        </footer>
      </Card>
    </div>
  );
};

export default AddItem;