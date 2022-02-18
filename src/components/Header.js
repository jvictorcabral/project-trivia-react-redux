import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const {
      name,
      score,
      picture,
    } = this.props;

    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${picture}` }
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
  picture: state.player.picture,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  picture: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
