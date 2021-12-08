import React, { useState } from "react";

const CurrencyIdList = () => {
  const [resp, setResp] = useState([]);
  const [symbols, setSymbols] = useState("");

  const change = (e) => {
    setSymbols(e.currentTarget.value);
    console.log(symbols);
  };

  const fetchApi = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/currency_id_list/?symbols=${symbols}`
    );
    const resJson = await response.json();
    setResp(resJson);
  };

  return (
    <div>
      <label htmlFor="basic-url">Enter Symbols</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            GET/country_id/
          </span>
        </div>
        <input
          onChange={change}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              fetchApi();
            }
          }}
          type="text"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
        <div className="input-group-append">
          <button
            onClick={fetchApi}
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button>
        </div>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <td>Country</td>
            <td>ID</td>
          </tr>
        </thead>
        <tbody>
          {resp.map((i) => (
            <tr>
              <td>{Object.keys(i)[0] === "" ? "" : Object.keys(i)[0]}</td>
              <td>{Object.values(i)[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyIdList;
