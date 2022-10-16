import React from 'react';
import { AdminNavBar, AdminDepartment } from "../../../component/Component";
import { Box } from '@mui/material';

function Department(props) {
    const { mobileOpen, handleDrawerToggle, handleDrawerClose } = props;
    return (
        <>
            <AdminNavBar />
            <Box padding={{ xs: '10px', md: '0px 0px 0px 250px' }}>
                <AdminDepartment />
            </Box>
        </>
    );
}

export default Department;