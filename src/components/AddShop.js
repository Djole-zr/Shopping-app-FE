import React, { useRef } from 'react';

import Card from './UI/Card';
import Button from './UI/Button';
import style from '../css/Modal.module.css';

const AddShop = (props) => {
  const nameRef = useRef('');
  const addressRef = useRef('');
  const cityRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    const shop = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
    };

    fetch('http://localhost:8080/shops', {
    method: 'POST',
    body: JSON.stringify(shop),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  props.onConfirm();
  
  }


  return (
    <div>
      <div className={style.backdrop} onClick={props.onConfirm} />
      <Card className={style.modal}>
        <header className={style.header}>
          <h2>Add New Shop</h2>
        </header>
        <form onSubmit={submitHandler} className={style.content}>
          <div className={style.formgrid}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' required ref={nameRef} />
          <label htmlFor='address'>Address:</label>
          <input type='text' id='address' required ref={addressRef} />
          <label htmlFor='city'>City:</label>
          <input type='text' id='city' required ref={cityRef} />
          </div>
        <footer className={style.actions}>
          <Button type="submit">Submit</Button>
          <Button onClick={props.onConfirm}>Cancel</Button> 
        </footer>
        </form>
      </Card>
    </div>
  );
};

export default AddShop;
