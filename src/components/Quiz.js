import React, { useState, useCallback } from 'react';
import { questions } from '../data/questions';
import './Quiz.css';

const TOTAL = questions.length;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Quiz() {
  const [shuffled, setShuffled] = useState(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = shuffled[current];
  const isCorrect = selected === question.answer;

  const handleSelect = (idx) => {
    if (!confirmed) setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === question.answer) setScore((s) => s + 1);
  };

  const handleNext = useCallback(() => {
    if (current + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }, [current]);

  const handleRestart = () => {
    setShuffled(shuffle(questions));
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / TOTAL) * 100);
    let grade, gradeClass;
    if (pct >= 80) { grade = '🏆 Excellent!'; gradeClass = 'grade-excellent'; }
    else if (pct >= 60) { grade = '👍 Good job!'; gradeClass = 'grade-good'; }
    else { grade = '📚 Keep studying!'; gradeClass = 'grade-study'; }

    return (
      <div className="quiz-card results-card">
        <h2 className="results-title">Quiz Complete!</h2>
        <div className={`score-circle ${gradeClass}`}>
          <span className="score-number">{score}</span>
          <span className="score-denom">/ {TOTAL}</span>
        </div>
        <p className="score-pct">{pct}% correct</p>
        <p className={`grade-label ${gradeClass}`}>{grade}</p>
        <button className="btn btn-primary" onClick={handleRestart}>
          🔄 Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <div className="quiz-progress">
        <span className="progress-text">
          Question {current + 1} <span className="progress-sep">/</span> {TOTAL}
        </span>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${((current + 1) / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="question-text">{question.question}</h2>

      <ol className="choices-list">
        {question.choices.map((choice, idx) => {
          let cls = 'choice-item';
          if (confirmed) {
            if (idx === question.answer) cls += ' correct';
            else if (idx === selected && !isCorrect) cls += ' incorrect';
          } else if (idx === selected) {
            cls += ' selected';
          }
          return (
            <li key={idx}>
              <button
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={confirmed}
                aria-pressed={selected === idx}
              >
                <span className="choice-letter">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="choice-text">{choice}</span>
                {confirmed && idx === question.answer && (
                  <span className="choice-icon" aria-hidden="true">✓</span>
                )}
                {confirmed && idx === selected && !isCorrect && (
                  <span className="choice-icon" aria-hidden="true">✗</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {confirmed && (
        <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong>
          <p>{question.explanation}</p>
        </div>
      )}

      <div className="quiz-actions">
        {!confirmed ? (
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={selected === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            {current + 1 >= TOTAL ? 'See Results' : 'Next Question →'}
          </button>
        )}
        <button className="btn btn-ghost" onClick={handleRestart}>
          Restart
        </button>
      </div>

      <p className="score-tracker">
        Score: <strong>{score}</strong> / {current + (confirmed ? 1 : 0)}
      </p>
    </div>
  );
}

export default Quiz;
