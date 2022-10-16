import React, { useMemo, useState, useEffect } from "react";
import { Table, Button, Input, Modal } from "antd";
import "antd/dist/antd.min.css";
import PropTypes from "prop-types";
import { Box, Tooltip, Typography } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
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
import { RiSendPlaneFill } from "react-icons/ri";
import useStyles from "./style";
import SendFile from "./SendFile";
import io from "socket.io-client";
import { MdDownload } from "react-icons/md";

import FileViewer from "react-file-viewer";

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
function FacultyDocument(props) {
  const classes = useStyles();
  const columns = [
    {
      title: "Document Name",
      width: 50,
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
      width: 50,
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
      width: 35,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
    },
    {
      title: "Action",
      width: 40,
      dataIndex: "DOCUMENT_ID",
      key: "DOCUMENT_ID",
      render: (doc_id, record) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Send">
            <Button
              className={classes.btnSend}
              icon={<RiSendPlaneFill />}
              onClick={() =>
                showModalSendFile(record.DOCUMENT_ID, record.DOCUMENT_NAME)
              }
            />
          </Tooltip>
          <Tooltip title="Download">
            <a
              href={
                process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                record.DOCUMENT_NAME
              }
              download={record.DOCUMENT_NAME}
              className={classes.btnDownload}
              target="_blank"
            >
              <MdDownload />{" "}
            </a>
          </Tooltip>
          <Tooltip title="View">
            <Button
              className={classes.btnView}
              icon={<PreviewIcon />}
              onClick={() =>
                showModalView(record.DOCUMENT_NAME, record.DOCUMENT_TYPE)
              }
            />
          </Tooltip>
        </Box>
      ),
    },
  ];
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account);
  const facultyFiles = useSelector((state) => state.facultyfiles);
  const user = useSelector((state) => state.user);
  const [searchFilter, setSearchFilter] = useState("");
  const [visibleSendFile, setVisibleSendFile] = useState(false);
  const [document, setDocument] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleDocument, setVisibleDocument] = useState(false);
  const [initialValueEdit, setInitialValueEdit] = useState({
    file_name: null,
    file_extension: null,
  });
  // useMemo(() => {
  //   dispatch(
  //     searchFacultyFilesAction(actions.SEARCH_FACULTY_FILES_REQUEST, {
  //       account_id: user.data?.result[0].ACCOUNT_ID,
  //       search_query: searchFilter,
  //       type: "Document",
  //     })
  //   );
  // }, [searchFilter]);

  const handleOkSendFile = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleSendFile(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const showModalSendFile = (doc_id, doc_name) => {
    setVisibleSendFile(true);
    setDocument({ id: doc_id, name: doc_name });
  };

  const handleCancelSendFile = () => {
    setVisibleSendFile(false);
  };

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

  const handleCancelFile = () => {
    setInitialValueEdit({
      ...initialValueEdit,
      file_name: null,
      file_extension: null,
    });
    setVisibleDocument(false);
  };

  const showModalView = (doc_name, doc_type) => {
    setVisibleDocument(true);
    setInitialValueEdit({
      ...initialValueEdit,
      file_name: doc_name,
      file_extension: doc_type,
    });
  };

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const doc = [
    "doc",
    "docx",
    "rtf",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "pdf",
    "txt",
  ];

  const img_extension = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "JPG",
    "JPEG",
    "PNG",
    "GIF",
  ];

  return (
    <Box padding="20px" height="calc(100vh-65px)">
      {/* <Box width={{ xs: "100%", md: "400px" }}>
        <Input
          autofocus
          placeholder="Search content of document here"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </Box> */}
      <Table
        columns={
          !_.isNil(facultyFiles.data)
            ? facultyFiles.data.result?.document?.length > 0
              ? columns
              : null
            : null
        }
        dataSource={
          !_.isNil(facultyFiles.data)
            ? facultyFiles.data.result?.document?.length > 0
              ? facultyFiles.data.result.document
              : null
            : null
        }
        scroll={{
          x: 1000,
          y: 450,
        }}
      />
      <SendFile
        documentID={!_.isNil(document) ? document.id : null}
        documentName={!_.isNil(document) ? document.name : null}
        visibleSendFile={visibleSendFile}
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
        handleOkSendFile={handleOkSendFile}
        handleCancelSendFile={handleCancelSendFile}
        accounts={
          !_.isNil(accounts.data)
            ? accounts.data.result.length > 0
              ? accounts.data.result
              : null
            : null
        }
        senderID={
          !_.isNil(user.data)
            ? user.data.result.length > 0
              ? user.data.result[0].ACCOUNT_ID
              : null
            : null
        }
        senderName={
          !_.isNil(user.data)
            ? user.data.result.length > 0
              ? user.data.result[0].ACCOUNT_FIRSTNAME +
                " " +
                user.data.result[0].ACCOUNT_LASTNAME
              : null
            : null
        }
      />
      {visibleDocument && (
        <Modal
          title="File Viewer"
          visible={visibleDocument}
          onCancel={handleCancelFile}
          footer={[<Button onClick={handleCancelFile}>Close</Button>]}
          width="800px"
          bodyStyle={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <Box key={Math.random()}>
            {doc.includes(
              getExtension(
                process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                  initialValueEdit.file_name
              )
            ) ? (
              <FileViewer
                fileType={getExtension(
                  process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                    initialValueEdit.file_name
                )}
                filePath={
                  visibleDocument
                    ? process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                      initialValueEdit.file_name
                    : null
                }
                onError={onError}
              />
            ) : img_extension.includes(
                getExtension(
                  process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                    initialValueEdit.file_name
                )
              ) ? (
              <Box
                component="img"
                src={
                  process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                  initialValueEdit.file_name
                }
                sx={{ width: { xs: "100%", md: "470px" } }}
              />
            ) : (
              <Typography>
                The file extension is not supported. Please click the filename
                instead
              </Typography>
            )}
          </Box>
        </Modal>
      )}
    </Box>
  );
}

FacultyDocument.propTypes = {};

export default FacultyDocument;
