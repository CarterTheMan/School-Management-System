import React from 'react';
import "./SideBar.css";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { Button } from '@mui/material';
import Cookie from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Spiral as Hamburger } from 'hamburger-react'
import Cookies from 'universal-cookie';

interface props {
    page: JSX.Element
}

// Sidebar: Uses https://www.npmjs.com/package/react-pro-sidebar
// Burger for collapsing the menu: https://www.npmjs.com/package/hamburger-react?activeTab=readme
export default function SideBar({page} : props) {
    let navigate = useNavigate(); 
    const cookies = new Cookies();
    const [collapsed, setCollapsed] = React.useState<boolean>(false);
    const [toggled, setToggled] = React.useState<boolean>(false);
    const [broken, setBroken] = React.useState<boolean>(false);

    // logout to the home page, destroy authenticated cookie
    const handleLogout = async function () {
        cookies.remove("authenticated", {path: "/"});
        navigate("/");
    }

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div className='SideBar-div'>
                <Sidebar
                    collapsed={collapsed}
                    toggled={toggled}
                    onBackdropClick={() => setToggled(false)}
                    onBreakPoint={setBroken}
                    breakPoint="md"
                    style={{marginRight: "2vw"}}
                    backgroundColor="white"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
                    <Menu>
                        {
                            !broken && (
                                <Hamburger toggled={!collapsed} onToggle={() => setCollapsed(!collapsed)} direction={'right'} />
                            )
                        }
                        <MenuItem component={<Link to="/dashboard" />}> Dashboard </MenuItem>
                        <MenuItem component={<Link to="/courses" />}> Courses </MenuItem>
                        <MenuItem component={<Link to="/grades" />}> Grades </MenuItem>
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

            <main style={{width: "100%"}}>
                {broken && (
                    <div style={{zIndex: '2', backgroundColor: "grey", width: "100vw"}}>
                        <Hamburger toggle={setToggled} onToggle={() => {setToggled(!toggled); setCollapsed(false)}} />
                    </div>
                )}
                {page}
            </main>
        </div>
    )
}