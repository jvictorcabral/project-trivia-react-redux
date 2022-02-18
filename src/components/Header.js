import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { setPictureUrl } from '../redux/actions';

class Header extends React.Component {
  componentDidMount() {
    this.setPicture();
  }

  setPicture = () => {
    const { email, setUrlPicture } = this.props;
    const urlPicture = md5(email).toString();
    setUrlPicture(urlPicture);
  }

  render() {
    const {
      name,
      score,
      email,
    } = this.props;
    const hash = md5(email).toString();

    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="Profile pic"
          />

          <h3
            data-testid="header-player-name"
          >
            { name }
          </h3>

          <h4
            data-testid="header-score"
          >
            { `${score} pnts`}
          </h4>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  setUrlPicture: (payload) => dispatch(setPictureUrl(payload)),
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
