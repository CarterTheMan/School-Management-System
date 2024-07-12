import React from 'react';
import "./SideBar.css";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';

// Sidebar: Uses https://www.npmjs.com/package/react-pro-sidebar
// Need to add a burger for collapsing the menu
export default function SideBar() {
    const [collapse, setCollapse] = React.useState<boolean>(false);

    return (
        <Sidebar>
            <Menu>
                <MenuItem> Dashboard </MenuItem>
                <SubMenu label="Charts">
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    )
}