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

  const onCalculateFunction = (value) => {
    let result = 0;
    const valueX = parseFloat(valueA);
    const valueY = parseFloat(valueB);

    if (value === "plus") {
      result = valueX + valueY;
    } else if (value === "minus") {
      result = valueX - valueY;
    } else if (value === "mul") {
      result = valueX * valueY;
    } else if (value === "div") {
      result = valueX / valueY;
    } else if (value === "pow") {
      result = Math.pow(valueX, valueY);
    } else {
      setResult("");
    }
    setResult(result);
    setActiveBtn(value);
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
          <button
            style={activeBtn === "plus" ? buttonActive : buttonNoActive}
            onClick={() => onCalculateFunction("plus")}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div style={column}>
          <button
            style={activeBtn === "minus" ? buttonActive : buttonNoActive}
            onClick={() => onCalculateFunction("minus")}
          >
            {" "}
            -{" "}
          </button>
        </div>
        <div style={column}>
          <button
            style={activeBtn === "mul" ? buttonActive : buttonNoActive}
            onClick={() => onCalculateFunction("mul")}
          >
            {" "}
            x{" "}
          </button>
        </div>
        <div style={column}>
          <button
            style={activeBtn === "div" ? buttonActive : buttonNoActive}
            onClick={() => onCalculateFunction("div")}
          >
            {" "}
            /{" "}
          </button>
        </div>
        <div style={column}>
          <button
            style={activeBtn === "pow" ? buttonActive : buttonNoActive}
            onClick={() => onCalculateFunction("pow")}
          >
            {" "}
            Pow{" "}
          </button>
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
