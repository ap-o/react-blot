import 'clear.css';
import styles from 'styles.css';
import React from 'react';
import {render} from 'react-dom';

import { Button } from './button';

import Box from './box';

class Tarmac extends React.Component {
  render () {
    return (
      <main className={styles.container}>

        <h3>Float Button</h3>
        <Button
          float
        ></Button>
        <hr/>
        <h3>Rect Button</h3>
        <Button/>
        <hr/>
        <h3>Box</h3>
        <Box/>
      </main>
    )
  }
}

render(
  <Tarmac />,
  document.getElementById('root')
)
