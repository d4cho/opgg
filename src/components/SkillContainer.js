import React from 'react';
import Tooltip from './Tooltip';
import classes from './SkillContainer.module.css';

const SkillContainer = (props) => {
  const { name, desc, cd, cost, range, img, key } = props.data;

  return (
    <div className={classes.tooltipcontainer}>
      <img className={classes.img} src={`/images/skills/${img}`} alt='skill' />
      <div className={classes.key}>{key}</div>
      <span className={classes.tooltiptext}>
        <Tooltip>
          {name}
          {desc}
          {cd}
          {cost}
          {range}
        </Tooltip>
      </span>
    </div>
  );
};

export default SkillContainer;
