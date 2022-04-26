import style from '../css/Global.module.css';

const List = (props) => {

  function collectListId() {
    props.provideId(props.id)
  }
    return (
      <li onClick={collectListId} className={style.list}>
        <h2>{props.name}</h2>
        <h3>Shop: {props.shop.name}</h3>
      </li>
    );
  };
  
  export default List;