import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { addLogin, getNewTokenAndSave, setPictureUrl } from '../redux/actions';
import { addRanking } from '../services/ranking';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      picture: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  handleChange({ target: { name: nameInput, value } }) {
    this.setState({
      [nameInput]: value,
    }, () => {
      const { name, email } = this.state;
      if (name && email !== '') {
        const picture = md5(email).toString();
        this.setState({
          isDisabled: false,
          picture,
        });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { submitLogin, history, getNewToken, setUrlPicture } = this.props;
    const { name, picture } = this.state;
    submitLogin(this.state);
    await getNewToken();
    addRanking({ name, score: 0, picture });
    setUrlPicture(picture);
    history.push('/game');
  }

  handleClickSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <section>
        <form onSubmit={ this.handleClick }>
          <label htmlFor="player">
            <input
              type="text"
              data-testid="input-player-name"
              id="player"
              placeholder="Digite seu nome"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={ email }
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

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickSettings }
          >
            Settings
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getNewToken: () => dispatch(getNewTokenAndSave()),
  setUrlPicture: (payload) => dispatch(setPictureUrl(payload)),
  submitLogin: (payload) => dispatch(addLogin(payload)),
});

Login.propTypes = {
  submitLogin: PropTypes.func,
  login: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
