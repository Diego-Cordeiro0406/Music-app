import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import MoonLoader from 'react-spinners/MoonLoader';

import { getUser } from '../services/userAPI';
import styles from '../styles/Header.module.css';
import logo from '../styles/styleImages/logo.png';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  async componentDidMount() {
    await getUser();
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      name: user.name,
      loading: true,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header
        className={ styles.headerBody }
        data-testid="header-component"
      >
        <img src={ logo } alt="logo" />
        <div className={ styles.headerBox }>
          <BiSearchAlt />
          <Link
            className={ styles.headerPhrase }
            data-testid="link-to-search"
            to="/search"
          >
            search
          </Link>
        </div>
        <div className={ styles.headerBox }>
          <AiOutlineStar />
          <Link
            className={ styles.headerPhrase }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites
          </Link>
        </div>
        <div className={ styles.headerBox }>
          <CgProfile />
          <Link
            className={ styles.headerPhrase }
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </Link>
        </div>
        {!loading
          ? (
            <div>
              <MoonLoader color="#00D5E2" size={ 50 } />
              <p className={ styles.headerLoading }>Carregando...</p>
            </div>
          )
          : (
            <p
              className={ styles.headerPhrase }
              data-testid="header-user-name"
            >
              {name}
            </p>
          )}
      </header>
    );
  }
}

export default Header;
