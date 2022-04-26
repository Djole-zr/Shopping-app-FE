import React, { useState } from 'react';

import List from './List';
import ShopsFilter from './ShopsFilter';
import style from '../css/Global.module.css';

const Lists = (props) => {
  const [shopId, setShopId] = useState('');

 function passId (data) {
   props.fetchId(data)
 }

 function fetchShopId (data) {
  setShopId(data);
}

const fileterLists = props.lists.filter (list => {
  if (shopId) {
    return list.shop._id === shopId;
  } else {
    return list
  }
  
})

  return (
    <React.Fragment>
    <div className={style.shopfilter}>
      <label>Filter by shop: </label>
      <ShopsFilter passShopId={fetchShopId} />
    </div>
    <ul>
      {fileterLists.map((list) => (
        <List
          key={list.id}
          name={list.name}
          shop={list.shop}
          id={list.id}
          provideId={passId}
        />
      ))}
    </ul>
    </React.Fragment>
  );
};

export default Lists;