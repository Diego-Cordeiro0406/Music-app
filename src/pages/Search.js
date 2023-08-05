import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { BiSearchAlt } from 'react-icons/bi';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from '../styles/Search.module.css';

class Search extends Component {
  state = {
    inputSearch: '',
    inputSearch2: '',
    listaDeAbuns: [],
    loading: false,
    botaoDesabilitado: true,
    notFound: false,
    resultSearch: false,
  };

  campoDeValidacao = () => {
    const charMin = 1;
    const { inputSearch } = this.state;
    const valName = inputSearch.length > charMin;
    this.setState({
      botaoDesabilitado: !(valName),
    });
  };

  handlerChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.campoDeValidacao);
  };

  handlerClick = async (event) => {
    event.preventDefault();
    const { inputSearch, listaDeAbuns } = this.state;
    const cd = await searchAlbumsAPI(inputSearch);
    this.setState({ loading: true });
    this.setState({
      inputSearch2: inputSearch,
      inputSearch: '',
      loading: false,
      listaDeAbuns: cd,
    });
    if (listaDeAbuns.length === 0) {
      this.setState({ notFound: true, resultSearch: true });
    }
  };

  render() {
    const {
      inputSearch,
      inputSearch2,
      botaoDesabilitado,
      loading,
      listaDeAbuns,
      notFound,
      resultSearch,
    } = this.state;
    return (
      <div className={ styles.searchBody } data-testid="page-search">
        <Header />
        <section className={ styles.inputSection }>
          <form className={ styles.formBody }>
            <label className={ styles.labelBody } htmlFor="input-search">
              <input
                className={ styles.inputSearch }
                placeholder="Digite sua pesquisa"
                name="inputSearch"
                id="input-search"
                value={ inputSearch }
                onChange={ this.handlerChange }
                data-testid="search-artist-input"
              />
              <BiSearchAlt className={ styles.searchIcon } />
            </label>
            <button
              data-testid="search-artist-button"
              onClick={ this.handlerClick }
              disabled={ botaoDesabilitado }
            >
              Procurar
            </button>
          </form>
          {
            !loading && !resultSearch
              ? (
                <span
                  className={ styles.phraseBody }
                >
                  Use o campo de pesquisa para pesquisar algo
                </span>)
              : (
                <span
                  className={ styles.phraseBody }
                >
                  {`Resultado de álbuns de: ${inputSearch2}`}
                </span>)
          }
          <div className={ styles.resultBody }>

            { notFound && listaDeAbuns.length === 0
              ? (
                <span
                  className={ styles.notFoundPhrase }
                >
                  Nenhum álbum foi encontrado
                </span>)
              : (listaDeAbuns.map((album) => (
                <div className={ styles.resultCard } key={ album.collectionId }>
                  <img
                    className={ styles.imgCard }
                    src={ album.artworkUrl100 }
                    alt={ album.name }
                  />
                  <h3>{album.collectionName}</h3>
                  <p>{album.artistName}</p>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    Mais Detalhes
                  </Link>
                </div>)))}
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
