import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

function FacultyHome(props) {
  const classes = useStyles();
  const facultyFiles = useSelector((state) => state.facultyfiles);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {}, [facultyFiles]);

  return (
    <Box>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6} padding="10px">
          <Box className={classes.subContainer}>
            <Box className={classes.header}>
              <Typography className={classes.typoHeader}>
                Latest document sent to you. <br /> Date:{" "}
                {!_.isNil(facultyFiles.data) ? (
                  facultyFiles.data.result.document.length > 0 ? (
                    <Typography variant="p" className={classes.typoDate}>
                      {moment(
                        facultyFiles.data.result.document[0].SEND_DATETIME
                      ).format("MMMM DD, YYYY hh:mm A")}
                    </Typography>
                  ) : null
                ) : null}
              </Typography>
            </Box>
            <Box className={classes.content}>
              <Typography>
                {!_.isNil(facultyFiles.data) ? (
                  facultyFiles.data.result.document.length > 0 ? (
                    <a
                      href={
                        process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                        facultyFiles.data.result.document[0].DOCUMENT_NAME
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {facultyFiles.data.result.document[0].DOCUMENT_NAME}
                    </a>
                  ) : null
                ) : null}
              </Typography>
              {/* <Typography>
                {!_.isNil(facultyFiles.data)
                  ? facultyFiles.data.result.document.length > 0
                    ? facultyFiles.data.result.document[0]
                        .ANNOUNCEMENT_CONTENT
                    : null
                  : null}
              </Typography> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} padding="10px">
          <Box className={classes.subContainer}>
            <Box className={classes.header}>
              <Typography className={classes.typoHeader}>
                Latest memorandum sent to you. <br /> Date:{" "}
                {!_.isNil(facultyFiles.data) ? (
                  facultyFiles.data.result.memorandum.length > 0 ? (
                    <Typography variant="p" className={classes.typoDate}>
                      {moment(
                        facultyFiles.data.result.memorandum[0].SEND_DATETIME
                      ).format("MMMM DD, YYYY hh:mm A")}
                    </Typography>
                  ) : null
                ) : null}
              </Typography>
            </Box>
            <Box className={classes.content}>
              <Typography>
                {!_.isNil(facultyFiles.data) ? (
                  facultyFiles.data.result.memorandum.length > 0 ? (
                    <a
                      href={
                        process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
                        facultyFiles.data.result.memorandum[0].DOCUMENT_NAME
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {facultyFiles.data.result.memorandum[0].DOCUMENT_NAME}
                    </a>
                  ) : null
                ) : null}
              </Typography>
              {/* <Typography>
                {!_.isNil(facultyFiles.data)
                  ? facultyFiles.data.result.document.length > 0
                    ? facultyFiles.data.result.document[0]
                        .ANNOUNCEMENT_CONTENT
                    : null
                  : null}
              </Typography> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} padding="10px">
          <Box className={classes.subContainer}>
            <Box className={classes.header}>
              <Typography className={classes.typoHeader}>
                Latest announcement sent to you. <br /> Date:{" "}
                {!_.isNil(facultyFiles.data) ? (
                  facultyFiles.data.result.announcement.length > 0 ? (
                    <Typography variant="p" className={classes.typoDate}>
                      {moment(
                        facultyFiles.data.result.announcement[0].SEND_DATETIME
                      ).format("MMMM DD, YYYY hh:mm A")}
                    </Typography>
                  ) : null
                ) : null}
              </Typography>
            </Box>
            <Box className={classes.content}>
              <Typography sx={{ fontWeight: "bold" }}>
                {!_.isNil(facultyFiles.data)
                  ? facultyFiles.data.result.announcement.length > 0
                    ? facultyFiles.data.result.announcement[0]
                        .ANNOUNCEMENT_TITLE
                    : null
                  : null}
              </Typography>
              <Box
                sx={{
                  whiteSpace: isShow ? "pre-wrap" : "nowrap",
                  overflow: "hidden",
                  textOverflow: isShow ? "clip" : "ellipsis",
                  textAlign: "left",
                }}
                dangerouslySetInnerHTML={{
                  __html: !_.isNil(facultyFiles.data)
                    ? facultyFiles.data.result.announcement.length > 0
                      ? facultyFiles.data.result.announcement[0]
                          .ANNOUNCEMENT_CONTENT
                      : null
                    : null,
                }}
              >
                {}
              </Box>
              <Button variant="text" onClick={() => setIsShow(!isShow)}>
                {isShow ? "Hide" : "Show"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FacultyHome;
