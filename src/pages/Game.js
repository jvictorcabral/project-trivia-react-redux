import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNewTokenAndSave, setScore } from '../redux/actions';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import shuffleArray from '../services/shuffleArray';
import { getToken } from '../services/token';
import { addRanking } from '../services/ranking';

const DIFFICULTY_LEVEL = {
  hard: 3,
  medium: 2,
  easy: 1,
};

const NUMBER_SUM_SCORE = 10;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      currentTimer: 30,
      disabled: false,
      indiceQuestion: 0,
      questions: [],
      score: 0,
    };

    this.dataManipulation = this
      .dataManipulation.bind(this);
    this.fetchQuestionsAndDataManipulation = this
      .fetchQuestionsAndDataManipulation.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.handleClickNextQuestion = this.handleClickNextQuestion.bind(this);
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
      const shuffledAnswers = shuffleArray(answers);
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
          this.setState({
            disabled: currentTimer === 0,
            indiceQuestion: prevState.indiceQuestion + 1 });
        }
        return {
          currentTimer,
        };
      });
    }, TIMER_INTERVAL);
  }

  handleClickAnswer({ target: { innerText } }, question) {
    const { scoreAndAssertions, picture, name } = this.props;
    const { currentTimer, score } = this.state;
    const { correct_answer: correctAnswer, difficulty } = question;
    if (innerText === correctAnswer) {
      const sumScore = NUMBER_SUM_SCORE + (currentTimer * DIFFICULTY_LEVEL[difficulty]);
      this.setState((prevState) => {
        const scorePlayer = prevState.score + sumScore;
        const assertions = prevState.assertions + 1;
        scoreAndAssertions({ scorePlayer, assertions });
        return {
          assertions,
          score: scorePlayer,
          visible: !prevState.visible,
        };
      });
    }
    this.setState((prevState) => ({
      disabled: !prevState.disabled,
      visible: true,
    }));
    clearInterval(this.timer);
    addRanking({ name, score, picture });
  }

  handleClickNextQuestion() {
    const { history } = this.props;
    const { indiceQuestion, questions } = this.state;

    if (indiceQuestion < questions.length - 1) {
      this.setState(({ disabled, indiceQuestion: indice }) => ({
        disabled: !disabled,
        indiceQuestion: indice + 1,
        currentTimer: 30,
      }));
    } else {
      history.push('/feedback');
      this.setState({
        disabled: true,
        currentTimer: 30,
      });
    }
    this.timeCounter();
  }

  render() {
    const { questions, disabled, currentTimer, indiceQuestion } = this.state;
    const question = questions[indiceQuestion];
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
                  onClick={ (event) => this.handleClickAnswer(event, question) }
                >
                  {value.answer}
                </button>
              ))}
              <p>{`Tempo para resposta: ${currentTimer}`}</p>
            </div>
          </>
        )}
        <div className="next">
          <button
            type="button"
            style={ disabled ? { visibility: 'visible' } : { visibility: 'collapse' } }
            data-testid="btn-next"
            onClick={ this.handleClickNextQuestion }
          >
            Next
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  picture: player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  getNewToken: () => dispatch(getNewTokenAndSave()),
  scoreAndAssertions: (payload) => dispatch(setScore(payload)),
});

Game.propTypes = {
  getNewToken: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
