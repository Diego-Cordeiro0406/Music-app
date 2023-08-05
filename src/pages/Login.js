import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../styles/Login.module.css';
import logo from '../styles/styleImages/logo.png';

class Login extends Component {
  state = {
    inputName: '',
    botaoDesabilitado: true,
    loading: false,
  };

  campoDeValidacao = () => {
    const charMin = 2;
    const { inputName } = this.state;
    const valName = inputName.length > charMin;
    this.setState({
      botaoDesabilitado: !(valName),
    });
  };

  handlerClick = async () => {
    const { history } = this.props;
    const { inputName } = this.state;
    this.setState({ loading: true });
    await createUser({
      name: inputName,
    });
    history.push('/search');
  };

  handlerChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.campoDeValidacao);
  };

  render() {
    const { inputName, botaoDesabilitado, loading } = this.state;
    return (
      <div className={ styles.loginBody }>
        <div data-testid="page-login">
          {
            loading ? <Loading />
              : (
                <form className={ styles.loginBox }>
                  <img src={ logo } alt="logo" />
                  <label htmlFor="input-name">
                    <input
                      placeholder="Qual é o seu nome?"
                      className={ styles.inputName }
                      name="inputName"
                      id="input-name"
                      value={ inputName }
                      onChange={ this.handlerChange }
                      data-testid="login-name-input"
                    />
                  </label>
                  <button
                    className={
                      botaoDesabilitado ? styles.inputButtonDisabled : styles.inputButton
                    }
                    data-testid="login-submit-button"
                    onClick={ this.handlerClick }
                    disabled={ botaoDesabilitado }
                  >
                    Entrar
                  </button>
                </form>
              )
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
