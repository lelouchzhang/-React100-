import React from "react";

export default function FinishQuiz({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percent = (points / totalPoints) * 100;
  console.log(points, totalPoints);
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints}(
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore">(High score: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </div>
  );
}
