import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const MIN = 3;
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          { assertions < MIN
            ? <p>Could be better...</p>
            : <p>Well Done!</p>}
        </div>
        <p data-testid="feedback-total-score">
          { score }
          pontos
        </p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
