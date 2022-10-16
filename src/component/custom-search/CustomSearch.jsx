import React from "react";
import { Button, Input } from "antd";
import "antd/dist/antd.min.css";
import { Box } from "@mui/material";

function CustomSearch({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  name,
}) {
  return (
    <Box display="flex" padding="10px" gap="5px">
      <Input
        autoFocus
        placeholder={`Search ${name} here`}
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : []);
          confirm({ confirmDropdown: false });
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          clearFilters();
          confirm();
        }}
      >
        Reset
      </Button>
    </Box>
  );
}

export default CustomSearch;
