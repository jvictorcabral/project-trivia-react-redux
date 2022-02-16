import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import { fetchTokenApi } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.fetchQuestionsAPI = this.fetchQuestionsAPI.bind(this);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.fetchQuestionsAPI();
  }

  async fetchQuestionsAPI() {
    const { token, getToken } = this.props;
    const questions = await fetchQuestions(token);
    if (questions.response_code === 0) {
      this.setState({ results: questions.results });
    } else {
      getToken();
    }
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <Header />
        <h2>Jogo Iniciado</h2>
        { results.map((element, i) => (
          <div key={ i }>
            <h3
              data-testid="question-category"
            >
              Category:
              {' '}
              { element.category }
            </h3>

            <h3
              data-testid="question-text"
            >
              Question:
              {' '}
              { element.question }
            </h3>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchTokenApi()),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
