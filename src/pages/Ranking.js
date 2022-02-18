import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRankingLocalStorage } from '../services/ranking';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const generalRanking = getRankingLocalStorage();
    if (generalRanking.length !== 0) {
      generalRanking.sort((a, b) => b.score - a.score);
      this.setState({
        ranking: generalRanking,
      });
    }
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map(({ name, score, picture }, i) => (
          <div key={ i }>
            <img
              src={ `https://www.gravatar.com/avatar/${picture}` }
              alt="Profile pic"
            />
            <p
              data-testid={ `player-name-${i} ` }
            >
              {name}
            </p>
            <p
              data-testid={ `player-score-${i} ` }
            >
              {score}
            </p>
          </div>
        ))}
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
