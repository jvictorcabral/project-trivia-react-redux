import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const MIN = 3;
    const { assertions } = this.props;
    return (
      <section data-testid="feedback-text">
        { assertions < MIN
          ? <p>Could be better...</p>
          : <p>Well Done!</p>}
      </section>
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
