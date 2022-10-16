import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tooltip } from "antd";
import "antd/dist/antd.min.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  actions as act,
  restoreAccountAction,
  archiveAction,
} from "../../../../redux/action/archive/actions";
import _ from "lodash";
import RestoreIcon from "@mui/icons-material/Restore";

import io from "socket.io-client";
// import AddDepartmentModal from "./AddDepartmentModal";

import useStyles from "./style";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../../Component";
import moment from "moment";
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
function ArchiveAccount(props) {
  const classes = useStyles();
  // window.onload = () => {
  //   dispatch(accountAction(actions.ACCOUNT_REQUEST));
  // };

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
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
          }}
          alt={record.ACCOUNT_LASTNAME}
          src={
            process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
            record.ACCOUNT_PICTURE
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
          record.ACCOUNT_FIRSTNAME.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record.ACCOUNT_MIDDLENAME.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record.ACCOUNT_LASTNAME.toString()
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
          <Tooltip title="Archive">
            <Button
              className={classes.btnDelete}
              icon={<RestoreIcon />}
              onClick={() =>
                showModalDelete(
                  record.ACCOUNT_ID,
                  record.ACCOUNT_FIRSTNAME,
                  record.ACCOUNT_LASTNAME
                )
              }
            />
          </Tooltip>
        </Box>
      ),
    },
  ].filter((item) => !item.hidden);

  const dispatch = useDispatch();

  const archive = useSelector((state) => state.archive);
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(null);

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
    user_id: !_.isNil(user.data) ? user.data.result[0].ACCOUNT_ID : null,
  });

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // const showModalAdd = () => {
  //   setVisibleAdd(true);
  // };

  const showModalDelete = (id, fname, lname) => {
    setVisibleDelete(true);
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

  const handleOkDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleDelete(false);
      setConfirmLoading(false);
      dispatch(
        restoreAccountAction(act.RESTORE_ACCOUNT_REQUEST, {
          account_id: initialValueEdit.account_id,
          user_id: initialValueEdit.user_id,
          account_firstname: initialValueEdit.account_firstname,
          account_lastname: initialValueEdit.account_lastname,
        })
      );
    }, 2000);
  };

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };

  useEffect(() => {
    if (!_.isNil(archive.data)) {
      setData(archive.data?.result);
    }
  }, [archive, initialValueEdit, data]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 450,
        }}
        className={classes.tablebox}
      />

      <Modal
        title="Restore Account"
        visible={visibleDelete}
        onOk={handleOkDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        Are you sure you want to restore this account?
      </Modal>
    </>
  );
}

export default ArchiveAccount;
