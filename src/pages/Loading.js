import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

import styles from '../styles/Loading.module.css';

class Loading extends Component {
  render() {
    return (
      <section className={ styles.loadingBody }>
        <MoonLoader color="#00D5E2" />
        <p className={ styles.loadingPhrase }>Carregando...</p>
      </section>
    );
  }
}

export default Loading;
