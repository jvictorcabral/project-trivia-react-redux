import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addLogin from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      valueName: '',
      valueEmail: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { valueEmail, valueName } = this.state;
      if (valueName && valueEmail !== '') {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { submitLogin } = this.props;
    submitLogin(this.state);
  }

  render() {
    const { valueName, valueEmail, isDisabled } = this.state;
    const { loginEmail, loginName } = this.props;
    console.log(loginEmail, loginName);

    return (
      <section>
        <form onSubmit={ this.handleClick }>
          <label htmlFor="player">
            <input
              type="text"
              data-testid="input-player-name"
              id="player"
              placeholder="Digite seu nome"
              name="valueName"
              value={ valueName }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              placeholder="Digite seu e-mail"
              name="valueEmail"
              value={ valueEmail }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  loginEmail: login.email,
  loginName: login.nome,
});

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (payload) => dispatch(addLogin(payload)),
});

Login.propTypes = {
  submitLogin: PropTypes.func,
  login: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
