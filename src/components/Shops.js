import React from "react";

import { useState, useEffect } from "react";

const Shops = (props) => {
    const [shopData, setShopData] = useState([]);
    const [error, setError] = useState(null);
    const fetchShopsHandler = async function () {      
      try {
        const response = await fetch('http://localhost:8080/shops')
        const data = await response.json();
          setShopData(data.shop); 
      } catch (err) {
        setError('No shops');
        console.log(err);
      }
      
    }

    useEffect(() => {
      fetchShopsHandler();
    }, [shopData]);
    
    const collectShopId = function (event) {
      const shopId = event.target.value;
      props.passShopId(shopId)
    }

    return (
      <select name="shop" onChange={collectShopId} default={''} required>
        <option value={''}>Choose Shop</option>
        {shopData.map((shop) => (
          <option key={shop._id} value={shop._id}>
          {shop.name}
        </option>
        ))}
      </select>
    );
  };
  
  export default Shops;