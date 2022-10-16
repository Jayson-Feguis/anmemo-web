import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Spin } from "antd";
import "antd/dist/antd.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  addDepartmentAction,
} from "../../../redux/action/department/actions";
import _ from "lodash";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function AddDepartmentModal(props) {
  const { visibleAdd, handleCancelAdd, confirmLoading, setConfirmLoading } =
    props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const addDepartment = () => {
    socket.emit("add_department", { message: "get_department" });
  };

  const onFinish = (values) => {
    // console.log("Success:", values);
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancelAdd();
      setConfirmLoading(false);
      dispatch(addDepartmentAction(actions.ADD_DEPARTMENT_REQUEST, values));
      addDepartment();
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {}, [confirmLoading]);

  return (
    <Modal
      title="Add Department"
      visible={visibleAdd}
      confirmLoading={confirmLoading}
      onCancel={handleCancelAdd}
      footer={[
        <Button disabled={confirmLoading} onClick={handleCancelAdd}>
          Cancel
        </Button>,
        <Button
          form="addDepartment"
          disabled={confirmLoading}
          type="primary"
          key="submit"
          htmlType="submit"
        >
          {confirmLoading ? <Spin /> : "Add"}
        </Button>,
      ]}
    >
      <Form
        name="addDepartment"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          remember: true,
          account_id: !_.isNil(user.data)
            ? user.data.result[0].ACCOUNT_ID
            : null,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Department Name"
          name="dept_name"
          rules={[
            {
              required: true,
              message: "Please input department name",
            },
          ]}
          disabled
        >
          <Input placeholder="Department Name" />
        </Form.Item>
        <Form.Item hidden key={1} label="Account ID" name="account_id">
          <Input disabled placeholder="Acccount ID" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
// !_.isNil(user.data) ? user.data.result[0].ACCOUNT_FIRSTNAME : null
export default AddDepartmentModal;
