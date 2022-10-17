import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "antd/dist/antd.min.css";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../../../utils/constant";

import _ from "lodash";

// import AddDepartmentModal from "./AddDepartmentModal";

import useStyles from "./style";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../Component";
import moment from "moment";

function AdminAudit(props) {
  const classes = useStyles();

  const columns = [
    {
      title: "Audit ID",
      width: 5,
      dataIndex: "AUDIT_ID",
      key: "AUDIT_ID",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.AUDIT_ID - b.AUDIT_ID,
      hidden: true,
    },
    {
      title: "Name",
      width: 15,
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
      title: "Activity",
      width: 15,
      dataIndex: "AUDIT_ACTIVITY",
      key: "AUDIT_ACTIVITY",
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
        return record.AUDIT_ACTIVITY?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Date Created",
      dataIndex: "AUDIT_DATETIME_CREATED",
      key: "AUDIT_DATETIME_CREATED",
      width: 10,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.AUDIT_DATETIME_CREATED - b.AUDIT_DATETIME_CREATED,
    },
  ].filter((item) => !item.hidden);

  const audit = useSelector((state) => state.audit_trail);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!_.isNil(audit.data)) {
      setData(audit.data.result);
    }
  }, [audit]);

  return (
    <Box
      padding={{ xs: "10px", md: "0px 20px 0px 250px" }}
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
      <Box position="relative">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1000,
            y: 500,
          }}
          className={classes.tablebox}
        />
      </Box>
    </Box>
  );
}

export default AdminAudit;
