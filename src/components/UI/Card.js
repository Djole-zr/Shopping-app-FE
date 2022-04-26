import React from 'react';

import style from '../../css/Global.module.css';

const Card = (props) => {
  return <div className={`${style.card} ${props.className}`}>{props.children}</div>;
};

export default Card;
