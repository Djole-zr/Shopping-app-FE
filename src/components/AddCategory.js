import React, { useRef, useState } from 'react';

import Card from './UI/Card';
import Button from './UI/Button';
import style from '../css/Modal.module.css';

const AddCategory = (props) => {
  const nameRef = useRef('');
  const descriptionRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    const category = {
      name: nameRef.current.value,
      description: descriptionRef.current.value
    };

    fetch('http://localhost:8080/categories', {
    method: 'POST',
    body: JSON.stringify(category),
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
          <h2>Add New Category</h2>
        </header>
        <form onSubmit={submitHandler} className={style.content}>
          <div className={style.formgrid}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' required ref={nameRef}/>
          <label htmlFor='description'>Description:</label>
          <input type='text' id='description' required ref={descriptionRef}/>
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

export default AddCategory;