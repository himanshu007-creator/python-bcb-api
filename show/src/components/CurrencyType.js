import React, { useState } from "react";

const CurrencyType = () => {
  const [resp, setResp] = useState([]);
  const [symbol, setSymbol] = useState("");

  const change = (e) => {
    setSymbol(e.currentTarget.value.toUpperCase());
  };

  const fetchApi = async () => {
    const path = symbol === "" ? "" : `?symbols=${symbol}`;
    const response = await fetch(`http://127.0.0.1:8000/currency_type/${path}`);
    const resJson = await response.json();
    setResp(resJson);
  };

  return (
    <div>
      <label htmlFor="basic-url">Enter Type</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            GET/currency_type/
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
      <table className="table table-dark table-bordered table-striped mb-0 ">
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody

        // style={{
        //   position: "relative",
        //   height: "20px!important",
        //   overflow: "scroll",
        // }}
        >
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

export default CurrencyType;
