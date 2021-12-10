import React, { useState } from "react";

const Currency = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  var today = yyyy + "-" + mm + "-" + dd;

  const [resp, setResp] = useState([]);
  const [symbols, setSymbols] = useState("");
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2000-02-01");
  const [side, setSide] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const changeSm = (e) => {
    setSymbols(e.currentTarget.value.toUpperCase());
  };
  const changeSd = (e) => {
    setStartDate(e.currentTarget.value);
    console.log(startDate);
  };
  const changeEd = (e) => {
    setEndDate(e.currentTarget.value);
    console.log(endDate);
  };
  const changeSide = (e) => {
    setSide(e.currentTarget.value.toLowerCase());
  };
  const changeGb = (e) => {
    setGroupBy(e.currentTarget.value.toLowerCase());
  };

  const fetchApi = async () => {
    //symbol
    //start_date
    //end_date
    //side
    //group_by
    // SIDE = ASK, GROUP_BY = SYMBOLs
    // http://127.0.0.1:8000/currency/?symbols=USD%2CAFN&start_date=2000-01-02&end_date=2000-02-10&side=ask&group_by=symbols
    // const start_date ;
    var path =
      `http://127.0.0.1:8000/currency/?symbols=${encodeURIComponent(
        symbols
      )}&start_date=${startDate}&end_date=${endDate}` +
      (side === "" ? "" : `&side=${side}`) +
      (groupBy === "" ? "" : `&${groupBy}`);
    console.log(path);

    const response = await fetch(path);
    const resJson = await response.json();
    setResp(resJson);
  };

  return (
    <div>
      <label htmlFor="basic-url">Enter Type</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            Symbol(s)
          </span>
        </div>
        <input
          onChange={changeSm}
          type="text"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
        {/* <div className="input-group-append">
          <button
            onClick={fetchApi}
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button>
        </div> */}
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            Start Date
          </span>
        </div>
        <input
          placeholder="dd-mm-yyyy"
          min="1997-01-01"
          max={today}
          onChange={changeSd}
          type="date"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            End Date
          </span>
        </div>
        <input
          placeholder="dd-mm-yyyy"
          min="1997-01-01"
          max={today}
          onChange={changeEd}
          type="Date"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            Side (bid/ask/both)
          </span>
        </div>
        <input
          onChange={changeSide}
          type="text"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            Group_by (symbol)
          </span>
        </div>
        <input
          onChange={changeGb}
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
            <td>Symbols</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>
          {resp.map((i) => (
            <tr>
              {console.log(i.currency, i.rates)}
              <td>{i.country}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Currency;
