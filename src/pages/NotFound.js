import React, { Component } from 'react';
import styles from '../styles/NotFound.module.css';

class NotFound extends Component {
  render() {
    return (
      <div className={ styles.notFoundBody }>
        <section className={ styles.notFoundBox } data-testid="page-not-found">
          <p className={ styles.notFoundOps }>Ops!</p>
          <p className={ styles.notFoundPhrase }>
            A página que você
            está procurando
            não foi encontrada.
          </p>
        </section>
      </div>
    );
  }
}

export default NotFound;
