import { useState, useEffect } from "react";

const CategoriesFilter = (props) => {
    const [categoryData, setCategoryData] = useState([]);
    const fetchCategoriesHandler = async function () {       
      const response = await fetch('http://localhost:8080/categories')
      const data = await response.json();
        setCategoryData(data.category); 
    }

    useEffect(() => {
      fetchCategoriesHandler();
    }, [categoryData]);
    
    const collectCategoryId = function (event) {
      const categoryId = event.target.value;
      props.passCategoryId(categoryId)
    }

    return (
      <select name="category" onChange={collectCategoryId} default={''}>
        <option value={''}>Show All Categories</option>
        {categoryData.map((category) => (
          <option key={category._id} value={category._id}>
          {category.name}
        </option>
        ))}
      </select>
    );
  };
  
  export default CategoriesFilter;