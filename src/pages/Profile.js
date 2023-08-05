import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';
import styles from '../styles/Profile.module.css';

class Profile extends Component {
  state = {
    name: '',
    loading: false,
    image: '',
    email: '',
    description: '',
  };

  async componentDidMount() {
    await getUser();
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      name: user.name,
      image: user.image,
      email: user.email,
      description: user.description,
      loading: true,
    });
  }

  render() {
    const { image, name, email, description, loading } = this.state;
    return (
      <div className={ styles.profileBody } data-testid="page-profile">
        <Header />
        {
          !loading ? <Loading /> : (
            <section className={ styles.profileSection }>
              <div className={ styles.profileFirstBackground }>
                <img
                  className={ styles.profileImg }
                  data-testid="profile-image"
                  src={ image }
                  alt="foto usuario"
                />
              </div>
              <div className={ styles.dataBody }>
                <span className={ styles.phrasesBody }>
                  <h3 className={ styles.userTitle }>Nome</h3>
                  <p className={ styles.userParagraph }>{name}</p>
                </span>
                <span className={ styles.phrasesBody }>
                  <h3 className={ styles.userTitle }>Email</h3>
                  <p className={ styles.userParagraph }>{email}</p>
                </span>
                <span className={ styles.phrasesBody }>
                  <h3 className={ styles.userTitle }>Descrição</h3>
                  <p className={ styles.userParagraph }>{description}</p>
                </span>
                <Link
                  className={ styles.editProfileButton }
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
