import React, { useState, useEffect, useCallback } from 'react';


import Lists from './components/Lists';
import AddList from './components/AddList';
import ShowList from './components/ShowList';
import style from './css/Global.module.css';

function App() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [listId, setListId] = useState('');
  

  const fetchListsHandler = useCallback(async function () {
    setIsLoading(true);
    setError(null);
    try {
  const response = await fetch('http://localhost:8080/lists')
  const data = await response.json();

      const transformedLists = data.list.map(listsData => {
        return {
          id: listsData._id,
          name: listsData.name,
          shop: listsData.shop
        };
      })
      setLists(transformedLists);
    
  } catch (error) {
    setError('No lists to show')
  }
  setIsLoading(false);
})



useEffect(() => {
  fetchListsHandler();
}, [lists, refresh]);

function addListHandler(list) {
  fetch('http://localhost:8080/lists', {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  setRefresh(!refresh);
}

function passData(data) {
  setListId(data)
}

let content = <h2>Found no lists.</h2>;

if (lists.length) {
  content = <Lists fetchId={passData} lists={lists} />
} else if (error) {
  content = <h2>{error}</h2>
}


  return (
    
      <div className={style.application}>
      <section>
        <h1>Add New List</h1>
        <div className={style.inside}>
        <AddList onAddList={addListHandler} />
        </div>
      </section>
      <section className={style.showlists}>
        <h1>Selected List:</h1>
        {lists.length > 0 && <ShowList manage={listId} />}
      </section>
      <section className={style.lists}>
        <h1>Lists:</h1>
        <div className={style.inside}>
      {content}
       </div>
      </section>
      </div>
  );
}

export default App;
