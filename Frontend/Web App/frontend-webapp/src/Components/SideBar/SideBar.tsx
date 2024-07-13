import React from 'react';
import "./SideBar.css";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { Button } from '@mui/material';
import Cookie from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

// Sidebar: Uses https://www.npmjs.com/package/react-pro-sidebar
// Need to add a burger for collapsing the menu
export default function SideBar() {
    let navigate = useNavigate(); 
    const cookies = new Cookie();
    const [collapsed, setCollapsed] = React.useState<boolean>(false);

    // logout to the home page, destroy authenticated cookie
    const handleLogout = async function () {
        cookies.remove("authenticated");
        navigate("/");
    }

    return (
        <div className='SideBar-div'>
            <Sidebar
                collapsed={collapsed}
                breakPoint="md"
                style={{marginRight: "2vw"}}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
                <Menu>
                    <MenuItem> Dashboard </MenuItem>
                    <MenuItem> Courses </MenuItem>
                    <MenuItem> Grades </MenuItem>
                    {
                        !collapsed ? 
                        <div style={{paddingBottom: '5vh', bottom: '0', left: '0', right: '0', position: 'absolute', textAlign: 'center'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                onClick={handleLogout}
                                sx={{ ml: 4, mr: 4, mb: 4 }}
                            >
                                Log out
                            </Button>
                        </div>
                        : null
                    }
                </Menu>
                </div>
            </Sidebar>
        </div>
    )
}