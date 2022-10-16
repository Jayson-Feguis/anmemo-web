import React, { useEffect, useState } from "react";
import { Table, Modal, Form, message, Button } from "antd";
import "antd/dist/antd.min.css";
import { Box, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  deleteDepartmentAction,
  departmentAction,
  restoreDepartmentAction,
} from "../../../redux/action/department/actions";
import _ from "lodash";
import { IoIosAdd, IoIosTrash } from "react-icons/io";
import io from "socket.io-client";
import AddDepartmentModal from "./AddDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import useStyles from "./style";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../Component";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { CSVLink } from "react-csv";
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function AdminDepartment(props) {
  const classes = useStyles();
  const columns = [
    {
      title: "Department ID",
      width: 30,
      dataIndex: "DEPT_ID",
      key: "DEPT_ID",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.DEPT_ID - b.DEPT_ID,
    },
    {
      title: "Name",
      width: 30,
      dataIndex: "DEPT_NAME",
      key: "DEPT_NAME",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <CustomSearch
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            name="name"
          />
        );
      },
      filterIcon: () => {
        return <BiSearchAlt2 />;
      },
      onFilter: (value, record) => {
        return record.DEPT_NAME.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Date Created",
      dataIndex: "DEPT_DATETIME_CREATED",
      key: "DEPT_DATETIME_CREATED",
      width: 30,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.DEPT_DATETIME_CREATED - b.DEPT_DATETIME_CREATED,
    },
    {
      title: "Status",
      dataIndex: "DEPT_STATUS",
      key: "DEPT_STATUS",
      width: 30,
      render: (dept_id) => (
        <p>
          {dept_id === 0 ? (
            <p style={{ color: "orange" }}>Inactive</p>
          ) : dept_id === 1 ? (
            <p style={{ color: "green" }}>Active</p>
          ) : (
            <p style={{ color: "red" }}>Deleted</p>
          )}
        </p>
      ),
      filters: [
        {
          text: "Active",
          value: "1",
        },
        {
          text: "Inactive",
          value: "0",
        },
        {
          text: "Deleted",
          value: "2",
        },
      ],
      onFilter: (value, record) =>
        record.DEPT_STATUS.toString().includes(value.toString()),
    },
    {
      title: "Action",
      width: 30,
      dataIndex: "DEPT_ID",
      key: "DEPT_ID",
      render: (dept_id, record) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <Button
              className={classes.btnEdit}
              icon={<MdEdit />}
              onClick={() => showModalEdit(record.DEPT_ID, record.DEPT_NAME)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              hidden={record.DEPT_STATUS === 2}
              className={classes.btnDelete}
              icon={<IoIosTrash />}
              onClick={() => showModalDelete(record.DEPT_ID, record.DEPT_NAME)}
            />
          </Tooltip>
          {record.DEPT_STATUS === 2 ? (
            <Button
              style={{ backgroundColor: "yellow" }}
              onClick={() => showModalRestore(record.DEPT_ID, record.DEPT_NAME)}
            >
              {" "}
              Restore{" "}
            </Button>
          ) : null}
        </Box>
      ),
    },
  ];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const department = useSelector((state) => state.department);
  const [data, setData] = useState(null);
  const [departmentState] = useState(null);
  const user = useSelector((state) => state.user);
  const [initialValueEdit, setInitialValueEdit] = useState({
    dept_id: null,
    dept_name: null,
  });

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const deleteDepartment = () => {
    socket.emit("delete_department", { message: "get_department" });
  };

  const restoreDepartment = () => {
    socket.emit("restore_department", { message: "get_department" });
  };
  const showModalAdd = () => {
    setVisibleAdd(true);
  };

  const showModalEdit = (id, name) => {
    setVisibleEdit(true);
    setInitialValueEdit({
      ...initialValueEdit,
      dept_id: id,
      dept_name: name,
      account_id: !_.isNil(user.data) ? user.data.result[0].ACCOUNT_ID : null,
    });
  };

  const showModalDelete = (id, name) => {
    setVisibleDelete(true);
    setInitialValueEdit({
      ...initialValueEdit,
      dept_id: id,
      dept_name: name,
    });
  };

  const showModalRestore = (id, name) => {
    setVisibleRestore(true);
    setInitialValueEdit({
      ...initialValueEdit,
      dept_id: id,
      dept_name: name,
    });
  };

  const handleOkAdd = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleAdd(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOkEdit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleEdit(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleDelete(false);
      setConfirmLoading(false);
      dispatch(
        deleteDepartmentAction(actions.DELETE_DEPARTMENT_REQUEST, {
          dept_id: initialValueEdit.dept_id,
          account_id: !_.isNil(user.data)
            ? user.data.result[0].ACCOUNT_ID
            : null,
          dept_name: initialValueEdit.dept_name,
        })
      );
      deleteDepartment();
    }, 2000);
  };

  const handleOkRestore = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleRestore(false);
      setConfirmLoading(false);
      dispatch(
        restoreDepartmentAction(actions.RESTORE_DEPARTMENT_REQUEST, {
          dept_id: initialValueEdit.dept_id,
          account_id: !_.isNil(user.data)
            ? user.data.result[0].ACCOUNT_ID
            : null,
          dept_name: initialValueEdit.dept_name,
        })
      );
      restoreDepartment();
    }, 2000);
  };

  const handleCancelAdd = () => {
    setVisibleAdd(false);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };

  const handleCancelRestore = () => {
    setVisibleRestore(false);
  };
  // const onFinish = (values) => {
  //   //dispatch(loginAction(actions.LOGIN_REQUEST, values));
  //   console.log("Success:", values);
  //   setDepartmentState(values);
  //   //dispatch(addDepartmentAction(actions.ADD_DEPARTMENT_REQUEST, values));
  //   //addDepartment();
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const fetchAllDepartment = () => {
    dispatch(departmentAction(actions.DEPARTMENT_REQUEST));
  };
  const DateOffset = (offset, date) => {
    const updatedAt = new Date(date);
    return new Date(+updatedAt + offset);
  };

  useEffect(() => {
    if (!_.isNil(department.data)) {
      setData(department.data?.result);

      if (!_.isNil(department.data)) {
        setData(department.data.result);

        if (
          !_.isNil(department.success_msg) &&
          !_.isEqual(department.success_msg, "FETCHED DEPARTMENT!") &&
          new Date() < DateOffset(2000, department.updated_at)
        ) {
          message.success(department.success_msg);
        }
      }
    }

    form.setFieldsValue(initialValueEdit);

    socket.on("get_department", (data) => {
      if (data.message === "get_department") {
        fetchAllDepartment();
        console.log("get_department");
      }
    });
  }, [department, initialValueEdit, departmentState, data, socket, form]);

  const altColumn = [
    {
      Data: "DATA NOT FOUND",
    },
  ];

  return (
    <>
      <Box width="100%" display="flex" margin="20px 20px 20px 0px" gap="10px">
        <Button
          type="primary"
          shape="round"
          icon={<IoIosAdd />}
          onClick={showModalAdd}
        >
          {" "}
          Add department{" "}
        </Button>
        <Button
          onClick={() => {
            message.success("The file is downloading");
          }}
          type="primary"
          style={{ background: "#09ab0e", borderColor: "#09ab0e" }}
          shape="round"
        >
          <CSVLink
            filename={"Department.csv"}
            data={
              !_.isNil(department.data) ? department.data.result : altColumn
            }
            className="btn btn-primary"
          >
            <Typography style={{ color: "white" }}>Export to CSV</Typography>
          </CSVLink>
        </Button>
      </Box>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 100,
          y: 400,
        }}
        className={classes.tablebox}
      />
      <AddDepartmentModal
        visibleAdd={visibleAdd}
        confirmLoading={confirmLoading}
        handleOkAdd={handleOkAdd}
        handleCancelAdd={handleCancelAdd}
        setConfirmLoading={setConfirmLoading}
      />
      <EditDepartmentModal
        visibleEdit={visibleEdit}
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        handleOkEdit={handleOkEdit}
        handleCancelEdit={handleCancelEdit}
        initialValueEdit={initialValueEdit}
        setInitialValueEdit={setInitialValueEdit}
      />
      <Modal
        title="Delete Department"
        visible={visibleDelete}
        onOk={handleOkDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        Are you sure you want to delete this department?
      </Modal>

      <Modal
        title="Restore Department"
        visible={visibleRestore}
        onOk={handleOkRestore}
        confirmLoading={confirmLoading}
        onCancel={handleCancelRestore}
      >
        Are you sure you want to restore this department?
      </Modal>
    </>
  );
}

export default AdminDepartment;
