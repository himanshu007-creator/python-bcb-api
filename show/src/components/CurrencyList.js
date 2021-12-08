import React, { useState } from "react";

const CurrencyList = () => {
  const [resp, setResp] = useState([]);
  const [Type, setType] = useState("");

  const change = (e) => {
    setType(e.currentTarget.value.toUpperCase());
  };

  const fetchApi = async () => {
    const path = Type === "" ? "" : `?type=${Type}`;
    const response = await fetch(`http://127.0.0.1:8000/currency_list/${path}`);
    const resJson = await response.json();
    setResp(resJson);
  };

  return (
    <div>
      <label htmlFor="basic-url">Enter Type</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            GET/country_list/
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
          <p className="bg-color-red text-center w-100">
            Countries {Type !== "" ? `with type = ${Type}` : ""}
          </p>
          <tr>
            <td>Code</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Country Code</td>
            <td>Country Name</td>
            <td>Execution Date</td>
          </tr>
        </thead>
        <tbody>
          {resp.map((i) => (
            <tr>
              <td>{i.code}</td>
              <td>{i.name}</td>
              <td>{i.symbol}</td>
              <td>{i.country_code}</td>
              <td>{i.country_name}</td>
              <td>{i.execution_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyList;
