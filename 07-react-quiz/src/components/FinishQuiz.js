import React from "react";

export default function FinishQuiz({ points, totalPoints }) {
  const percent = (points / totalPoints) * 100;
  console.log(points, totalPoints);
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints}(
        {Math.ceil(percent)})
      </p>
    </div>
  );
}
