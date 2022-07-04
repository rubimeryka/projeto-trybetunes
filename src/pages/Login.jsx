import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
      login: false,
    };
  }

  handleClick = ({ target }) => {
    this.setState({
      name: target.value,
    });

    const minCharInput = 3;
    if (target.value.length >= minCharInput) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleLogin = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, login: true });
  }

  render() {
    const {
      isButtonDisabled,
      name,
      loading,
      login } = this.state;

    return (
      <div data-testid="page-login">
        Login

        {loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="name">
                <input
                  name="name"
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Insira seu username"
                  value={ name }
                  onChange={ this.handleClick }
                />
              </label>
              <div>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ isButtonDisabled }
                  onClick={ this.handleLogin }
                >
                  Entrar
                </button>
              </div>
            </form>
          )}

        { login && <Redirect to="/search" /> }

      </div>
    );
  }
}

export default Login;
