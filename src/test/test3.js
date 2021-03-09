import React, { useState, useEffect } from "react";
import "./test.css";

export default () => {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [result, setResult] = useState("");
  const [activeBtn, setActiveBtn] = useState("");

  const onChangeInputA = (e) => {
    const value = e.target.value;
    const re = /^[0-9\.-]+$/;
    if (value === "" || re.test(value)) {
      setValueA(value);
    }
  };

  const onChangeInputB = (e) => {
    const value = e.target.value;
    setValueB(value);
  };

  const onPlusFunction = () => {
    if (valueA !== "" || valueB !== "") {
      const result = parseFloat(valueA) + parseFloat(valueB);
      setResult(result);
    } else {
      setResult("");
    }
    setActiveBtn("plus");
  };

  const onMinusFunctiom = () => {
    if (valueA !== "" || valueB !== "") {
      const result = parseFloat(valueA) - parseFloat(valueB);
      setResult(result);
    } else {
      setResult("");
    }
    setActiveBtn("minus");
  };

  const onMultiplyFunction = () => {
    if (valueA !== "" || valueB !== "") {
      const result = parseFloat(valueA) * parseFloat(valueB);
      setResult(result);
    } else {
      setResult("");
    }
    setActiveBtn("mul");
  };

  const onDivideFunction = () => {
    if (valueA !== "" || valueB !== "") {
      const result = parseFloat(valueA) / parseFloat(valueB);
      setResult(result);
    } else {
      setResult("");
    }
    setActiveBtn("div");
  };

  const onPowFunction = () => {
    if (valueA !== "" || valueB !== "") {
      const result = Math.pow(parseFloat(valueA), parseFloat(valueB));
      setResult(result);
    } else {
      setResult("");
    }
    setActiveBtn("pow");
  };

  console.log("result", result);
  console.log(valueA);
  console.log(valueB);

  return (
    <>
      <div style={row}>
        <div class="column">
          A <input value={valueA} onChange={onChangeInputA} />
        </div>
        <div class="column">
          B <input value={valueB} onChange={onChangeInputB} />
        </div>
      </div>
      <div style={row}>
        <div style={column}>
          <button style = {activeBtn === "plus" ? buttonActive : buttonNoActive} onClick={onPlusFunction}> + </button>
        </div>
        <div style={column}>
          <button style = {activeBtn === "minus" ? buttonActive : buttonNoActive}  onClick={onMinusFunctiom}> - </button>
        </div>
        <div style={column}>
          <button style = {activeBtn === "mul" ? buttonActive : buttonNoActive}  onClick={onMultiplyFunction}> x </button>
        </div>
        <div style={column}>
          <button style = {activeBtn === "div" ? buttonActive : buttonNoActive}  onClick={onDivideFunction}> / </button>
        </div>
        <div style={column}>
          <button style = {activeBtn === "pow" ? buttonActive : buttonNoActive}  onClick={onPowFunction}> Pow </button>
        </div>
      </div>
      <div style={row}>
        <div>
          Result <input disabled value={result} />
        </div>
      </div>
      <div style={column2}>
        <div style={column2}></div>
        <div style={column2}></div>
        <div style={button}>
          <button style={buttonStyle}> Load</button>
        </div>
        <div style={button}>
          <button> Save </button>
        </div>
      </div>
    </>
  );
};

const column = {
  float: "left",
  width: "15%",
  padding: "10px",
};

const column2 = {
  float: "left",
  width: "50%",
  padding: "10px",
};

const row = {
  content: "",
  display: "table",
  clear: "both",
};

const button = {
  float: "left",
  width: "25%",
};
const buttonActive = {
  background: "#fff",
  border: "2px solid #33ff46",
};

const buttonNoActive = {
    background: "#fff",
  };

const buttonStyle = {
  float: "right",
};
