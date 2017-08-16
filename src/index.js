import 'clear.css';
import styles from 'styles.css';
import React from 'react';
import {render} from 'react-dom';

class Tarmac extends React.Component {
  render () {
    return (
      <main className={styles.container}>
        <h1 className={styles.h1}>Tarmac</h1>
      </main>
    )
  }
}

render(
  <Tarmac />,
  document.getElementById('root')
)
