import React from "react";

const Input = (props) => {
  const submit = props.onSubmit;
  return (
    //props.title
    //props.type
    //props.onChange
    //props.onsubmit
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon3">
          {props.title}
        </span>
      </div>
      <input
        onChange={props.onChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            submit();
          }
        }}
        type={props.type}
        className="form-control"
        id="basic-url"
        aria-describedby="basic-addon3"
      />

      <div className="input-group-append">
        <button
          onClick={props.onSubmit}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default Input;
