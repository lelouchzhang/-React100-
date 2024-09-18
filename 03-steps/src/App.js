import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  function Button({ bgColor, color, onClick, children }) {
    return (
      <button
        style={{ backgroundColor: bgColor, color: color }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  function StepMessage({ step, children }) {
    return (
      <div className="message">
        <h3>Step {step}:</h3>
        {children}
      </div>
    );
  }
  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}> {messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#ffd803" color="#272343" onClick={handlePrev}>
              <span>◀</span> Previous
            </Button>
            <Button bgColor="#ffd803" color="#272343" onClick={handleNext}>
              Next <span>▶</span>
            </Button>
          </div>
        </div>
      )}
      ;
    </>
  );
}
