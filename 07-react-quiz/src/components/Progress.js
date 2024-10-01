import React from "react";

export default function Progress({
  index,
  numQuestion,
  points,
  totalPoints,
  answer,
}) {
  return (
    <div>
      <header className="progress">
        <progress max={numQuestion} value={index + Number(answer !== null)} />
        <p>
          Question <strong>{index + 1}</strong> /{numQuestion}
        </p>
        <p>
          <strong>{points}</strong> /{totalPoints}points
        </p>
      </header>
    </div>
  );
}
