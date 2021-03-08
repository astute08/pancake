import React, { useState, useEffect } from "react";
import { Col, Row, Input, Select } from "antd";
import "./test.css";

export default () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  const { Option } = Select;

  useEffect(() => {
    isPrimeFunction();
    isFibonacciFunction();
  }, [selectValue, inputValue]);

  const onChangeInput = (e) => {
    const value = e.target.value;
    const re = /^[0-9\.-]+$/;

    const num = Number(Math.round(value).toFixed(0));
    const minusNum = value.replace(re, "1");


    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (value === "" || re.test(value)) {
      if (parseInt(value) < 1) {
        setInputValue(value);
        setTypingTimeout(
          setTimeout(function () {
            setInputValue(minusNum);
          }, 2000)
        );
      } else {
        setInputValue(value);
        setTypingTimeout(
          setTimeout(function () {
            setInputValue(num);
          }, 2000)
        );
      }
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectValue(value);
  };

  const isPrimeFunction = () => {
    if (inputValue !== "" && selectValue !== "") {
      if (selectValue === "isPrime") {
        if (inputValue > 1) {
          for (let i = 2; i <= inputValue; i++) {
            if (inputValue % i === 0) {
              return false;
            } else {
              return true;
            }
          }
        } else if (inputValue == "0" || inputValue == "1") {
          return false;
        }
      }
    }
  };

  function isSquare(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
  }

  const isFibonacciFunction = () => {
    var i;
    var fib = [];
    fib[0] = 0;
    fib[1] = 1;

    if (inputValue !== "" && selectValue !== "") {
      const num = parseInt(inputValue);
      if (isSquare(5 * (num * num) - 4) || isSquare(5 * (num * num) + 4)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const resultOfPrime = JSON.stringify(isPrimeFunction());
  const resultOfFibonacci = JSON.stringify(isFibonacciFunction());
  const result = selectValue === "isPrime" ? resultOfPrime : resultOfFibonacci;

  return (
    <div>
      <table className="table">
        <tr>
          <th className="col1">
            <Input value={inputValue} onChange={onChangeInput} />
          </th>
          <th className="col2">
            <Select
              style={{ width: 120 }}
              value={selectValue}
              onChange={handleChange}
            >
              <Option value="isPrime">isPrime</Option>
              <Option value="isFibonacci">isFibonacci</Option>
            </Select>
          </th>
          <th className="col3">{result}</th>
        </tr>
      </table>
    </div>
  );
};
