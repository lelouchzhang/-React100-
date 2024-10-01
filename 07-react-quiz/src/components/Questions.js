import React from "react";

export default function Questions({ whichQuestion, dispatch, answer }) {
  const { question, correctOption, id, options, points } = whichQuestion;
  const hasAnswered = answer !== null;

  function getButtonClassName(index) {
    let className = "btn btn-option";

    if (index === answer) {
      className += " answer";
    }

    if (hasAnswered) {
      className += index === correctOption ? " correct" : " wrong";
    }

    return className;
  }
  return (
    <div>
      <h4>{question}</h4>
      <div className="options">
        {options.map((option, index) => {
          return (
            <button
              key={option}
              disabled={hasAnswered}
              className={getButtonClassName(index)}
              onClick={() => {
                dispatch({
                  type: "newAnswer",
                  payload: index,
                });
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
