import React, { useState, useEffect } from "react";
import { List, Avatar, Button, Modal, Input, Radio, message } from "antd";
import Moment from "react-moment";

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isPublished, setIsPublished] = useState();
  const [modalStatus, setModalStatus] = useState("");
  const [editId, setEditId] = useState();

  const url = "http://localhost:5000/api/goosemations/";
  // const url = 'http://localhost:3000/api/animations/';
  useEffect(() => {
    getAnimationSource();
  }, []);

  const onModalVisible = () => {
    setAddVisible(true);
  };

  const handleOk = () => {
    setName("");
    setType("");
    setIsPublished();
    setAddVisible(false);
    const method = modalStatus === "Add" ? "POST" : "PUT";
    if (method === "POST") {
      getApi(modalStatus, method);
    } else {
      getApi(modalStatus, method, editId);
    }
  };

  const handleCancel = () => {
    setName("");
    setType("");
    setIsPublished();
    setAddVisible(false);
  };

  const getApiEditField = async (id) => {
    let result = 0;

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(url + id, config)
      .then((res) => res.json())
      .then((response) => {
        console.log("res", response);
        result = response;
      });

    console.log("result", result);
    setName(result.name);
    setType(result.type);
    setIsPublished(result.isPublished);
  };

  const getApi = async (value, method, id) => {
    console.log("Method = ", method, ": ", id);
    console.log("value", value);
    let result = 0;

    const body = {
      name: name,
      type: type,
      isPublished: isPublished,
    };
    const config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    if (value === "Add") {
      const data = await fetch(url, config)
        .then((res) => res.json())
        .then((response) => {
          console.log("Add res", response);
          result = response;
        });

      setTimeout(() => {
        message.success(`${modalStatus} ${result.data.name} Success`);
      }, 700);

      getAnimationSource();
    } else if (value === "Update") {
      const data = await fetch(url + id, config)
        .then((res) => res.json())
        .then((response) => {
          result = response;
        });

      setTimeout(() => {
        message.success(`${result.message}`);
      }, 700);

      getAnimationSource();
    } else if (value === "Delete") {
      console.log("This delete Id: ", id);
      const data = await fetch(url + `${id}`, config)
        .then((res) => res.json())
        .then((response) => {
          console.log("Delete Data: ", response);

          result = response;
        });

      setTimeout(() => {
        message.success(`${result.message}`);
      }, 700);

      getAnimationSource();
    } else {
      const data = await fetch(url)
        .then((res) => res.json())
        .then((response) => {
          result = response;
        });
    }

    return result;
  };

  const getAnimationSource = async () => {
    const data = await getApi("", "GET");

    setDataSource(data);
  };

  console.log("DataSource", dataSource);

  const onClickDelete = (deleteId) => {
    console.log("onClickDelete", deleteId);
    getApi("Delete", "DELETE", deleteId);
  };

  const onModalStatus = (value, editId) => {
    setModalStatus(value);
    setEditId(editId);
    getApiEditField(editId);
    onModalVisible();
  };

  const onNameInputChange = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const onTypeInputChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const onIspublishedChange = (e) => {
    const value = e.target.value;
    setIsPublished(value);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={dataSource ? dataSource : null}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a onClick={() => onModalStatus("Update", item._id)}>Edit</a>,

              <a
                style={{ color: "red" }}
                onClick={() => onClickDelete(item._id)}
              >
                Delete
              </a>,
              <p key="list-loadmore-edit"></p>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={
                <div>
                  type: {item.type}
                  <br /> isPublished: {JSON.stringify(item.isPublished)}
                  <br /> Create: {<Moment local>{item.createAt}</Moment>}
                  <br /> Update: {<Moment local>{item.updateAt}</Moment>}

                </div>
              }
            />
          </List.Item>
        )}
      />
      <Button
        type="primary"
        style={{ marginTop: "5%", marginLeft: "1%" }}
        onClick={() => onModalStatus("Add", "")}
      >
        Add
      </Button>

      <Modal
        title={`${modalStatus}`}
        visible={addVisible}
        onOk={handleOk}
        okText={modalStatus == "Add" ? "Add" : "Update"}
        onCancel={handleCancel}
      >
        <Input
          style={{ marginBottom: "1%", height: "40px" }}
          placeholder="Name"
          value={name}
          onChange={onNameInputChange}
        />
        <Input
          style={{ height: "40px" }}
          placeholder="Type"
          value={type}
          onChange={onTypeInputChange}
        />
        <h4 style={{ marginRight: "1%", marginTop: "2%" }}> Published </h4>
        <Radio.Group onChange={onIspublishedChange} value={isPublished}>
          <Radio value={true}>True</Radio>
          <Radio value={false}>False</Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
};
