import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Main from "./Main";
import FinishQuiz from "./FinishQuiz";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataFetch":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "failure":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const curQuestion = state.questions.at(state.index);
      //* answer:index of options[0,1,2,3]
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
      };
    default:
      throw new Error("未知错误于render中");
  }
}

export default function App() {
  //* 注意拼写，注意useReducer接收参数的顺序。
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestion = questions.length;
  const totalPoints = questions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    0
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({
          type: "dataFetch",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "failure",
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failure" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestion={numQuestion}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Questions
              whichQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              numQuestion={numQuestion}
              index={index}
            />
          </>
        )}
        {status === "finish" && (
          <FinishQuiz points={points} totalPoints={totalPoints} />
        )}
      </Main>
    </div>
  );
}
