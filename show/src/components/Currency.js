import React, { useState } from "react";
import Input from "./Input";

const Currency = () => {
  const [resp, setResp] = useState([]);
  const [symbol, setSymbol] = useState("");

  const change = (e) => {
    setSymbol(e.currentTarget.value.toUpperCase());
  };

  const fetchApi = async () => {
    const path = symbol === "" ? "" : `?symbols=${symbol}`;
    const response = await fetch(
      `http://127.0.0.1:8000/currency/?symbols=USD%2CAFN&start_date=2000-01-01&end_date=2000-02-01`
    );
    const resJson = await response.json();
    setResp(resJson);
  };

  return (
    <div>
      <label htmlFor="basic-url">GET/currency_type/</label>
      <Input title="testing" onSumbit={fetchApi} onChange={change} />
      <table className="table table-dark">
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>
          {resp.map((i) => (
            <tr>
              <td>{i.symbol}</td>
              <td>{i.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Currency;
