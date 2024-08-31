import { useState } from "react";

function App() {
  return <TipCalculator />;
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [response1, setResponse1] = useState(0);
  const [response2, setResponse2] = useState(0);
  const tip = bill * ((parseInt(response1) + parseInt(response2)) / 2 / 100);

  return (
    <div>
      <BillInput bill={bill} setBillAmount={setBill} />
      <br />
      <ServiceResponse response={response1} setResponse={setResponse1}>
        How did you like the service?
      </ServiceResponse>
      <br />
      <ServiceResponse response={response2} setResponse={setResponse2}>
        How did your friend like the service?
      </ServiceResponse>
      <br />
      <TotalPayment bill={bill} tip={tip} />
      <br />
      <Reset />
    </div>
  );
}

function BillInput({ bill, setBillAmount }) {
  return (
    <div>
      <label>How much was the bill? </label>
      <input
        type="text"
        placeholder="Enter bill amount"
        value={bill}
        onChange={(e) => setBillAmount(Number(e.target.value))}
      />
    </div>
  );
}

function ServiceResponse({ children, response, setResponse }) {
  return (
    <div>
      <label>{children}</label>
      <select value={response} onChange={(e) => setResponse(e.target.value)}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function TotalPayment({ bill, tip }) {
  return (
    <h2>
      You pay ${bill + tip}(${bill} + ${tip})
    </h2>
  );
}

function Reset() {
  return <button>Reset</button>;
}
export default App;
