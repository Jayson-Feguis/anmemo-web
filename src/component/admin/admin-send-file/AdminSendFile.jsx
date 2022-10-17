import React, { useState, useEffect } from "react";
import UploadFile from "./UploadFile";
import SendFile from "./SendFile";
import Receivers from "./Receivers";
import { Box, Tooltip, Button as MUIButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  actions,
  getDocumentAction,
  deleteDocumentAction,
} from "../../../redux/action/send-file/actions";
import {
  actions as ACTRECEIVERS,
  getDocumentReceiversAction,
} from "../../../redux/action/document-receivers/actions";
import { Table, Modal, message, Button } from "antd";
import "antd/dist/antd.min.css";
import io from "socket.io-client";
import _ from "lodash";
import { IoIosTrash } from "react-icons/io";
import { RiSendPlaneFill, RiUserReceivedFill } from "react-icons/ri";
import useStyles from "./style";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../Component";
import moment from "moment";
import { IoIosCloudUpload } from "react-icons/io";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../../../utils/constant";
import FileViewer from "react-file-viewer";
import UploadModal from "./UploadModal";
import { MdDownload } from "react-icons/md";
const onError = (e) => {
  console.log(e, "error in file-viewer");
};

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function AdminSendFile(props) {
  const classes = useStyles();
  const columns = [
    {
      title: "Document ID",
      width: 40,
      dataIndex: "DOCUMENT_ID",
      key: "DOCUMENT_ID",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.DOCUMENT_ID - b.DOCUMENT_ID,
    },
    {
      title: "Document Name",
      dataIndex: "DOCUMENT_NAME",
      key: "DOCUMENT_NAME",
      width: 50,
      render: (document) => <Typography>{document}</Typography>,
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
      title: "Document Type",
      dataIndex: "DOCUMENT_TYPE",
      key: "DOCUMENT_TYPE",
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
            name="type"
          />
        );
      },
      filterIcon: () => {
        return <BiSearchAlt2 />;
      },
      onFilter: (value, record) => {
        return record.DOCUMENT_TYPE.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Category",
      dataIndex: "CATEGORY_NAME",
      key: "CATEGORY_NAME",
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
            name="type"
          />
        );
      },
      filterIcon: () => {
        return <BiSearchAlt2 />;
      },
      onFilter: (value, record) => {
        return record.CATEGORY_NAME.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Status",
      dataIndex: "DOCUMENT_STATUS",
      key: "DOCUMENT_STATUS",
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
          text: "Inactive",
          value: "0",
        },
        {
          text: "Active",
          value: "1",
        },
      ],
      onFilter: (value, record) =>
        record.DOCUMENT_STATUS.toString().includes(value.toString()),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.DOCUMENT_STATUS - b.DOCUMENT_STATUS,
    },
    {
      title: "Uploaded by",
      width: 50,
      dataIndex: "UPLOADED_BY",
      key: "UPLOADED_BY",
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
        return record.UPLOADED_BY.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Date Uploaded",
      dataIndex: "DOCUMENT_DATETIME_CREATED",
      key: "DOCUMENT_DATETIME_CREATED",
      width: 50,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        a.DOCUMENT_DATETIME_CREATED - b.DOCUMENT_DATETIME_CREATED,
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
                showModalSendFile(
                  record.DOCUMENT_ID,
                  record.DOCUMENT_NAME,
                  record.CATEGORY_NAME
                )
              }
            />
          </Tooltip>
          <Tooltip title="Receivers">
            <Button
              className={classes.btnEdit}
              icon={<RiUserReceivedFill />}
              onClick={() =>
                showModalReceivers(
                  record.DOCUMENT_ID,
                  record.DOCUMENT_NAME,
                  record.CATEGORY_NAME
                )
              }
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className={classes.btnDelete}
              icon={<IoIosTrash />}
              onClick={() =>
                showModalDelete(
                  record.DOCUMENT_ID,
                  record.DOCUMENT_NAME,
                  user.data.result[0].ACCOUNT_FIRSTNAME
                )
              }
            />
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
        </Box>
      ),
    },
  ];

  const dispatch = useDispatch();
  const documents = useSelector((state) => state.sendfile);
  const accounts = useSelector((state) => state.account);
  const documentReceivers = useSelector((state) => state.documentreceivers);
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleSendFile, setVisibleSendFile] = useState(false);
  const [visibleReceivers, setVisibleReceivers] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [visibleDocument, setVisibleDocument] = useState(false);
  const [initialValueEdit, setInitialValueEdit] = useState({
    file_name: null,
    file_extension: null,
  });

  const fetchAllDocument = () => {
    dispatch(
      getDocumentAction(actions.GET_DOCUMENT_REQUEST, {
        account_id: user.data?.result[0].ACCOUNT_ID,
      })
    );
  };

  const DateOffset = (offset, date) => {
    const updatedAt = new Date(date);
    return new Date(+updatedAt + offset);
  };

  useEffect(() => {
    if (!_.isNil(documents.data)) {
      setData(documents.data.result);

      if (
        _.isEqual(documents.type, 2) &&
        documents.is_success &&
        !documents.is_loading &&
        new Date() < DateOffset(1000, documents.updated_at)
      ) {
        // message.success("File deleted successfully");
        alert("File deleted successfully");
        // window.location.reload();
      }
    }

    socket.on("get_document", (data) => {
      if (data.message === "get_document") {
        fetchAllDocument();
      }
    });
  }, [documents, socket, user, documentReceivers, initialValueEdit]);

  const handleOkSendFile = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleSendFile(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const showModalSendFile = (doc_id, doc_name, cat_name) => {
    setVisibleSendFile(true);
    setDocument({ id: doc_id, name: doc_name, category: cat_name });
  };

  const handleCancelSendFile = () => {
    setVisibleSendFile(false);
  };

  const handleCancelFile = () => {
    setInitialValueEdit({
      ...initialValueEdit,
      file_name: null,
      file_extension: null,
    });
    setVisibleDocument(false);
  };
  const showModalReceivers = (doc_id, doc_name, cat_name) => {
    setVisibleReceivers(true);
    setDocument({ id: doc_id, name: doc_name });
    dispatch(
      getDocumentReceiversAction(ACTRECEIVERS.GET_DOCUMENT_RECEIVERS_REQUEST, {
        document_id: doc_id,
        category_name: cat_name,
      })
    );
  };

  const handleCancelReceivers = () => {
    setVisibleReceivers(false);
  };

  const handleOkReceivers = () => {
    setVisibleReceivers(false);
  };

  const showModalDelete = (doc_id, doc_name) => {
    setVisibleDelete(true);
    setDocument({ id: doc_id, name: doc_name });
  };

  const showModalView = (doc_name, doc_type) => {
    setVisibleDocument(true);
    setInitialValueEdit({
      ...initialValueEdit,
      file_name: doc_name,
      file_extension: doc_type,
    });
  };

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    dispatch(
      deleteDocumentAction(actions.DELETE_DOCUMENT_REQUEST, {
        account_id: user.data.result[0].ACCOUNT_ID,
        document_id: document.id,
        document_name: !_.isNil(document) ? document.name : null,
      })
    );
    setTimeout(() => {
      setVisibleDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };
  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const showUploadModal = () => setVisibleUploadModal(true);
  const handleCancelUploadModal = () => setVisibleUploadModal(false);
  const handleOkUploadModal = () => setVisibleUploadModal(false);

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
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="start"
      flexDirection="column"
      paddingRight="20px"
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
        <Box display="flex" gap="10px" pt="10px">
          <MUIButton
            variant="contained"
            startIcon={<IoIosCloudUpload />}
            onClick={showUploadModal}
          >
            Upload
          </MUIButton>
        </Box>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1400,
            y: 500,
          }}
          className={classes.tablebox}
        />
        {visibleUploadModal && (
          <UploadModal
            visibleUploadModal={visibleUploadModal}
            confirmLoading={confirmLoading}
            setConfirmLoading={setConfirmLoading}
            handleCancelUploadModal={handleCancelUploadModal}
            handleOkUploadModal={handleOkUploadModal}
          />
        )}
        {visibleSendFile && (
          <SendFile
            documentID={!_.isNil(document) ? document.id : null}
            documentName={!_.isNil(document) ? document.name : null}
            categoryName={!_.isNil(document) ? document.category : null}
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
        )}
        {visibleReceivers && (
          <Receivers
            documentID={!_.isNil(document) ? document.id : null}
            documentName={!_.isNil(document) ? document.name : null}
            visibleReceivers={visibleReceivers}
            confirmLoading={confirmLoading}
            setConfirmLoading={setConfirmLoading}
            handleOkReceivers={handleOkReceivers}
            handleCancelReceivers={handleCancelReceivers}
            documentReceivers={
              !_.isNil(documentReceivers.data)
                ? documentReceivers.data?.result?.length > 0
                  ? documentReceivers.data?.result
                  : null
                : null
            }
          />
        )}
        {visibleDelete && (
          <Modal
            title="Delete Document"
            visible={visibleDelete}
            onOk={handleOkDelete}
            confirmLoading={confirmLoading}
            onCancel={handleCancelDelete}
          >
            Are you sure you want to delete this document?
          </Modal>
        )}
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
    </Box>
  );
}

export default AdminSendFile;
