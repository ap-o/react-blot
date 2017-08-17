import React from 'react';
import Blot from './blot';

const Box = (props) => {

  const {
    blots,
    onMouseDown,
    onMouseLeave,
    onMouseUp
  } = props;

  const defaultStyle = {
    padding: '40px',
    position: 'relative',
    backgroundColor: `#ffffff`,
    display: `block`,
    maxWidth: `50%`,
  }

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      style={{
        ...defaultStyle
    }}>
      {blots}
      <h3>Hey</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</p>
    </div>
  )
}

export default Blot(Box);
