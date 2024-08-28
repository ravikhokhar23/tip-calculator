import { useState } from "react";

const serviceArray = [
  {
    title: "How did you like the service?",
    options: [
      { message: "Dissatisfied (0%)", percentage: 0 },
      { message: "It was okay (5%)", percentage: 5 },
      { message: "It was good (10%)", percentage: 10 },
      { message: "Absolutely amazing! (20%)", percentage: 20 },
    ],
  },
  {
    title: "How did your friend like the service?",
    options: [
      { message: "Dissatisfied (0%)", percentage: 0 },
      { message: "It was okay (5%)", percentage: 5 },
      { message: "It was good (10%)", percentage: 10 },
      { message: "Absolutely amazing! (20%)", percentage: 20 },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <Bill />
      <Service />
    </div>
  );
}

function Bill() {
  const [amount, setAmount] = useState(null);

  return (
    <div>
      <h3>
        How much was the bill?
        <input
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount}
        ></input>
      </h3>
    </div>
  );
}

function Service() {
  return (
    <div>
      {serviceArray.map((item) => (
        <div>
          <ServiceTitle title={item.title} />
          <ServiceResponse options={item.options} />
        </div>
      ))}
    </div>
  );
}

function ServiceTitle({ title }) {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
}

function ServiceResponse({ options }) {
  const [response, setResponse] = useState(options[0].message);
  return (
    <select value={response} onChange={(e) => setResponse(e.target.value)}>
      {options.map((item) => (
        <option value={item.message} key={item.message}>
          {item.message}
        </option>
      ))}
    </select>
  );
}

export default App;
