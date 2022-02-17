import React, { Component } from 'react';

// PropTypes:
import PropTypes from 'prop-types';

// React-Redux:
import { connect } from 'react-redux';
import { getNewTokenAndSave } from '../redux/actions';

// Components:
import Header from '../components/Header';

// Funcoes:
import { fetchQuestions } from '../services/api';
import shuffleAnswers from '../services/shuffleAnswers';
import { getToken } from '../services/token';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      currentTimer: 30,
      disabled: false,
    };

    this.dataManipulation = this
      .dataManipulation.bind(this);
    this.fetchQuestionsAndDataManipulation = this
      .fetchQuestionsAndDataManipulation.bind(this);
    this.timeCounter = this
      .timeCounter.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndDataManipulation();
    this.timeCounter();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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

  timeCounter() {
    const TIMER_INTERVAL = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        const currentTimer = prevState.currentTimer - 1;
        if (currentTimer === 0) {
          clearInterval(this.timer);
          this.setState({ disabled: currentTimer === 0 });
        }
        return {
          currentTimer,
        };
      });
    }, TIMER_INTERVAL);
  }

  render() {
    const { questions, disabled, currentTimer } = this.state;
    const question = questions[0];
    return (
      <section>
        <Header />
        { question !== undefined
        && (
          <>
            <p data-testid="question-category">
              { question.category }
            </p>

            <p data-testid="question-text">
              { question.question }
            </p>
            <div data-testid="answer-options">
              {question.shuffledAnswers.map(({ value }, i) => (
                <button
                  key={ i }
                  type="button"
                  disabled={ disabled }
                  data-testid={ value.correct === true
                    ? 'correct-answer'
                    : `wrong-answer-${i}` }
                >
                  {value.answer}
                </button>
              ))}
              <p>{`Tempo para resposta: ${currentTimer}`}</p>
            </div>
          </>
        )}
      </section>
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
