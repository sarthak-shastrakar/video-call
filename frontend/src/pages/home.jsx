import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/Homepage.css";
import { Button, IconButton, TextField } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from '@mui/material/Tooltip';


function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 

  return (
    <div className="Main">
      <div className="navBar">
        <div >
          <h2>Connectify</h2>
        </div>

        <div >
          <Box sx={{ mr: 2, fontFamily: "monospace" }}>
            <div>
              <Tooltip title="Profile">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mr: 2, fontFamily: "monospace" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  History
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/auth");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Box>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div style={{ display: "flex", gap: "10px"}}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="filled"
              />
              <Button onClick={handleJoinVideoCall} variant="text">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
