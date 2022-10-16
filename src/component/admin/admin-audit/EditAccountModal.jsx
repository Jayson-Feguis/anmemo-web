import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Modal,
  Spin,
  Select,
} from "antd";
import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import io from "socket.io-client";
import {
  actions,
  updateAccountAction,
} from "../../../redux/action/account/actions";
import useStyles from "./style";
import moment from "moment";
const { Option } = Select;
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
const account_type = [
  {
    id: 1,
    label: "Administrator",
  },
  {
    id: 2,
    label: "Secretary",
  },
  {
    id: 3,
    label: "Faculty Member",
  },
];

function EditAccountModal(props) {
  const classes = useStyles();
  const department = useSelector((state) => state.department);
  const [departmentList, setDepartmentList] = useState(null);
  const dateFormat = "YYYY-MM-DD";
  const {
    visibleEdit,
    confirmLoading,
    setConfirmLoading,
    handleOkEdit,
    handleCancelEdit,
    initialValueEdit,
    setInitialValueEdit,
  } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value, setValue] = useState("Male");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const editAccount = () => {
    socket.emit("update_account", { message: "get_account" });
  };

  const submitEdit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancelEdit();
      setConfirmLoading(false);
      console.log(initialValueEdit);
      dispatch(
        updateAccountAction(actions.UPDATE_ACCOUNT_REQUEST, initialValueEdit)
      );
      editAccount();
    }, 2000);
  };

  useEffect(() => {
    if (!_.isNil(department.data)) {
      setDepartmentList(department.data.result);
    }
  }, [initialValueEdit, form]);
  //hahanapin dito yung dep id
  // const foundx = department.data.result.find(
  //   (element) => (element.id = initialValueEdit.dept_id)
  // );
  // console.log(foundx.label);
  return (
    <Modal
      title="Edit Account"
      visible={visibleEdit}
      onOk={handleOkEdit}
      confirmLoading={confirmLoading}
      onCancel={handleCancelEdit}
      footer={[
        <Button
          form="editAccount"
          disabled={confirmLoading}
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>,
        <Button
          form="editAccount"
          disabled={confirmLoading}
          type="primary"
          onClick={submitEdit}
        >
          {confirmLoading ? <Spin /> : "Edit"}
        </Button>,
      ]}
    >
      <Form
        name="editAccount"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
      >
        <Form.Item key={1} label="Account ID">
          <Input
            disabled
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_id: e.target.value,
              })
            }
            value={initialValueEdit.account_id}
            placeholder="Acccount ID"
          />
        </Form.Item>
        <Form.Item key={2} label="Username">
          <Input
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_username: e.target.value,
              })
            }
            value={initialValueEdit.account_username}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item key={3} label="Password">
          <Input
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_password: e.target.value,
              })
            }
            value={initialValueEdit.account_password}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item key={4} label="Firstname">
          <Input
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_firstname: e.target.value,
              })
            }
            value={initialValueEdit.account_firstname}
            placeholder="Firstname"
          />
        </Form.Item>
        <Form.Item key={5} label="Middlename">
          <Input
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_middlename: e.target.value,
              })
            }
            value={initialValueEdit.account_middlename}
            placeholder="Middlename"
          />
        </Form.Item>
        <Form.Item key={6} label="Lastname">
          <Input
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_lastname: e.target.value,
              })
            }
            value={initialValueEdit.account_lastname}
            placeholder="Lastname"
          />
        </Form.Item>
        <Form.Item
          key={7}
          label="Gender"
          labelCol={{
            span: 24,
            //offset: 2
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Radio.Group
            value={initialValueEdit.account_gender}
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_gender: e.target.value,
              })
            }
            style={{ width: "100%", display: "flex" }}
          >
            <Radio value={"male"}>Male</Radio>
            <Radio value={"female"}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item key={8} label="Birth Date">
          <DatePicker
            onChange={(date, dateString, id) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_birthdate: dateString,
              })
            }
            value={moment(initialValueEdit.account_birthdate, dateFormat)}
            format={dateFormat}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item key={9} label="Account Type">
          <Select
            value={initialValueEdit.account_type}
            onChange={(value) =>
              setInitialValueEdit({
                ...initialValueEdit,
                account_type: value,
              })
            }
            style={{ width: "100%" }}
          >
            {account_type.map((value, index) => (
              <Option key={index} value={value.id}>
                {value.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item key={10} label="Department">
          <Select
            value={initialValueEdit.dept_id}
            onChange={(value) =>
              setInitialValueEdit({
                ...initialValueEdit,
                dept_id: value,
              })
            }
            style={{ width: "100%" }}
          >
            {!_.isNil(department.data)
              ? department.data.result.map((value, index) => (
                  <Option key={index} value={value.DEPT_ID}>
                    {value.DEPT_NAME}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditAccountModal;
