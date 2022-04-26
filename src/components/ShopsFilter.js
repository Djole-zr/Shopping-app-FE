import { useState, useEffect } from "react";
import style from '../css/Global.module.css'

const ShopsFilter = (props) => {
    const [shopData, setShopData] = useState([]);
    const fetchShopsHandler = async function () {       
      const response = await fetch('http://localhost:8080/shops')
      const data = await response.json();
        setShopData(data.shop); 
    }

    useEffect(() => {
      fetchShopsHandler();
    }, []);
    
    const collectShopId = function (event) {
      const shopId = event.target.value;
      props.passShopId(shopId)
    }

    return (
      <select name="shop" onChange={collectShopId} default={''}>
        <option value={''}>Show All Shops</option>
        {shopData.map((shop) => (
          <option key={shop._id} value={shop._id}>
          {shop.name}
        </option>
        ))}
      </select>
    );
  };
  
  export default ShopsFilter;