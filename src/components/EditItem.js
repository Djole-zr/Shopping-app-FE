import React, { useRef, useState } from 'react';

import Card from './UI/Card';
import Button from './UI/Button';
import Categories from './Categories';
import style from '../css/Modal.module.css';

const EditItem = (props) => {
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

    fetch(`http://localhost:8080/items/${props.passData._id}`, {
    method: 'PATCH',
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
          <h2>Edit Item</h2>
        </header>
        <form onSubmit={submitHandler} className={style.content}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' ref={nameRef} defaultValue={props.passData.name} />
          <label htmlFor='quantity'>Quantity:</label>
          <input type='number' id='quantity' min="1" ref={quantityRef} defaultValue={props.passData.quantity} />
          <label htmlFor='category'>Category:</label>
          <Categories passCategoryId={fetchCategoryId} chosen={props.passData.category} />
          <button>Submit</button>
        </form>
        <footer className={style.actions}>
          <Button onClick={props.onConfirm}>Cancel</Button> 
        </footer>
      </Card>
    </div>
  );
};

export default EditItem;