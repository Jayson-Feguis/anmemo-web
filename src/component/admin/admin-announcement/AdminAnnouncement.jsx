import React, { useMemo, useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import "antd/dist/antd.min.css";
import { Grid, Box, Tooltip, Button as MUIButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAnnouncementReceiversAction,
} from "../../../redux/action/announcement-receivers/actions";
import {
  actions as ACTANNOUNCEMENT,
  deleteAnnouncementAction,
} from "../../../redux/action/announcement/actions";
import _ from "lodash";
import io from "socket.io-client";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import EditAnnouncementModal from "./EditAnnouncementModal";
import SendAnnouncementModal from "./SendAnnouncementModal";
import Receivers from "./Receivers";
import useStyles from "./style";
import { IoIosAdd, IoIosTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiSendPlaneFill, RiUserReceivedFill } from "react-icons/ri";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../../../utils/constant";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function AdminAnnouncement(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const user = useSelector((state) => state.user);
  const announcement = useSelector((state) => state.announcement);
  const announcementReceivers = useSelector(
    (state) => state.announcementreceivers
  );
  const [departmentList, setDepartmentList] = useState(null);
  const [visibleAnnouncement, setVisibleAnnouncement] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleSend, setVisibleSend] = useState(false);
  const [visibleReceivers, setVisibleReceivers] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [document, setDocument] = useState({
    document_id: null,
    document_name: null,
    document_content: null,
  });
  const [announcementList, setAnnouncementList] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [isViewAnnouncement, setIsViewAnnouncement] = useState(false);
  const [isClick, setClick] = useState(false);
  const DateOffset = (offset, date) => {
    const updatedAt = new Date(date);
    return new Date(+updatedAt + offset);
  };

  useEffect(() => {
    if (
      announcement.is_success === true &&
      !announcement.is_loading &&
      new Date() < DateOffset(1000, announcement.updated_at)
    ) {
      alert("Announcement added successfully");
    }
  }, [announcement]);
  useMemo(() => {
    let updatedList = announcement.data?.result;

    updatedList = updatedList?.filter(
      (item) =>
        item.ANNOUNCEMENT_TITLE.toLowerCase().indexOf(
          searchFilter.toLowerCase()
        ) !== -1 ||
        item.ANNOUNCEMENT_CONTENT.toLowerCase().indexOf(
          searchFilter.toLowerCase()
        ) !== -1
    );

    setAnnouncementList(updatedList);
  }, [searchFilter]);

  useMemo(() => {
    if (!_.isNil(department.data)) {
      setDepartmentList(department.data?.result);
    }

    if (!_.isNil(announcement.data)) {
      setAnnouncementList(announcement.data?.result);
    }
  }, [user, announcement]);

  const showDelete = (doc_id, doc_name, doc_content) => {
    setVisibleDelete(true);
    setDocument({
      ...document,
      document_id: doc_id,
      document_name: doc_name,
      document_content: doc_content,
    });
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    setClick(true);
    setTimeout(() => {
      setVisibleDelete(false);
      setConfirmLoading(false);
      dispatch(
        deleteAnnouncementAction(ACTANNOUNCEMENT.DELETE_ANNOUNCEMENT_REQUEST, {
          account_id: !_.isNil(user.data)
            ? user.data?.result.length > 0
              ? user.data?.result[0].ACCOUNT_ID
              : null
            : null,
          announcement_id: document.document_id,
          announcementtitle: document.document_name,
        })
      );
    });
  };
  useEffect(() => {
    if (isClick) {
      alert("Deleted successfully");
    }
  }, [isClick]);

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };

  const showEdit = (doc_id, doc_name, doc_content) => {
    setVisibleEdit(true);
    setDocument({
      ...document,
      document_id: doc_id,
      document_name: doc_name,
      document_content: doc_content,
    });
  };

  const handleOkEdit = () => {
    setVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const showAnnouncement = () => {
    setVisibleAnnouncement(true);
  };

  const handleOkAnnouncement = () => {
    setVisibleAnnouncement(false);
  };

  const handleCancelAnnouncement = () => {
    setVisibleAnnouncement(false);
  };

  const showSend = (doc_id, doc_name) => {
    setVisibleSend(true);
    setDocument({ ...document, document_id: doc_id, document_name: doc_name });
  };

  const handleOkSend = () => {
    setVisibleSend(false);
  };

  const handleCancelSend = () => {
    setVisibleSend(false);
  };

  const showReceivers = (ann_id, ann_name) => {
    setVisibleReceivers(true);
    setDocument({ ...document, document_id: ann_id, document_name: ann_name });
    dispatch(
      getAnnouncementReceiversAction(
        actions.GET_ANNOUNCEMENT_RECEIVERS_REQUEST,
        ann_id
      )
    );
  };

  const handleOkReceivers = () => {
    setVisibleReceivers(false);
  };

  const handleCancelReceivers = () => {
    setVisibleReceivers(false);
  };

  const handleViewAnnouncement = (doc_id, doc_name, doc_content) => {
    setDocument({
      ...document,
      document_id: doc_id,
      document_name: doc_name,
      document_content: doc_content,
    });
    setIsViewAnnouncement(true);
  };
  const handleOkView = () => {
    setIsViewAnnouncement(false);
  };
  const handleCancelView = () => {
    setIsViewAnnouncement(false);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="start"
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
      <Box position="relative">
        <Box display="flex" gap="10px" py="10px">
          <MUIButton
            variant="contained"
            startIcon={<IoIosAdd />}
            onClick={showAnnouncement}
          >
            {" "}
            Create Announcement{" "}
          </MUIButton>
        </Box>
        <Box width={{ xs: "100%", md: "400px" }} pb="10px">
          <Input
            autoFocus
            placeholder={`Search announcement here`}
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
          />
        </Box>
        <Grid
          container
          width="100%"
          justifyContent="center"
          alignItems="center"
          gap="30px"
        >
          {!_.isNil(announcement.data)
            ? announcement.data?.result.length > 0
              ? announcementList?.map((value, index) => (
                  <Grid item key={index}>
                    <Box key={index} className={classes.cardContainer}>
                      <Box>
                        <Box
                          component="div"
                          className={classes.cardTitle}
                          dangerouslySetInnerHTML={{
                            __html: value.ANNOUNCEMENT_TITLE,
                          }}
                        />
                        <Tooltip title="Click to view" followCursor>
                          <Box
                            className={classes.cardContent}
                            onClick={() =>
                              handleViewAnnouncement(
                                value.ANNOUNCEMENT_ID,
                                value.ANNOUNCEMENT_TITLE,
                                value.ANNOUNCEMENT_CONTENT
                              )
                            }
                          >
                            <Box
                              component="div"
                              dangerouslySetInnerHTML={{
                                __html: value.ANNOUNCEMENT_CONTENT,
                              }}
                            />
                          </Box>
                        </Tooltip>
                      </Box>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Edit">
                          <Button
                            onClick={() =>
                              showEdit(
                                value.ANNOUNCEMENT_ID,
                                value.ANNOUNCEMENT_TITLE,
                                value.ANNOUNCEMENT_CONTENT
                              )
                            }
                            className={classes.btnEdit}
                            icon={<MdEdit />}
                          />
                        </Tooltip>
                        <Tooltip title="Send">
                          <Button
                            className={classes.btnSend}
                            onClick={() =>
                              showSend(
                                value.ANNOUNCEMENT_ID,
                                value.ANNOUNCEMENT_TITLE
                              )
                            }
                            icon={<RiSendPlaneFill />}
                          />
                        </Tooltip>
                        <Tooltip title="Receivers">
                          <Button
                            onClick={() =>
                              showReceivers(
                                value.ANNOUNCEMENT_ID,
                                value.ANNOUNCEMENT_TITLE
                              )
                            }
                            className={classes.btnEdit}
                            icon={<RiUserReceivedFill />}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Button
                            onClick={() =>
                              showDelete(
                                value.ANNOUNCEMENT_ID,
                                value.ANNOUNCEMENT_TITLE,
                                value.ANNOUNCEMENT_CONTENT
                              )
                            }
                            className={classes.btnDelete}
                            icon={<IoIosTrash />}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                  </Grid>
                ))
              : null
            : null}
        </Grid>
        {visibleAnnouncement && (
          <CreateAnnouncementModal
            departmentList={departmentList}
            visibleAnnouncement={visibleAnnouncement}
            confirmLoading={confirmLoading}
            setConfirmLoading={setConfirmLoading}
            handleOkAnnouncement={handleOkAnnouncement}
            handleCancelAnnouncement={handleCancelAnnouncement}
            accountID={
              !_.isNil(user.data)
                ? user.data?.result.length > 0
                  ? user.data?.result[0].ACCOUNT_ID
                  : null
                : null
            }
          />
        )}
        {visibleEdit && (
          <EditAnnouncementModal
            departmentList={departmentList}
            visibleEdit={visibleEdit}
            confirmLoading={confirmLoading}
            setConfirmLoading={setConfirmLoading}
            handleOkEdit={handleOkEdit}
            handleCancelEdit={handleCancelEdit}
            document={document}
            setDocument={setDocument}
            accountID={
              !_.isNil(user.data)
                ? user.data?.result.length > 0
                  ? user.data?.result[0].ACCOUNT_ID
                  : null
                : null
            }
          />
        )}
        {visibleSend && (
          <SendAnnouncementModal
            departments={departmentList}
            visibleSend={visibleSend}
            confirmLoading={confirmLoading}
            setConfirmLoading={setConfirmLoading}
            handleOkSend={handleOkSend}
            handleCancelSend={handleCancelSend}
            user={
              !_.isNil(user.data)
                ? user.data?.result.length > 0
                  ? user.data?.result[0]
                  : null
                : null
            }
            document={document}
          />
        )}

        {visibleReceivers && (
          <Receivers
            visibleReceivers={visibleReceivers}
            confirmLoading={confirmLoading}
            setConfirmLoading={setConfirmLoading}
            handleOkReceivers={handleOkReceivers}
            handleCancelReceivers={handleCancelReceivers}
            document={document}
            announcementReceivers={
              !_.isNil(announcementReceivers.data)
                ? announcementReceivers.data?.result?.length > 0
                  ? announcementReceivers.data?.result
                  : null
                : null
            }
          />
        )}

        <Modal
          title="Delete Announcement"
          visible={visibleDelete}
          onOk={handleOkDelete}
          confirmLoading={confirmLoading}
          onCancel={handleCancelDelete}
        >
          Are you sure you want to delete this announcement?
        </Modal>
        <Modal
          title={document.document_name}
          visible={isViewAnnouncement}
          onOk={handleOkView}
          onCancel={handleCancelView}
          footer={[
            <Button type="primary" onClick={handleCancelView}>
              OK
            </Button>,
          ]}
        >
          <Box
            component="p"
            sx={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{
              __html: document.document_content,
            }}
          />
        </Modal>
      </Box>
    </Box>
  );
}

export default AdminAnnouncement;
