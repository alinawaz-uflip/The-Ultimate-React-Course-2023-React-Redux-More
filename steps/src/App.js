import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
      {/* <TipCalc /> */}
      {/* <Steps /> */}
      {/* <Counter /> */}
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "purple",
  expanded = false,
  className,
}) {
  const [isExpanded, setExpanded] = useState(expanded);

  function handleExpand(value) {
    setExpanded(value);
  }

  const buttonStyle = {
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    textDecoration: "underline",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>
        {isExpanded
          ? children
          : children.split(" ").slice(0, collapsedNumWords).join(" ")}
        ...
      </span>
      <button onClick={() => handleExpand(!isExpanded)} style={buttonStyle}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

function TipCalc() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = ((bill * (percentage1 / 100 + percentage2 / 100)) / 2).toFixed(2);

  function handleSetBill(bill) {
    setBill(bill);
    console.log(bill);
  }

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <Input bill={bill} onSetBill={handleSetBill} type="text">
        How much was the bill?
      </Input>
      <Input percentage={percentage1} onSelect={setPercentage1} type="dropdown">
        How did you like the service?
      </Input>
      <Input percentage={percentage2} onSelect={setPercentage2} type="dropdown">
        How did your friend like the service?
      </Input>

      <Output bill={bill} tip={tip} />

      <Reset onReset={handleReset} />
    </div>
  );
}

function Input({ children, type, bill, onSetBill, percentage, onSelect }) {
  if (type === "dropdown") {
    return (
      <div>
        <label htmlFor="dropdown">{children}</label>
        <select
          value={percentage}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          <option value="0">Bad(0%)</option>
          <option value="5">It was okay(5%)</option>
          <option value="10">It was good(10%)</option>
          <option value="20">Amazing!(20%)</option>
        </select>
      </div>
    );
  }
  return (
    <div>
      {children}
      <input
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
        type={type}
      ></input>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h1>
      You pay ${bill + Number(tip)} (${bill} + ${tip} tip)
    </h1>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

function Counter() {
  const [date, setDate] = useState(new Date().toDateString());
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleStepPrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleStepNext() {
    setStep((s) => s + 1);
  }

  function handleCountPrevious() {
    setCount((c) => c - step);

    setDate((dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() - step);
      return date.toDateString();
    });
  }

  function handleCountNext() {
    setCount((c) => c + step);

    setDate((dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + step);
      return date.toDateString();
    });
  }

  return (
    <div>
      <div className="option">
        <button onClick={handleStepPrevious}>-</button>
        <p>Step: {step}</p>
        <button onClick={handleStepNext}>+</button>
      </div>

      <div className="option">
        <button onClick={handleCountPrevious}>-</button>
        <p>Count: {count}</p>
        <button onClick={handleCountNext}>+</button>
      </div>

      <p>
        {count === 0 && "Today is "}
        {count > 0 && `${count} day(s) from today is `}
        {count < 0 && `${Math.abs(count)} day(s) before today was `}
        {date}
      </p>
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1); // use denotes a react hook, only can be called at top level
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handlePrevious}
            >
              <span>👈</span> Previous
            </Button>

            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handleNext}
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, backgroundColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
