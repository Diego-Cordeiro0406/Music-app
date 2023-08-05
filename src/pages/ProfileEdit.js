import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';
import styles from '../styles/ProfileEdit.module.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    loading: false,
    image: '',
    email: '',
    description: '',
    botaoDesabilitado: true,
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
      botaoDesabilitado: false,
    });
  }

  campoDeValidacao = () => {
    const { name, email, image, description } = this.state;
    const valfields = name.length > 0
    && image.length > 0 && email.length > 0 && description.length > 0;
    const valEmail = email.includes('@', '.com');
    this.setState({
      botaoDesabilitado: !(valfields && valEmail),
    });
  };

  handlerChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.campoDeValidacao);
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { image, name, email, description } = this.state;
    await updateUser({
      name,
      image,
      email,
      description,
    });
    history.push('/profile');
  };

  render() {
    const {
      image,
      name,
      email,
      description,
      loading,
      botaoDesabilitado,
    } = this.state;
    return (
      <div className={ styles.profileEditBody } data-testid="page-profile-edit">
        <Header />
        {
          !loading ? <Loading /> : (
            <section className={ styles.profileEditSection }>
              <div className={ styles.userPhotoBackground }>
                <img
                  className={ styles.profileImg }
                  src={ image }
                  alt="foto usuario"
                />
                <input
                  className={ styles.profileEditImg }
                  data-testid="edit-input-image"
                  placeholder="Insira um link"
                  name="image"
                  id="img-user"
                  value={ image }
                  onChange={ this.handlerChange }
                />
              </div>
              <form className={ styles.profileEditForm }>
                <label className={ styles.profileEditLabel } htmlFor="name-user">
                  Nome
                  <input
                    className={ styles.profileEditInput }
                    data-testid="edit-input-name"
                    placeholder="Insira seu novo nome"
                    name="name"
                    id="name-user"
                    value={ name }
                    onChange={ this.handlerChange }
                  />
                </label>
                <label className={ styles.profileEditLabel } htmlFor="email-user">
                  Email
                  <input
                    className={ styles.profileEditInput }
                    data-testid="edit-input-email"
                    placeholder="Insira seu novo email"
                    name="email"
                    id="email-user"
                    value={ email }
                    onChange={ this.handlerChange }
                  />
                </label>
                <label className={ styles.profileEditLabel } htmlFor="description-user">
                  Descrição
                  <textarea
                    className={ styles.profileEditTextArea }
                    data-testid="edit-input-description"
                    placeholder="Insira sua nova descrição"
                    name="description"
                    id="description-user"
                    value={ description }
                    onChange={ this.handlerChange }
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  disabled={ botaoDesabilitado }
                >
                  Salvar
                </button>
              </form>
            </section>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
