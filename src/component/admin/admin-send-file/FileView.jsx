import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Spin } from "antd";
import "antd/dist/antd.min.css";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { IoIosAdd } from "react-icons/io";
import io from "socket.io-client";
import FileViewer from "react-file-viewer";
const onError = (e) => {
  console.log(e, "error in file-viewer");
};
function FielView(props) {
  const { visibleFile, handleCancelFile, initialValueEdit } = props;
  function getExtension(filename) {
    return filename.split(".").pop();
  }
  return (
    <Modal
      title="File Viewer"
      visible={visibleFile}
      onCancel={handleCancelFile}
      footer={[
        <Button form="editDepartment" onClick={handleCancelFile}>
          Close
        </Button>,
      ]}
    >
      <FileViewer
        fileType={getExtension(
          process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
            initialValueEdit.file_name
        )}
        filePath={
          process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT +
          initialValueEdit.file_name
        }
        onError={onError}
      />
    </Modal>
  );
}

export default FielView;
