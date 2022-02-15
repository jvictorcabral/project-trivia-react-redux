import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
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
  name: state.login.player.name,
  score: state.login.player.score,
  email: state.login.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
