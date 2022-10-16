import React, { useState, useMemo } from "react";
import { Table, Input } from "antd";
import "antd/dist/antd.min.css";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  actions,
  searchFacultyFilesAction,
  getFacultyFilesAction,
} from "../../../redux/action/faculty-files/actions";
import moment from "moment";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../Component";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function FacultyMemorandum(props) {
  const columns = [
    {
      title: "Memorandum Name",
      width: 30,
      dataIndex: "DOCUMENT_NAME",
      key: "DOCUMENT_NAME",
      render: (doc_name) => (
        <a
          href={process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT + doc_name}
          target="_blank"
          rel="noreferrer"
        >
          {doc_name}
        </a>
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
        return record.DOCUMENT_NAME.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Sender",
      width: 30,
      dataIndex: "SENDER_NAME",
      key: "SENDER_NAME",
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
            name="sender"
          />
        );
      },
      filterIcon: () => {
        return <BiSearchAlt2 />;
      },
      onFilter: (value, record) => {
        return record.SENDER_NAME.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Date Sent",
      dataIndex: "SEND_DATETIME",
      key: "SEND_DATETIME",
      width: 30,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
    },
  ];
  const dispatch = useDispatch();
  const facultyFiles = useSelector((state) => state.facultyfiles);
  const user = useSelector((state) => state.user);
  const [searchFilter, setSearchFilter] = useState("");

  // useEffect(() => {
  //   dispatch(
  //     searchFacultyFilesAction(actions.SEARCH_FACULTY_FILES_REQUEST, {
  //       account_id: user.data?.result[0].ACCOUNT_ID,
  //       search_query: searchFilter,
  //       type: "Memorandum",
  //     })
  //   );
  // }, [searchFilter]);

  const fetchAllDocument = () => {
    dispatch(
      getFacultyFilesAction(
        actions.GET_FACULTY_FILES_REQUEST,
        user.data?.result[0]?.ACCOUNT_ID
      )
    );
  };

  useMemo(() => {
    socket.on("get_facultyfiles", (data) => {
      console.log(data);
      if (data.message === "get_facultyfiles") {
        fetchAllDocument();
      }
    });
  }, [socket]);

  return (
    <Box padding="20px">
      {/* <Box width={{ xs: "100%", md: "400px" }}>
        <Input
          autofocus
          placeholder="Search content of memorandum here"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </Box> */}
      <Table
        columns={
          !_.isNil(facultyFiles.data)
            ? facultyFiles.data.result?.memorandum?.length > 0
              ? columns
              : null
            : null
        }
        dataSource={
          !_.isNil(facultyFiles.data)
            ? facultyFiles.data.result?.memorandum?.length > 0
              ? facultyFiles.data.result.memorandum
              : null
            : null
        }
        scroll={{
          x: 1000,
          y: 450,
        }}
      />
    </Box>
  );
}

export default FacultyMemorandum;
