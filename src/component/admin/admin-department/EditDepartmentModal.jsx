import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Spin } from "antd";
import "antd/dist/antd.min.css";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { IoIosAdd } from "react-icons/io";
import io from "socket.io-client";
import {
  actions,
  updateDepartmentAction,
} from "../../../redux/action/department/actions";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function EditDepartmentModal(props) {
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

  const editDepartment = () => {
    socket.emit("update_department", { message: "get_department" });
  };

  const submitEdit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancelEdit();
      setConfirmLoading(false);
      dispatch(
        updateDepartmentAction(
          actions.UPDATE_DEPARTMENT_REQUEST,
          initialValueEdit
        )
      );
      editDepartment();
    }, 2000);
  };

  useEffect(() => {}, [initialValueEdit, form]);

  return (
    <Modal
      title="Edit Department"
      visible={visibleEdit}
      onOk={handleOkEdit}
      confirmLoading={confirmLoading}
      onCancel={handleCancelEdit}
      footer={[
        <Button
          form="editDepartment"
          disabled={confirmLoading}
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>,
        <Button
          form="editDepartment"
          disabled={confirmLoading}
          type="primary"
          onClick={submitEdit}
        >
          {confirmLoading ? <Spin /> : "Edit"}
        </Button>,
      ]}
    >
      <Form
        name="editDepartment"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
      >
        <Form.Item hidden label="Department ID">
          <Input
            disabled
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                dept_id: e.target.value,
              })
            }
            value={initialValueEdit.dept_id}
            placeholder="Department ID"
          />
        </Form.Item>
        <Form.Item label="Department Name">
          <Input
            onChange={(e) =>
              setInitialValueEdit({
                ...initialValueEdit,
                dept_name: e.target.value,
              })
            }
            value={initialValueEdit.dept_name}
            placeholder="Department Name"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditDepartmentModal;
