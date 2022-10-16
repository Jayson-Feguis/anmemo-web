import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Tooltip,
  message,
  Typography,
  Avatar,
  Button,
  Drawer,
  Space,
} from "antd";
import "antd/dist/antd.min.css";
import { Box, Button as MUIButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  deleteAccountAction,
  accountAction,
  approveAccountAction,
  restoreAccountAction,
} from "../../../redux/action/account/actions";
import {
  actions as deptAction,
  departmentAction,
} from "../../../redux/action/department/actions";
import _ from "lodash";
import { IoIosTrash, IoIosAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import io from "socket.io-client";
// import AddDepartmentModal from "./AddDepartmentModal";
import EditAccountModal from "./EditAccountModal";
import useStyles from "./style";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../Component";
import moment from "moment";
import { CSVLink } from "react-csv";
import { TbFileExport } from "react-icons/tb";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../../../utils/constant";
import RegistrationCard from "./RegistrationCard";
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function AdminAccount(props) {
  const classes = useStyles();
  // window.onload = () => {
  //   dispatch(accountAction(actions.ACCOUNT_REQUEST));
  // };
  const user = useSelector((state) => state.user);
  const columns = [
    {
      title: "Account ID",
      width: 50,
      dataIndex: "ACCOUNT_ID",
      key: "ACCOUNT_ID",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.ACCOUNT_ID - b.ACCOUNT_ID,
    },
    {
      title: "Picture",
      dataIndex: "ACCOUNT_PICTURE",
      key: "ACCOUNT_PICTURE",
      width: 50,
      render: (text, record) => (
        <Avatar
          component="img"
          sx={{
            height: 100,
            width: 100,
            background: "gray",
          }}
          alt={record.ACCOUNT_LASTNAME}
          src={
            !_.isNil(record.ACCOUNT_PICTURE)
              ? process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                record.ACCOUNT_PICTURE
              : process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT + "user.png"
          }
        />
      ),
    },
    {
      title: "Name",
      width: 60,
      dataIndex:
        "ACCOUNT_LASTNAME" || "ACCOUNT_FIRSTNAME" || "ACCOUNT_MIDDLENAME",
      render: (text, record) => (
        <span>
          {record.ACCOUNT_LASTNAME} {record.ACCOUNT_FIRSTNAME}{" "}
          {record.ACCOUNT_MIDDLENAME}
        </span>
      ),
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
        return (
          record.ACCOUNT_FIRSTNAME?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record.ACCOUNT_MIDDLENAME?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record.ACCOUNT_LASTNAME?.toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "ACCOUNT_GENDER",
      key: "ACCOUNT_GENDER",
      width: 30,
      filters: [
        {
          text: "male",
          value: "male",
        },
        {
          text: "female",
          value: "female",
        },
      ],
      onFilter: (value, record) => record.ACCOUNT_GENDER.includes(value),
    },
    {
      title: "Birthdate",
      dataIndex: "ACCOUNT_BIRTHDATE",
      key: "ACCOUNT_BIRTHDATE",
      width: 50,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.ACCOUNT_BIRTHDATE - b.ACCOUNT_BIRTHDATE,
    },
    {
      title: "Account Type",
      dataIndex: "ACCOUNT_TYPE",
      key: "ACCOUNT_TYPE",
      width: 50,
      render: (text, record) => (
        <p>
          {record.ACCOUNT_TYPE === 1 ? (
            <p>Administrator</p>
          ) : record.ACCOUNT_TYPE === 2 ? (
            <p>Secretary</p>
          ) : (
            <p>Faculty Member</p>
          )}
        </p>
      ),
      filters: [
        {
          text: "Administrator",
          value: "1",
        },
        {
          text: "Secretary",
          value: "2",
        },
        {
          text: "Faculty Member",
          value: "3",
        },
        {
          text: "Dean",
          value: "4",
        },
        {
          text: "Program Coordinator",
          value: "5",
        },
      ],
      onFilter: (value, record) =>
        record.ACCOUNT_TYPE.toString().includes(value.toString()),
    },
    {
      title: "Department",
      dataIndex: "DEPT_NAME",
      key: "DEPT_NAME",
      width: 40,
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
            name="department"
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
      dataIndex: "ACCOUNT_DATETIME_CREATED",
      key: "ACCOUNT_DATETIME_CREATED",
      width: 50,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.ACCOUNT_DATETIME_CREATED - b.ACCOUNT_DATETIME_CREATED,
    },
    {
      title: "Status",
      dataIndex: "ACCOUNT_STATUS",
      key: "ACCOUNT_STATUS",
      width: 40,
      render: (account_id) => (
        <p>
          {account_id === 0 ? (
            <p style={{ color: "orange" }}>Unapproved</p>
          ) : account_id === 1 ? (
            <p style={{ color: "green" }}>Approved</p>
          ) : (
            <p style={{ color: "red" }}>Deleted</p>
          )}
        </p>
      ),
      filters: [
        {
          text: "Unapproved",
          value: "0",
        },
        {
          text: "Approved",
          value: "1",
        },
        {
          text: "Deleted",
          value: "2",
        },
      ],
      onFilter: (value, record) =>
        record.ACCOUNT_STATUS.toString().includes(value.toString()),
    },
    {
      title: "Action",
      width: 60,
      dataIndex: "ACCOUNT_ID",
      key: "ACCOUNT_ID",
      render: (text, record) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <Button
              className={classes.btnEdit}
              icon={<MdEdit />}
              onClick={() =>
                showModalEdit(
                  record.ACCOUNT_ID,
                  record.ACCOUNT_FIRSTNAME,
                  record.ACCOUNT_MIDDLENAME,
                  record.ACCOUNT_LASTNAME,
                  record.ACCOUNT_GENDER,
                  record.ACCOUNT_USERNAME,
                  record.ACCOUNT_PASSWORD,
                  record.ACCOUNT_BIRTHDATE,
                  record.ACCOUNT_TYPE,
                  record.DEPT_ID,
                  record.ACCOUNT_PICTURE
                )
              }
            />
          </Tooltip>
          {record.ACCOUNT_STATUS === 2 && (
            <Tooltip title="Delete">
              <Button
                disabled={record.ACCOUNT_ID === user.data.result[0].ACCOUNT_ID}
                className={classes.btnDelete}
                icon={<IoIosTrash />}
                onClick={() =>
                  showModalDelete(
                    record.ACCOUNT_ID,
                    record.ACCOUNT_FIRSTNAME,
                    record.ACCOUNT_LASTNAME
                  )
                }
              />
            </Tooltip>
          )}

          {record.ACCOUNT_STATUS === 0 ? (
            <Button
              style={{ backgroundColor: "yellow" }}
              onClick={() =>
                showModalApprove(
                  record.ACCOUNT_ID,
                  record.ACCOUNT_FIRSTNAME,
                  record.ACCOUNT_LASTNAME
                )
              }
            >
              {" "}
              Approve{" "}
            </Button>
          ) : null}
          {record.ACCOUNT_STATUS === 2 ? (
            <Button
              style={{ backgroundColor: "yellow" }}
              onClick={() =>
                showModalRestore(
                  record.ACCOUNT_ID,
                  record.ACCOUNT_FIRSTNAME,
                  record.ACCOUNT_LASTNAME
                )
              }
            >
              {" "}
              Restore{" "}
            </Button>
          ) : null}
        </Box>
      ),
    },
  ].filter((item) => !item.hidden);

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const account = useSelector((state) => state.account);

  const [data, setData] = useState(null);
  const [accountState, setAccountState] = useState(null);
  const [departmentList, setDepartmentList] = useState(null);
  const [initialValueEdit, setInitialValueEdit] = useState({
    account_id: null,
    account_firstname: null,
    account_middlename: null,
    account_lastname: null,
    account_gender: null,
    account_birthdate: null,
    account_type: null,
    account_username: null,
    account_password: null,
    dept_id: null,
    user_id: null,
    account_picture: null,
    is_picture_changed: false,
  });
  const [visibleApprovebutton, setVisibleApprovebutton] = useState(false);
  const [visibleApprove, setVisibleApprove] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visible, setVisible] = useState(false);
  const deleteAccount = () => {
    socket.emit("delete_account", { message: "get_account" });
  };
  const approveAccount = () => {
    socket.emit("approve_account", { message: "get_account" });
  };

  const restoreAccount = () => {
    socket.emit("restore_account", { message: "get_account" });
  };
  // const showModalAdd = () => {
  //   setVisibleAdd(true);  asdaasdasd
  // };

  const showModalEdit = (
    id,
    fname,
    mname,
    lname,
    gender,
    username,
    password,
    birthdate,
    type,
    id_dept,
    picture
  ) => {
    setVisibleEdit(true);
    setInitialValueEdit({
      ...initialValueEdit,
      account_id: id,
      account_firstname: fname,
      account_middlename: mname,
      account_lastname: lname,
      account_gender: gender,
      account_username: username,
      account_password: password,
      account_birthdate: birthdate,
      account_type: type,
      dept_id: id_dept,
      user_id: id,
      account_picture: !_.isNil(picture)
        ? process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT + picture
        : process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT + "user.png",
    });
  };

  const showModalDelete = (id, fname, lname) => {
    setVisibleDelete(true);
    setInitialValueEdit({
      ...initialValueEdit,
      account_id: id,
      account_firstname: fname,
      account_lastname: lname,
    });
  };

  const showModalRestore = (id, fname, lname) => {
    setVisibleRestore(true);
    setInitialValueEdit({
      ...initialValueEdit,
      account_id: id,
      account_firstname: fname,
      account_lastname: lname,
    });
  };
  const showModalApprove = (id, fname, lname) => {
    setVisibleApprove(true);
    setInitialValueEdit({
      ...initialValueEdit,
      account_id: id,
      account_firstname: fname,
      account_lastname: lname,
    });
  };
  // const handleOkAdd = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisibleAdd(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleOkEdit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleEdit(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOkApprove = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleApprovebutton(true);
      setVisibleApprove(false);
      setConfirmLoading(false);
      dispatch(
        approveAccountAction(actions.APPROVE_ACCOUNT_REQUEST, {
          account_id: initialValueEdit.account_id,
          user_id: initialValueEdit.user_id,
          account_firstname: initialValueEdit.account_firstname,
          account_lastname: initialValueEdit.account_lastname,
        })
      );
      approveAccount();
    }, 2000);
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleDelete(false);
      setConfirmLoading(false);
      dispatch(
        deleteAccountAction(actions.DELETE_ACCOUNT_REQUEST, {
          account_id: initialValueEdit.account_id,
          user_id: initialValueEdit.user_id,
          account_firstname: initialValueEdit.account_firstname,
          account_lastname: initialValueEdit.account_lastname,
        })
      );
      deleteAccount();
    }, 2000);
  };

  const handleOkRestore = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleRestore(false);
      setConfirmLoading(false);
      dispatch(
        restoreAccountAction(actions.RESTORE_ACCOUNT_REQUEST, {
          account_id: initialValueEdit.account_id,
          user_id: initialValueEdit.user_id,
          account_firstname: initialValueEdit.account_firstname,
          account_lastname: initialValueEdit.account_lastname,
        })
      );
      restoreAccount();
    }, 2000);
  };

  const handleCancelRestore = () => {
    setVisibleRestore(false);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };
  const handleCancelApprove = () => {
    setVisibleApprove(false);
  };
  const DateOffset = (offset, date) => {
    const updatedAt = new Date(date);
    return new Date(+updatedAt + offset);
  };

  useEffect(() => {
    if (!_.isNil(account.data)) {
      setData(account.data.result);

      if (
        !_.isNil(account.success_msg) &&
        !_.isEqual(account.success_msg, "FETCHED ACCOUNT!") &&
        new Date() < DateOffset(2000, account.updated_at)
      ) {
        message.success(account.success_msg);
      }
    } else {
      //dispatch(accountAction(actions.ACCOUNT_REQUEST));
    }
    if (!_.isNil(department.data)) {
      setDepartmentList(department.data.result);
    } else {
      dispatch(departmentAction(deptAction.DEPARTMENT_REQUEST));
    }
    //form.setFieldsValue(initialValueEdit);

    socket.on("get_account", (data) => {
      if (data.message === "get_account") {
        dispatch(accountAction(actions.ACCOUNT_REQUEST));
      }
    });
  }, [account, initialValueEdit, accountState, data, socket]);

  useEffect(() => {
    if (!_.isNil(account.data)) {
    }
  }, [data]);

  const altColumn = [
    {
      Data: "DATA NOT FOUND",
    },
  ];

  const showModalAdd = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Box
      padding={{ xs: "10px", md: "0px 0px 0px 250px" }}
      position="relative"
      overflow="hidden"
      minHeight="calc(100vh - 65px)"
    >
      <Box
        sx={{
          position: "absolute",
          botttom: "0 !important",
          right: -150,
          display: "flex",
          transform: "rotateZ(30deg)",
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "1500px",
            backgroundColor: SECONDARY_COLOR,
            boxShadow: "-5px -5px 10px rgba(0,0,0,0.5)",
          }}
        />
        <Box
          sx={{
            width: "200px",
            height: "1500px",
            backgroundColor: PRIMARY_COLOR,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: -400,
          left: { xs: -400, md: -150 },
          display: "flex",
          transform: "rotateZ(45deg)",
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: "300px",
            height: "1500px",
            backgroundColor: PRIMARY_COLOR,
          }}
        />
        <Box
          sx={{
            width: "100px",
            height: "1500px",
            backgroundColor: SECONDARY_COLOR,
            boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
          }}
        />
      </Box>
      <Box
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        marginTop="10px"
        paddingRight="20px"
        position="relative"
        marginBottom="100px"
      >
        <Box display="flex" gap="20px">
          <MUIButton
            variant="contained"
            startIcon={<TbFileExport />}
            onClick={() => {
              message.success("The file is downloading");
            }}
            style={{ background: "#09ab0e", borderColor: "#09ab0e" }}
          >
            <CSVLink
              filename={"Account.csv"}
              data={!_.isNil(user.data) ? user.data.result : altColumn}
              className="btn btn-primary"
            >
              <Typography style={{ color: "white" }}>Export to CSV</Typography>
            </CSVLink>
          </MUIButton>
          <Button
            type="primary"
            shape="round"
            icon={<IoIosAdd />}
            onClick={showModalAdd}
          >
            {" "}
            Add Account{" "}
          </Button>
        </Box>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1500,
            y: 500,
          }}
          className={classes.tablebox}
        />

        <EditAccountModal
          visibleEdit={visibleEdit}
          confirmLoading={confirmLoading}
          setConfirmLoading={setConfirmLoading}
          handleOkEdit={handleOkEdit}
          handleCancelEdit={handleCancelEdit}
          initialValueEdit={initialValueEdit}
          setInitialValueEdit={setInitialValueEdit}
        />
        <Modal
          title="Delete Account"
          visible={visibleDelete}
          onOk={handleOkDelete}
          confirmLoading={confirmLoading}
          onCancel={handleCancelDelete}
        >
          Are you sure you want to delete this account?
        </Modal>
        <Modal
          title="Approve Account"
          visible={visibleApprove}
          onOk={handleOkApprove}
          confirmLoading={confirmLoading}
          onCancel={handleCancelApprove}
        >
          Are you sure you want to approve this approve?
        </Modal>
        <Modal
          title="Restore Account"
          visible={visibleRestore}
          onOk={handleOkRestore}
          confirmLoading={confirmLoading}
          onCancel={handleCancelRestore}
        >
          Are you sure you want to restore this account?
        </Modal>

        <Drawer
          title="Create your account"
          placement="top"
          width={500}
          onClose={onClose}
          visible={visible}
          height={600}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "60px",
          }}
          extra={<Space></Space>}
        >
          <RegistrationCard />
        </Drawer>
      </Box>
    </Box>
  );
}

export default AdminAccount;
