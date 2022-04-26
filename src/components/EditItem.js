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
  console.log(item);
  console.log(props.passData._id)
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
          <div className={style.formgrid}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' ref={nameRef} defaultValue={props.passData.name} />
          <label htmlFor='quantity'>Quantity:</label>
          <input type='number' id='quantity' min="1" ref={quantityRef} defaultValue={props.passData.quantity} />
          <label htmlFor='category'>Category:</label>
          <Categories passCategoryId={fetchCategoryId} chosen={props.passData.category} />
          </div>
        <footer className={style.actions}>
          <Button type='submit'>Submit</Button>
          <Button onClick={props.onConfirm}>Cancel</Button> 
        </footer>
        </form>
      </Card>
    </div>
  );
};

export default EditItem;