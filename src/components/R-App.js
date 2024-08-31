import { useState } from "react";

export const serviceArray = [
  {
    id: 1,
    title: "How did you like the service?",
    options: [
      { id: 11, message: "Dissatisfied (0%)", percentage: 0 },
      { id: 12, message: "It was okay (5%)", percentage: 5 },
      { id: 13, message: "It was good (10%)", percentage: 10 },
      { id: 14, message: "Absolutely amazing! (20%)", percentage: 20 },
    ],
    selectedOptionId: 11,
  },
  {
    id: 2,
    title: "How did your friend like the service?",
    options: [
      { id: 21, message: "Dissatisfied (0%)", percentage: 0 },
      { id: 22, message: "It was okay (5%)", percentage: 5 },
      { id: 23, message: "It was good (10%)", percentage: 10 },
      { id: 24, message: "Absolutely amazing! (20%)", percentage: 20 },
    ],
    selectedOptionId: 21,
  },
];

function App() {
  const [services, setServices] = useState(serviceArray);
  const [amount, setAmount] = useState();
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  function handleReset() {
    setAmount(0);
    setServices(serviceArray);
  }

  function handleBillAmount(e) {
    setAmount(Number(e.target.value));
  }

  function handleServiceOption1(selectedOptionValue) {
    setValue1(selectedOptionValue);
    setTipAmount(getTip());
  }

  function handleServiceOption2(selectedOptionValue) {
    setValue2(selectedOptionValue);
    setTipAmount(getTip());
  }

  function getTip() {
    let averageTipPercentage = Number(value1) + Number(value2);
    averageTipPercentage = averageTipPercentage / 2;

    if (averageTipPercentage > 0) {
      return (averageTipPercentage * amount) / 100;
    }
    return 0;
  }

  return (
    <div className="App">
      <Bill amount={amount} handleBillAmount={handleBillAmount} />
      <Service item={services[0]} handleServiceOption={handleServiceOption1} />
      <Service item={services[1]} handleServiceOption={handleServiceOption2} />
      <YouPay billAmount={amount} tipAmount={tipAmount} />
      <Reset handleReset={handleReset} />
    </div>
  );
}

function Bill({ amount, handleBillAmount }) {
  return (
    <div>
      <h3>
        How much was the bill?
        <input
          type="text"
          onChange={(e) => handleBillAmount(e)}
          value={amount}
        ></input>
      </h3>
    </div>
  );
}

function Service({ item, handleServiceOption }) {
  return (
    <div>
      <ServiceTitle title={item.title} key={item.title} />
      <ServiceResponse
        id={item.id}
        handleServiceOption={handleServiceOption}
        options={item.options}
        key={item.id}
      />
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

function ServiceResponse({ id, options, handleServiceOption }) {
  const [response, setResponse] = useState(options[0].message);

  function handleSelectedOption(e) {
    setResponse(e.target.value);
    handleServiceOption(e.target.childNodes[e.target.selectedIndex].id);
  }

  return (
    <select value={response} onChange={(e) => handleSelectedOption(e)}>
      {options.map((item) => (
        <option value={item.message} key={item.id} id={item.percentage}>
          {item.message}
        </option>
      ))}
    </select>
  );
}

function YouPay({ billAmount, tipAmount }) {
  return (
    <h1>{`You pay $${
      billAmount + tipAmount
    } ($${billAmount} + $${tipAmount})`}</h1>
  );
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>;
}

export default App;
