import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import './test.css'
// import Highlighter from 'react-highlight-words';

export default () => {
  const searchInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataSource, setDataSource] = useState();
  const [term, setTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const getApi = async () => {
    let result = 0;
    const data = await fetch("https://api.publicapis.org/categories")
      .then((res) => res.json())
      .then((response) => {
        // console.log("response", response);
        result = response;
      });
    return result;
  };

  const loadData = async () => {
    const data = await getApi();
    setDataSource(data);
  };

  console.log("Datasource", dataSource);

  const searchHandler = (event) => {
    const value = event.target.value;
    setTerm(value);
  };

  //////////////////////////////////////////////////

  const columns = [
    {
      title: "",
      index: "0",
      key: "name",
      width: "30%",
    },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={searchHandler}
        value={term}
      />
      <table className = 'search'>
        
        <tbody>
          {dataSource ? dataSource.filter(searchingFor(term)).map((item, index) => (
            <tr key={index}>
              <th>{item}</th>
            </tr>
          )) : ""}
        </tbody>
      </table>{" "}
    </div>
  );
};

function searchingFor(value) {
  return function (x) {
    return x.toLowerCase().includes(value.toLowerCase()) || !value;
  };
}
