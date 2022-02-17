import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getNewTokenAndSave } from '../redux/actions';
import { fetchQuestions } from '../services/api';
import shuffleAnswers from '../services/shuffleAnswers';
import { getToken } from '../services/token';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.fetchQuestionsAndDataManipulation = this
      .fetchQuestionsAndDataManipulation.bind(this);
    this.dataManipulation = this
      .dataManipulation.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndDataManipulation();
  }

  async fetchQuestionsAndDataManipulation() {
    const { getNewToken } = this.props;
    const INVALID = 3;
    const token = getToken();
    const questions = await fetchQuestions(token);
    if (questions.response_code === INVALID) {
      await getNewToken();
      this.fetchQuestionsAndDataManipulation();
    } else {
      this.dataManipulation(questions.results);
    }
  }

  dataManipulation(questions) {
    const stateAnswers = questions.map((item) => {
      const answers = item.incorrect_answers
        .map((answer) => ({ answer, correct: false }));
      answers.push({ answer: item.correct_answer, correct: true });
      const shuffledAnswers = shuffleAnswers(answers);
      return {
        ...item,
        shuffledAnswers,
      };
    });
    this.setState({
      questions: stateAnswers,
    });
  }

  render() {
    const { questions } = this.state;
    // const i = 0;
    return (
      <div>
        <Header />
        {questions.map(({ category, question, shuffledAnswers }) => (
          <>
            <p data-testid="question-category">
              { category }
            </p>

            <p data-testid="question-text">
              { question }
            </p>
            <div data-testid="answer-option">
              {shuffledAnswers.map(({ value }, i) => (
                <button
                  key={ i }
                  type="button"
                  data-testid={ value.correct === true
                    ? 'correct-answer'
                    : `wrong-answer-${i}` }
                >
                  {value.answer}
                </button>
              ))}
            </div>
          </>

        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getNewToken: () => dispatch(getNewTokenAndSave()),
});

Game.propTypes = { getNewToken: PropTypes.func, token: PropTypes.string }.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
