import React, { useState, useMemo } from "react";
import { Table, Button, Input, Select } from "antd";
import "antd/dist/antd.min.css";
import _ from "lodash";
import ViewAnnouncement from "./ViewAnnouncement";
import moment from "moment";
import { Box, Avatar, Typography, Badge, Tooltip } from "@mui/material";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomSearch } from "../../Component";
import { useSelector, useDispatch } from "react-redux";
import {
  actions,
  searchFacultyFilesAction,
  getFacultyFilesAction,
} from "../../../redux/action/faculty-files/actions";
import io from "socket.io-client";
import { TbUrgent } from "react-icons/tb";
import { BsExclamationLg } from "react-icons/bs";
import { Timeline, TimelineEvent, TimelineBlip } from "react-event-timeline";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../utils/constant";
import useStyle from "./style";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
function FacultyAnnouncement(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const user = useSelector((state) => state.user);
  const facultyFiles = useSelector((state) => state.facultyfiles);
  const [announcement, setAnnouncement] = useState({
    title: null,
    content: null,
  });
  const [visible, setVisible] = useState(false);

  const showModalView = (title, content) => {
    setVisible(true);
    setAnnouncement({ ...announcement, title, content });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Announcement Title",
      width: 50,
      dataIndex: "ANNOUNCEMENT_TITLE",
      key: "ANNOUNCEMENT_TITLE",
      render: (announcement_title) => <p>{announcement_title}</p>,
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
            name="title"
          />
        );
      },
      filterIcon: () => {
        return <BiSearchAlt2 />;
      },
      onFilter: (value, record) => {
        return record.ANNOUNCEMENT_TITLE.toString()
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
            name="sender name"
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
      width: 50,
      render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
    },
    {
      title: "Action",
      width: 30,
      dataIndex: "DEPT_ID",
      key: "DEPT_ID",
      render: (dept_id, record) => (
        <Box display="flex" gap={1}>
          <Button
            onClick={() =>
              showModalView(
                record.ANNOUNCEMENT_TITLE,
                record.ANNOUNCEMENT_CONTENT
              )
            }
          >
            {" "}
            View{" "}
          </Button>
        </Box>
      ),
    },
  ];

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

  function userType(type) {
    if (type === 1) {
      return "Administrator";
    } else if (type === 2) {
      return "Secretary";
    } else if (type === 4) {
      return "Dean";
    } else {
      return null;
    }
  }

  return (
    // <Box padding="20px">
    //   <Table
    //     columns={
    //       !_.isNil(facultyFiles.data)
    //         ? facultyFiles.data.result?.announcement?.length > 0
    //           ? columns
    //           : null
    //         : null
    //     }
    //     dataSource={
    //       !_.isNil(facultyFiles.data)
    //         ? facultyFiles.data.result?.announcement?.length > 0
    //           ? facultyFiles.data.result.announcement
    //           : null
    //         : null
    //     }
    //     scroll={{
    //       x: 1000,
    //       y: 450,
    //     }}
    //   />
    //   <ViewAnnouncement
    //     visible={visible}
    //     handleCancel={handleCancel}
    //     title={announcement.title}
    //     content={announcement.content}
    //   />
    // </Box>

    <Timeline
      style={{
        minHeight: "calc(100vh - 65px)",
        padding: "50px 0px",
        width: "min(90%, 1000px)",
      }}
      lineColor={SECONDARY_COLOR}
      lineStyle={{}}
    >
      {facultyFiles.data?.result?.announcement?.map((info, index) => {
        const filter = account?.data?.result?.filter(
          (acc) => acc.ACCOUNT_ID === info.SENDER_ID
        );

        console.log(filter?.length);
        return (
          <TimelineEvent
            key={index}
            title={info.SENDER_NAME + " post an announcement"}
            subtitle={info.SENDER_NAME}
            createdAt={moment
              .utc(info.SEND_DATETIME)
              .local()
              .startOf("seconds")
              .fromNow()}
            icon={
              <Badge
                badgeContent={
                  info.URGENCY_LEVEL === 3 ? (
                    <Tooltip title="Urgent">
                      <TbUrgent style={{ color: "red", fontSize: "32px" }} />
                    </Tooltip>
                  ) : info.URGENCY_LEVEL === 2 ? (
                    <Tooltip title="Priority">
                      <BsExclamationLg
                        style={{ color: "orange", fontSize: "32px" }}
                      />
                    </Tooltip>
                  ) : null
                }
              >
                <Avatar
                  alt=""
                  src={
                    !_.isNil(filter[0]?.ACCOUNT_PICTURE)
                      ? process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                        filter[0]?.ACCOUNT_PICTURE
                      : process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                        "user.png"
                  }
                  sx={{
                    width: 50,
                    height: 50,
                    marginBottom: 2,
                    marginRight: 0,
                  }}
                />
              </Badge>
            }
            collapsible
            showContent={true}
            bubbleStyle={{ fontSize: "32px" }}
            iconStyle={{
              background: PRIMARY_COLOR,
              color: "white",
              padding: "10px",
              borderRadius: "100px",
              fontSize: "32px",
            }}
            style={{
              fontSize: "20px",
              fontFamily: "Montserrat",
              marginBottom: "50px",
            }}
          >
            <Box margin="40px">
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                {info.ANNOUNCEMENT_TITLE}
              </Typography>
              <Box
                sx={{
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                }}
                dangerouslySetInnerHTML={{
                  __html: info.ANNOUNCEMENT_CONTENT,
                }}
              />
            </Box>
          </TimelineEvent>
          // <Box key={index}>
          //   <Box margin="100px"></Box>
          //   <Box
          //     padding="20px"
          //     sx={{
          //       borderRadius: "15px",
          //       boxShadow: "5px 3px 3px 2px rgba(0,0,0,0.2)",
          //       background: "rgba(255,255,255,0.8)",
          //       marginTop: "50px",
          //       marginX: "10%",
          //     }}
          //     minHeight="100px"
          //   >
          //     <Box borderBottom="gray 2px solid" height="12%" display="flex">
          //       <Badge
          //         badgeContent={
          //           info.URGENCY_LEVEL === 3 ? (
          //             <TbUrgent style={{ color: "red", fontSize: "32px" }} />
          //           ) : info.URGENCY_LEVEL === 2 ? (
          //             <BsExclamationLg
          //               style={{ color: "orange", fontSize: "32px" }}
          //             />
          //           ) : null
          //         }
          //       >
          //         <Avatar
          //           alt=""
          //           src={
          //             process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
          //             filter[0]?.ACCOUNT_PICTURE
          //           }
          //           sx={{
          //             width: 50,
          //             height: 50,
          //             marginBottom: 2,
          //             marginRight: 0,
          //           }}
          //         />
          //       </Badge>

          //       <Box flexDirection="column" marginLeft="15px">
          //         <Typography>{info.SENDER_NAME}</Typography>
          //         <Typography sx={{ fontSize: "13px", color: "gray" }}>
          //           {userType(filter[0]?.ACCOUNT_TYPE)}
          //         </Typography>
          //         <Typography sx={{ fontSize: "13px", color: "gray" }}>
          //           {moment
          //             .utc(info.SEND_DATETIME)
          //             .local()
          //             .startOf("seconds")
          //             .fromNow()}
          //         </Typography>
          //       </Box>
          //     </Box>
          //     <Box margin="40px">
          //       <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          //         {info.ANNOUNCEMENT_TITLE}
          //       </Typography>
          //       <Box
          //         sx={{
          //           whiteSpace: "pre-wrap",
          //           textAlign: "left",
          //         }}
          //         dangerouslySetInnerHTML={{
          //           __html: info.ANNOUNCEMENT_CONTENT,
          //         }}
          //       />
          //     </Box>
          //   </Box>
          // </Box>
        );
      })}
    </Timeline>
  );
}

FacultyAnnouncement.propTypes = {};

export default FacultyAnnouncement;
