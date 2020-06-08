import React from 'react';
import classes from './Items.module.css';

const Items = (props) => {
  return (
    <div className={classes.parent}>
      <img src={`/images/items/${props.item0}.png`} alt='props.item0' />
      <img src={`/images/items/${props.item1}.png`} alt='props.item1' />
      <img src={`/images/items/${props.item2}.png`} alt='props.item2' />
      <img src={`/images/items/${props.item3}.png`} alt='props.item3' />
      <img src={`/images/items/${props.item4}.png`} alt='props.item4' />
      <img src={`/images/items/${props.item5}.png`} alt='props.item5' />
      <img src={`/images/items/${props.item6}.png`} alt='props.item6' />
    </div>
  );
};

export default Items;
