import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Tela Inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Ranking;
